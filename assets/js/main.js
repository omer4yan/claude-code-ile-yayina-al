/* Orvena — kişisel site: küçük etkileşimler (Türkçe ve İngilizce sayfalar) */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = false; // animasyonlar "hareketi azalt" ayarından bağımsız (kullanıcı isteği)

  /* ---------- Dil: metinler <html lang> değerine göre ---------- */
  var isEn = (root.getAttribute("lang") || "").toLowerCase().indexOf("en") === 0;
  var T = isEn
    ? { toLight: "Switch to light mode", toDark: "Switch to dark mode", menuOpen: "Open menu", menuClose: "Close menu" }
    : { toLight: "Aydınlık moda geç", toDark: "Karanlık moda geç", menuOpen: "Menüyü aç", menuClose: "Menüyü kapat" };

  /* ---------- Tema (karanlık / aydınlık) ----------
     İlk tema <head> içindeki kısa betikle uygulanır: kayıtlı tercih, yoksa sistem teması. */
  var themeBtn = document.querySelector(".theme-toggle");
  var themeMeta = document.querySelector('meta[name="theme-color"]');

  var applyTheme = function (theme) {
    root.setAttribute("data-theme", theme);
    if (themeMeta) themeMeta.setAttribute("content", theme === "light" ? "#f3efe7" : "#131211");
    if (themeBtn) {
      var label = theme === "light" ? T.toDark : T.toLight;
      themeBtn.setAttribute("aria-label", label);
      themeBtn.setAttribute("title", label);
    }
  };

  applyTheme(root.getAttribute("data-theme") === "light" ? "light" : "dark");

  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "light" ? "dark" : "light";
      applyTheme(next);
      try {
        localStorage.setItem("theme", next);
      } catch (e) {
        /* depolama kapalıysa tema yalnızca bu sayfada değişir */
      }
    });
  }

  /* ---------- Açılır menü (1080px ve altı) ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  var menuMq = window.matchMedia("(max-width: 1080px)");
  if (toggle && nav) {
    toggle.setAttribute("aria-label", T.menuOpen);
    var closeNav = function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", T.menuOpen);
    };
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? T.menuClose : T.menuOpen);
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
    window.addEventListener("resize", function () {
      if (!menuMq.matches) closeNav();
    });
  }

  /* ---------- Ana sayfa giriş alanı: boş yüksekliği metne dağıt ----------
     Yüksek ekranlarda harita sütun genişliğinden fazla büyüyemez; kalan yükseklik başlığın
     üstünde büyük bir boşluk olarak kalmasın diye ölçülür ve başlık/paragraf satır aralıklarına
     ve aralara paylaştırılır. Satır aralığı satır kırılmalarını değiştirmez, bu yüzden
     dağıtılan miktar hiçbir zaman ölçülen boşluğu aşmaz (taşma olmaz). */
  var hero = document.querySelector(".hero2");
  var heroCopy = hero && hero.querySelector(".hero2__copy");
  var heroTitle = hero && hero.querySelector(".hero2__title");
  var heroDesc = hero && hero.querySelector(".hero2__desc");
  if (hero && heroCopy && heroTitle && heroDesc) {
    var wide = window.matchMedia("(min-width: 1024px)");
    var setFit = function (t, d, g1, g2) {
      hero.style.setProperty("--fit-title", t + "px");
      hero.style.setProperty("--fit-desc", d + "px");
      hero.style.setProperty("--fit-gap1", g1 + "px");
      hero.style.setProperty("--fit-gap2", g2 + "px");
    };
    var lines = function (el) {
      var lh = parseFloat(window.getComputedStyle(el).lineHeight) || 1;
      return Math.max(1, Math.round(el.getBoundingClientRect().height / lh));
    };
    var fitHero = function () {
      setFit(0, 0, 0, 0);
      if (!wide.matches) return;
      var cs = window.getComputedStyle(hero);
      var avail = hero.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
      var free = avail - heroCopy.getBoundingClientRect().height;
      if (free < 8) return;
      var tl = lines(heroTitle), dl = lines(heroDesc);
      var titleFont = parseFloat(window.getComputedStyle(heroTitle).fontSize);
      var descFont = parseFloat(window.getComputedStyle(heroDesc).fontSize);
      // Paylaşım: başlık satırları %40, paragraf satırları %20, aralar %25 ve %15; ölçülü üst sınırlar
      var t = Math.min((free * 0.4) / tl, titleFont * 0.36);
      var d = Math.min((free * 0.2) / dl, descFont * 0.5);
      var g1 = Math.min(free * 0.25, 90);
      var g2 = Math.min(free * 0.15, 60);
      setFit(t.toFixed(1), d.toFixed(1), g1.toFixed(1), g2.toFixed(1));
    };
    fitHero();
    window.addEventListener("resize", fitHero);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitHero);
  }

  /* ---------- Sayfa içi bağlantılar: güvenilir kaydırma ---------- */
  var scrollToId = function (id, push) {
    var target = document.getElementById(id);
    if (!target) return false;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    if (push && history.pushState) history.pushState(null, "", "#" + id);
    return true;
  };

  document.addEventListener("click", function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var link = e.target.closest('a[href^="#"]');
    if (!link) return;
    var id = decodeURIComponent(link.getAttribute("href").slice(1));
    if (!id) return;
    if (scrollToId(id, true)) e.preventDefault();
  });

  /* ---------- Ders sayfası: müfredat ---------- */
  var curriculumBox = document.querySelector(".curriculum__box");
  if (!curriculumBox) return;

  var desktop = window.matchMedia("(min-width: 1200px)");

  // Masaüstünde müfredat hep açık; dar ekranda kapalı başlar
  var syncCurriculum = function () {
    if (desktop.matches) {
      curriculumBox.setAttribute("open", "");
    } else {
      curriculumBox.removeAttribute("open");
    }
  };
  syncCurriculum();
  if (desktop.addEventListener) desktop.addEventListener("change", syncCurriculum);

  var summary = curriculumBox.querySelector("summary");
  if (summary) {
    summary.addEventListener("click", function (e) {
      if (desktop.matches) e.preventDefault();
    });
  }

  // Müfredat modülleri açılır/kapanır; geçerli dersin modülü (data-open) açık gelir.
  var setModuleOpen = function (btn, open) {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    var mod = btn.closest(".cur-module");
    if (mod) mod.classList.toggle("is-collapsed", !open);
  };
  curriculumBox.querySelectorAll(".cur-module__toggle[aria-controls]").forEach(function (btn) {
    var mod = btn.closest(".cur-module");
    setModuleOpen(btn, !!mod && mod.hasAttribute("data-open"));
    btn.addEventListener("click", function () {
      setModuleOpen(btn, btn.getAttribute("aria-expanded") !== "true");
    });
  });

  // Modül adına tıklanınca (modülün ilk dersine giden bağlantı) o modülün dersleri de açılır
  curriculumBox.addEventListener("click", function (e) {
    var modLink = e.target.closest(".cur-module__link");
    if (!modLink) return;
    var toggleBtn = modLink.parentElement.querySelector(".cur-module__toggle");
    if (toggleBtn) setModuleOpen(toggleBtn, true);
  });

  // Dar ekranda müfredattan bir bağlantıya tıklanınca paneli kapat
  curriculumBox.addEventListener("click", function (e) {
    if (!desktop.matches && e.target.closest("a")) curriculumBox.removeAttribute("open");
  });
})();
