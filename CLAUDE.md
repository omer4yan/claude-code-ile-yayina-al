# Orvena — Ömer Ayan'ın kişisel sitesi

Derleme adımı olmayan statik site (HTML + CSS + biraz JS), Türkçe ve İngilizce. GitHub Pages'te yayınlanır:
https://omer4yan.github.io/claude-code-ile-yayina-al/  (İngilizce: …/en/)

## Marka
- Marka adı **Orvena**; üst menüde logo + "Orvena" yazısı. Kişisel içerik (hakkımda, giriş açıklaması) "Ömer Ayan" adıyla kalır.
- Logo: `assets/img/orvena-logo.png` (512), `orvena-logo-192.png` (menü + apple-touch-icon), `favicon-32.png`, `favicon-64.png`.
  Kaynak `Logo/Logo.png` (depo dışında); web sürümleri kırmızı leke ve siyah sis temizlenip kırpılarak üretildi, renk `rgb(185,71,29)`.

## Sayfalar (her sayfanın iki dilde karşılığı var)
| Türkçe (kök) | İngilizce | İçerik |
|---|---|---|
| `index.html` | `en/index.html` | Giriş alanı (serif başlık + canlı noktalı harita), Eğitim Modülleri carousel'i, kısa hakkımda, iletişim. Ders şeridi ve "İlk sitem yayında" kartı kullanıcının isteğiyle kaldırıldı (yayın günü yolculuk sayfasında). |
| `yolculuk.html` | `en/yolculuk.html` | TR: modül genel bakışı — solda müfredat, ortada 7 modül (ders sayısı, okuma süresi, ders satırları ders sayfasına bağlantı, "Modüle başla", "Aklımda kalan") + "Yayın günü", sağda "Bu modülde" ve "Çalışma döngüm". EN: İngilizce ders sayfaları yazılana kadar eski özet yapısında (öğrendiklerim listesi, terminal örneği); sonra TR ile aynı yapıya geçecek. |
| `hakkimda.html` | `en/hakkimda.html` | Fotoğraf, hakkımda metni (eğitim paragrafı dahil) ve butonlar. Unvan satırı ve deneyim/eğitim/sertifika/beceri/dil bölümleri kullanıcının isteğiyle kaldırıldı. |

- Ortak dosyalar: `assets/css/style.css`, `assets/css/home.css` (yalnızca ana sayfa giriş alanı), `assets/js/main.js`, `assets/js/modules.js`, `assets/img/`.
- `en/` içindeki sayfalar ortak dosyalara `../assets/` ile bağlanır.
- Bir sayfada içerik değişirse diğer dildeki karşılığını da güncelle; yapı, sınıflar ve kimlikler (`#m1-d1` …) iki dilde aynı kalmalı.

## Dil
- Türkçe varsayılan, İngilizce `en/` altında. `<html lang>`, `<title>`, meta description ve `rel="alternate" hreflang` her sayfada ayarlı.
- Menüdeki dil bağlantısı (Türkçe sayfada "EN", İngilizce sayfada "TR") ve footer'daki "Türkçe · English" bağlantıları aynı sayfanın diğer dildeki karşılığına gider; aktif dil `aria-current="true"` ile işaretli.
- `main.js` ve `modules.js` arayüz metinlerini `<html lang>` değerine göre seçer (tema/menü düğmesi etiketleri, carousel kartları).

## Görmek için
`index.html` dosyasını tarayıcıda aç (Windows: `start index.html`).

## İçerik kuralları
- Metinler birinci tekil şahıs, samimi ve abartısız. İngilizce metinler Türkçenin sadık çevirisidir; yeni bilgi eklenmez.
- Kursun adı: **"Claude Code ile Yayına Al"** (İngilizce sayfalarda da bu Türkçe adla geçer).
- Ana sayfa başlığı ve açıklaması kullanıcının verdiği metinlerdir; kelimeleri değiştirme. Başlıktaki vurgular `.hl` ile:
  TR "Yapay Zekâ İnovasyonuna:" ve "Değer Üreten"; EN "AI Innovation:" ve "Value Creation".
