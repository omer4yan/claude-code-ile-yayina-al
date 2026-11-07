# Orvena — Ömer Ayan'ın kişisel sitesi

Derleme adımı olmayan statik site (HTML + CSS + biraz JS), Türkçe ve İngilizce. GitHub Pages'te yayınlanır:
https://omer4yan.github.io/claude-code-ile-yayina-al/  (İngilizce: …/en/)

## Marka
- Marka adı **Orvena**; üst menüde logo + "Orvena" yazısı. Kişisel içerik (hakkımda, giriş açıklaması) "Ömer Ayan" adıyla kalır.
- Logo: `assets/img/orvena-logo-192.png` (menü + apple-touch-icon), `favicon-32.png`, `favicon-64.png`.
  Kaynak `Logo/Logo.png` (depo dışında); web sürümleri kırmızı leke ve siyah sis temizlenip kırpılarak üretildi, renk `rgb(185,71,29)`.

## Sayfalar (her sayfanın iki dilde karşılığı var)
| Türkçe (kök) | İngilizce | İçerik |
|---|---|---|
| `index.html` | `en/index.html` | Giriş alanı (serif başlık + canlı noktalı harita), Eğitim Modülleri carousel'i, kısa hakkımda, iletişim. Ders şeridi ve "İlk sitem yayında" kartı kullanıcının isteğiyle kaldırıldı (yayın günü artık `ders.html?id=yayin-gunu` sayfasında). |
| `ders.html` | `en/ders.html` | **Öğrenme Yolculuğum** (kullanıcının isteğiyle her şey ders sayfalarında): menüdeki "Öğrenme Yolculuğum", ana sayfa düğmesi ve modül kartları ders sayfalarını açar. `ders.html` (id yoksa) ilk dersi, `?id=yayin-gunu` Yayın günü sayfasını açar. |
| `yolculuk.html` | `en/yolculuk.html` | Yalnızca yönlendirme (eski bağlantılar için): `#mN-dK` → o ders, `#mN` → modülün ilk dersi, `#yayin-gunu` → Yayın günü, diğerleri → ilk ders. İçerik eklenmez. |
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
- Ana sayfa başlığı ve açıklaması kullanıcının verdiği metinlerdir; kelimeleri değiştirme. Başlık cümle düzeninde yazılır: yalnız ilk harf büyük (kullanıcı isteği; EN'de "AI" kısaltma olduğu için büyük). Başlıktaki vurgular `.hl` ile:
  TR "yapay zekâ inovasyonuna:" ve "değer üreten"; EN "AI innovation:" ve "value creation".
- Modül/ders adları ve konular yalnızca `Claude Code ile yayına al/` klasöründeki PDF notlarından alınır; uydurma yok.
- Hakkımda bilgileri yalnızca CV'den (`CV/`) alınır. Telefon, adres ve referanslar sitede YER ALMAZ. İstisna: ana sayfadaki kısa hakkımda bölümünün metni ("Windows XP ile başlayan merak, bugün yapay zekâ ile devam ediyor." başlığı ve iki paragraf) kullanıcının verdiği metindir; Hakkımda sayfasındaki metin de ("Merhaba, ben Ömer." altındaki dört paragraf) kullanıcının verdiği metindir; kelimelerini değiştirme, İngilizcesi sadık çevirisidir.
- Kurs sağlayıcı adı, kurs bağlantısı, sertifika ve ilerleme bilgisi (yüzde, x/40, "tamamlandı") gösterilmez.
- Ana sayfa giriş alanında üst etiket ve modül/ders sayısı yok; "7 modül · 40 ders" yalnızca Eğitim Modülleri başlığının altında.
- Footer: solda "© 2026 Orvena · Türkçe · English", sağda "Claude Code yardımıyla hazırlandı · GitHub Pages'te yayında" (EN: "Built with the help of Claude Code · Published on GitHub Pages"). Yatırım uyarısı kullanılmaz.
- E-posta: omer.4yan@gmail.com · GitHub: github.com/omer4yan · LinkedIn: linkedin.com/in/omer-ayan

## Ana sayfa haritası (canlı)
- Satır içi SVG (çizgiler, düğümler, etiketler) + `<canvas class="map-dots">` (noktalı alan). Gerçek coğrafya değil, soyut bir alan. Merkez "ORVENA", düğümler 7 modülün adları. Şehir/konum/topluluk iddiası ekleme.
- `assets/js/map.js` (kullanıcının paylaştığı referans ekran videolarına göre):
  - İmleç: noktalar imlecin etrafındaki dairenin kenarına itilir (ortada boşluk, kenarda halka), yer değiştiren noktalar vurgu rengine döner ve yavaşça geri gelerek iz bırakır (`HOLE_R`, `PUSH`, `EASE_BACK`, `HEAT_DECAY`).
  - `.map-fg` grubu imleci izleyerek kayar; `.map-flow` içinde ORVENA'dan modüllere akan noktalar üretilir (`FLOW_MS` 4800: bir ışık bir çizgiyi 4,8 sn'de geçer).
  - Dokunmatik ekran: parmağın değdiği/yatay sürüklendiği yer imleç olur, parmak kalkınca noktalar yerine döner. Kendiliğinden dolaşan imleç kullanıcı isteğiyle kaldırıldı; ekleme. `.map-stage` `touch-action: pan-y` ile dikey kaydırmayı korur.
  - "Dağıt, yeniden topla" düğmesi (`.map-scatter`, varsayılan `hidden`, JS açar): noktalar ~0,7 sn'de dışarı saçılır, ~1 sn'den itibaren kırmızı olarak geri dönüp yerleşir ve griye döner; ~3,9 sn'de çizgiler `is-drawing` sınıfı yeniden eklenerek baştan çizilir. Saçılma sırasında `.map-fg.is-scattered` modül gruplarını, akan noktaları ve ORVENA merkezini (nokta, halka, yazı) küçülterek gizler; merkez harita yeniden çizilirken büyüyerek geri gelir (kullanıcı isteği).
  - Kara şekilleri SVG'deki `#m-land` maskesinden okunur.
  - Akan noktaların saydamlığı `style.opacity` ile verilir. SVG `opacity` özniteliği kullanma: CSS kuralı özniteliği ezer ve noktalar görünmez olur (daha önce yaşandı). Testte öznitelik değil `getComputedStyle(...).opacity` ölç.
  - Çizgi ortasındaki sabit `.map-mid` işaretleri gizlidir (akan noktalarla karışıyordu).
