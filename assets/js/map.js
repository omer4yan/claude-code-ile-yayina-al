/* =========================================================
   Ana sayfa haritası: canlı noktalı alan
   - Noktalar <canvas> üzerinde çizilir ve fare imlecinden kaçar.
   - Çizgi/düğüm grubu (.map-fg) imleci izleyerek hafifçe kayar (derinlik).
   - ORVENA merkezinden 7 modüle giden çizgiler boyunca noktalar akar (.map-flow).
   - prefers-reduced-motion açıkken hareket yoktur; noktalar durağan çizilir.
   - JavaScript yoksa SVG içindeki desen (.map-pattern) görünmeye devam eder.
   ========================================================= */
(function () {
  "use strict";

  var fig = document.querySelector("[data-map]");
  if (!fig) return;

  var stage = fig.querySelector(".map-stage");
  var canvas = fig.querySelector(".map-dots");
  var svg = fig.querySelector("svg");
  var fg = svg && svg.querySelector(".map-fg");
  var flow = svg && svg.querySelector(".map-flow");
  if (!stage || !canvas || !svg || !canvas.getContext || !window.Path2D) return;

  var ctx = canvas.getContext("2d");
  var SVGNS = "http://www.w3.org/2000/svg";
  var VB_W = 720, VB_H = 620, STEP = 14;
  var REPEL_R = 105;      // imlecin etki yarıçapı (harita birimi)
  var REPEL_MAX = 30;     // en fazla kaçış mesafesi
  var PARALLAX_X = 22, PARALLAX_Y = 16;
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Noktaları üret: kara şekilleri SVG maskesinden okunur ---------- */
  var probe = document.createElement("canvas").getContext("2d");
  var landPaths = [].map.call(svg.querySelectorAll("#m-land g path"), function (p) {
    return new Path2D(p.getAttribute("d"));
  });
  var landCircles = [].map.call(svg.querySelectorAll("#m-land g circle"), function (c) {
    return { x: +c.getAttribute("cx"), y: +c.getAttribute("cy"), r: +c.getAttribute("r") };
  });

  var isLand = function (x, y) {
    for (var i = 0; i < landPaths.length; i++) if (probe.isPointInPath(landPaths[i], x, y)) return true;
    for (var j = 0; j < landCircles.length; j++) {
      var c = landCircles[j];
      if ((x - c.x) * (x - c.x) + (y - c.y) * (y - c.y) <= c.r * c.r) return true;
    }
    return false;
  };

  // Arka plandaki silik alan: merkezden kenarlara doğru söner (SVG'deki radyal maskeyle aynı)
  var fieldFade = function (x, y) {
    var dx = (x - VB_W / 2) / (0.6 * VB_W), dy = (y - VB_H / 2) / (0.6 * VB_H);
    var t = Math.sqrt(dx * dx + dy * dy);
    if (t <= 0.55) return 1;
    if (t >= 1) return 0;
    return 1 - (t - 0.55) / 0.45;
  };

  var dots = [];
  for (var y = STEP / 2; y < VB_H; y += STEP) {
    for (var x = STEP / 2; x < VB_W; x += STEP) {
      if (isLand(x, y)) {
        dots.push({ x: x, y: y, r: 2, a: 1, ox: 0, oy: 0 });
      } else {
        var f = fieldFade(x, y) * 0.32;
        if (f > 0.01) dots.push({ x: x, y: y, r: 1.5, a: f, ox: 0, oy: 0 });
      }
    }
  }

  /* ---------- Çizim ---------- */
  var color = "";
  var readColor = function () {
    color = window.getComputedStyle(document.documentElement).getPropertyValue("--map-dot").trim() || "rgba(128,128,128,.4)";
  };

  var scale = 1, dpr = 1;
  var resize = function () {
    var rect = stage.getBoundingClientRect();
    if (!rect.width) return;
    dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    scale = (rect.width / VB_W) * dpr;
  };

  var fieldShift = { x: 0, y: 0 };
  var draw = function () {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    ctx.fillStyle = color;
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      ctx.globalAlpha = d.a;
      ctx.beginPath();
      ctx.arc(d.x + d.ox + fieldShift.x, d.y + d.oy + fieldShift.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  readColor();
  resize();
  draw();
  fig.classList.add("is-live");

  // Tema değişince nokta rengini yeniden oku
  new MutationObserver(function () { readColor(); draw(); })
    .observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });

  if (window.ResizeObserver) {
    new ResizeObserver(function () { resize(); draw(); }).observe(stage);
  } else {
    window.addEventListener("resize", function () { resize(); draw(); });
  }

  if (reduce) return; // hareket azaltma: durağan çizim yeterli

  /* ---------- İmleç: kaçan noktalar + derinlik kayması ---------- */
  var pointer = null; // harita biriminde imleç konumu
  var hero = fig.closest(".hero2") || fig;

  var toMap = function (e) {
    var rect = stage.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * VB_W,
      y: ((e.clientY - rect.top) / rect.height) * VB_H
    };
  };

  hero.addEventListener("pointermove", function (e) { pointer = toMap(e); wake(); }, { passive: true });
  hero.addEventListener("pointerleave", function () { pointer = null; wake(); });
  hero.addEventListener("pointerup", function (e) { if (e.pointerType !== "mouse") { pointer = null; wake(); } });

  var fgShift = { x: 0, y: 0 };

  /* ---------- Akan noktalar ---------- */
  var routes = [].map.call(svg.querySelectorAll(".map-fg .map-line"), function (path) {
    return { path: path, len: path.getTotalLength() };
  });
  var PER_ROUTE = 3, FLOW_MS = 2600;
  var particles = [];
  routes.forEach(function (route, ri) {
    for (var k = 0; k < PER_ROUTE; k++) {
      var c = document.createElementNS(SVGNS, "circle");
      c.setAttribute("class", "map-flow-dot");
      c.setAttribute("r", "3");
      flow.appendChild(c);
      particles.push({ el: c, route: route, phase: k / PER_ROUTE + ri * 0.137 });
    }
  });

  var flowStart = performance.now() + 1500; // çizgiler çizildikten sonra başlar
  var updateFlow = function (now) {
    var t0 = (now - flowStart) / FLOW_MS;
    var ramp = Math.max(0, Math.min(1, (now - flowStart) / 600));
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var t = ((t0 + p.phase) % 1 + 1) % 1;
      var pt = p.route.path.getPointAtLength(t * p.route.len);
      p.el.setAttribute("cx", pt.x.toFixed(1));
      p.el.setAttribute("cy", pt.y.toFixed(1));
      p.el.setAttribute("opacity", (Math.sin(Math.PI * t) * ramp).toFixed(2));
    }
  };

  /* ---------- Döngü ---------- */
  var visible = true, rafId = 0, fieldDirty = true;

  var step = function (now) {
    rafId = 0;

    // Derinlik: çizgi grubu imleci izler, nokta alanı ters yönde daha az kayar
    var tx = 0, ty = 0;
    if (pointer) {
      tx = (pointer.x / VB_W - 0.5) * PARALLAX_X;
      ty = (pointer.y / VB_H - 0.5) * PARALLAX_Y;
    }
    fgShift.x += (tx - fgShift.x) * 0.08;
    fgShift.y += (ty - fgShift.y) * 0.08;
    fg.setAttribute("transform", "translate(" + fgShift.x.toFixed(2) + " " + fgShift.y.toFixed(2) + ")");
    var fx = -fgShift.x * 0.35, fy = -fgShift.y * 0.35;
    if (Math.abs(fx - fieldShift.x) > 0.01 || Math.abs(fy - fieldShift.y) > 0.01) fieldDirty = true;
    fieldShift.x = fx; fieldShift.y = fy;

    // Kaçan noktalar
    var moving = false;
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i], gx = 0, gy = 0;
      if (pointer) {
        var dx = d.x + fieldShift.x - pointer.x, dy = d.y + fieldShift.y - pointer.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < REPEL_R && dist > 0.001) {
          var k = 1 - dist / REPEL_R;
          var push = k * k * REPEL_MAX;
          gx = (dx / dist) * push;
          gy = (dy / dist) * push;
        }
      }
      var nx = d.ox + (gx - d.ox) * 0.16, ny = d.oy + (gy - d.oy) * 0.16;
      if (Math.abs(nx - d.ox) > 0.02 || Math.abs(ny - d.oy) > 0.02) moving = true;
      d.ox = nx; d.oy = ny;
    }
    if (moving) fieldDirty = true;
    if (fieldDirty) { draw(); fieldDirty = false; }

    updateFlow(now);
    schedule();
  };

  var schedule = function () {
    if (!rafId && visible && !document.hidden) rafId = window.requestAnimationFrame(step);
  };
  var wake = function () { fieldDirty = true; schedule(); };

  // Harita ekranda değilse ya da sekme gizliyse döngüyü durdur
  if (window.IntersectionObserver) {
    new IntersectionObserver(function (entries) {
      visible = entries[0].isIntersecting;
      if (visible) schedule();
    }).observe(fig);
  }
  document.addEventListener("visibilitychange", function () { if (!document.hidden) schedule(); });

  schedule();
})();
