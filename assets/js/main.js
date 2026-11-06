/* Ömer Ayan — kişisel site: küçük etkileşimler */
(function () {
  "use strict";

  /* Mobil menü */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    var closeNav = function () {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "Menüyü aç");
    };
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Menüyü kapat" : "Menüyü aç");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeNav();
    });
    window.addEventListener("resize", function () {
      if (window.innerWidth > 760) closeNav();
    });
  }

  /* Ana sayfa: ders şeridi ipucu */
  var strip = document.getElementById("strip");
  var tip = document.getElementById("strip-tip");
  if (strip && tip) {
    var defaultTip = tip.innerHTML;
    var showTip = function (cell) {
      var text = cell.getAttribute("data-tip") || "";
      var parts = text.split(" · ");
      tip.innerHTML = "";
      var strong = document.createElement("strong");
      strong.textContent = parts[0];
      tip.appendChild(strong);
      if (parts[1]) tip.appendChild(document.createTextNode(" · " + parts.slice(1).join(" · ")));
    };
    strip.querySelectorAll(".strip__cell").forEach(function (cell) {
      cell.removeAttribute("title");
      cell.addEventListener("mouseenter", function () { showTip(cell); });
      cell.addEventListener("focus", function () { showTip(cell); });
    });
    strip.addEventListener("mouseleave", function () { tip.innerHTML = defaultTip; });
  }

  /* Yolculuk sayfası */
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

  // Dar ekranda müfredattan bir bağlantıya tıklanınca paneli kapat
  curriculumBox.addEventListener("click", function (e) {
    if (!desktop.matches && e.target.closest("a")) curriculumBox.removeAttribute("open");
  });

  // Görünür modülü takip et
  var sections = Array.prototype.slice.call(document.querySelectorAll(".module[id]"));
  var curModules = document.querySelectorAll(".cur-module");
  var chips = document.querySelectorAll(".chips-bar a");
  var railName = document.getElementById("rail-module-name");
  var railList = document.getElementById("rail-lessons");
  var currentId = null;

  var setActive = function (id) {
    if (!id || id === currentId) return;
    currentId = id;

    curModules.forEach(function (m) {
      m.classList.toggle("is-active", m.getAttribute("data-module") === id);
    });

    chips.forEach(function (c) {
      var active = c.getAttribute("data-target") === id;
      c.classList.toggle("is-active", active);
      if (active && c.parentElement && c.scrollIntoView && !desktop.matches) {
        var bar = c.parentElement;
        var left = c.offsetLeft - bar.clientWidth / 2 + c.clientWidth / 2;
        bar.scrollTo({ left: left, behavior: "smooth" });
      }
    });

    if (railName && railList) {
      var source = document.querySelector('.cur-module[data-module="' + id + '"]');
      var lessons = source ? source.querySelectorAll(".cur-lessons li") : [];
      var card = railList.closest(".rail-card");
      if (!lessons.length) {
        if (card) card.style.visibility = "hidden";
        return;
      }
      if (card) card.style.visibility = "";
      var name = source.querySelector(".cur-module__name");
      railName.textContent = name ? name.textContent : "";
      railList.innerHTML = "";
      lessons.forEach(function (li, i) {
        var item = document.createElement("li");
        var n = document.createElement("span");
        n.className = "n";
        n.textContent = String(i + 1);
        item.appendChild(n);
        item.appendChild(document.createTextNode(li.textContent));
        railList.appendChild(item);
      });
    }
  };

  var update = function () {
    var offset = window.innerHeight * 0.35;
    var active = sections[0] ? sections[0].id : null;
    for (var i = 0; i < sections.length; i++) {
      if (sections[i].getBoundingClientRect().top - offset <= 0) active = sections[i].id;
    }
    setActive(active);
  };

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
