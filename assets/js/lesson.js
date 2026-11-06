/* =========================================================
   Ders sayfası (ders.html?id=m1-d1)
   Ders verisini (window.ORVENA_LESSONS) okuyup sayfayı üretir:
   giriş alanı, ders gövdesi, müfredat, "Bu modülde", "Bu derste",
   önceki/sonraki dersler. Sandbox ve dinleme ayrı dosyalarda.
   ========================================================= */
(function () {
  "use strict";

  var DATA = window.ORVENA_LESSONS;
  var main = document.getElementById("ana-icerik");
  if (!DATA || !main) return;

  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Yardımcılar ---------- */
  var ICON = {
    chev: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>',
    left: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6"/></svg>',
    right: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    clock: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
    list: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></svg>',
    term: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M4 17l6-6-6-6M12 19h8"/></svg>',
    copy: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"/><path d="M5 15V5a2 2 0 0 1 2-2h10"/></svg>',
    check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12l5 5L20 7"/></svg>',
    info: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/></svg>',
    tip: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-4 10.5c.7.7 1 1.5 1 2.5h6c0-1 .3-1.8 1-2.5A6 6 0 0 0 12 3z"/></svg>',
    warn: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3l9.5 17h-19L12 3z"/><path d="M12 10v4M12 17h.01"/></svg>',
    help: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.6v.6M12 17h.01"/></svg>',
    note: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 20h9M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>',
    spark: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5L18 18M6 18l2.5-2.5M15.5 8.5L18 6"/></svg>'
  };

  var esc = function (s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  };
  var pad2 = function (n) { return (n < 10 ? "0" : "") + n; };

  /* ---------- Ders listesi ve geçerli ders ---------- */
  var all = [];
  DATA.modules.forEach(function (m) {
    m.lessons.forEach(function (l, i) {
      all.push({ lesson: l, module: m, index: i });
    });
  });

  var lessonHref = function (l) {
    return l.ready ? "ders.html?id=" + l.id : "yolculuk.html#" + l.id;
  };

  var params = new URLSearchParams(location.search);
  var id = params.get("id") || all[0].lesson.id;
  var pos = -1;
  for (var i = 0; i < all.length; i++) if (all[i].lesson.id === id) pos = i;

  if (pos < 0 || !all[pos].lesson.ready) {
    // Bilinmeyen ya da henüz hazırlanmamış ders: yolculuk sayfasındaki özete git
    location.replace(pos < 0 ? "yolculuk.html" : "yolculuk.html#" + id);
    return;
  }

  var cur = all[pos];
  var L = cur.lesson;
  var M = cur.module;
  var prev = all[pos - 1] || null;
  var next = all[pos + 1] || null;

  /* ---------- Başlık, dil bağlantıları ---------- */
  document.title = L.title + " — Modül " + M.no + " · Orvena";
  var desc = document.querySelector('meta[name="description"]');
  if (desc) desc.setAttribute("content", "Modül " + M.no + ", Ders " + (cur.index + 1) + ": " + L.title + ". 'Claude Code ile Yayına Al' kursunun ders notlarım.");
  ["lang-link", "footer-en"].forEach(function (k) {
    var a = document.getElementById(k);
    if (a) a.setAttribute("href", "en/yolculuk.html#" + L.id);
  });
  var trLink = document.querySelector('.footer-bar a[hreflang="tr"]');
  if (trLink) trLink.setAttribute("href", "ders.html?id=" + L.id);

  /* ---------- Müfredat ---------- */
  var curList = document.getElementById("lesson-curriculum");
  if (curList) {
    var html = "";
    DATA.modules.forEach(function (m) {
      var open = m.id === M.id;
      html += '<div class="cur-module' + (open ? " is-active" : " is-collapsed") + '" data-module="' + m.id + '"' + (open ? " data-open" : "") + ">" +
        '<button class="cur-module__head" type="button" aria-expanded="' + open + '" aria-controls="cur-' + m.id + '">' +
        '<span class="cur-badge">' + pad2(m.no) + "</span>" +
        '<span class="cur-module__name">' + esc(m.title) + "</span>" +
        '<span class="cur-module__count">' + m.lessons.length + " ders</span>" +
        ICON.chev.replace("<svg ", '<svg class="cur-module__chev" ') + "</button>" +
        '<div class="cur-lessons-wrap" id="cur-' + m.id + '"><ul class="cur-lessons">';
      m.lessons.forEach(function (l) {
        var active = l.id === L.id;
        html += "<li" + (active ? ' class="is-active"' : "") + '><a href="' + lessonHref(l) + '"' +
          (active ? ' aria-current="page"' : "") + ">" + esc(l.title) + "</a></li>";
      });
      html += "</ul></div></div>";
    });
    html += '<div class="cur-module cur-extra" data-module="yayin-gunu"><a class="cur-module__head" href="yolculuk.html#yayin-gunu">' +
      '<span class="cur-badge">★</span><span class="cur-module__name">Yayın günü</span><span class="cur-module__count">6 Kasım</span></a></div>';
    curList.innerHTML = html;
  }

  /* ---------- Sağ kart: Bu modülde ---------- */
  var railCard = document.querySelector(".rail-card--module");
  var railName = document.getElementById("rail-module-name");
  var railList = document.getElementById("rail-lessons");
  if (railCard && railName && railList) {
    railName.innerHTML = '<a href="yolculuk.html#' + M.id + '">' + esc(M.title) + "</a>";
    railList.innerHTML = M.lessons.map(function (l, k) {
      var active = l.id === L.id;
      return "<li" + (active ? ' class="is-active"' : "") + '><a href="' + lessonHref(l) + '"' + (active ? ' aria-current="page"' : "") +
        '><span class="n">' + (k + 1) + "</span>" + esc(l.title) + "</a></li>";
    }).join("");
    railCard.hidden = false;
  }

  /* ---------- Ders gövdesi ---------- */
  var stepNo = 0;
  var toc = [];

  var copyBtn = function (text, label) {
    return '<button class="copy-btn" type="button" data-copy="' + esc(text) + '" aria-label="' + (label || "Kopyala") + '">' + ICON.copy + "<span>Kopyala</span></button>";
  };

  var renderBlock = function (b) {
    switch (b.t) {
      case "h":
        stepNo += 1;
        var hid = "adim-" + stepNo;
        toc.push({ id: hid, text: b.text });
        return '<h2 class="lesson-h" id="' + hid + '" data-read>' + esc(b.text) + "</h2>";
      case "p":
        return '<p data-read>' + b.html + "</p>";
      case "cmd":
        return '<figure class="cmd">' +
          '<div class="cmd__row"><pre><code><span class="prompt" aria-hidden="true">$ </span>' + esc(b.code) + "</code></pre>" + copyBtn(b.code, "Komutu kopyala") + "</div>" +
          (b.expect ? '<div class="cmd__expect"><span class="cmd__label">Şunu görmelisin</span><pre>' + esc(b.expect) + "</pre></div>" : "") +
          "</figure>";
      case "code":
        return '<figure class="cmd cmd--code">' +
          '<figcaption class="cmd__cap"><span>' + esc(b.label || "Örnek") + "</span>" + copyBtn(b.code) + "</figcaption>" +
          "<pre><code>" + esc(b.code) + "</code></pre></figure>";
      case "callout":
        var kind = b.kind || "info";
        return '<aside class="callout callout--' + kind + '" data-read>' +
          '<span class="callout__icon">' + (ICON[kind] || ICON.info) + "</span>" +
          '<div><strong class="callout__title">' + esc(b.title) + "</strong><p>" + b.html + "</p></div></aside>";
      case "table":
        return '<div class="table-wrap"><table class="lesson-table"><thead><tr>' +
          b.head.map(function (h) { return "<th>" + esc(h) + "</th>"; }).join("") + "</tr></thead><tbody>" +
          b.rows.map(function (r) {
            return "<tr>" + r.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>";
          }).join("") + "</tbody></table></div>";
      case "list":
        return '<ul class="lesson-list">' + b.items.map(function (x) { return "<li data-read>" + x + "</li>"; }).join("") + "</ul>";
      case "steps":
        return '<ol class="lesson-steps">' + b.items.map(function (x) { return "<li data-read>" + x + "</li>"; }).join("") + "</ol>";
      case "practice":
        return '<div class="practice" data-practice>' +
          '<div class="practice__bar">' +
          '<div class="practice__text"><strong>Pratik</strong><span>Komutları tarayıcıdaki simüle terminalde dene ya da bu konuyu Claude ile konuş.</span></div>' +
          '<div class="practice__actions">' +
          '<button class="btn btn--primary practice__open" type="button" aria-expanded="false">' + ICON.term + "<span>Sandbox'ı aç</span></button>" +
          '<button class="btn btn--ghost practice__claude" type="button">' + ICON.spark + "<span>Claude'da aç</span></button>" +
          "</div></div>" +
          '<div class="sandbox" hidden></div>' +
          "</div>";
      default:
        return "";
    }
  };

  var body = "";
  // Giriş alanı
  body += '<header class="lesson-hero">' +
    '<canvas class="lesson-hero__waves" aria-hidden="true"></canvas>' +
    '<nav class="lesson-crumb" aria-label="Konum">' +
    '<a href="yolculuk.html" style="--i:0">' + esc(DATA.course) + "</a>" +
    '<span class="lesson-crumb__sep" style="--i:1">' + ICON.chev + "</span>" +
    '<a href="yolculuk.html#' + M.id + '" style="--i:2">Modül ' + M.no + "</a>" +
    '<span class="lesson-crumb__sep" style="--i:3">' + ICON.chev + "</span>" +
    '<span aria-current="page" style="--i:4">Ders ' + (cur.index + 1) + "</span>" +
    "</nav>" +
    '<h1 class="lesson-hero__title" data-read>' + esc(L.title) + "</h1>" +
    '<div class="hero-chips">' +
    '<span class="chip">' + ICON.list + "Ders " + (cur.index + 1) + " / " + M.lessons.length + "</span>" +
    '<span class="chip">' + ICON.clock + L.minutes + " dk okuma</span>" +
    '<span class="chip">' + ICON.term + "Modül " + pad2(M.no) + " · " + esc(M.title) + "</span>" +
    "</div></header>";

  // Dinleme oynatıcısı (listen.js doldurur)
  body += '<section class="listen" id="listen" aria-label="Okumak yerine dinle"></section>';

  body += '<article class="lesson-body" id="lesson-body">';
  (L.intro || []).forEach(function (p) { body += '<p class="lesson-intro" data-read>' + p + "</p>"; });
  (L.blocks || []).forEach(function (b) { body += renderBlock(b); });

  if (L.trouble && L.trouble.length) {
    toc.push({ id: "calismadiysa", text: "Çalışmadıysa" });
    body += '<section class="trouble" id="calismadiysa"><h2 class="lesson-h" data-read>Çalışmadıysa</h2>' +
      L.trouble.map(function (t) {
        return '<details class="trouble__item"><summary>' + ICON.help + "<span>" + esc(t.q) + "</span>" +
          ICON.chev.replace("<svg ", '<svg class="trouble__chev" ') + "</summary><p>" + t.a + "</p></details>";
      }).join("") + "</section>";
  }

  if (L.have && L.have.length) {
    toc.push({ id: "elinde", text: "Şimdi elinde ne var" });
    body += '<section class="have" id="elinde"><h2 class="lesson-h" data-read>Şimdi elinde ne var</h2><ul>' +
      L.have.map(function (h) { return "<li data-read>" + '<span class="have__check">' + ICON.check + "</span><span>" + h + "</span></li>"; }).join("") +
      "</ul></section>";
  }

  if (L.note) {
    body += '<aside class="my-note" data-read><span class="my-note__label">' + ICON.note + "Benim notum</span><p>" + L.note + "</p></aside>";
  }

  if (L.next) {
    body += '<p class="lesson-next" data-read>' + L.next + "</p>";
  }
  body += "</article>";

  // Önceki / sonraki
  var navCard = function (item, dir) {
    if (!item) return '<span class="pager__empty"></span>';
    var l = item.lesson;
    var label = dir === "prev" ? "Önceki ders" : "Sonraki ders";
    var where = "Modül " + item.module.no + " · Ders " + (item.index + 1);
    return '<a class="pager__card pager__card--' + dir + '" href="' + lessonHref(l) + '">' +
      (dir === "prev" ? '<span class="pager__arrow">' + ICON.left + "</span>" : "") +
      '<span class="pager__text"><small>' + label + " · " + where + "</small><strong>" + esc(l.title) + "</strong>" +
      (l.ready ? "" : '<em>Özeti yolculuk sayfasında</em>') + "</span>" +
      (dir === "next" ? '<span class="pager__arrow">' + ICON.right + "</span>" : "") +
      "</a>";
  };
  body += '<nav class="pager" aria-label="Dersler arası geçiş">' + navCard(prev, "prev") + navCard(next, "next") + "</nav>";

  main.innerHTML = body;

  /* ---------- Sağ kart: Bu derste ---------- */
  var tocCard = document.querySelector(".rail-card--toc");
  var tocList = document.getElementById("lesson-toc");
  if (tocCard && tocList && toc.length) {
    tocList.innerHTML = toc.map(function (t) {
      return '<li><a href="#' + t.id + '">' + esc(t.text) + "</a></li>";
    }).join("");
    tocCard.hidden = false;

    // Okunan bölümü işaretle
    var tocLinks = tocList.querySelectorAll("a");
    var heads = toc.map(function (t) { return document.getElementById(t.id); });
    var syncToc = function () {
      var line = (parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 88) + 40;
      var active = -1;
      heads.forEach(function (h, k) { if (h && h.getBoundingClientRect().top - line <= 0) active = k; });
      tocLinks.forEach(function (a, k) { a.parentElement.classList.toggle("is-active", k === active); });
    };
    var tick = false;
    window.addEventListener("scroll", function () {
      if (tick) return;
      tick = true;
      requestAnimationFrame(function () { syncToc(); tick = false; });
    }, { passive: true });
    syncToc();
  }

  /* ---------- Bildirim (toast) ---------- */
  var toastEl = document.getElementById("toast");
  var toastTimer = null;
  var toast = function (msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.hidden = false;
    toastEl.classList.remove("is-out");
    window.clearTimeout(toastTimer);
    toastTimer = window.setTimeout(function () {
      toastEl.classList.add("is-out");
      window.setTimeout(function () { toastEl.hidden = true; }, 300);
    }, 4200);
  };

  var copyText = function (text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return fallbackCopy(text); });
    }
    return Promise.resolve(fallbackCopy(text));
  };
  var fallbackCopy = function (text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.setAttribute("readonly", "");
    ta.style.position = "fixed";
    ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    var ok = false;
    try { ok = document.execCommand("copy"); } catch (e) { ok = false; }
    document.body.removeChild(ta);
    return ok;
  };

  // Kopyala düğmeleri
  main.addEventListener("click", function (e) {
    var btn = e.target.closest(".copy-btn");
    if (!btn) return;
    copyText(btn.getAttribute("data-copy")).then(function (ok) {
      var span = btn.querySelector("span");
      if (span) span.textContent = ok ? "Kopyalandı" : "Kopyalanamadı";
      btn.classList.toggle("is-done", ok);
      window.setTimeout(function () {
        if (span) span.textContent = "Kopyala";
        btn.classList.remove("is-done");
      }, 1600);
    });
  });

  // Claude'da aç: istek panoya kopyalanır ve claude.ai yeni sekmede açılır
  main.addEventListener("click", function (e) {
    var btn = e.target.closest(".practice__claude");
    if (!btn || !L.prompt) return;
    var url = "https://claude.ai/new?q=" + encodeURIComponent(L.prompt);
    var win = window.open(url, "_blank", "noopener");
    copyText(L.prompt).then(function (ok) {
      toast(ok
        ? "Örnek istek panoya kopyalandı. Claude'da alan boş gelirse yapıştır (Ctrl+V)."
        : "claude.ai yeni sekmede açıldı. Alan boş gelirse isteği kendin yaz.");
    });
    if (!win) toast("Açılır pencere engellendi. claude.ai adresini kendin açabilirsin; istek panoya kopyalandı.");
  });

  /* ---------- Giriş alanı: hareketli dalgalar ---------- */
  var canvas = main.querySelector(".lesson-hero__waves");
  if (canvas && canvas.getContext) {
    var ctx = canvas.getContext("2d");
    var hero = canvas.parentElement;
    var w = 0, h = 0, dpr = 1, color = "#e8622c", visible = true, raf = 0, t0 = performance.now();

    var readColor = function () {
      color = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim() || "#e8622c";
    };
    var size = function () {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = hero.clientWidth;
      h = hero.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    var draw = function (t) {
      ctx.clearRect(0, 0, w, h);
      ctx.strokeStyle = color;
      ctx.lineWidth = 1;
      var lines = 9;
      for (var k = 0; k < lines; k++) {
        var base = h * (0.38 + k * 0.065);
        var amp = 10 + k * 2.2;
        var speed = 0.00022 + k * 0.00003;
        ctx.globalAlpha = 0.1 + 0.06 * (lines - k) / lines;
        ctx.beginPath();
        for (var x = w * 0.28; x <= w + 10; x += 8) {
          var y = base +
            Math.sin(x * 0.006 + t * speed * 6 + k * 0.6) * amp +
            Math.sin(x * 0.013 - t * speed * 4 + k) * amp * 0.45;
          if (x === w * 0.28) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    };
    var loop = function (now) {
      draw(now - t0);
      if (visible && !reduceMotion) raf = requestAnimationFrame(loop);
    };
    readColor();
    size();
    draw(0);
    if (!reduceMotion) raf = requestAnimationFrame(loop);

    window.addEventListener("resize", function () { size(); draw(performance.now() - t0); });
    new MutationObserver(function () { readColor(); draw(performance.now() - t0); })
      .observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    if ("IntersectionObserver" in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
        cancelAnimationFrame(raf);
        if (visible && !reduceMotion) raf = requestAnimationFrame(loop);
      }).observe(hero);
    }
  }

  /* Diğer betikler için paylaşılan bilgiler */
  window.ORVENA_LESSON = { lesson: L, module: M, toast: toast, copy: copyText };
})();
