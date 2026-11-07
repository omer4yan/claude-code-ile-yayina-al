/* =========================================================
   Ana sayfa haritası: canlı noktalı alan
   - Noktalar <canvas> üzerinde çizilir. Fare imleci etrafında boşluk açar:
     noktalar dairenin kenarına itilir, kırmızıya döner ve yavaşça geri gelerek iz bırakır.
   - Çizgi/düğüm grubu (.map-fg) imleci izleyerek hafifçe kayar (derinlik).
   - ORVENA merkezinden 7 modüle giden çizgiler boyunca noktalar akar (.map-flow).
   - "Dağıt, yeniden topla" düğmesi: noktalar dışarı saçılır, haritadan çıkar,
     sonra kırmızı olarak geri dönüp yerlerine yerleşir; ardından çizgiler yeniden çizilir.
   - Animasyonlar cihazın "hareketi azalt" ayarından bağımsız olarak her zaman çalışır (kullanıcı isteği).
   - Dokunmatik ekranlarda (fare yok) görünmez bir imleç harita üzerinde yavaşça dolaşır;
     parmakla dokunulan/sürüklenen yer de imleç gibi davranır. Dikey kaydırma bozulmaz.
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
  var scatterBtn = fig.querySelector(".map-scatter");
  if (!stage || !canvas || !svg || !fg || !canvas.getContext || !window.Path2D) return;

  var ctx = canvas.getContext("2d");
  var root = document.documentElement;
  var SVGNS = "http://www.w3.org/2000/svg";
  var VB_W = 720, VB_H = 620, STEP = 14;

  // İmleç etkisi
  var HOLE_R = 92;          // imlecin açtığı dairenin yarıçapı (harita birimi)
  var PUSH = 0.9;           // 1'e yaklaştıkça noktalar dairenin kenarına daha çok itilir
  var EASE_OUT = 0.32;      // itilirken hız
  var EASE_BACK = 0.045;    // geri dönerken hız (yavaş = uzun iz)
  var HEAT_DECAY = 0.965;   // kırmızılığın sönme hızı
  var PARALLAX_X = 22, PARALLAX_Y = 16;

  // Dağıt, yeniden topla zaman çizelgesi (ms)
  var T_OUT = 700, T_IN_START = 1000, T_IN = 1600, T_IN_SPREAD = 900, T_REDRAW = 3900;

  // Fare olmayan (dokunmatik) cihaz: gezinen imleç kullanılır
  var touchOnly = window.matchMedia("(hover: none) and (pointer: coarse)").matches;
  var rand = function (a, b) { return a + Math.random() * (b - a); };

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
  // Arka plandaki silik alan merkezden kenarlara doğru söner (SVG'deki radyal maskeyle aynı)
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
      var land = isLand(x, y);
      var a = land ? 1 : fieldFade(x, y) * 0.32;
      if (a > 0.01) dots.push({ x: x, y: y, r: land ? 2 : 1.5, a: a, ox: 0, oy: 0, heat: 0, vis: 1 });
    }
  }

  /* ---------- Çizim ---------- */
  var dotColor = "", accentColor = "";
  var readColors = function () {
    var cs = window.getComputedStyle(root);
    dotColor = cs.getPropertyValue("--map-dot").trim() || "rgba(128,128,128,.4)";
    accentColor = cs.getPropertyValue("--accent").trim() || "#e8622c";
  };

  var scale = 1;
  var resize = function () {
    var rect = stage.getBoundingClientRect();
    if (!rect.width) return;
    var dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    scale = (rect.width / VB_W) * dpr;
  };

  var fieldShift = { x: 0, y: 0 };
  var draw = function () {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(scale, 0, 0, scale, 0, 0);
    var i, d;
    // 1) gri noktalar
    ctx.fillStyle = dotColor;
    for (i = 0; i < dots.length; i++) {
      d = dots[i];
      var g = d.a * (1 - d.heat) * d.vis;
      if (g <= 0.01) continue;
      ctx.globalAlpha = g;
      ctx.beginPath();
      ctx.arc(d.x + d.ox + fieldShift.x, d.y + d.oy + fieldShift.y, d.r, 0, Math.PI * 2);
      ctx.fill();
    }
    // 2) yerinden oynayan noktalar: vurgu renginde (silik alandakiler de belirginleşir)
    ctx.fillStyle = accentColor;
    for (i = 0; i < dots.length; i++) {
      d = dots[i];
      if (d.heat <= 0.02 || d.vis <= 0.01) continue;
      ctx.globalAlpha = d.heat * Math.max(d.a, 0.85) * d.vis;
      ctx.beginPath();
      ctx.arc(d.x + d.ox + fieldShift.x, d.y + d.oy + fieldShift.y, Math.max(d.r, 1.8), 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;
  };

  readColors();
  resize();
  draw();
  fig.classList.add("is-live");

  // Tema değişince renkleri yeniden oku
  new MutationObserver(function () { readColors(); draw(); })
    .observe(root, { attributes: true, attributeFilter: ["data-theme"] });

  if (window.ResizeObserver) {
    new ResizeObserver(function () { resize(); draw(); }).observe(stage);
  } else {
    window.addEventListener("resize", function () { resize(); draw(); });
  }

  /* ---------- İmleç ---------- */
  var pointer = null; // harita biriminde imleç konumu
  var hero = fig.closest(".hero2") || fig;
  var toMap = function (e) {
    var rect = stage.getBoundingClientRect();
    return { x: ((e.clientX - rect.left) / rect.width) * VB_W, y: ((e.clientY - rect.top) / rect.height) * VB_H };
  };
  var touching = false; // parmak harita üzerinde
  hero.addEventListener("pointermove", function (e) {
    if (e.pointerType !== "mouse" && !touching) return;
    pointer = toMap(e); wake();
  }, { passive: true });
  hero.addEventListener("pointerleave", function (e) { if (e.pointerType === "mouse") { pointer = null; wake(); } });
  // Dokunma: parmağın değdiği yer imleç olur; parmak kalkınca gezinen imlece dönülür
  stage.addEventListener("pointerdown", function (e) {
    if (e.pointerType === "mouse") return;
    touching = true; pointer = toMap(e); wake();
  }, { passive: true });
  var endTouch = function (e) {
    if (e.pointerType === "mouse") return;
    touching = false;
    if (!touchOnly) pointer = null;
    wake();
  };
  window.addEventListener("pointerup", endTouch, { passive: true });
  window.addEventListener("pointercancel", endTouch, { passive: true });

  // Gezinen imleç (dokunmatik ekranlar): harita üzerinde yavaş, düzensiz görünen bir yol
  var ghostAt = function (now) {
    return {
      x: VB_W / 2 + Math.sin(now * 0.00019) * 240 + Math.sin(now * 0.00047 + 1.3) * 60,
      y: VB_H / 2 + Math.sin(now * 0.00027 + 0.7) * 170 + Math.cos(now * 0.00041) * 40
    };
  };

  var fgShift = { x: 0, y: 0 };

  /* ---------- Akan noktalar ---------- */
  var routes = [].map.call(fg.querySelectorAll(".map-line"), function (path) {
    return { path: path, len: path.getTotalLength() };
  });
  // Her çizgide birkaç nokta; her noktanın arkasında küçülerek sönen kısa bir kuyruk var.
  // Saydamlık style ile verilir (CSS kuralı SVG özniteliğini ezdiği için öznitelik kullanılmaz).
  var PER_ROUTE = 3, FLOW_MS = 4800; // bir ışığın bir çizgiyi geçme süresi
  var TAIL = [{ lag: 0, r: 3.4, a: 1 }, { lag: 0.035, r: 2.6, a: 0.5 }, { lag: 0.07, r: 1.9, a: 0.25 }];
  var particles = [];
  routes.forEach(function (route, ri) {
    for (var k = 0; k < PER_ROUTE; k++) {
      var parts = TAIL.map(function (seg) {
        var c = document.createElementNS(SVGNS, "circle");
        c.setAttribute("class", "map-flow-dot");
        c.setAttribute("r", String(seg.r));
        c.style.opacity = "0";
        flow.appendChild(c);
        return { el: c, lag: seg.lag, a: seg.a };
      });
      particles.push({ parts: parts, route: route, phase: k / PER_ROUTE + ri * 0.137 });
    }
  });
  var flowStart = performance.now() + 1500; // çizgiler çizildikten sonra başlar
  var updateFlow = function (now) {
    var t0 = (now - flowStart) / FLOW_MS;
    var ramp = Math.max(0, Math.min(1, (now - flowStart) / 600));
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var head = ((t0 + p.phase) % 1 + 1) % 1;
      for (var j = 0; j < p.parts.length; j++) {
        var part = p.parts[j];
        var t = head - part.lag;
        if (t < 0) { part.el.style.opacity = "0"; continue; }
        var pt = p.route.path.getPointAtLength(t * p.route.len);
        part.el.setAttribute("cx", pt.x.toFixed(1));
        part.el.setAttribute("cy", pt.y.toFixed(1));
        // uçlarda yumuşakça belirip söner
        var edge = Math.min(1, t / 0.12, (1 - t) / 0.12);
        part.el.style.opacity = (edge * part.a * ramp).toFixed(2);
      }
    }
  };

  /* ---------- Dağıt, yeniden topla ---------- */
  var scatter = null; // { start: ms }

  var startScatter = function () {
    if (scatter) return;
    var now = performance.now();
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i];
      var ang = rand(0, Math.PI * 2), far = rand(520, 950);
      d.outX = Math.cos(ang) * far;            // dışarı uçuş yönü ve mesafesi
      d.outY = Math.sin(ang) * far;
      var ang2 = rand(0, Math.PI * 2), far2 = rand(480, 900);
      d.inX = Math.cos(ang2) * far2;           // geri dönüşün başladığı uzak nokta
      d.inY = Math.sin(ang2) * far2;
      d.delay = rand(0, T_IN_SPREAD);
      d.baseX = d.ox; d.baseY = d.oy;          // o anki imleç kaymasından başla
    }
    scatter = { start: now };
    fg.classList.add("is-scattered");
    if (scatterBtn) scatterBtn.disabled = true;
    wake();
  };

  var easeIn = function (t) { return t * t * t; };
  var easeOut = function (t) { return 1 - Math.pow(1 - t, 3); };

  var stepScatter = function (now) {
    var t = now - scatter.start;
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i], p;
      if (t < T_OUT) {
        // dışarı saçılma
        p = easeIn(t / T_OUT);
        d.ox = d.baseX + d.outX * p;
        d.oy = d.baseY + d.outY * p;
        d.vis = 1; d.heat = 0;
      } else if (t < T_IN_START + d.delay) {
        d.vis = 0; // haritanın dışında
      } else {
        // dışarıdan geri dönüş: önce kırmızı, yerleştikçe gri
        p = Math.min(1, (t - T_IN_START - d.delay) / T_IN);
        var e = easeOut(p);
        d.ox = d.inX * (1 - e);
        d.oy = d.inY * (1 - e);
        d.vis = Math.min(1, p * 4);
        d.heat = 1 - p;
      }
    }
    if (t >= T_IN_START + T_IN_SPREAD + T_IN) {
      for (var j = 0; j < dots.length; j++) { dots[j].ox = 0; dots[j].oy = 0; dots[j].heat = 0; dots[j].vis = 1; }
    }
    if (t >= T_REDRAW) {
      // çizgileri baştan çiz: animasyon sınıfını kaldırıp yeniden ekle
      fg.classList.remove("is-scattered");
      fg.classList.remove("is-drawing");
      void fig.offsetWidth;
      fg.classList.add("is-drawing");
      flowStart = now + 1500;
      scatter = null;
      if (scatterBtn) scatterBtn.disabled = false;
    }
  };

  if (scatterBtn) {
    scatterBtn.hidden = false;
    scatterBtn.addEventListener("click", startScatter);
  }

  /* ---------- Döngü ---------- */
  var visible = true, rafId = 0, fieldDirty = true;

  var stepPointer = function () {
    var moving = false;
    for (var i = 0; i < dots.length; i++) {
      var d = dots[i], gx = 0, gy = 0, push = 0;
      if (pointer) {
        var dx = d.x + fieldShift.x - pointer.x, dy = d.y + fieldShift.y - pointer.y;
        var dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < HOLE_R) {
          if (dist < 0.001) { dx = 1; dy = 0; dist = 1; }
          push = (HOLE_R - dist) * PUSH;   // dairenin kenarına it
          gx = (dx / dist) * push;
          gy = (dy / dist) * push;
        }
      }
      // itilirken hızlı, geri dönerken yavaş
      var curr = d.ox * d.ox + d.oy * d.oy, targ = gx * gx + gy * gy;
      var k = targ > curr ? EASE_OUT : EASE_BACK;
      var nx = d.ox + (gx - d.ox) * k, ny = d.oy + (gy - d.oy) * k;
      // kırmızılık: yer değiştirme kadar yükselir, yavaşça söner
      var mag = Math.sqrt(nx * nx + ny * ny);
      var heat = Math.max(d.heat * HEAT_DECAY, Math.min(1, mag / 14));
      if (heat < 0.01) heat = 0;
      if (Math.abs(nx - d.ox) > 0.02 || Math.abs(ny - d.oy) > 0.02 || Math.abs(heat - d.heat) > 0.004) moving = true;
      d.ox = nx; d.oy = ny; d.heat = heat;
    }
    return moving;
  };

  var step = function (now) {
    rafId = 0;

    // Dokunmatik ekranda parmak değmiyorsa imleç kendiliğinden dolaşır
    if (touchOnly && !touching && !scatter) pointer = ghostAt(now);

    // Derinlik: çizgi grubu imleci izler, nokta alanı ters yönde daha az kayar
    var tx = 0, ty = 0;
    if (pointer && !scatter) {
      tx = (pointer.x / VB_W - 0.5) * PARALLAX_X;
      ty = (pointer.y / VB_H - 0.5) * PARALLAX_Y;
    }
    fgShift.x += (tx - fgShift.x) * 0.08;
    fgShift.y += (ty - fgShift.y) * 0.08;
    fg.setAttribute("transform", "translate(" + fgShift.x.toFixed(2) + " " + fgShift.y.toFixed(2) + ")");
    var fx = -fgShift.x * 0.35, fy = -fgShift.y * 0.35;
    if (Math.abs(fx - fieldShift.x) > 0.01 || Math.abs(fy - fieldShift.y) > 0.01) fieldDirty = true;
    fieldShift.x = fx; fieldShift.y = fy;

    if (scatter) {
      stepScatter(now);
      fieldDirty = true;
    } else if (stepPointer()) {
      fieldDirty = true;
    }
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
