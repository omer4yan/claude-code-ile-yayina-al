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
