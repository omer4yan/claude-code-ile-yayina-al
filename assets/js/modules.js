/* =========================================================
   Eğitim Modülleri — tek veri kaynağı + kart bileşeni + carousel
   ---------------------------------------------------------
   İçeriği değiştirmek için yalnızca MODULES dizisini düzenle.
   - lessons: ders sayısı (ders notlarındaki ders sayısı)
   - minutes: ders notlarındaki okuma sürelerinin toplamı (dk)
   - Bilinmeyen bir alanı null bırak; kartta o satır gösterilmez.
   - progress: gerçek ilerleme verisi varsa { done: 3, total: 6 } yaz.
     null ise kart "Modüle başla" der ve ilerleme göstermez
     (sahte ilerleme üretilmez).
   ========================================================= */
(function () {
  "use strict";

  var MODULES = [
    {
      no: 1,
      title: "Claude Code'u kur",
      highlight: "Terminalde ilk adımlar",
      description: "Terminalle tanıştım; Claude'dan ilk dosyamı isteyip sonucu kendim kontrol etmeyi, bir şey ters gittiğinde durdurup geri almayı öğrendim.",
      lessons: 6,
      minutes: 34,
      href: "yolculuk.html#m1",
      cover: "assets/img/modules/m1.svg",
      progress: null
    },
    {
      no: 2,
      title: "İlk prompt'un",
      highlight: "Nerede, ne ve neden",
      description: "Claude Code'u kendi bilgisayarıma kurdum; tek bir cümleyle ilk web sayfamı oluşturdum ve açık, net istekler yazmayı öğrendim.",
      lessons: 6,
      minutes: 31,
      href: "yolculuk.html#m2",
      cover: "assets/img/modules/m2.svg",
      progress: null
    },
    {
      no: 3,
      title: "Tek dosyada düzenlemeler",
      highlight: "İste, diff'i oku, kontrol et",
      description: "Önerilen değişiklikleri diff üzerinden okumayı, kabul etmeyi ya da düzeltmeyi; değiştirmeden önce açıklama istemeyi öğrendim.",
      lessons: 5,
      minutes: 17,
      href: "yolculuk.html#m3",
      cover: "assets/img/modules/m3.svg",
      progress: null
    },
    {
      no: 4,
      title: "Çok sayfalı bir site kur",
      highlight: "Önce planla, sonra değiştir",
      description: "Birden fazla sayfayı etkileyen değişiklikleri önce planlayıp küçük adımlarla uygulamayı ve siteyi bir ziyaretçi gözüyle gözden geçirmeyi öğrendim.",
      lessons: 5,
      minutes: 14,
      href: "yolculuk.html#m4",
      cover: "assets/img/modules/m4.svg",
      progress: null
    },
    {
      no: 5,
      title: "İlk projeni yayına alma",
      highlight: "Yerel dosyadan herkese açık adrese",
      description: "Git'in temel komutlarını, bir siteyi barındırıcıya bağlamayı, sırları depodan uzak tutmayı ve alan adı ile HTTPS'in nasıl çalıştığını öğrendim.",
      lessons: 6,
      minutes: 11,
      href: "yolculuk.html#m5",
      cover: "assets/img/modules/m5.svg",
      progress: null
    },
    {
      no: 6,
      title: "Hooks, MCP ve iş akışı",
      highlight: "Tekrarı doğru yere taşı",
      description: "CLAUDE.md, özel komutlar, subagent'lar, hook'lar, MCP ve Agent SDK'yı tanıdım; kendi işlerimde kullanmayı denemeye devam ediyorum.",
      lessons: 6,
      minutes: 11,
      href: "yolculuk.html#m6",
      cover: "assets/img/modules/m6.svg",
      progress: null
    },
    {
      no: 7,
      title: "Bitirme projesi: kendi siteni yayınla",
      highlight: "Planla, inşa et, yayınla",
      description: "Kendi küçük sitemi planlamayı, gerçek içerikle doldurmayı, iletişim yolu eklemeyi ve yayından önce son kontrolleri yapmayı öğrendim.",
      lessons: 6,
      minutes: 15,
      href: "yolculuk.html#m7",
      cover: "assets/img/modules/m7.svg",
      progress: null
    }
  ];

  var pad = function (n) {
    return n < 10 ? "0" + n : String(n);
  };

  var el = function (tag, className, text) {
    var node = document.createElement(tag);
    if (className) node.className = className;
    if (text != null) node.textContent = text;
    return node;
  };

  var svgIcon = function (paths) {
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("viewBox", "0 0 24 24");
    svg.setAttribute("fill", "none");
    svg.setAttribute("stroke", "currentColor");
    svg.setAttribute("stroke-width", "1.8");
    svg.setAttribute("stroke-linecap", "round");
    svg.setAttribute("stroke-linejoin", "round");
    svg.setAttribute("aria-hidden", "true");
    paths.forEach(function (d) {
      var p = document.createElementNS(ns, "path");
      p.setAttribute("d", d);
      svg.appendChild(p);
    });
    return svg;
  };

  var ICON_BOOK = ["M2 5.5A1.5 1.5 0 0 1 3.5 4H9a3 3 0 0 1 3 3v13a2 2 0 0 0-2-2H3.5A1.5 1.5 0 0 1 2 16.5z", "M22 5.5A1.5 1.5 0 0 0 20.5 4H15a3 3 0 0 0-3 3v13a2 2 0 0 1 2-2h6.5a1.5 1.5 0 0 0 1.5-1.5z"];
  var ICON_CLOCK = ["M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18z", "M12 7v5l3 2"];
  var ICON_ARROW = ["M5 12h14", "M13 6l6 6-6 6"];

  /* Kart bileşeni: tek bir modül nesnesinden bir <li> üretir */
  var createModuleCard = function (m, index, total) {
    var li = el("li", "carousel__slide");
    li.setAttribute("role", "group");
    li.setAttribute("aria-roledescription", "slayt");
    li.setAttribute("aria-label", total + " modülden " + (index + 1) + ".: " + m.title);

    var card = el("article", "mcard");

    var cover = el("div", "mcard__cover");
    if (m.cover) {
      var img = el("img");
      img.src = m.cover;
      img.alt = "";
      img.width = 640;
      img.height = 400;
      img.loading = index < 3 ? "eager" : "lazy";
      img.decoding = "async";
      cover.appendChild(img);
    }
    card.appendChild(cover);

    var body = el("div", "mcard__body");
    body.appendChild(el("p", "mcard__no", "Modül " + pad(m.no)));

    var h3 = el("h3", "mcard__title");
    var link = el("a", "mcard__link", m.title);
    link.href = m.href || "yolculuk.html";
    h3.appendChild(link);
    body.appendChild(h3);

    if (m.highlight) body.appendChild(el("p", "mcard__highlight", m.highlight));
    if (m.description) body.appendChild(el("p", "mcard__desc", m.description));

    var meta = el("ul", "mcard__meta");
    meta.setAttribute("aria-label", "Modül bilgileri");
    if (m.lessons != null) {
      var l1 = el("li");
      l1.appendChild(svgIcon(ICON_BOOK));
      l1.appendChild(document.createTextNode(m.lessons + " ders"));
      meta.appendChild(l1);
    }
    if (m.minutes != null) {
      var l2 = el("li");
      l2.appendChild(svgIcon(ICON_CLOCK));
      l2.appendChild(document.createTextNode("≈" + m.minutes + " dk"));
      l2.setAttribute("title", "Ders notlarındaki tahmini okuma süresi");
      meta.appendChild(l2);
    }
    body.appendChild(meta);

    var foot = el("div", "mcard__foot");
    var hasProgress = m.progress && m.progress.total > 0;
    foot.appendChild(el("span", "mcard__cta", hasProgress ? "Devam et" : "Modüle başla"));
    var right = el("span", "mcard__foot-end");
    if (hasProgress) {
      var prog = el("span", "mcard__progress", m.progress.done + " / " + m.progress.total);
      prog.setAttribute("aria-label", m.progress.total + " dersten " + m.progress.done + " tamamlandı");
      right.appendChild(prog);
    }
    right.appendChild(svgIcon(ICON_ARROW));
    foot.appendChild(right);
    foot.setAttribute("aria-hidden", "true");
    body.appendChild(foot);

    card.appendChild(body);
    li.appendChild(card);
    return li;
  };

  /* ---------- Carousel ---------- */
  var root = document.querySelector("[data-modules-carousel]");
  if (!root) return;

  var track = root.querySelector(".carousel__track");
  var prev = root.querySelector('[data-carousel="prev"]');
  var next = root.querySelector('[data-carousel="next"]');
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  MODULES.forEach(function (m, i) {
    track.appendChild(createModuleCard(m, i, MODULES.length));
  });

  var step = function () {
    var slide = track.querySelector(".carousel__slide");
    if (!slide) return track.clientWidth;
    var gap = parseFloat(window.getComputedStyle(track).columnGap) || 0;
    return slide.getBoundingClientRect().width + gap;
  };

  var updateButtons = function () {
    var max = track.scrollWidth - track.clientWidth;
    var atStart = track.scrollLeft <= 2;
    var atEnd = track.scrollLeft >= max - 2;
    if (prev) prev.disabled = atStart;
    if (next) next.disabled = atEnd;
  };

  var go = function (dir) {
    track.scrollBy({ left: dir * step(), behavior: reduceMotion ? "auto" : "smooth" });
    updateButtons();
    window.setTimeout(updateButtons, 400);
  };

  if (prev) prev.addEventListener("click", function () { go(-1); });
  if (next) next.addEventListener("click", function () { go(1); });

  // Klavye: kaydırma alanına odaklanınca sol/sağ ok bir kart ilerletir
  track.addEventListener("keydown", function (e) {
    if (e.target !== track) return;
    if (e.key === "ArrowRight") { e.preventDefault(); go(1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); go(-1); }
    if (e.key === "Home") { e.preventDefault(); track.scrollTo({ left: 0, behavior: reduceMotion ? "auto" : "smooth" }); updateButtons(); }
    if (e.key === "End") { e.preventDefault(); track.scrollTo({ left: track.scrollWidth, behavior: reduceMotion ? "auto" : "smooth" }); updateButtons(); }
  });

  // Klavyeyle bir karta Tab ile gelindiğinde kartı görünür alana getir
  track.addEventListener("focusin", function (e) {
    var slide = e.target.closest(".carousel__slide");
    if (!slide) return;
    var t = track.getBoundingClientRect();
    var s = slide.getBoundingClientRect();
    if (s.left < t.left || s.right > t.right) {
      slide.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest", inline: "start" });
    }
  });

  // Durum hesabı çok hafif; her kaydırma olayında doğrudan güncellenir
  track.addEventListener("scroll", updateButtons, { passive: true });
  track.addEventListener("scrollend", updateButtons);
  window.addEventListener("resize", updateButtons);
  updateButtons();
})();