- Modül/ders adları ve konular yalnızca `Claude Code ile yayına al/` klasöründeki PDF notlarından alınır; uydurma yok.
- Hakkımda bilgileri yalnızca CV'den (`CV/`) alınır. Telefon, adres ve referanslar sitede YER ALMAZ.
- Kurs sağlayıcı adı, kurs bağlantısı, sertifika ve ilerleme bilgisi (yüzde, x/40, "tamamlandı") gösterilmez.
- Ana sayfa giriş alanında üst etiket ve modül/ders sayısı yok; "7 modül · 40 ders" yalnızca Eğitim Modülleri başlığının altında.
- Footer: solda "© 2026 Orvena · Türkçe · English", sağda "Claude Code yardımıyla hazırlandı · GitHub Pages'te yayında" (EN: "Built with the help of Claude Code · Published on GitHub Pages"). Yatırım uyarısı kullanılmaz.
- E-posta: omer.4yan@gmail.com · GitHub: github.com/omer4yan · LinkedIn: linkedin.com/in/omer-ayan

## Ana sayfa haritası (canlı)
- Satır içi SVG (çizgiler, düğümler, etiketler) + `<canvas class="map-dots">` (noktalı alan). Gerçek coğrafya değil, soyut bir alan. Merkez "ORVENA", düğümler 7 modülün adları. Şehir/konum/topluluk iddiası ekleme.
- `assets/js/map.js` (kullanıcının paylaştığı referans ekran videolarına göre):
  - İmleç: noktalar imlecin etrafındaki dairenin kenarına itilir (ortada boşluk, kenarda halka), yer değiştiren noktalar vurgu rengine döner ve yavaşça geri gelerek iz bırakır (`HOLE_R`, `PUSH`, `EASE_BACK`, `HEAT_DECAY`).
  - `.map-fg` grubu imleci izleyerek kayar; `.map-flow` içinde ORVENA'dan modüllere akan noktalar üretilir.
  - "Dağıt, yeniden topla" düğmesi (`.map-scatter`, varsayılan `hidden`, JS açar): noktalar ~0,7 sn'de dışarı saçılır, ~1 sn'den itibaren kırmızı olarak geri dönüp yerleşir ve griye döner; ~3,9 sn'de çizgiler `is-drawing` sınıfı yeniden eklenerek baştan çizilir. Saçılma sırasında `.map-fg.is-scattered` modül grupları ve akan noktaları gizler; merkez ve ORVENA etiketi görünür kalır.
  - Kara şekilleri SVG'deki `#m-land` maskesinden okunur.
  - Akan noktaların saydamlığı `style.opacity` ile verilir. SVG `opacity` özniteliği kullanma: CSS kuralı özniteliği ezer ve noktalar görünmez olur (daha önce yaşandı). Testte öznitelik değil `getComputedStyle(...).opacity` ölç.
  - Çizgi ortasındaki sabit `.map-mid` işaretleri gizlidir (akan noktalarla karışıyordu).
- Giriş alanı (`.hero2`) en az ekran yüksekliği kadardır (`min-height: calc(100svh - var(--header-h))`): sayfa ilk açıldığında "Eğitim Modülleri" başlığı görünmemeli. Değiştirirken bunu da kontrol et.
- Renkler tema değişkenlerinden (`--map-dot`, `--map-node-bg`, `--accent`); tema değişince canvas yeniden çizilir.
- `prefers-reduced-motion` açıkken hareket yok (noktalar durağan çizilir). JavaScript yoksa SVG içindeki `.map-pattern` desen yedeği görünür.
- Harita altında açıklama satırı yok. 640px altında modül etiketleri gizlenir (okunamayacak kadar küçülüyor).
- Butonlar ilk ekranda görünsün diye başlık boyutu `min(vw, vh)` ile sınırlanır; değiştirirken 1366×657 ve 390×664 görünür alanlarda kontrol et.

