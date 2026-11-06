/* =========================================================
   "Okumak yerine dinle" — tarayıcının konuşma sentezi (Web Speech API)
   Ders metni cümlelere bölünür; cümle cümle okunur, okunan bölüm vurgulanır.
   Kod kutuları ve tablolar okunmaz.
   ========================================================= */
(function () {
  "use strict";

  var box = document.getElementById("listen");
  var ctx = window.ORVENA_LESSON;
  if (!box || !ctx) return;

  var synth = window.speechSynthesis;
  var ICON = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>',
    fwd: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg>',
    head: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 14v-2a9 9 0 0 1 18 0v2"/><rect x="3" y="14" width="4" height="7" rx="1.5"/><rect x="17" y="14" width="4" height="7" rx="1.5"/></svg>'
  };

  if (!synth || typeof window.SpeechSynthesisUtterance !== "function") {
    box.innerHTML = '<div class="listen__inner"><span class="listen__icon">' + ICON.head + '</span><div class="listen__meta"><strong>Okumak yerine dinle</strong><span class="listen__status">Bu tarayıcı sesli okumayı desteklemiyor.</span></div></div>';
    return;
  }

  /* ---------- Cümleler ---------- */
  var sentences = [];
  document.querySelectorAll("#ana-icerik [data-read]").forEach(function (el) {
    var text = el.textContent.replace(/\s+/g, " ").trim();
    if (!text) return;
    var parts = text.match(/[^.!?…:]+(?:[.!?…:]+|$)/g) || [text];
    parts.forEach(function (p) {
      p = p.trim();
      if (p.length > 1) sentences.push({ text: p, el: el });
    });
  });
  if (!sentences.length) return;

  var RATES = [0.75, 1, 1.25, 1.5];
  var rate = 1;
  try { rate = parseFloat(localStorage.getItem("listenRate")) || 1; } catch (e) { /* depolama kapalı */ }
  if (RATES.indexOf(rate) === -1) rate = 1;

  box.innerHTML =
    '<div class="listen__inner">' +
    '<span class="listen__icon">' + ICON.head + "</span>" +
    '<div class="listen__meta"><strong>Okumak yerine dinle</strong><span class="listen__status" aria-live="polite">Dersi tarayıcının sesiyle dinleyebilirsin.</span></div>' +
    '<div class="listen__controls">' +
    '<button type="button" class="listen__btn" data-act="back" aria-label="Önceki cümle">' + ICON.back + "</button>" +
    '<button type="button" class="listen__btn listen__btn--main" data-act="toggle" aria-label="Dinlemeye başla">' + ICON.play + "</button>" +
    '<button type="button" class="listen__btn" data-act="fwd" aria-label="Sonraki cümle">' + ICON.fwd + "</button>" +
    '<button type="button" class="listen__rate" data-act="rate" aria-label="Okuma hızı">' + String(rate).replace(".", ",") + "×</button>" +
    "</div></div>" +
    '<div class="listen__progress" aria-hidden="true"><span></span></div>';

  var status = box.querySelector(".listen__status");
  var toggleBtn = box.querySelector('[data-act="toggle"]');
  var rateBtn = box.querySelector('[data-act="rate"]');
  var bar = box.querySelector(".listen__progress span");

  /* ---------- Ses seçimi ---------- */
  var voice = null;
  var pickVoice = function () {
    var voices = synth.getVoices() || [];
    voice = null;
    for (var i = 0; i < voices.length; i++) {
      if (/^tr\b|^tr-/i.test(voices[i].lang)) { voice = voices[i]; break; }
    }
  };
  pickVoice();
  if (synth.addEventListener) synth.addEventListener("voiceschanged", pickVoice);
  else synth.onvoiceschanged = pickVoice;

  /* ---------- Oynatma ---------- */
  var index = 0;
  var playing = false;
  var token = 0;
  var lastEl = null;

  var mark = function (el) {
    if (lastEl === el) return;
    if (lastEl) lastEl.classList.remove("is-reading");
    lastEl = el;
    if (!el) return;
    el.classList.add("is-reading");
    var r = el.getBoundingClientRect();
    if (r.top < 90 || r.bottom > window.innerHeight - 20) {
      el.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "center" });
    }
  };

  var update = function () {
    bar.style.width = (sentences.length ? (index / sentences.length) * 100 : 0) + "%";
    toggleBtn.innerHTML = playing ? ICON.pause : ICON.play;
    toggleBtn.setAttribute("aria-label", playing ? "Duraklat" : index > 0 ? "Devam et" : "Dinlemeye başla");
    box.classList.toggle("is-playing", playing);
  };

  var setStatus = function () {
    if (playing) {
      status.textContent = "Okunuyor · " + (index + 1) + " / " + sentences.length + (voice ? "" : " · Türkçe ses bulunamadı, varsayılan ses kullanılıyor");
    } else if (index >= sentences.length) {
      status.textContent = "Ders sonuna gelindi.";
    } else if (index > 0) {
      status.textContent = "Duraklatıldı · " + (index + 1) + " / " + sentences.length;
    }
  };

  var speak = function () {
    token += 1;
    var my = token;
    synth.cancel();
    if (index >= sentences.length) {
      playing = false;
      index = sentences.length;
      mark(null);
      update();
      setStatus();
      return;
    }
    var s = sentences[index];
    var u = new SpeechSynthesisUtterance(s.text);
    u.lang = "tr-TR";
    if (voice) u.voice = voice;
    u.rate = rate;
    u.onend = function () {
      if (my !== token || !playing) return;
      index += 1;
      speak();
    };
    u.onerror = function (e) {
      if (my !== token) return;
      if (e && (e.error === "interrupted" || e.error === "canceled")) return;
      playing = false;
      status.textContent = "Sesli okuma başlatılamadı. Cihazında bir konuşma sesi yüklü olmayabilir.";
      update();
    };
    mark(s.el);
    update();
    setStatus();
    synth.speak(u);
  };

  var stop = function () {
    playing = false;
    token += 1;
    synth.cancel();
    update();
    setStatus();
  };

  box.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-act]");
    if (!btn) return;
    var act = btn.getAttribute("data-act");
    if (act === "toggle") {
      if (playing) { stop(); return; }
      if (index >= sentences.length) index = 0;
      playing = true;
      speak();
    } else if (act === "back" || act === "fwd") {
      index = Math.max(0, Math.min(sentences.length - 1, index + (act === "back" ? -1 : 1)));
      if (playing) speak();
      else { mark(sentences[index].el); update(); setStatus(); }
    } else if (act === "rate") {
      rate = RATES[(RATES.indexOf(rate) + 1) % RATES.length];
      rateBtn.textContent = String(rate).replace(".", ",") + "×";
      try { localStorage.setItem("listenRate", String(rate)); } catch (er) { /* depolama kapalı */ }
      if (playing) speak();
    }
  });

  window.addEventListener("pagehide", function () { synth.cancel(); });
  // Bazı tarayıcılarda sayfa yeniden yüklendiğinde önceki okuma sürebilir
  synth.cancel();
  update();
})();