- Giriş alanı (`.hero2`) ekranı tam doldurur (`100svh - var(--header-h)`): sayfa ilk açıldığında "Eğitim Modülleri" görünmemeli. Masaüstünde metin ve harita alttan hizalanır (`align-items: end`, `align-content: end`): "Öğrenme yolculuğum", "Hakkımda" ve haritanın sağ altındaki "Dağıt, yeniden topla" aynı yatay çizgide ve aynı yükseklikte (48px; telefonda 46px) durur, düğmelerin altında yalnız kenar payı kalır; yüksek ekranlarda haritanın büyüyemediği yükseklik başlığın üstünde boşluk olarak kalmaz: `main.js` içindeki `fitHero()` gerçek boş alanı ölçüp başlık/paragraf satır aralıklarına ve aralara dağıtır (`--fit-*` değişkenleri, ölçülü üst sınırlarla; boş alan yoksa 0). Çok büyük ekranlarda (ör. 2560×1440) üst sınırı aşan kısım başlığın üstünde kalır. Harita sütunu `1.45fr` (1024–1279px'de `1.15fr`). ≤1023px'de (telefon ve tablet; kullanıcı isteği) harita en üstte ve kenar boşluklarını aşarak ekranı yatay kaplar; haritanın dolu bölümü (viewBox'ta x 100–745, y 70–690) gösterilir, boş kenarlar kırpılır (`--mw`, `cqw`). "Dağıt, yeniden topla" haritanın sağ alt köşesinde küçük bir düğmedir. Başlık, açıklama ve düğmeler haritanın altındadır; telefonda ilk ekranın altına taşabilir (kullanıcı haritanın büyük olmasını seçti). Masaüstü bu kurallardan etkilenmez.
- Renkler tema değişkenlerinden (`--map-dot`, `--map-node-bg`, `--accent`); tema değişince canvas yeniden çizilir.
- Animasyonlar cihazın “hareketi azalt” (`prefers-reduced-motion`) ayarından bağımsız olarak her zaman çalışır (kullanıcı isteği; sitede bu ayara bakan kural yok, yenisini ekleme). JavaScript yoksa SVG içindeki `.map-pattern` desen yedeği görünür.
- Harita altında açıklama satırı yok. Modül etiketleri telefonda da görünür (kullanıcı isteği): ≤1023px'de `map.js` içindeki `fitLabels()` yazı boyutunu ekrandaki ölçeğe göre ~9–10px yapar, etiketi "04 ·" ve ad olarak iki satıra böler ve sağ kenara sığmayanı biraz küçültür (yazı tipi yüklenince yeniden ölçer); masaüstünde özgün hâline döner.
- Başlık boyutu `min(vw, vh)` ile sınırlanır; giriş alanı ekrana sığmalı ve düğmelerin altında fazladan boşluk kalmamalı. Değiştirirken 1366×657, 1366×768, 1536×864, 1440×900, 1920×1080, 1180×820, 820×1180, 390×844 ve 360×740'ta ölç.

## Eğitim Modülleri (ana sayfa carousel'i)
- Tek veri kaynağı: `assets/js/modules.js` içindeki `MODULES` dizisi; her modülün `tr` ve `en` metinleri yan yana. Kartlar `createModuleCard()` ile üretilir.
- `en/index.html` içindeki carousel bölümünde `data-base="../"` var; kapak yolları buna göre tamamlanır.
- Süreler (dk) ders notlarındaki okuma sürelerinin toplamıdır: 34, 31, 17, 14, 11, 11, 15 = 133. Ders sayıları: 6, 6, 5, 5, 6, 6, 6.
- Bilinmeyen alan `null` kalır, kartta o satır gösterilmez. `progress` gerçek veri yoksa `null`; sahte ilerleme gösterme.
- Kapak görselleri `assets/img/modules/m1–m7.svg` (640×400, ortak gradyan ve palet).
- Görünüm: masaüstü 3, tablet (≤1023px) 2, mobil (≤640px) 1 kart + sonrakinin bir kısmı; scroll-snap, otomatik kaydırma ve döngü yok.

## Ders sayfaları (`ders.html?id=m1-d1` … `m7-d6`)
- Tek şablon `ders.html`; içerik tek veri dosyasından: `assets/js/lessons.tr.js` (`window.ORVENA_LESSONS`, blok türleri dosyanın başında açıklı). İngilizce şablon `en/ders.html` + `assets/js/lessons.en.js` (Türkçenin sadık çevirisi; aynı yapı ve kimlikler; prompt'lar ve komutlar aynen kalır, Türkçedeki “Anlamı: …” cümleleri İngilizcede yoktur). `lesson.js`, `sandbox.js` ve `listen.js` arayüz metinlerini `<html lang>`'a göre seçer (İngilizce sayfada İngilizce ses). 40 dersin ve Yayın günü sayfasının İngilizcesi hazır; dil bağlantısı her sayfada aynı sayfanın diğer dildeki karşılığına gider. Yeni bir ders eklenirse iki dilde birlikte yazılmalı.
- Düzen: ≥1200px üç sütun (müfredat · içerik · "Bu modülde"/"Bu derste" kartları). 1024–1199px (tablet yatay, ör. iPad 1180px): müfredat üstte tam genişlikte kapalı kutu, içerik solda, kartlar sağda 270px sabit sütunda (kullanıcı isteği: sağda boşluk kalmasın); sağ sütunda kart yoksa (Yayın günü) içerik ortalanır. ≤1023px tek sütun, kartlar gizli.
- Betik sırası: `lessons.tr.js` → `lesson.js` (sayfayı, müfredatı, "Bu modülde", "Bu derste", önceki/sonraki kartlarını üretir) → `sandbox.js` → `listen.js` → `main.js`. Stil: `assets/css/lesson.css`. `body[data-lesson-page]` olduğunda `main.js` eski yolculuk sayfasının kaydırma takibini çalıştırmaz.
- Yayın günü: veri dosyalarındaki `launch` nesnesi (modülü yok; 7. modülün son dersinden sonra gelir, `timeline` blok türünü kullanır, giriş alanında `sub` ve `chips` gösterilir). Müfredattaki "Yayın günü" `ders.html?id=yayin-gunu`'ya gider.
- Metinler PDF notlarına dayanır, talimat diliyle ve kendi cümlelerimizle yazılır; kurs metni birebir kopyalanmaz, kurs sağlayıcı adı ve sertifika geçmez. "Benim notum" birinci tekil şahıstır ve yaşanmamış deneyim iddia etmez.
- Sandbox simülasyondur (gerçek shell değil): `pwd`, `ls [-a]`, `mkdir`, `cd`, `cat`, `help`, `clear`; derse özel yanıtlar `sandbox.claude` (claude "…" istekleri) ve `sandbox.cmds` (`start …`, `/init`, `git …` gibi) içinde. "Şunları dene" önerileri tek sütunlu, numaralı bir listedir (`ol.sandbox__trylist`): her satırda sıra numarası, "$" ile komut (uzun adresler yalnızca "/" sonrasından kırılır) ve hemen altında açıklama (ikisi de sola hizalı; kullanıcı sağa yaslı açıklamayı istemedi); tıklanan satır kısa bir vurgu alır. Önerilerin hepsi çalışmalı; test ederken her öneriyi çalıştırıp "komut bulunamadı / yalnızca bu derste" çıktısı olmadığını kontrol et.
- "Claude'da aç" isteği panoya kopyalar ve `https://claude.ai/new?q=` adresini açar (resmî olmayan adres; alan boş gelirse kullanıcı yapıştırır).

## Seslendirme ("Okumak yerine dinle")
- `listen.js` ders metnini (`[data-read]` öğeleri) cümlelere böler. Kutu başlıkları, "Benim notum" ve zaman çizelgesi başlıkları sonlarına ":" eklenerek ayrı okunur. Noktalama yalnızca ardından boşluk/metin sonu gelirse cümleyi bitirir (`index.html`, e-posta, "git add ." bölünmez).
- Dersin ElevenLabs seslendirmesi varsa (`assets/audio/{tr|en}/{id}.mp3` + `{id}.js`, `window.ORVENA_AUDIO`) MP3 çalınır, vurgu cümle zamanlamalarıyla ilerler. Ses dosyası yoksa ya da cümleler sayfadakiyle uyuşmuyorsa (metin değişmiş) tarayıcı sesine (Web Speech API) düşer. MP3 yalnızca dinlemeye basınca iner. Veri `.js` dosyasıdır (`file://`'da `fetch` çalışmadığı için).
- Dinleme başladıktan sonra kutu ekrandan çıkınca `.listen__panel.is-docked` ile ekranın altına yapışır (kullanıcı isteği; masaüstünde ders sütunu genişliğinde, ≤640px tam genişlik), ✕ durdurup kapatır, kutu görünür olunca yerine döner. Oynat düğmesinin simgesi yalnızca durum değişince yeniden çizilir (her karede çizmek tıklamaları yutuyordu).
- Üretim: `scripts/seslendir.ps1` (PowerShell; Python/Node yok). Metni ders sayfasının kendisinden alır (`scripts/metin-cikar.html`, Edge headless) ve ElevenLabs'e gönderir. Ses: "Mehdi – Tutorials" (`i6R4vMs6x0h8Fiv7b1NI`), model `eleven_multilingual_v2`, `mp3_44100_64`. API anahtarı yalnızca `ELEVENLABS_API_KEY` ortam değişkeninden okunur; hiçbir dosyaya yazılmaz. Kütüphane sesi API'de ücretli plan ister.
  - `.\scripts\seslendir.ps1 -Ids m1-d1,m1-d2 -DryRun -Show` → kredi harcamadan karakter sayısı ve okunuşu değişen cümleler. `-DryRun`'sız üretir; metni/ayarları değişmemiş dersi atlar, `-Force` yeniden üretir.
  - Okunuş kuralları (`Convert-Speech`) yalnızca sese giden metni değiştirir: `$` dolar işareti, `~` tilda, `/clear` slash clear, `@` et (işareti), `index.html` index nokta html, `.gitignore` nokta gitignore, `→` ", sonra", `+` artı, `my-first-project` my first project vb. (kullanıcı onayladı).
  - Bir dersin metni değişirse o ders için betiği yeniden çalıştır; aksi hâlde o derste tarayıcı sesi kullanılır.
- Durum (2026-11-07): Türkçe 16 ders seslendirildi (m1-d1 … m3-d4); kalanlar kredi yenilenince üretilecek. İngilizce seslendirme yok (ses İngilizce için doğrulanmamış; ayrı karar).

## Dersler ve bağlantılar
- Her dersin kimliği `m{modül}-d{ders}` (örn. `#m3-d2`). Toplam 40 ders.
- Eski `yolculuk.html#m3-d2` bağlantıları yönlendirme sayfası sayesinde ilgili ders sayfasına gider. Yeni ders eklenirse iki dilde de veri dosyasına eklenir; müfredat, "Bu modülde" kartı ve önceki/sonraki kartları ondan üretilir.
- Müfredat modülleri açılır/kapanır (kullanıcının paylaştığı referans videoya göre): modül başlığı iki parçalıdır: `<div class="cur-module__head cur-module__head--split">` içinde modül adı `<a class="cur-module__link">` (o modülün derslerini açar ve modülün ilk dersine gider; ayrıca "Bu modülde" kartındaki ad ve giriş alanındaki "Modül N" o modülün ilk dersine, `ders.html?id=mN-d1`, gider) ve ok düğmesi `<button class="cur-module__toggle" aria-expanded aria-controls="cur-mN">` (yalnızca açar/kapatır, sayfayı kaydırmaz). Dersler `.cur-lessons-wrap#cur-mN` içinde. Ders sayfasında yalnızca geçerli dersin modülü açık gelir (`data-open`). Birden fazla modül aynı anda açık olabilir. JS yoksa hepsi açık kalır.

## Stil
- İki tema: kayıtlı tercih yoksa sistem teması (`prefers-color-scheme`). Üst menüdeki güneş/ay düğmesi `data-theme` özniteliğini değiştirir; seçim `localStorage`'da (`theme`) saklanır ve dil değişince de korunur.
- Her sayfanın `<head>` bölümünde temayı erken uygulayan kısa satır içi betik var; yeni sayfa eklerken onu da kopyala.
- Renkler `:root` (koyu: kömür zemin) ve `:root[data-theme="light"]` (aydınlık: sıcak kırık beyaz) değişkenlerinde. Yeni renk eklerken değişken kullan, iki temada da tanımla.
- Vurgu: koyuda `#e8622c`, aydınlıkta `#bf3a1b`. Beyaz yazılı dolgular (butonlar, rozetler) `--accent-fill` kullanır (beyaz metinle ≥4.5:1). Terminal kutuları iki temada da koyu kalır.
- Yazı tipleri: Instrument Serif (ana sayfa başlığı ve kart başlıkları; yalnızca ana sayfalarda yüklenir), Inter (metin), JetBrains Mono (etiketler, numaralar, kod).
- Ortak kenar boşluğu `--gutter`: masaüstü 56px, ≤1023px 28px, ≤640px 20px. En geniş sayfa `--maxw: 1440px`. Üst menü, giriş alanı, bölümler ve footer aynı kenar çizgisinde.
- Uzun paragraflar iki yana yaslı (`text-align: justify`, son satır sola, `hyphens: auto`), en fazla ~68ch; telefon ve tablette de yaslıdır (kullanıcı isteği). Carousel kart açıklamaları da yaslıdır (3 satır sınırıyla uyumlu ayrı kural). Ana sayfa kısa hakkımda paragrafları ~68ch sınırı olmadan sütunun tam genişliğinde yaslıdır (kullanıcı isteği). Başlıklar, menü, butonlar, kısa etiketler ve footer yaslanmaz.
- Üst menü: 72px (≤760px 68px); 1080px ve altında açılır menü. "İletişim →" vurgu butonu menünün sonunda; İletişim ayrıca menüde tekrarlanmaz.
- Referans sitelerin logosu, metinleri ve marka öğeleri kopyalanmaz.

## Sınırlar
- Bağlantılar göreli olmalı (site alt klasörden yayınlanıyor).
- Kaynak klasörleri (`CV/`, `Fotoğraf/`, `Logo/`, `Claude Code ile yayına al/` kurs notları) `.gitignore` ile depo dışında (tasarım referansları ve videolar kullanıcının isteğiyle silindi); bunları commit'leme. `git add -A` yerine dosyaları adıyla ekle ya da önce `git status` ile kontrol et.
- Yayınlamadan (push / Pages ayarı) önce kullanıcıdan onay al.