## Eğitim Modülleri (ana sayfa carousel'i)
- Tek veri kaynağı: `assets/js/modules.js` içindeki `MODULES` dizisi; her modülün `tr` ve `en` metinleri yan yana. Kartlar `createModuleCard()` ile üretilir.
- `en/index.html` içindeki carousel bölümünde `data-base="../"` var; kapak yolları buna göre tamamlanır.
- Süreler (dk) ders notlarındaki okuma sürelerinin toplamıdır: 34, 31, 17, 14, 11, 11, 15 = 133. Ders sayıları: 6, 6, 5, 5, 6, 6, 6.
- Bilinmeyen alan `null` kalır, kartta o satır gösterilmez. `progress` gerçek veri yoksa `null`; sahte ilerleme gösterme.
- Kapak görselleri `assets/img/modules/m1–m7.svg` (640×400, ortak gradyan ve palet).
- Görünüm: masaüstü 3, tablet (≤1023px) 2, mobil (≤640px) 1 kart + sonrakinin bir kısmı; scroll-snap, otomatik kaydırma ve döngü yok.

## Ders sayfaları (`ders.html?id=m1-d1` … `m7-d6`)
- Tek şablon `ders.html`; içerik tek veri dosyasından: `assets/js/lessons.tr.js` (`window.ORVENA_LESSONS`, blok türleri dosyanın başında açıklı). İngilizce şablon `en/ders.html` + `assets/js/lessons.en.js` (Türkçenin sadık çevirisi; aynı yapı ve kimlikler; prompt'lar ve komutlar aynen kalır, Türkçedeki “Anlamı: …” cümleleri İngilizcede yoktur). `lesson.js`, `sandbox.js` ve `listen.js` arayüz metinlerini `<html lang>`'a göre seçer (İngilizce sayfada İngilizce ses). İngilizcesi hazır modüller `lessons.tr.js` içindeki `enReady` listesindedir: Türkçe ders sayfasındaki EN bağlantısı bu modüllerde `en/ders.html?id=…`'ya, diğerlerinde `en/yolculuk.html#id`'ye gider; İngilizce sayfada hazır olmayan dersler de `en/yolculuk.html#id`'ye gider.
- Betik sırası: `lessons.tr.js` → `lesson.js` (sayfayı, müfredatı, "Bu modülde", "Bu derste", önceki/sonraki kartlarını üretir) → `sandbox.js` → `listen.js` → `main.js`. Stil: `assets/css/lesson.css`. `body[data-lesson-page]` olduğunda `main.js` yolculuk sayfasının kaydırma takibini çalıştırmaz.
- Metinler PDF notlarına dayanır, talimat diliyle ve kendi cümlelerimizle yazılır; kurs metni birebir kopyalanmaz, kurs sağlayıcı adı ve sertifika geçmez. "Benim notum" birinci tekil şahıstır ve yaşanmamış deneyim iddia etmez.
- Sandbox simülasyondur (gerçek shell değil): `pwd`, `ls [-a]`, `mkdir`, `cd`, `cat`, `help`, `clear`; derse özel yanıtlar `sandbox.claude` (claude "…" istekleri) ve `sandbox.cmds` (`start …`, `/init`, `git …` gibi) içinde. "Şunları dene" önerilerinin hepsi çalışmalı; test ederken her öneriyi çalıştırıp "komut bulunamadı / yalnızca bu derste" çıktısı olmadığını kontrol et.
- "Claude'da aç" isteği panoya kopyalar ve `https://claude.ai/new?q=` adresini açar (resmî olmayan adres; alan boş gelirse kullanıcı yapıştırır). Dinleme Web Speech API ile, cümle cümle.
- Türkçe yolculuk sayfasında her ders satırının tamamı `ders.html?id=…` bağlantısıdır (`.lesson-row`); her modülde ilk derse giden "Modüle başla" düğmesi (`.module-start`) var.

## Dersler ve bağlantılar
- Her modülde `.lessons` listesi var; her dersin kimliği `m{modül}-d{ders}` (örn. `#m3-d2`). Toplam 40 ders.
- Kimlikler (`#m3-d2`) yolculuk sayfasındaki ders satırlarında durur; eski bağlantılar çalışmaya devam eder. Türkçe sayfada sol müfredat ve "Bu modülde" kartındaki ders bağlantıları ders sayfasına (`ders.html?id=…`), İngilizce sayfada şimdilik `#mN-dK` kimliklerine gider. Kaydırırken ders işareti iki biçimi de tanır. Yeni ders eklenirse ikisini de, iki dilde güncelle.
- Müfredat modülleri açılır/kapanır (kullanıcının paylaştığı referans videoya göre): modül başlığı iki parçalıdır: `<div class="cur-module__head cur-module__head--split">` içinde modül adı `<a class="cur-module__link" href="#mN">` (modülün başına gider ve o modülün derslerini açar; ders sayfasında modül adı, "Bu modülde" kartındaki ad ve giriş alanındaki "Modül N" o modülün ilk dersine, `ders.html?id=mN-d1`, gider) ve ok düğmesi `<button class="cur-module__toggle" aria-expanded aria-controls="cur-mN">` (yalnızca açar/kapatır, sayfayı kaydırmaz). Dersler `.cur-lessons-wrap#cur-mN` içinde. JS tüm modülleri kapalı başlatır (`.cur-module.is-collapsed`); sayfa `#mN-dK` ile açılırsa o modül açık gelir. Birden fazla modül aynı anda açık olabilir. JS yoksa hepsi açık kalır.
- Sağ kart, JS ile soldaki müfredattan üretilir.

## Stil
- İki tema: kayıtlı tercih yoksa sistem teması (`prefers-color-scheme`). Üst menüdeki güneş/ay düğmesi `data-theme` özniteliğini değiştirir; seçim `localStorage`'da (`theme`) saklanır ve dil değişince de korunur.
- Her sayfanın `<head>` bölümünde temayı erken uygulayan kısa satır içi betik var; yeni sayfa eklerken onu da kopyala.
- Renkler `:root` (koyu: kömür zemin) ve `:root[data-theme="light"]` (aydınlık: sıcak kırık beyaz) değişkenlerinde. Yeni renk eklerken değişken kullan, iki temada da tanımla.
- Vurgu: koyuda `#e8622c`, aydınlıkta `#bf3a1b`. Beyaz yazılı dolgular (butonlar, rozetler) `--accent-fill` kullanır (beyaz metinle ≥4.5:1). Terminal kutuları iki temada da koyu kalır.
- Yazı tipleri: Instrument Serif (ana sayfa başlığı ve kart başlıkları; yalnızca ana sayfalarda yüklenir), Inter (metin), JetBrains Mono (etiketler, numaralar, kod).
- Ortak kenar boşluğu `--gutter`: masaüstü 56px, ≤1023px 28px, ≤640px 20px. En geniş sayfa `--maxw: 1440px`. Üst menü, giriş alanı, bölümler ve footer aynı kenar çizgisinde.
- Uzun paragraflar iki yana yaslı (`text-align: justify`, son satır sola, `hyphens: auto`), en fazla ~68ch; 640px altında sola hizalı. Carousel kart açıklamaları da yaslıdır (3 satır sınırıyla uyumlu ayrı kural, 640px altında sola). Başlıklar, menü, butonlar, kısa etiketler ve footer yaslanmaz.
- Üst menü: 72px (≤760px 68px); 1080px ve altında açılır menü. "İletişim →" vurgu butonu menünün sonunda; İletişim ayrıca menüde tekrarlanmaz.
- Referans sitelerin logosu, metinleri ve marka öğeleri kopyalanmaz.

## Sınırlar
- Bağlantılar göreli olmalı (site alt klasörden yayınlanıyor).
- Kaynak ve referans klasörleri (`CV/`, `Fotoğraf/`, `Logo/`, kurs notları, tasarım ekran görüntüleri, `video/`) `.gitignore` ile depo dışında; bunları commit'leme. `git add -A` yerine dosyaları adıyla ekle ya da önce `git status` ile kontrol et.
- Yayınlamadan (push / Pages ayarı) önce kullanıcıdan onay al.
