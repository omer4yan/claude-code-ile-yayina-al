/* =========================================================
   Ders sayfası (ders.html?id=m1-d1) ve Öğrenme Yolculuğum genel bakışı (kimliksiz ders.html)
   Ders verisini (window.ORVENA_LESSONS) okuyup sayfayı üretir:
   giriş alanı, ders gövdesi, müfredat, "Bu modülde", "Bu derste",
   önceki/sonraki dersler. Sandbox ve dinleme ayrı dosyalarda.
   ========================================================= */
(function () {
  "use strict";

  var DATA = window.ORVENA_LESSONS;
  var main = document.getElementById("ana-icerik");
  if (!DATA || !main) return;

  var reduceMotion = false; // animasyonlar "hareketi azalt" ayarından bağımsız (kullanıcı isteği)

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

  /* ---------- Arayüz metinleri: <html lang> değerine göre ---------- */
  var isEn = (document.documentElement.getAttribute("lang") || "").toLowerCase().indexOf("en") === 0;
  var T = isEn ? {
    module: "Module", lesson: "Lesson", lessons: "lessons", minRead: "min read",
    toggle: "Show or hide lessons", launch: "Launch day", launchDate: "6 Nov",
    copy: "Copy", copyCmd: "Copy command", copied: "Copied", copyFail: "Couldn't copy",
    expect: "You should see", example: "Example",
    practice: "Practice", practiceText: "Try the commands in a simulated terminal in your browser, or talk this topic through with Claude.",
    openSb: "Open sandbox", openClaude: "Open in Claude",
    crumb: "Location", listen: "Listen instead of reading",
    trouble: "If it didn't work", have: "What you have now", note: "My note",
    prev: "Previous lesson", next: "Next lesson", afterCourse: "After the course", pager: "Move between lessons",
    descTpl: function (m, d, t) { return "Module " + m + ", Lesson " + d + ": " + t + ". My lesson notes from the 'Claude Code ile Yayına Al' course."; },
    overview: "Overview", ovTitle: "My Learning Journey", onPage: "On this page", modules: "modules",
    ovIntro: "I gathered what I learned in the 'Claude Code ile Yayına Al' course into 7 modules and 40 lesson pages. Pick a module and start with its first lesson.",
    ovDesc: "My Learning Journey: an overview of the 7 modules and 40 lesson pages of the 'Claude Code ile Yayına Al' course.",
    startModule: "Start the module", openPage: "Open the page", min: "min", lessonsOf: "Lessons in this module",
    toastOk: "Example prompt copied to the clipboard. If the box in Claude is empty, paste it (Ctrl+V).",
    toastOpen: "claude.ai opened in a new tab. If the box is empty, type the prompt yourself.",
    toastBlocked: "The pop-up was blocked. You can open claude.ai yourself; the prompt is on your clipboard."
  } : {
    module: "Modül", lesson: "Ders", lessons: "ders", minRead: "dk okuma",
    toggle: "Dersleri göster veya gizle", launch: "Yayın günü", launchDate: "6 Kasım",
    copy: "Kopyala", copyCmd: "Komutu kopyala", copied: "Kopyalandı", copyFail: "Kopyalanamadı",
    expect: "Şunu görmelisin", example: "Örnek",
    practice: "Pratik", practiceText: "Komutları tarayıcıdaki simüle terminalde dene ya da bu konuyu Claude ile konuş.",
    openSb: "Sandbox'ı aç", openClaude: "Claude'da aç",
    crumb: "Konum", listen: "Okumak yerine dinle",
    trouble: "Çalışmadıysa", have: "Şimdi elinde ne var", note: "Benim notum",
    prev: "Önceki ders", next: "Sonraki ders", afterCourse: "Kursun ardından", pager: "Dersler arası geçiş",
    descTpl: function (m, d, t) { return "Modül " + m + ", Ders " + d + ": " + t + ". 'Claude Code ile Yayına Al' kursunun ders notlarım."; },
    overview: "Genel bakış", ovTitle: "Öğrenme Yolculuğum", onPage: "Bu sayfada", modules: "modül",
    ovIntro: "'Claude Code ile Yayına Al' kursunda öğrendiklerimi 7 modül ve 40 ders sayfasında topladım. Bir modül seç ve ilk dersinden başla.",
    ovDesc: "Öğrenme Yolculuğum: 'Claude Code ile Yayına Al' kursunun 7 modülüne ve 40 ders sayfasına genel bakış.",
    startModule: "Modüle başla", openPage: "Sayfayı aç", min: "dk", lessonsOf: "Bu modülün dersleri",
    toastOk: "Örnek istek panoya kopyalandı. Claude'da alan boş gelirse yapıştır (Ctrl+V).",
    toastOpen: "claude.ai yeni sekmede açıldı. Alan boş gelirse isteği kendin yaz.",
    toastBlocked: "Açılır pencere engellendi. claude.ai adresini kendin açabilirsin; istek panoya kopyalandı."
  };

  /* ---------- Ders listesi ve geçerli ders ---------- */
  var all = [];
  DATA.modules.forEach(function (m) {
    m.lessons.forEach(function (l, i) {
      all.push({ lesson: l, module: m, index: i });
    });
  });
  // "Yayın günü": modüllerden sonra gelen ek sayfa (modülü yok)
  if (DATA.launch) all.push({ lesson: DATA.launch, module: null, index: 0 });

  var lessonHref = function (l) {
    return "ders.html?id=" + l.id;
  };
  // Ders sayfasında bir modül bağlantısı o modülün ilk dersine gider
  var moduleHref = function (m) {
    return lessonHref(m.lessons[0]);
  };

  // Kimliksiz ders.html: Öğrenme Yolculuğum genel bakış sayfası
  var OVERVIEW_HREF = "ders.html";
  var params = new URLSearchParams(location.search);
  var id = params.get("id");
  var overview = !id;
  var pos = -1;
  if (!overview) {
    for (var i = 0; i < all.length; i++) if (all[i].lesson.id === id) pos = i;
    if (pos < 0) {
      // Bilinmeyen ders: genel bakışa git
      location.replace(OVERVIEW_HREF);
      return;
    }
  }

  var cur = overview ? null : all[pos];
  var L = overview ? null : cur.lesson;
  var M = overview ? null : cur.module;
  var prev = overview ? null : all[pos - 1] || null;
  var next = overview ? null : all[pos + 1] || null;

  /* ---------- Başlık, dil bağlantıları ---------- */
  var desc = document.querySelector('meta[name="description"]');
  if (overview) {
    document.title = T.ovTitle + " · Orvena";
    if (desc) desc.setAttribute("content", T.ovDesc);
  } else {
    document.title = M ? L.title + " — " + T.module + " " + M.no + " · Orvena" : L.title + " · Orvena";
    if (desc) desc.setAttribute("content", M ? T.descTpl(M.no, cur.index + 1, L.title) : L.desc || L.title);
  }

  // Dil bağlantıları aynı sayfanın diğer dildeki karşılığına gider
  var query = overview ? "" : "?id=" + L.id;
  var otherHref = (isEn ? "../ders.html" : "en/ders.html") + query;
  ["lang-link", "footer-other"].forEach(function (k) {
    var a = document.getElementById(k);
    if (a) a.setAttribute("href", otherHref);
  });
  var selfLink = document.getElementById("footer-self");
  if (selfLink) selfLink.setAttribute("href", "ders.html" + query);

  /* ---------- Müfredat ---------- */
  var curList = document.getElementById("lesson-curriculum");
  if (curList) {
    // En üstte genel bakış bağlantısı
    var html = '<div class="cur-module cur-extra cur-overview' + (overview ? " is-active" : "") + '"><a class="cur-module__head" href="' + OVERVIEW_HREF + '"' + (overview ? ' aria-current="page"' : "") + ">" +
      '<span class="cur-badge">' + ICON.list + '</span><span class="cur-module__name">' + T.overview + '</span><span class="cur-module__count">' + DATA.modules.length + " " + T.modules + "</span></a></div>";
    DATA.modules.forEach(function (m) {
      var open = !!M && m.id === M.id;
      html += '<div class="cur-module' + (open ? " is-active" : " is-collapsed") + '" data-module="' + m.id + '"' + (open ? " data-open" : "") + ">" +
        '<div class="cur-module__head cur-module__head--split">' +
        '<a class="cur-module__link" href="' + moduleHref(m) + '">' +
        '<span class="cur-badge">' + pad2(m.no) + "</span>" +
        '<span class="cur-module__name">' + esc(m.title) + "</span>" +
        '<span class="cur-module__count">' + m.lessons.length + " " + T.lessons + "</span></a>" +
        '<button class="cur-module__toggle" type="button" aria-expanded="' + open + '" aria-controls="cur-' + m.id + '" aria-label="' + T.toggle + '">' +
        ICON.chev.replace("<svg ", '<svg class="cur-module__chev" ') + "</button></div>" +
        '<div class="cur-lessons-wrap" id="cur-' + m.id + '"><ul class="cur-lessons">';
      m.lessons.forEach(function (l) {
        var active = !!L && l.id === L.id;
        html += "<li" + (active ? ' class="is-active"' : "") + '><a href="' + lessonHref(l) + '"' +
          (active ? ' aria-current="page"' : "") + ">" + esc(l.title) + "</a></li>";
      });
      html += "</ul></div></div>";
    });
    var onLaunch = !overview && !M;
    html += '<div class="cur-module cur-extra' + (onLaunch ? " is-active" : "") + '" data-module="yayin-gunu"><a class="cur-module__head" href="ders.html?id=yayin-gunu"' + (onLaunch ? ' aria-current="page"' : "") + ">" +
      '<span class="cur-badge">★</span><span class="cur-module__name">' + T.launch + '</span><span class="cur-module__count">' + T.launchDate + "</span></a></div>";
    curList.innerHTML = html;
  }

  /* ---------- Sağ kart: Bu modülde ---------- */
  var railCard = document.querySelector(".rail-card--module");
  var railName = document.getElementById("rail-module-name");
  var railList = document.getElementById("rail-lessons");
  if (railCard && railName && railList && M) {
    railName.innerHTML = '<a href="' + moduleHref(M) + '">' + esc(M.title) + "</a>";
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
    return '<button class="copy-btn" type="button" data-copy="' + esc(text) + '" aria-label="' + (label || T.copy) + '">' + ICON.copy + "<span>" + T.copy + "</span></button>";
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
          '<div class="cmd__row"><pre><code><span class="prompt" aria-hidden="true">$ </span>' + esc(b.code) + "</code></pre>" + copyBtn(b.code, T.copyCmd) + "</div>" +
          (b.expect ? '<div class="cmd__expect"><span class="cmd__label">' + T.expect + "</span><pre>" + esc(b.expect) + "</pre></div>" : "") +
          "</figure>";
      case "code":
        return '<figure class="cmd cmd--code">' +
          '<figcaption class="cmd__cap"><span>' + esc(b.label || T.example) + "</span>" + copyBtn(b.code) + "</figcaption>" +
          "<pre><code>" + esc(b.code) + "</code></pre></figure>";
      case "diff":
        return '<figure class="cmd cmd--diff">' +
          '<figcaption class="cmd__cap"><span>' + esc(b.label || "Diff") + "</span></figcaption><pre><code>" +
          b.lines.map(function (ln) {
            var cls = ln.charAt(0) === "-" ? "d-del" : ln.charAt(0) === "+" ? "d-add" : "d-ctx";
            return '<span class="' + cls + '">' + esc(ln) + "</span>";
          }).join("") + "</code></pre></figure>";
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
      case "timeline":
        return '<ol class="timeline">' + b.items.map(function (x, k) {
          var last = k === b.items.length - 1 && b.live;
          return "<li" + (last ? ' class="is-live"' : "") + ' data-read><span class="timeline__dot">' + (last ? "✓" : k + 1) + "</span><strong>" +
            esc(x.title) + "</strong><p>" + x.html + "</p></li>";
        }).join("") + "</ol>";
      case "practice":
        return '<div class="practice" data-practice>' +
          '<div class="practice__bar">' +
          '<div class="practice__text"><strong>' + T.practice + "</strong><span>" + T.practiceText + "</span></div>" +
          '<div class="practice__actions">' +
          '<button class="btn btn--primary practice__open" type="button" aria-expanded="false">' + ICON.term + "<span>" + T.openSb + "</span></button>" +
          '<button class="btn btn--ghost practice__claude" type="button">' + ICON.spark + "<span>" + T.openClaude + "</span></button>" +
          "</div></div>" +
          '<div class="sandbox" hidden></div>' +
          "</div>";
      default:
        return "";
    }
  };

  /* ---------- Genel bakış: modül kartları ---------- */
  var renderOverview = function () {
    var MODS = window.ORVENA_MODULES || [];
    var base = isEn ? "../" : "";
    var lessonCount = 0, minutes = 0;
    DATA.modules.forEach(function (m) {
      lessonCount += m.lessons.length;
      m.lessons.forEach(function (l) { minutes += l.minutes || 0; });
    });

    var out = '<header class="lesson-hero">' +
      '<canvas class="lesson-hero__waves" aria-hidden="true"></canvas>' +
      '<nav class="lesson-crumb" aria-label="' + T.crumb + '">' +
      '<span style="--i:0">' + esc(DATA.course) + "</span>" +
      '<span class="lesson-crumb__sep" style="--i:1">' + ICON.chev + "</span>" +
      '<span aria-current="page" style="--i:2">' + T.overview + "</span></nav>" +
      '<h1 class="lesson-hero__title">' + T.ovTitle + "</h1>" +
      '<div class="hero-chips">' +
      '<span class="chip">' + ICON.term + DATA.modules.length + " " + T.modules + "</span>" +
      '<span class="chip">' + ICON.list + lessonCount + " " + T.lessons + "</span>" +
      '<span class="chip">' + ICON.clock + minutes + " " + T.minRead + "</span>" +
      "</div></header>";

    out += '<article class="lesson-body ov" id="lesson-body">';
    out += '<p class="lesson-intro">' + esc(T.ovIntro) + "</p>";

    DATA.modules.forEach(function (m) {
      var meta = null;
      for (var k = 0; k < MODS.length; k++) if (MODS[k].no === m.no) meta = MODS[k];
      var tx = meta ? meta[isEn ? "en" : "tr"] || meta.tr : null;
      var mins = 0;
      m.lessons.forEach(function (l) { mins += l.minutes || 0; });
      toc.push({ id: m.id, text: pad2(m.no) + " · " + m.title });

      out += '<section class="ov-module" id="' + m.id + '" aria-labelledby="' + m.id + '-t">' +
        '<div class="ov-module__head">' +
        (meta && meta.cover ? '<img class="ov-module__cover" src="' + base + meta.cover + '" alt="" width="640" height="400" loading="lazy" decoding="async">' : "") +
        '<div class="ov-module__text">' +
        '<p class="ov-module__no">' + T.module + " " + pad2(m.no) + "</p>" +
        '<h2 class="ov-module__title" id="' + m.id + '-t"><a href="' + moduleHref(m) + '">' + esc(m.title) + "</a></h2>" +
        (m.sub ? '<p class="ov-module__sub">' + esc(m.sub) + "</p>" : "") +
        (tx && tx.description ? '<p class="ov-module__desc">' + esc(tx.description) + "</p>" : "") +
        '<p class="ov-module__meta">' + ICON.list + m.lessons.length + " " + T.lessons +
        '<span aria-hidden="true">·</span>' + ICON.clock + "≈" + mins + " " + T.min + "</p>" +
        "</div></div>" +
        '<ol class="ov-lessons" aria-label="' + T.lessonsOf + '">' +
        m.lessons.map(function (l, j) {
          return '<li><a href="' + lessonHref(l) + '"><span class="ov-lessons__n">' + (j + 1) + "</span>" +
            '<span class="ov-lessons__title">' + esc(l.title) + "</span>" +
            (l.minutes ? '<span class="ov-lessons__min">' + l.minutes + " " + T.min + "</span>" : "") +
            ICON.chev + "</a></li>";
        }).join("") + "</ol>" +
        '<a class="btn btn--primary ov-module__start" href="' + moduleHref(m) + '">' + T.startModule + ICON.right + "</a>" +
        "</section>";
    });

    if (DATA.launch) {
      var Lc = DATA.launch;
      toc.push({ id: "yayin-gunu", text: T.launch });
      out += '<section class="ov-module ov-module--launch" id="yayin-gunu" aria-labelledby="yayin-gunu-t">' +
        '<div class="ov-module__text">' +
        '<p class="ov-module__no">' + T.afterCourse + "</p>" +
        '<h2 class="ov-module__title" id="yayin-gunu-t"><a href="' + lessonHref(Lc) + '">' + esc(Lc.title) + "</a></h2>" +
        (Lc.sub ? '<p class="ov-module__sub">' + esc(Lc.sub) + "</p>" : "") +
        "</div>" +
        '<a class="btn btn--ghost ov-module__start" href="' + lessonHref(Lc) + '">' + T.openPage + ICON.right + "</a>" +
        "</section>";
    }
    out += "</article>";
    return out;
  };

  var body = "";
  if (overview) body = renderOverview();
  else {
  // Giriş alanı
  body += '<header class="lesson-hero">' +
    '<canvas class="lesson-hero__waves" aria-hidden="true"></canvas>' +
    '<nav class="lesson-crumb" aria-label="' + T.crumb + '">' +
    '<a href="' + OVERVIEW_HREF + '" style="--i:0">' + esc(DATA.course) + "</a>" +
    '<span class="lesson-crumb__sep" style="--i:1">' + ICON.chev + "</span>" +
    (M
      ? '<a href="' + moduleHref(M) + '" style="--i:2">' + T.module + " " + M.no + "</a>" +
        '<span class="lesson-crumb__sep" style="--i:3">' + ICON.chev + "</span>" +
        '<span aria-current="page" style="--i:4">' + T.lesson + " " + (cur.index + 1) + "</span>"
      : '<span aria-current="page" style="--i:2">' + T.launch + "</span>") +
    "</nav>" +
    '<h1 class="lesson-hero__title" data-read>' + esc(L.title) + "</h1>" +
    (L.sub ? '<p class="lesson-hero__sub" data-read>' + esc(L.sub) + "</p>" : "") +
    '<div class="hero-chips">' +
    (M
      ? '<span class="chip">' + ICON.list + T.lesson + " " + (cur.index + 1) + " / " + M.lessons.length + "</span>" +
        '<span class="chip">' + ICON.clock + L.minutes + " " + T.minRead + "</span>" +
        '<span class="chip">' + ICON.term + T.module + " " + pad2(M.no) + " · " + esc(M.title) + "</span>"
      : (L.chips || []).map(function (c) { return '<span class="chip">' + esc(c) + "</span>"; }).join("")) +
    "</div></header>";

  // Dinleme oynatıcısı (listen.js doldurur)
  body += '<section class="listen" id="listen" aria-label="' + T.listen + '"></section>';

  body += '<article class="lesson-body" id="lesson-body">';
  (L.intro || []).forEach(function (p) { body += '<p class="lesson-intro" data-read>' + p + "</p>"; });
  (L.blocks || []).forEach(function (b) { body += renderBlock(b); });

  if (L.trouble && L.trouble.length) {
    toc.push({ id: "calismadiysa", text: T.trouble });
    body += '<section class="trouble" id="calismadiysa"><h2 class="lesson-h" data-read>' + T.trouble + "</h2>" +
      L.trouble.map(function (t) {
        return '<details class="trouble__item"><summary>' + ICON.help + "<span>" + esc(t.q) + "</span>" +
          ICON.chev.replace("<svg ", '<svg class="trouble__chev" ') + "</summary><p>" + t.a + "</p></details>";
      }).join("") + "</section>";
  }

  if (L.have && L.have.length) {
    toc.push({ id: "elinde", text: T.have });
    body += '<section class="have" id="elinde"><h2 class="lesson-h" data-read>' + T.have + "</h2><ul>" +
      L.have.map(function (h) { return "<li data-read>" + '<span class="have__check">' + ICON.check + "</span><span>" + h + "</span></li>"; }).join("") +
      "</ul></section>";
  }

  if (L.note) {
    body += '<aside class="my-note" data-read><span class="my-note__label">' + ICON.note + T.note + "</span><p>" + L.note + "</p></aside>";
  }

  if (L.next) {
    body += '<p class="lesson-next" data-read>' + L.next + "</p>";
  }
  body += "</article>";

  // Önceki / sonraki
  var navCard = function (item, dir) {
    if (!item) return '<span class="pager__empty"></span>';
    var l = item.lesson;
    var label = dir === "prev" ? T.prev : T.next;
    var where = item.module ? T.module + " " + item.module.no + " · " + T.lesson + " " + (item.index + 1) : T.afterCourse;
    return '<a class="pager__card pager__card--' + dir + '" href="' + lessonHref(l) + '">' +
      (dir === "prev" ? '<span class="pager__arrow">' + ICON.left + "</span>" : "") +
      '<span class="pager__text"><small>' + label + " · " + where + "</small><strong>" + esc(l.title) + "</strong></span>" +
      (dir === "next" ? '<span class="pager__arrow">' + ICON.right + "</span>" : "") +
      "</a>";
  };
  body += '<nav class="pager" aria-label="' + T.pager + '">' + navCard(prev, "prev") + navCard(next, "next") + "</nav>";
  }

  main.innerHTML = body;

  // Genel bakış #m3 gibi bir adresle açıldıysa o modüle kay (içerik betikle üretildiği için)
  if (overview && location.hash.length > 1) {
    var target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (target) {
      var jump = function () { target.scrollIntoView({ block: "start", behavior: "instant" }); };
      jump();
      window.addEventListener("load", jump, { once: true }); // görseller yüklenince yer değişebilir
    }
  }

  /* ---------- Sağ kart: Bu derste / Bu sayfada ---------- */
  var tocCard = document.querySelector(".rail-card--toc");
  var tocList = document.getElementById("lesson-toc");
  if (tocCard && tocList && toc.length) {
    var tocTitle = tocCard.querySelector("h2");
    if (overview && tocTitle) tocTitle.textContent = T.onPage;
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
      if (span) span.textContent = ok ? T.copied : T.copyFail;
      btn.classList.toggle("is-done", ok);
      window.setTimeout(function () {
        if (span) span.textContent = T.copy;
        btn.classList.remove("is-done");
      }, 1600);
    });
  });

  // Claude'da aç: istek panoya kopyalanır ve claude.ai yeni sekmede açılır
  main.addEventListener("click", function (e) {
    var btn = e.target.closest(".practice__claude");
    if (!btn || !L || !L.prompt) return;
    var url = "https://claude.ai/new?q=" + encodeURIComponent(L.prompt);
    var win = window.open(url, "_blank", "noopener");
    copyText(L.prompt).then(function (ok) {
      toast(ok ? T.toastOk : T.toastOpen);
    });
    if (!win) toast(T.toastBlocked);
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

  /* Diğer betikler için paylaşılan bilgiler (genel bakışta yok: sandbox ve dinleme çalışmaz) */
  if (!overview) window.ORVENA_LESSON = { lesson: L, module: M, isEn: isEn, toast: toast, copy: copyText };
})();
