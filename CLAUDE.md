# Ömer Ayan — kişisel site

Derleme adımı olmayan statik site (HTML + CSS + biraz JS). GitHub Pages'te yayınlanır:
https://omer4yan.github.io/claude-code-ile-yayina-al/

## Marka
- Marka adı **Orvena**; üst menüde logo + "Orvena" yazısı. Kişisel içerik (giriş başlığı, hakkımda, telif satırı) "Ömer Ayan" adıyla kalır.
- Logo: `assets/img/orvena-logo.png` (512), `orvena-logo-192.png` (menü + apple-touch-icon), `favicon-32.png`, `favicon-64.png`.
  Kaynak `Logo/Logo.png` (depo dışında); web sürümleri kırmızı leke ve siyah sis temizlenip kırpılarak üretildi, renk `rgb(185,71,29)`.

## Sayfalar
- `index.html` — Ana sayfa: giriş alanı, 40 parçalı ders şeridi, "İlk sitem yayında" kartı, "Eğitim Modülleri" carousel'i, kısa hakkımda, iletişim
- `yolculuk.html` — Öğrenme yolculuğu: solda müfredat, ortada 7 modül + "Yayın günü", sağda "Bu modülde" ve "Çalışma döngüm" kartları
- `hakkimda.html` — Fotoğraf, hakkımda metni, deneyim, eğitim, sertifikalar, teknik beceriler
- Ortak: `assets/css/style.css`, `assets/js/main.js`, `assets/img/`

## Görmek için
`index.html` dosyasını tarayıcıda aç (Windows: `start index.html`).

## İçerik kuralları
- Metinler birinci tekil şahıs, Türkçe, samimi ve abartısız.
- Modül/ders adları ve konular yalnızca `Claude Code ile yayına al/` klasöründeki PDF notlarından alınır; uydurma yok.
- Hakkımda bilgileri yalnızca CV'den (`CV/`) alınır. Telefon, adres ve referanslar sitede YER ALMAZ.
- Kurs sağlayıcı adı, kurs bağlantısı, sertifika ve ilerleme bilgisi (yüzde, x/40, "tamamlandı") gösterilmez.
- "Yedi modülü bitirdim" ifadesi yalnızca yolculuk sayfasının girişinde bir kez geçer.
- E-posta: omer.4yan@gmail.com · GitHub: github.com/omer4yan · LinkedIn: linkedin.com/in/omer-ayan
- Modül 1: başlık "Claude Code'u kur", alt başlık "Terminalde ilk adımlar". Ders sayıları PDF'lere göre (6, 6, 5, 5, 6, 6, 6 = 40).

## Eğitim Modülleri (ana sayfa carousel'i)
- Tek veri kaynağı: `assets/js/modules.js` içindeki `MODULES` dizisi; kartlar `createModuleCard()` ile üretilir. Metni yalnızca orada düzenle.
- Süreler (dk) ders notlarındaki okuma sürelerinin toplamıdır: 34, 31, 17, 14, 11, 11, 15 = 133. Ders sayıları: 6, 6, 5, 5, 6, 6, 6.
- Bilinmeyen alan `null` kalır, kartta o satır gösterilmez. `progress` gerçek veri yoksa `null`; sahte ilerleme gösterme.
- Kapak görselleri `assets/img/modules/m1–m7.svg` (640×400, ortak gradyan ve palet). Yeni görsel aynı şablonu izlemeli.
- Görünüm: masaüstü 3, tablet (≤1023px) 2, mobil (≤640px) 1 kart + sonrakinin bir kısmı; scroll-snap, otomatik kaydırma ve döngü yok.
- Başlıklar "Instrument Serif" (yalnızca index.html'de yüklenir).

## Dersler ve bağlantılar
- Her modülde `.lessons` listesi var; her dersin kimliği `m{modül}-d{ders}` (örn. `#m3-d2`). Toplam 40 ders.
- Sol müfredat, sağdaki "Bu modülde" kartı ve ana sayfadaki 40 parçalı şerit bu kimliklere bağlanır. Yeni ders eklenirse üçünü de güncelle.
- Sağ kart, JS ile soldaki müfredattan üretilir; ayrıca elle düzenleme gerekmez.

## Stil
- İki tema: varsayılan koyu, isteğe bağlı aydınlık. Üst menüdeki güneş/ay düğmesi `data-theme` özniteliğini değiştirir, seçim `localStorage`'da (`theme`) saklanır.
- Renkler `:root` (koyu) ve `:root[data-theme="light"]` (aydınlık) değişkenlerinde. Yeni renk eklerken sabit değer değil, değişken kullan; iki temada da tanımla.
- Vurgu turuncusu: koyuda `#e8622c`, aydınlıkta `#c2410c` (beyaz zeminde okunabilirlik için). Terminal kutuları iki temada da koyu kalır.
- Her sayfanın `<head>` bölümünde temayı erken uygulayan kısa satır içi betik var; yeni sayfa eklerken onu da kopyala.
- Inter (metin) + JetBrains Mono (etiketler, numaralar, kod).
- Referans sitenin logosu, metinleri ve marka öğeleri kopyalanmaz.
- Kırılımlar: 1200px (3 sütun → tek sütun), 960px, 760px (hamburger menü).

## Sınırlar
- Bağlantılar göreli olmalı (site alt klasörden yayınlanıyor).
- Kaynak materyal klasörleri `.gitignore` ile depo dışında; bunları commit'leme.
- Yayınlamadan (push / Pages ayarı) önce kullanıcıdan onay al.
