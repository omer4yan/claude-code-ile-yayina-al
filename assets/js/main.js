/* Orvena — kişisel site: küçük etkileşimler (Türkçe ve İngilizce sayfalar) */
(function () {
  "use strict";

  var root = document.documentElement;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

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

  /* ---------- Sayfa içi bağlantılar: güvenilir kaydırma + vurgu ---------- */
  var flash = function (el) {
    if (!el || !el.matches || !el.matches(".lessons li")) return;
    el.classList.add("is-flash");
    window.setTimeout(function () {
      el.classList.remove("is-flash");
    }, 1600);
  };

  // Yolculuk sayfası, sıçramadan sonra yan listeleri güncellemek için bunu doldurur
  var afterJump = null;

  var scrollToId = function (id, push) {
    var target = document.getElementById(id);
    if (!target) return false;
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });
    if (push && history.pushState) history.pushState(null, "", "#" + id);
    flash(target);
    if (afterJump) {
      afterJump(id);
      window.setTimeout(function () { afterJump(id); }, 450);
      window.setTimeout(function () { afterJump(id); }, 1000);
    }
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

  /* ---------- Yolculuk sayfası ---------- */
  var curriculumBox = document.querySelector(".curriculum__box");
  if (!curriculumBox) return;

  // Başka sayfadan bir derse gelindiyse vurgula
  if (location.hash) {
    var initial = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (initial) window.setTimeout(function () { flash(initial); }, 300);
  }

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

  // Müfredat modülleri açılır/kapanır: başlangıçta kapalı, başlığa tıklayınca açılır.
  // JavaScript yoksa HTML'deki hâliyle (açık) kalır.
  var setModuleOpen = function (btn, open) {
    btn.setAttribute("aria-expanded", open ? "true" : "false");
    var mod = btn.closest(".cur-module");
    if (mod) mod.classList.toggle("is-collapsed", !open);
  };
  var hashModule = (location.hash.match(/^#(m\d+)-d\d+$/) || [])[1];
  curriculumBox.querySelectorAll(".cur-module__head[aria-controls]").forEach(function (btn) {
    var mod = btn.closest(".cur-module");
    setModuleOpen(btn, !!(hashModule && mod && mod.getAttribute("data-module") === hashModule));
    btn.addEventListener("click", function () {
      setModuleOpen(btn, btn.getAttribute("aria-expanded") !== "true");
    });
  });

  // Dar ekranda müfredattan bir bağlantıya tıklanınca paneli kapat
  curriculumBox.addEventListener("click", function (e) {
    if (!desktop.matches && e.target.closest("a")) curriculumBox.removeAttribute("open");
  });

  var sections = Array.prototype.slice.call(document.querySelectorAll(".module[id]"));
  var lessonItems = Array.prototype.slice.call(document.querySelectorAll(".lessons li[id]"));
  var curModules = document.querySelectorAll(".cur-module");
  var curLessonLinks = document.querySelectorAll(".cur-lessons a");
  var chips = document.querySelectorAll(".chips-bar a");
  var railName = document.getElementById("rail-module-name");
  var railList = document.getElementById("rail-lessons");
  var railCard = railList ? railList.closest(".rail-card") : null;
  var currentModule = null;
  var currentLesson = null;

  // Sağdaki "Bu modülde" kartını soldaki müfredattan üret
  var renderRail = function (id) {
    if (!railName || !railList) return;
    var source = document.querySelector('.cur-module[data-module="' + id + '"]');
    var links = source ? source.querySelectorAll(".cur-lessons a") : [];
    if (!links.length) {
      if (railCard) railCard.hidden = true;
      return;
    }
    if (railCard) railCard.hidden = false;
    var name = source.querySelector(".cur-module__name");
    railName.innerHTML = "";
    var nameLink = document.createElement("a");
    nameLink.href = "#" + id;
    nameLink.textContent = name ? name.textContent : "";
    railName.appendChild(nameLink);
    railList.innerHTML = "";
    links.forEach(function (a, i) {
      var li = document.createElement("li");
      var link = document.createElement("a");
      link.href = a.getAttribute("href");
      var n = document.createElement("span");
      n.className = "n";
      n.textContent = String(i + 1);
      link.appendChild(n);
      link.appendChild(document.createTextNode(a.textContent));
      li.appendChild(link);
      railList.appendChild(li);
    });
  };

  var setModule = function (id) {
    if (!id || id === currentModule) return;
    currentModule = id;

    curModules.forEach(function (m) {
      m.classList.toggle("is-active", m.getAttribute("data-module") === id);
    });

    chips.forEach(function (c) {
      var active = c.getAttribute("data-target") === id;
      c.classList.toggle("is-active", active);
      if (active && !desktop.matches && c.parentElement) {
        var bar = c.parentElement;
        var left = c.offsetLeft - bar.clientWidth / 2 + c.clientWidth / 2;
        if (bar.scrollTo) bar.scrollTo({ left: left, behavior: reduceMotion ? "auto" : "smooth" });
      }
    });

    renderRail(id);
    currentLesson = undefined; // bir sonraki setLesson eski işareti mutlaka temizlesin
  };

  var setLesson = function (id) {
    if (id === currentLesson) return;
    currentLesson = id;
    var href = id ? "#" + id : null;
    curLessonLinks.forEach(function (a) {
      a.parentElement.classList.toggle("is-active", a.getAttribute("href") === href);
    });
    if (railList) {
      railList.querySelectorAll("a").forEach(function (a) {
        a.parentElement.classList.toggle("is-active", a.getAttribute("href") === href);
      });
    }
  };

  // Üst menünün (ve varsa modül çubuğunun) hemen altındaki okuma çizgisi
  var readingLine = function () {
    var pad = parseFloat(window.getComputedStyle(root).scrollPaddingTop) || 88;
    return pad + 24;
  };

  var update = function () {
    var line = readingLine();
    var moduleLine = Math.max(line, window.innerHeight * 0.3);
    var activeModule = sections[0] ? sections[0].id : null;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top - moduleLine <= 0) activeModule = sections[i].id;
    }

    // Bir dersin başlığı okuma çizgisine ulaştıysa o dersin modülü etkindir
    var activeLesson = null;
    for (var j = 0; j < lessonItems.length; j++) {
      if (lessonItems[j].getBoundingClientRect().top - line <= 0) activeLesson = lessonItems[j].id;
    }
    if (activeLesson && activeLesson.indexOf(activeModule + "-") !== 0) activeLesson = null;

    setModule(activeModule);
    setLesson(activeLesson);
  };

  afterJump = function (id) {
    update();
    var lesson = document.getElementById(id);
    if (lesson && lesson.matches(".lessons li")) {
      setModule(id.split("-")[0]);
      setLesson(id);
    }
  };

  if ("onscrollend" in window) window.addEventListener("scrollend", update);

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      update();
      ticking = false;
    });
  }, { passive: true });
  window.addEventListener("resize", update);
  update();
})();
