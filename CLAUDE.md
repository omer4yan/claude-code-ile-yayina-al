# Ömer Ayan — kişisel site

Derleme adımı olmayan statik site (HTML + CSS + biraz JS). GitHub Pages'te yayınlanır:
https://omer4yan.github.io/claude-code-ile-yayina-al/

## Sayfalar
- `index.html` — Ana sayfa: giriş alanı, 40 parçalı ders şeridi, "İlk sitem yayında" kartı, 7 modül listesi, kısa hakkımda, iletişim
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
