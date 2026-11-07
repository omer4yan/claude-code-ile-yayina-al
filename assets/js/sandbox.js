/* =========================================================
   Rehberli öğrenme sandbox'ı — simüle edilmiş shell
   Gerçek bir terminal değildir: bilgisayarındaki dosyalara dokunmaz.
   Desteklenen komutlar: pwd, ls, ls -a, mkdir, cd, cat, clear, help,
   claude "..." (yalnızca derste geçen istekler).
   ========================================================= */
(function () {
  "use strict";

  var ctx = window.ORVENA_LESSON;
  if (!ctx || !ctx.lesson.sandbox) {
    document.querySelectorAll("[data-practice] .practice__open").forEach(function (b) { b.hidden = true; });
    return;
  }
  var cfg = ctx.lesson.sandbox;

  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };

  /* ---------- Sanal dosya sistemi ---------- */
  var fs;
  var cwd;
  var reset = function () {
    fs = { dirs: {}, files: {} };
    (cfg.dirs || ["~"]).forEach(function (d) { fs.dirs[d] = true; });
    Object.keys(cfg.files || {}).forEach(function (p) { fs.files[p] = cfg.files[p]; });
    cwd = cfg.cwd || "~";
  };
  reset();

  var resolve = function (p) {
    if (!p || p === "~") return "~";
    var parts = p.indexOf("~") === 0 ? p.replace(/^~\/?/, "").split("/") : cwd.split("/").slice(1).concat(p.split("/"));
    var out = [];
    parts.forEach(function (s) {
      if (!s || s === ".") return;
      if (s === "..") { out.pop(); return; }
      out.push(s);
    });
    return ["~"].concat(out).join("/");
  };
  var children = function (dir) {
    var prefix = dir + "/";
    var names = {};
    Object.keys(fs.dirs).concat(Object.keys(fs.files)).forEach(function (p) {
      if (p.indexOf(prefix) !== 0) return;
      var rest = p.slice(prefix.length);
      if (!rest || rest.indexOf("/") !== -1) return;
      names[rest] = !!fs.dirs[p];
    });
    return Object.keys(names).sort().map(function (n) { return { name: n, dir: names[n] }; });
  };

  /* ---------- Komutlar ---------- */
  var norm = function (s) {
    return s.toLowerCase().replace(/[“”„]/g, '"').replace(/\s+/g, " ").replace(/[.!?]+$/, "").trim();
  };

  var HELP = [
    "Bu pratik terminalinde çalışan komutlar:",
    "  pwd               bulunduğun klasörü gösterir",
    "  ls  /  ls -a      klasördekileri listeler (-a: gizli dosyalar da)",
    "  mkdir ad          yeni klasör oluşturur",
    "  cd ad  /  cd ..   klasöre girer / bir üst klasöre çıkar",
    "  cat dosya         dosyanın içeriğini gösterir",
    "  claude \"istek\"    simüle Claude'a derste geçen isteği verir",
    "  clear             ekranı temizler (Ctrl+L)",
    "Önceki komutlar için yukarı ok tuşunu kullan."
  ];

  var run = function (line) {
    var raw = line.trim();
    if (!raw) return [];

    // Derse özel komutlar (ör. "start index.html", "/clear"): sandbox.cmds içinde tanımlanır
    var custom = null;
    (cfg.cmds || []).forEach(function (c) { if (!custom && norm(raw) === norm(c.match)) custom = c; });
    if (custom) {
      if (custom.write) Object.keys(custom.write).forEach(function (p) { fs.files[p] = custom.write[p]; });
      return custom.claude ? { claude: true, lines: custom.out || [] } : (custom.out || []).slice();
    }
    if (raw.charAt(0) === "/") {
      return ["(simülasyon) " + raw.split(/\s+/)[0] + " bir Claude Code oturum komutudur; gerçek oturumda çalışır.",
        "Bu derste denenebilen oturum komutları için aşağıdaki önerilere bak."];
    }
    var m = raw.match(/^(\S+)\s*([\s\S]*)$/);
    var cmd = m[1];
    var rest = m[2].trim();
    var args = rest ? rest.split(/\s+/) : [];

    switch (cmd) {
      case "pwd":
        return [cwd];
      case "ls": {
        var showAll = false, target = cwd;
        args.forEach(function (a) {
          if (/^-[a-z]*a/.test(a)) showAll = true;
          else if (a.charAt(0) !== "-") target = resolve(a);
        });
        if (!fs.dirs[target]) {
          if (fs.files[target] !== undefined) return [args[args.length - 1]];
          return ["ls: '" + args[args.length - 1] + "' erişilemiyor: Böyle bir dosya ya da dizin yok"];
        }
        var items = children(target).filter(function (c) { return showAll || c.name.charAt(0) !== "."; });
        var names = items.map(function (c) { return c.name + (c.dir ? "/" : ""); });
        if (showAll) names = [".", ".."].concat(names);
        return names.length ? [names.join("  ")] : [];
      }
      case "mkdir": {
        var outM = [];
        args.filter(function (a) { return a.charAt(0) !== "-"; }).forEach(function (a) {
          var p = resolve(a);
          var parent = p.slice(0, p.lastIndexOf("/"));
          if (fs.dirs[p] || fs.files[p] !== undefined) outM.push("mkdir: '" + a + "' dizini oluşturulamıyor: Dosya mevcut (File exists)");
          else if (!fs.dirs[parent]) outM.push("mkdir: '" + a + "' dizini oluşturulamıyor: Böyle bir dosya ya da dizin yok");
          else fs.dirs[p] = true;
        });
        if (!args.length) outM.push("mkdir: klasör adı eksik — örnek: mkdir my-first-project");
        return outM;
      }
      case "cd": {
        var dest = resolve(args[0] || "~");
        if (fs.dirs[dest]) { cwd = dest; return []; }
        if (fs.files[dest] !== undefined) return ["cd: " + args[0] + ": Bir dizin değil"];
        return ["cd: " + args[0] + ": Böyle bir dosya ya da dizin yok"];
      }
      case "cat": {
        if (!args.length) return ["cat: dosya adı eksik — örnek: cat hello.txt"];
        var outC = [];
        args.forEach(function (a) {
          var p = resolve(a);
          if (fs.dirs[p]) outC.push("cat: " + a + ": Bir dizin");
          else if (fs.files[p] === undefined) outC.push("cat: " + a + ": Böyle bir dosya ya da dizin yok");
          else if (fs.files[p] !== "") outC = outC.concat(fs.files[p].split("\n"));
        });
        return outC;
      }
      case "help":
        return HELP.slice();
      case "claude": {
        if (/^(--version|-v)$/.test(rest)) return ["2.x.x (Claude Code) — simülasyon; gerçek sürüm numarası farklı olur"];
        var q = rest.replace(/^["“'‘]/, "").replace(/["”'’]$/, "");
        if (!rest) return ["(simülasyon) Gerçek Claude Code burada etkileşimli bir oturum açar.", "Bu pratik ortamında isteği tırnak içinde ver: claude \"…\""];
        var hit = null;
        (cfg.claude || []).forEach(function (r) { if (!hit && norm(q) === norm(r.match)) hit = r; });
        if (!hit) {
          return [
            "(simülasyon) Bu pratik ortamında yalnızca bu derste geçen istekler çalışır.",
            "Aşağıdaki önerilerden birini dene ya da isteği serbestçe denemek için “Claude'da aç” düğmesini kullan."
          ];
        }
        if (hit.write) {
          Object.keys(hit.write).forEach(function (p) { fs.files[p] = hit.write[p]; });
        }
        return { claude: true, lines: hit.out || [] };
      }
      default:
        return [cmd + ": komut bulunamadı (command not found) — kullanılabilir komutlar için help yaz"];
    }
  };

  /* ---------- Arayüz ---------- */
  var practices = document.querySelectorAll("[data-practice]");
  practices.forEach(function (wrap, idx) {
    var openBtn = wrap.querySelector(".practice__open");
    var box = wrap.querySelector(".sandbox");
    if (!openBtn || !box) return;
    var built = false;
    var history = [];
    var hIndex = 0;
    var screen, input, promptEl;

    var promptText = function () { return "orvena:" + cwd + "$"; };

    var print = function (html, cls) {
      var div = document.createElement("div");
      div.className = "sandbox__line" + (cls ? " " + cls : "");
      div.innerHTML = html;
      screen.appendChild(div);
    };
    var scrollEnd = function () { screen.scrollTop = screen.scrollHeight; };

    var welcome = function () {
      print("Rehberli öğrenme sandbox'ı · simüle edilmiş shell", "is-dim");
      print("Komutlar bilgisayarındaki dosyalara dokunmaz. Yardım için <b>help</b> yaz.", "is-dim");
    };

    var exec = function (line) {
      print('<span class="sandbox__ps">' + esc(promptText()) + "</span> " + esc(line), "is-cmd");
      var trimmed = line.trim();
      if (trimmed) { history.push(trimmed); }
      hIndex = history.length;
      if (trimmed === "clear") { screen.innerHTML = ""; promptEl.textContent = promptText(); return; }
      var res = run(line);
      if (res && res.claude) {
        print("● Claude (simülasyon)", "is-claude");
        res.lines.forEach(function (l) { print(esc(l), /^\[OK\]/.test(l) ? "is-ok" : /^- /.test(l) ? "is-del" : /^\+ /.test(l) ? "is-add" : "is-out"); });
      } else {
        res.forEach(function (l) { print(esc(l) || "&nbsp;", "is-out"); });
      }
      promptEl.textContent = promptText();
      scrollEnd();
    };

    var build = function () {
      built = true;
      var tryHtml = (cfg.try || []).map(function (t) {
        return '<li><button type="button" class="sandbox__try" data-cmd="' + esc(t.cmd) + '"><code>' + esc(t.cmd) + "</code><span>" + esc(t.desc) + "</span></button></li>";
      }).join("");
      var inputId = "sandbox-input-" + idx;
      box.innerHTML =
        '<div class="sandbox__term">' +
        '<div class="sandbox__bar"><span class="terminal__dots" aria-hidden="true"><i></i><i></i><i></i></span>' +
        '<span class="sandbox__title">Rehberli öğrenme sandbox\'ı · <em>simüle edilmiş shell</em></span>' +
        '<button type="button" class="sandbox__reset">Sıfırla</button></div>' +
        '<div class="sandbox__screen" role="log" aria-live="polite" aria-label="Terminal çıktısı"></div>' +
        '<form class="sandbox__form" autocomplete="off">' +
        '<label class="sandbox__ps" for="' + inputId + '"></label>' +
        '<input class="sandbox__input" id="' + inputId + '" type="text" spellcheck="false" autocapitalize="off" autocorrect="off" aria-label="Komut yaz ve Enter\'a bas">' +
        "</form></div>" +
        (tryHtml ? '<div class="sandbox__tryhead">Şunları dene <small>(tıklayınca komut satırına yazılır; Enter ile çalıştır)</small></div><ul class="sandbox__trylist">' + tryHtml + "</ul>" : "");
      screen = box.querySelector(".sandbox__screen");
      input = box.querySelector(".sandbox__input");
      promptEl = box.querySelector(".sandbox__form .sandbox__ps");
      promptEl.textContent = promptText();
      welcome();

      box.querySelector(".sandbox__form").addEventListener("submit", function (e) {
        e.preventDefault();
        var v = input.value;
        input.value = "";
        exec(v);
      });
      input.addEventListener("keydown", function (e) {
        if (e.key === "ArrowUp") {
          if (!history.length) return;
          e.preventDefault();
          hIndex = Math.max(0, hIndex - 1);
          input.value = history[hIndex] || "";
        } else if (e.key === "ArrowDown") {
          e.preventDefault();
          hIndex = Math.min(history.length, hIndex + 1);
          input.value = history[hIndex] || "";
        } else if ((e.ctrlKey || e.metaKey) && (e.key === "l" || e.key === "L")) {
          e.preventDefault();
          screen.innerHTML = "";
        }
      });
      screen.addEventListener("click", function () {
        if (!window.getSelection || !String(window.getSelection())) input.focus();
      });
      box.querySelector(".sandbox__reset").addEventListener("click", function () {
        reset();
        history = [];
        hIndex = 0;
        screen.innerHTML = "";
        welcome();
        promptEl.textContent = promptText();
        input.focus();
      });
      box.addEventListener("click", function (e) {
        var t = e.target.closest(".sandbox__try");
        if (!t) return;
        input.value = t.getAttribute("data-cmd");
        input.focus();
        try { input.setSelectionRange(input.value.length, input.value.length); } catch (er) { /* bazı tarayıcılar */ }
      });
    };

    openBtn.addEventListener("click", function () {
      var open = box.hidden;
      if (open && !built) build();
      box.hidden = !open;
      openBtn.setAttribute("aria-expanded", open ? "true" : "false");
      var label = openBtn.querySelector("span");
      if (label) label.textContent = open ? "Sandbox'ı kapat" : "Sandbox'ı aç";
      if (open) {
        promptEl.textContent = promptText();
        input.focus({ preventScroll: true });
      }
    });
  });
})();
