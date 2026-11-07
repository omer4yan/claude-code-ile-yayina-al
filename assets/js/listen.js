/* =========================================================
   "Okumak yerine dinle"
   Ders metni cümlelere bölünür; cümle cümle okunur, okunan bölüm vurgulanır.
   Kod kutuları ve tablolar okunmaz.
   - Derse ait seslendirme varsa (assets/audio/{tr|en}/{id}.js + .mp3,
     scripts/seslendir.ps1 üretir) o ses çalınır; cümle zamanlamaları vurguyu yönetir.
   - Yoksa ya da metin değiştiyse tarayıcının konuşma sentezi (Web Speech API) kullanılır.
   - Dinleme başladıktan sonra kutu ekrandan çıkarsa ekranın altına yapışır
     (.listen__panel.is-docked); kutu yeniden görünür olunca yerine döner.
   ========================================================= */
(function () {
  "use strict";

  var box = document.getElementById("listen");
  var ctx = window.ORVENA_LESSON;
  if (!box || !ctx) return;

  /* ---------- Cümleler ---------- */
  // Etiketler (kutu başlığı, "Benim notum", zaman çizelgesi başlığı) metne yapışmasın diye
  // sonlarına iki nokta eklenir; zaman çizelgesindeki sıra numarası okunmaz.
  var LABEL = ".callout__title, .my-note__label, .timeline > li > strong";
  var readText = function (el) {
    var out = "";
    el.childNodes.forEach(function (n) {
      if (n.nodeType === 3) { out += n.nodeValue; return; }
      if (n.nodeType !== 1 || n.matches(".timeline__dot, svg")) return;
      var t = readText(n);
      if (n.matches(LABEL)) {
        t = t.trim();
        if (t && !/[.!?…:]$/.test(t)) t += ":";
        t += " ";
      }
      out += t;
    });
    return out;
  };

  // Noktalama ancak ardından boşluk ya da metin sonu geliyorsa cümleyi bitirir
  // (index.html, ayse@example.com, https:// bölünmez); iki yanı boş tek nokta da
  // ("git add .") cümle sonu sayılmaz.
  var SPLIT = /(?:\s\.(?=\s)|[^.!?…:]|[.!?…:]+(?!\s|$))+(?:[.!?…:]+(?=\s|$)|$)/g;

  var sentences = [];
  var group = 0;
  document.querySelectorAll("#ana-icerik [data-read]").forEach(function (el) {
    var text = readText(el).replace(/\s+/g, " ").trim();
    if (!text) return;
    var parts = text.match(SPLIT) || [text];
    parts.forEach(function (p) {
      p = p.trim();
      if (p.length > 1) sentences.push({ text: p, el: el, g: group });
    });
    group += 1;
  });
  if (!sentences.length) return;
  // Seslendirme betiği okunacak metni buradan alır (scripts/metin-cikar.html)
  window.ORVENA_LISTEN_TEXT = sentences.map(function (s) { return { t: s.text, g: s.g }; });

  var synth = window.speechSynthesis;
  var hasSynth = !!synth && typeof window.SpeechSynthesisUtterance === "function";

  var ICON = {
    play: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M8 5.5v13a1 1 0 0 0 1.5.86l10.5-6.5a1 1 0 0 0 0-1.72L9.5 4.64A1 1 0 0 0 8 5.5z"/></svg>',
    pause: '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="5" width="4" height="14" rx="1"/><rect x="14" y="5" width="4" height="14" rx="1"/></svg>',
    back: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>',
    fwd: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M13 17l5-5-5-5M6 17l5-5-5-5"/></svg>',
    head: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 14v-2a9 9 0 0 1 18 0v2"/><rect x="3" y="14" width="4" height="7" rx="1.5"/><rect x="17" y="14" width="4" height="7" rx="1.5"/></svg>',
    close: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>'
  };

  var T = ctx.isEn ? {
    title: "Listen instead of reading", unsupported: "This browser doesn\x27t support reading aloud.",
    ready: "You can listen to the lesson in your browser\x27s voice.",
    readyAudio: "You can listen to the narrated version of this lesson.",
    prevS: "Previous sentence", nextS: "Next sentence", start: "Start listening", pause: "Pause", resume: "Resume", rate: "Reading speed",
    close: "Stop and close the player",
    reading: "Reading", noVoice: " · No English voice found, using the default voice", end: "End of the lesson.", paused: "Paused",
    loading: "Loading audio…",
    error: "Couldn\x27t start reading aloud. Your device may not have a speech voice installed.",
    audioError: "Couldn\x27t play the audio file.",
    lang: "en-US", voiceRe: /^en\b|^en-/i, dec: "."
  } : {
    title: "Okumak yerine dinle", unsupported: "Bu tarayıcı sesli okumayı desteklemiyor.",
    ready: "Dersi tarayıcının sesiyle dinleyebilirsin.",
    readyAudio: "Dersin seslendirilmiş hâlini dinleyebilirsin.",
    prevS: "Önceki cümle", nextS: "Sonraki cümle", start: "Dinlemeye başla", pause: "Duraklat", resume: "Devam et", rate: "Okuma hızı",
    close: "Durdur ve oynatıcıyı kapat",
    reading: "Okunuyor", noVoice: " · Türkçe ses bulunamadı, varsayılan ses kullanılıyor", end: "Ders sonuna gelindi.", paused: "Duraklatıldı",
    loading: "Ses yükleniyor…",
    error: "Sesli okuma başlatılamadı. Cihazında bir konuşma sesi yüklü olmayabilir.",
    audioError: "Ses dosyası çalınamadı.",
    lang: "tr-TR", voiceRe: /^tr\b|^tr-/i, dec: ","
  };
  var fmtRate = function (r) { return String(r).replace(".", T.dec) + "×"; };

  var RATES = [0.75, 1, 1.25, 1.5];
  var rate = 1;
  try { rate = parseFloat(localStorage.getItem("listenRate")) || 1; } catch (e) { /* depolama kapalı */ }
  if (RATES.indexOf(rate) === -1) rate = 1;

  box.innerHTML =
    '<div class="listen__panel">' +
    '<div class="listen__inner">' +
    '<span class="listen__icon">' + ICON.head + "</span>" +
    '<div class="listen__meta"><strong>' + T.title + '</strong><span class="listen__status" aria-live="polite">' + (hasSynth ? T.ready : "") + '</span></div>' +
    '<div class="listen__controls">' +
    '<button type="button" class="listen__btn" data-act="back" aria-label="' + T.prevS + '">' + ICON.back + "</button>" +
    '<button type="button" class="listen__btn listen__btn--main" data-act="toggle" aria-label="' + T.start + '">' + ICON.play + "</button>" +
    '<button type="button" class="listen__btn" data-act="fwd" aria-label="' + T.nextS + '">' + ICON.fwd + "</button>" +
    '<button type="button" class="listen__rate" data-act="rate" aria-label="' + T.rate + '">' + fmtRate(rate) + "</button>" +
    '<button type="button" class="listen__btn listen__close" data-act="close" aria-label="' + T.close + '">' + ICON.close + "</button>" +
    "</div></div>" +
    '<div class="listen__progress" aria-hidden="true"><span></span></div>' +
    "</div>";

  var panel = box.querySelector(".listen__panel");
  var status = box.querySelector(".listen__status");
  var toggleBtn = box.querySelector('[data-act="toggle"]');
  var rateBtn = box.querySelector('[data-act="rate"]');
  var bar = box.querySelector(".listen__progress span");

  var unsupported = function () {
    box.innerHTML = '<div class="listen__inner"><span class="listen__icon">' + ICON.head + '</span><div class="listen__meta"><strong>' + T.title + '</strong><span class="listen__status">' + T.unsupported + '</span></div></div>';
  };

  /* ---------- Ortak durum ---------- */
  var mode = "speech"; // "speech" | "audio"
  var index = 0;
  var playing = false;
  var active = false; // dinleme başladı ve oynatıcı kapatılmadı
  var lastEl = null;
  var shownIcon = null;

  var mark = function (el) {
    if (lastEl === el) return;
    if (lastEl) lastEl.classList.remove("is-reading");
    lastEl = el;
    if (!el) return;
    el.classList.add("is-reading");
    var r = el.getBoundingClientRect();
    var bottomSpace = panel.classList.contains("is-docked") ? panel.offsetHeight + 20 : 20;
    if (r.top < 90 || r.bottom > window.innerHeight - bottomSpace) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  var update = function () {
    var p = sentences.length ? index / sentences.length : 0;
    if (mode === "audio" && audio && audio.duration) p = audio.currentTime / audio.duration;
    bar.style.width = Math.min(100, p * 100) + "%";
    // Simge yalnızca durum değişince yenilenir; her karede yenilemek tıklamaları yutuyordu.
    var icon = playing ? "pause" : "play";
    if (icon !== shownIcon) {
      toggleBtn.innerHTML = ICON[icon];
      shownIcon = icon;
    }
    toggleBtn.setAttribute("aria-label", playing ? T.pause : index > 0 ? T.resume : T.start);
    box.classList.toggle("is-playing", playing);
  };

  var setStatus = function () {
    if (playing) {
      status.textContent = T.reading + " · " + (index + 1) + " / " + sentences.length + (mode === "speech" && !voice ? T.noVoice : "");
    } else if (index >= sentences.length) {
      status.textContent = T.end;
    } else if (index > 0) {
      status.textContent = T.paused + " · " + (index + 1) + " / " + sentences.length;
    } else {
      status.textContent = mode === "audio" ? T.readyAudio : T.ready;
    }
  };

  /* ---------- Alta yapışan oynatıcı ---------- */
  var boxVisible = true;

  var placeDock = function () {
    if (!panel.classList.contains("is-docked")) return;
    if (window.innerWidth > 640) {
      var r = box.getBoundingClientRect();
      panel.style.left = r.left + "px";
      panel.style.width = r.width + "px";
    } else {
      panel.style.left = "";
      panel.style.width = "";
    }
  };

  var headerH = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--header-h")) || 72;
  var measure = function () {
    var r = box.getBoundingClientRect();
    boxVisible = r.bottom > headerH && r.top < window.innerHeight;
  };

  var syncDock = function () {
    measure();
    var dock = active && !boxVisible;
    if (dock === panel.classList.contains("is-docked")) { placeDock(); return; }
    if (dock) {
      box.style.height = box.offsetHeight + "px"; // yerinde aynı boşluk kalsın
      panel.classList.add("is-docked");
      document.body.classList.add("has-listen-dock");
      placeDock();
    } else {
      panel.classList.remove("is-docked");
      document.body.classList.remove("has-listen-dock");
      panel.style.left = "";
      panel.style.width = "";
      box.style.height = "";
    }
  };

  var setActive = function (on) {
    active = on;
    syncDock();
  };

  var onScroll = function () {
    if (active || panel.classList.contains("is-docked")) syncDock();
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);

  /* ---------- Tarayıcı sesi ---------- */
  var voice = null;
  var token = 0;
  if (hasSynth) {
    var pickVoice = function () {
      var voices = synth.getVoices() || [];
      voice = null;
      for (var i = 0; i < voices.length; i++) {
        if (T.voiceRe.test(voices[i].lang)) { voice = voices[i]; break; }
      }
    };
    pickVoice();
    if (synth.addEventListener) synth.addEventListener("voiceschanged", pickVoice);
    else synth.onvoiceschanged = pickVoice;
  }

  var finish = function () {
    playing = false;
    index = sentences.length;
    mark(null);
    update();
    setStatus();
    setActive(false);
  };

  var speak = function () {
    token += 1;
    var my = token;
    synth.cancel();
    if (index >= sentences.length) { finish(); return; }
    var s = sentences[index];
    var u = new SpeechSynthesisUtterance(s.text);
    u.lang = T.lang;
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
      status.textContent = T.error;
      update();
    };
    mark(s.el);
    update();
    setStatus();
    synth.speak(u);
  };

  /* ---------- Seslendirme dosyası ---------- */
  var audio = null;
  var times = null; // her cümlenin başlangıç saniyesi
  var pendingSeek = null;
  var raf = 0;

  var seek = function (t) {
    if (audio.readyState >= 1) audio.currentTime = t;
    else pendingSeek = t;
  };

  var sentenceAt = function (t) {
    var i = 0;
    while (i + 1 < times.length && times[i + 1] <= t + 0.02) i += 1;
    return i;
  };

  var tick = function () {
    raf = 0;
    if (mode !== "audio" || !playing) return;
    var i = sentenceAt(audio.currentTime);
    if (i !== index) { index = i; setStatus(); }
    mark(sentences[index].el);
    update();
    raf = requestAnimationFrame(tick);
  };

  var useAudio = function (data, src) {
    times = data.sentences.map(function (s) { return Math.max(0, s.s - 0.05); });
    audio = new Audio();
    audio.preload = "none";
    audio.src = src;
    audio.addEventListener("loadedmetadata", function () {
      if (pendingSeek !== null) { audio.currentTime = pendingSeek; pendingSeek = null; }
    });
    audio.addEventListener("waiting", function () { if (playing) status.textContent = T.loading; });
    audio.addEventListener("playing", function () { setStatus(); });
    audio.addEventListener("ended", finish);
    audio.addEventListener("error", function () {
      playing = false;
      update();
      if (hasSynth) {
        mode = "speech";
        status.textContent = T.audioError + " " + T.ready;
      } else {
        status.textContent = T.audioError;
      }
    });
    mode = "audio";
    status.textContent = T.readyAudio;
  };

  var playAudio = function () {
    if (index >= sentences.length) index = 0;
    seek(times[index]);
    audio.playbackRate = rate;
    playing = true;
    mark(sentences[index].el);
    update();
    setStatus();
    var p = audio.play();
    if (p && p.catch) {
      p.catch(function (e) {
        if (e && e.name === "AbortError") return;
        playing = false;
        status.textContent = T.audioError;
        update();
      });
    }
    if (!raf) raf = requestAnimationFrame(tick);
  };

  var stop = function () {
    playing = false;
    if (mode === "audio") audio.pause();
    else { token += 1; synth.cancel(); }
    update();
    setStatus();
  };

  /* Metin karşılaştırması: yalnızca harf ve rakamlar */
  var norm = function (s) {
    return String(s).toLocaleLowerCase(ctx.isEn ? "en" : "tr").replace(/[^0-9a-zçğıöşüâîû]+/g, "");
  };
  var matches = function (data) {
    if (!data || !data.sentences || data.sentences.length !== sentences.length) return false;
    for (var i = 0; i < sentences.length; i++) {
      if (norm(data.sentences[i].t) !== norm(sentences[i].text)) return false;
    }
    return true;
  };

  var id = ctx.lesson && ctx.lesson.id;
  if (id) {
    var base = ctx.isEn ? "../assets/audio/en/" : "assets/audio/tr/";
    var tag = document.createElement("script");
    tag.src = base + id + ".js";
    tag.onload = function () {
      var data = window.ORVENA_AUDIO && window.ORVENA_AUDIO[id];
      if (matches(data)) {
        if (!playing) useAudio(data, base + (data.audio || id + ".mp3"));
      } else if (data && window.console) {
        console.warn("listen.js: seslendirme metni ders metniyle uyuşmuyor, tarayıcı sesi kullanılıyor (" + id + ")");
      }
      if (mode !== "audio" && !hasSynth) unsupported();
    };
    tag.onerror = function () { if (!hasSynth) unsupported(); };
    document.head.appendChild(tag);
  } else if (!hasSynth) {
    unsupported();
    return;
  }

  /* ---------- Düğmeler ---------- */
  box.addEventListener("click", function (e) {
    var btn = e.target.closest("[data-act]");
    if (!btn) return;
    var act = btn.getAttribute("data-act");
    if (act === "toggle") {
      if (playing) { stop(); return; }
      setActive(true);
      if (mode === "audio") { playAudio(); return; }
      if (index >= sentences.length) index = 0;
      playing = true;
      speak();
    } else if (act === "back" || act === "fwd") {
      index = Math.max(0, Math.min(sentences.length - 1, index + (act === "back" ? -1 : 1)));
      if (mode === "audio") {
        seek(times[index]);
        mark(sentences[index].el); update(); setStatus();
      } else if (playing) speak();
      else { mark(sentences[index].el); update(); setStatus(); }
    } else if (act === "rate") {
      rate = RATES[(RATES.indexOf(rate) + 1) % RATES.length];
      rateBtn.textContent = fmtRate(rate);
      try { localStorage.setItem("listenRate", String(rate)); } catch (er) { /* depolama kapalı */ }
      if (mode === "audio") audio.playbackRate = rate;
      else if (playing) speak();
    } else if (act === "close") {
      if (playing) stop();
      mark(null);
      setActive(false);
    }
  });

  window.addEventListener("pagehide", function () {
    if (audio) audio.pause();
    if (hasSynth) synth.cancel();
  });
  // Bazı tarayıcılarda sayfa yeniden yüklendiğinde önceki okuma sürebilir
  if (hasSynth) synth.cancel();
  update();
})();
