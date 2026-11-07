/* =========================================================
   Ders içerikleri (Türkçe) — tek veri kaynağı
   ---------------------------------------------------------
   Kaynak: kullanıcının "Claude Code ile yayına al/" klasöründeki PDF ders notları.
   Metinler PDF'lere dayanır, kendi cümlelerimizle ve talimat diliyle yazılır;
   kurs sağlayıcının metinleri birebir kopyalanmaz.

   Ders alanları:
   - id: "m1-d1" biçiminde; yolculuk sayfasındaki kimliklerle aynı
   - title, minutes (PDF'teki okuma süresi)
   - ready: true ise ders sayfası hazırdır; false ise bağlantı yolculuk sayfasına gider
   - intro: giriş paragrafları (HTML)
   - blocks: ders gövdesi. Blok türleri:
       { t: "h", text }                 adım başlığı
       { t: "p", html }                 paragraf
       { t: "cmd", code, expect? }      komut kutusu (+ "Şunu görmelisin")
       { t: "code", code, label? }      prompt/örnek kutusu
       { t: "callout", kind: "info"|"tip"|"warn", title, html }
       { t: "table", head:[...], rows:[[...]] }
       { t: "list", items:[html] }      madde listesi
       { t: "steps", items:[html] }     numaralı adımlar
       { t: "practice" }                pratik satırı (Sandbox'ı aç / Claude'da aç) ve sandbox
   - trouble: [{ q, a }]  "Çalışmadıysa" kutuları
   - have: [html]         "Şimdi elinde ne var"
   - note: html           "Benim notum" (birinci tekil şahıs)
   - next: html           "Sırada"
   - sandbox: simüle terminal ayarı (cwd, dirs, files, claude yanıtları, öneriler)
   - prompt: "Claude'da aç" ile claude.ai'de açılacak örnek istek
   ========================================================= */
window.ORVENA_LESSONS = {
  course: `Claude Code ile Yayına Al`,
  // İngilizce ders sayfası hazır olan modüller (dil bağlantısı en/ders.html'e gider; diğerleri en/yolculuk.html'e)
  enReady: [`m1`, `m2`, `m3`],
  modules: [
    {
      id: `m1`, no: 1, title: `Claude Code'u kur`, sub: `Terminalde ilk adımlar`,
      lessons: [
        {
          id: `m1-d1`, title: `Terminalin, tarayıcıda`, minutes: 8, ready: true,
          intro: [
            `Önümüzdeki birkaç dakikada terminalle tanışacak ve ilk projen için bir klasör hazırlayacaksın. Bu dersteki alıştırmaları sayfadaki pratik terminalinde yaparsın: kurulum ya da ücretli bir plan gerekmez ve yazdığın komutlar bilgisayarındaki dosyalara dokunmaz.`
          ],
          blocks: [
            { t: `callout`, kind: `info`, title: `Bu derste`, html: `Nerede olduğunu soracak, klasörleri listeleyecek, yeni bir klasör oluşturacak ve içine gireceksin.` },
            { t: `h`, text: `Adım 1 — Terminalle tanış` },
            { t: `p`, html: `Terminal, bilgisayara talimatları tıklamak yerine yazarak verdiğin bir penceredir. Programcılar terminali sık kullanır; bu kursun konusu olan Claude Code da terminalde çalışır.` },
            { t: `p`, html: `Aşağıdaki <strong>Sandbox'ı aç</strong> düğmesiyle pratik terminalini aç ve içine tıkla. Son satırdaki <code>$</code> işaretinin yanında yanıp sönen blok imleçtir; terminalin senden komut beklediğini gösterir. Komutu yaz ve <kbd>Enter</kbd> tuşuna bas.` },
            { t: `practice` },
            { t: `callout`, kind: `tip`, title: `Örnekler nasıl okunur?`, html: `<code>$</code> ile başlayan satır komuttur; <code>$</code> işaretini yazma. Altındaki “Şunu görmelisin” kutusu, terminalden beklenen yanıttır.` },
            { t: `h`, text: `Adım 2 — Nerede olduğunu sor` },
            { t: `p`, html: `Şunu yaz ve <kbd>Enter</kbd>'a bas:` },
            { t: `cmd`, code: `pwd`, expect: `~` },
            { t: `p`, html: `<code>pwd</code>, “print working directory” (çalışma dizinini yazdır) ifadesinin kısaltmasıdır. Dizin, klasör demektir. Gelen <code>~</code> yanıtı ev klasörünü gösterir; her terminal oturumu buradan başlar.` },
            { t: `h`, text: `Adım 3 — Etrafına bak` },
            { t: `cmd`, code: `ls`, expect: `Documents/  Downloads/` },
            { t: `p`, html: `<code>ls</code>, bulunduğun klasörün içindekileri listeler. Bu örnekte Documents ve Downloads adında iki klasör var. Adın sonundaki <code>/</code> işareti, onun bir dosya değil klasör olduğunu gösterir.` },
            { t: `h`, text: `Adım 4 — Proje klasörünü oluştur` },
            { t: `p`, html: `Her projenin kendi klasörü olsun. İlk projen için bir tane oluştur:` },
            { t: `cmd`, code: `mkdir my-first-project` },
            { t: `p`, html: `Hiçbir yanıt gelmemesi normaldir: komut başarılı olduğunda terminal genellikle sessiz kalır ve yeni bir komut satırı açar. Terminalde sessizlik çoğu zaman işin yapıldığı anlamına gelir. Kontrol etmek için <code>ls</code> komutunu tekrar çalıştır; listede <code>my-first-project/</code> klasörünü de görmelisin.` },
            { t: `p`, html: `Şimdi klasörün içine gir ve nerede olduğunu yeniden sor:` },
            { t: `cmd`, code: `cd my-first-project` },
            { t: `cmd`, code: `pwd`, expect: `~/my-first-project` },
            { t: `p`, html: `<code>cd</code>, “change directory” (dizin değiştir) demektir ve bulunduğun klasörü değiştirir. <code>pwd</code> artık <code>~/my-first-project</code> diyor: yer değiştirdin.` },
            { t: `callout`, kind: `tip`, title: `İpucu`, html: `Komutları önerilere tıklamak yerine kendin yaz; bir komutu kendin yazınca sihir olmaktan çıkar ve tanıdık birkaç harfe dönüşür. Önceki komutlara dönmek için yukarı ok tuşunu, ekranı temizlemek için <kbd>Ctrl</kbd> + <kbd>L</kbd> (Mac'te <kbd>Command</kbd> + <kbd>L</kbd>) kısayolunu kullan.` }
          ],
          trouble: [
            { q: `“command not found” görüyorum`, a: `Komutu harfi harfine kontrol et: küçük harfle ve fazladan boşluk olmadan yazılmalı. Bu dersteki komutları bilgisayarının terminaline değil, sayfadaki pratik terminaline yaz.` },
            { q: `mkdir “File exists” diyor`, a: `Klasör zaten var; yeniden oluşturman gerekmez. <code>ls</code> ile listede olduğunu doğrula ve <code>cd my-first-project</code> ile içine gir.` }
          ],
          have: [
            `Kullanabildiğin dört temel komut: <code>pwd</code>, <code>ls</code>, <code>mkdir</code> ve <code>cd</code>.`,
            `<code>my-first-project</code> adında bir proje klasörü ve şu an onun içindesin.`
          ],
          note: `Terminalde bir komutun hiçbir şey yazmamasının hata değil, çoğu zaman başarı anlamına geldiğini bu derste öğrendim.`,
          next: `Sırada: Claude'dan bu klasörde bir dosya oluşturmasını isteyecek, sonra dosyaya bakacaksın. Hâlâ tarayıcıda çalışacaksın; Claude Code'u kendi bilgisayarına Modül 2'nin başında kuracaksın.`,
          prompt: `Terminale yeni başlıyorum. pwd, ls, mkdir ve cd komutlarının ne işe yaradığını basit örneklerle açıklar mısın? Sonra bunları denemem için 3 küçük alıştırma ver.`,
          sandbox: {
            open: true, cwd: `~`,
            dirs: [`~`, `~/Documents`, `~/Downloads`],
            files: {},
            try: [
              { cmd: `pwd`, desc: `hangi klasördeyim?` },
              { cmd: `ls`, desc: `içinde ne var?` },
              { cmd: `mkdir my-first-project`, desc: `proje klasörü oluştur` },
              { cmd: `cd my-first-project`, desc: `klasörün içine gir` }
            ]
          }
        },
        {
          id: `m1-d2`, title: `İlk dosyan`, minutes: 6, ready: true,
          intro: [
            `Proje klasörün hazır. Şimdi Claude'a bir iş verecek, işi yaptığını izleyecek ve ardından dosyanın gerçekten oluştuğunu ve içeriğinin doğru olduğunu kendin kontrol edeceksin.`
          ],
          blocks: [
            { t: `callout`, kind: `info`, title: `Uygulama ortamı`, html: `Bu alıştırma da pratik terminalinde yapılır. İçinde simüle edilmiş bir Claude Code çalışır; kurulum veya ücretli plan gerekmez. Gerçek Claude Code ile çalışmaya Modül 2'nin başında geçeceksin. Başlangıç konumu: <code>~/my-first-project</code>` },
            { t: `practice` },
            { t: `h`, text: `Adım 1 — Bir dosya iste` },
            { t: `p`, html: `Aşağıdaki komutu yaz ve <kbd>Enter</kbd>'a bas. Yapıştırmak yerine kendin yazmayı dene. Tırnak içindeki bölüm bir terminal komutu değil, Claude'a sıradan bir cümleyle verdiğin talimattır.` },
            { t: `cmd`, code: `claude "make a file called hello.txt that says hello"`, expect: `[OK] wrote hello.txt` },
            { t: `p`, html: `Talimatın anlamı: “İçinde <em>hello</em> yazan, hello.txt adında bir dosya oluştur.” Gelen yanıt, simülasyondaki Claude'un dosyayı yazdığını bildirir. Bir sonraki adımda bunu kendin doğrulayacaksın.` },
            { t: `callout`, kind: `warn`, title: `Onay konusu`, html: `Kendi bilgisayarında Claude Code ile çalışırken dosya yazma gibi işlemlerde onay istenebilir. Bu davranış izin ayarlarına ve çalışma moduna bağlıdır; izinlerin neden önemli olduğunu 5. derste göreceksin.` },
            { t: `h`, text: `Adım 2 — Dosyayı bul ve içeriğini oku` },
            { t: `p`, html: `Bu adımı atlama. Claude'un işi yaptığını söylemesi kadar, ortaya çıkan sonucu kontrol etmek de önemlidir. Önce klasörün içindekileri listele:` },
            { t: `cmd`, code: `ls`, expect: `hello.txt` },
            { t: `p`, html: `Dosya listede görünüyor. Şimdi içeriğini oku:` },
            { t: `cmd`, code: `cat hello.txt`, expect: `hello` },
            { t: `p`, html: `<code>cat</code>, bir dosyanın içeriğini terminal ekranına yazdırır. Dosyanın içindeki kelimeyi sen yazmadın: ne istediğini anlattın, Claude dosyayı oluşturdu ve sen sonucu doğruladın.` },
            { t: `p`, html: `Dosyanın hangi klasörde olduğunu hatırlamak istersen <code>pwd</code> komutunu kullan:` },
            { t: `cmd`, code: `pwd`, expect: `~/my-first-project` }
          ],
          trouble: [
            { q: `“command not found” görüyorum`, a: `Komutun <code>claude</code> ile başladığını ve doğru yazıldığını kontrol et. Bu alıştırmayı bilgisayarının terminalinde değil, sayfadaki pratik terminalinde yap.` },
            { q: `Claude farklı bir yanıt veriyor`, a: `Dosya adını ve tırnak içindeki talimatı örnekle harfi harfine karşılaştır. Ardından <code>ls</code> ve <code>cat hello.txt</code> ile sonucu kontrol et.` }
          ],
          have: [
            `Claude'dan sıradan bir cümleyle dosya oluşturmasını istedin.`,
            `Proje klasöründe dosyanın oluştuğunu gördün.`,
            `Dosyayı bulup içeriğini kendin okudun.`
          ],
          note: `Claude'un “yaptım” demesiyle yetinmeyip sonucu <code>ls</code> ve <code>cat</code> ile kendim doğrulamanın önemini bu derste öğrendim.`,
          next: `Sırada: Dosyaların nereye kaydedildiğini ve bir sonraki dosyanın konumuna nasıl karar vereceğini öğreneceksin.`,
          prompt: `Claude Code ile çalışırken Claude bir dosya oluşturduğunu söylediğinde, sonucu terminalde nasıl doğrularım? ls ve cat komutlarıyla adım adım anlatır mısın?`,
          sandbox: {
            open: true, cwd: `~/my-first-project`,
            dirs: [`~`, `~/Documents`, `~/Downloads`, `~/my-first-project`],
            files: {},
            claude: [
              { match: `make a file called hello.txt that says hello`, write: { "~/my-first-project/hello.txt": `hello` }, out: [`[OK] wrote hello.txt`] }
            ],
            try: [
              { cmd: `claude "make a file called hello.txt that says hello"`, desc: `Claude'dan dosya iste` },
              { cmd: `ls`, desc: `dosya oluştu mu?` },
              { cmd: `cat hello.txt`, desc: `içinde ne yazıyor?` },
              { cmd: `pwd`, desc: `hangi klasördeyim?` }
            ]
          }
        },
        {
          id: `m1-d3`, title: `O dosya nereye gitti?`, minutes: 6, ready: true,
          intro: [
            `Bir önceki derste <code>hello.txt</code> dosyasını oluşturdun. Şimdi dosyanın hangi klasörde olduğunu bulacak ve yeni dosyaların nereye kaydedileceğine nasıl karar vereceğini öğreneceksin.`
          ],
          blocks: [
            { t: `callout`, kind: `info`, title: `Temel fikir`, html: `Terminalin her an bir çalışma dizini, yani içinde bulunduğu bir klasör vardır. Claude'u proje klasöründe başlatmak, çalışmanın bağlamını belirler. Göreli yollarla oluşturulan dosyalar, kullanılan yola ve çalışma dizinine göre kaydedilir.` },
            { t: `callout`, kind: `warn`, title: `Erişim hakkında`, html: `Claude Code'un yalnızca başlatıldığı klasörü görebildiğini varsayma. Başka konumlara erişimi; izinlere, eklenen dizinlere ve sandbox ayarlarına bağlı olabilir. Proje klasörü tek başına bir güvenlik sınırı değildir.` },
            { t: `practice` },
            { t: `h`, text: `Adım 1 — Pratik terminalinde dosyanı bul` },
            { t: `p`, html: `Bu kez proje klasörünün bir üstündesin. Önce nerede olduğunu sor:` },
            { t: `cmd`, code: `pwd`, expect: `~` },
            { t: `p`, html: `Şimdi içindekileri listele:` },
            { t: `cmd`, code: `ls`, expect: `Documents/  Downloads/  my-first-project/` },
            { t: `p`, html: `Önemli olan <code>my-first-project</code> klasörünü bulmak. <code>hello.txt</code> burada görünmez, çünkü proje klasörünün içindedir.` },
            { t: `callout`, kind: `tip`, title: `Hatırla`, html: `Terminalin bulunduğu klasörün değişmesi dosyayı taşımaz. Dosya aynı yerde kalır; değişen, senin bulunduğun klasördür.` },
            { t: `h`, text: `Adım 2 — Proje klasörüne gir` },
            { t: `cmd`, code: `cd my-first-project` },
            { t: `cmd`, code: `pwd`, expect: `~/my-first-project` },
            { t: `cmd`, code: `cat hello.txt`, expect: `hello` },
            { t: `p`, html: `<code>cd</code> çalışma dizinini değiştirir; <code>cat hello.txt</code> bu klasördeki dosyanın içeriğini gösterir. Dosyanı buldun. Bir üst klasöre geri dönmek için <code>cd ..</code> yazabilirsin.` },
            { t: `h`, text: `Adım 3 — Yeni işin konumunu seç` },
            { t: `p`, html: `Bu adımdaki akış, Modül 2'de kuracağın gerçek Claude Code içindir. Yeni bir proje için önce <code>mkdir my-first-project</code> ile klasör oluştur; klasör zaten varsa yeniden oluşturman gerekmez. Proje klasörünün bir üstündeyken şunları çalıştır:` },
            { t: `code`, label: `Terminal`, code: `cd my-first-project\nclaude` },
            { t: `p`, html: `Claude açılınca şu talimatı ver:` },
            { t: `code`, label: `Claude'a`, code: `make a file called notes.md with three bullet points\nabout what I learned today` },
            { t: `p`, html: `Anlamı: “Bugün öğrendiklerim hakkında üç madde içeren notes.md adlı bir dosya oluştur.” Gerekirse istenen onayı ver. Ardından <code>/exit</code> ile Claude'dan çık ve <code>ls</code> ile dosyayı kontrol et. Dosyanın proje klasöründe olması beklenir.` },
            { t: `h`, text: `Hatırlamaya değer dört komut` },
            { t: `table`, head: [`Komut`, `Ne yapar?`], rows: [
              [`<code>pwd</code>`, `Hangi klasörde olduğunu gösterir.`],
              [`<code>ls</code>`, `O klasördeki dosya ve klasörleri listeler.`],
              [`<code>cd klasöradı</code>`, `Belirtilen klasörün içine girer.`],
              [`<code>cd ..</code>`, `Bir üst klasöre çıkar.`]
            ] },
            { t: `callout`, kind: `info`, title: `Windows farkı`, html: `PowerShell'de <code>pwd</code> çıktısı “Path” başlığı altında <code>C:\\Users\\adın</code> gibi bir yol gösterebilir; <code>ls</code> ise sütunlu bir liste verir. macOS ve Linux'ta görünüm farklıdır. <code>ls -la</code> gibi seçenekler PowerShell'de aynı şekilde çalışmayabilir; bu ders için <code>ls</code> yeterlidir.` }
          ],
          trouble: [
            { q: `“Klasör zaten var” mesajı`, a: `<code>ls</code> ile klasörün listede olduğunu kontrol et, ardından <code>cd</code> ile içine gir.` },
            { q: `“Yol bulunamadı” mesajı`, a: `<code>pwd</code> ile nerede olduğunu, <code>ls</code> ile o klasörde ne olduğunu kontrol et. Klasör adını harfi harfine karşılaştır.` }
          ],
          have: [
            `<code>pwd</code> konumunu, <code>ls</code> içeriği gösterir; <code>cd</code> konumunu değiştirir.`,
            `Terminal başka bir klasöre geçse de dosyanın yerinde kaldığını gördün.`,
            `Her proje için ayrı bir klasör kullanmanın ve Claude'u o klasörde başlatmanın önemini öğrendin.`
          ],
          note: `Claude'u hangi klasörde başlattığımın, dosyaların nereye kaydedileceğini belirlediğini bu derste netleştirdim.`,
          next: `Sırada: Claude yanlış yaptığında çalışmayı nasıl durduracağını ve değişiklikleri nasıl geri alacağını öğreneceksin.`,
          prompt: `Terminalde “çalışma dizini” ne demek? Göreli bir yolla oluşturulan dosyanın nereye kaydedileceğini basit bir örnekle açıklar mısın?`,
          sandbox: {
            open: true, cwd: `~`,
            dirs: [`~`, `~/Documents`, `~/Downloads`, `~/my-first-project`],
            files: { "~/my-first-project/hello.txt": `hello` },
            try: [
              { cmd: `pwd`, desc: `neredeyim?` },
              { cmd: `ls`, desc: `proje klasörünü bul` },
              { cmd: `cd my-first-project`, desc: `içine gir` },
              { cmd: `cat hello.txt`, desc: `dosyayı oku` },
              { cmd: `cd ..`, desc: `bir üst klasöre çık` }
            ]
          }
        },
        {
          id: `m1-d4`, title: `Claude yanlış yaptığında`, minutes: 6, ready: true,
          intro: [
            `Claude seni yanlış anlayabilir, yanlış dosyayı düzenleyebilir ya da beklediğine yakın ama eksik bir sonuç üretebilir. Önemli olan sonucu kontrol etmek ve bir sonraki adımı bilinçli seçmektir.`
          ],
          blocks: [
            { t: `callout`, kind: `info`, title: `Bu derste`, html: `Çalışmayı durdurmayı, uygun olduğunda değişiklikleri geri almayı, sorunu açıkça tarif etmeyi ve gerektiğinde temiz bir konuşmayla yeniden başlamayı öğreneceksin. Pratik terminalinde gözlemlediğin sorunu anlatmayı deneyeceksin; <code>Esc</code>, <code>/rewind</code> ve <code>/clear</code> bölümleri Modül 2'de kuracağın gerçek Claude Code oturumu içindir.` },
            { t: `practice` },
            { t: `h`, text: `Adım 1 — Önce sorunu gör` },
            { t: `p`, html: `Pratik ortamında <code>poem.txt</code> oluşturulmuş, ancak dosya boş kalmış. İçeriğini kontrol et:` },
            { t: `cmd`, code: `cat poem.txt`, expect: `(hiçbir şey yazmaz — dosya boş)` },
            { t: `p`, html: `Claude'a yalnızca “yanlış” demek yerine, gördüğün sonucu ve beklediğini birlikte anlat:` },
            { t: `cmd`, code: `claude "the file was created but it is empty; I expected the poem"` },
            { t: `p`, html: `Anlamı: “Dosya oluşturuldu ama boş; içinde şiir olmasını bekliyordum.” Ardından isteğini net biçimde yeniden ver ve sonucu oku:` },
            { t: `cmd`, code: `claude "write a poem about the sea in a file called poem.txt"`, expect: `[OK] wrote poem.txt` },
            { t: `cmd`, code: `cat poem.txt` },
            { t: `h`, text: `Adım 2 — İşin ortasında durdur` },
            { t: `p`, html: `Gerçek bir Claude Code oturumunda istemediğin bir işlemin başladığını fark edersen bitmesini bekleme. <kbd>Esc</kbd> tuşuyla çalışmayı kesintiye uğrat. Ardından neyi değiştirmek istediğini açıkça yaz; bütün oturumu baştan başlatman gerekmez.` },
            { t: `h`, text: `Adım 3 — Değişiklikleri geri al` },
            { t: `p`, html: `Önceki bir noktaya dönmek için giriş alanı boşken <kbd>Esc</kbd>'ye iki kez bas ya da şu komutu kullan:` },
            { t: `code`, label: `Claude oturumunda`, code: `/rewind` },
            { t: `p`, html: `Açılan menüde dönmek istediğin noktayı seç. Ardından dosyaları, konuşmayı ya da ikisini birlikte geri yüklemeyi seçebilirsin:` },
            { t: `table`, head: [`Seçenek`, `Ne yapar?`], rows: [
              [`Restore code and conversation`, `İzlenen dosya değişikliklerini ve konuşmayı seçilen noktaya döndürür.`],
              [`Restore conversation`, `Konuşmayı seçilen noktaya döndürür; dosyaları olduğu gibi bırakır.`],
              [`Restore code`, `İzlenen dosya değişikliklerini geri alır; konuşmayı korur.`],
              [`Never mind`, `Hiçbir şeyi değiştirmeden menüden çıkar.`]
            ] },
            { t: `p`, html: `Hem dosyalarda hem konuşmada sorun başlamadan önceki duruma dönmek istiyorsan <strong>Restore code and conversation</strong> seçeneğini kullan.` },
            { t: `callout`, kind: `warn`, title: `Geri alma, yedek değildir`, html: `<code>/rewind</code>'ın her işlemi geri alacağını varsayma. Claude'un doğrudan yaptığı dosya düzenlemeleri ile terminal komutlarının etkileri ayrıdır: silme, taşıma veya kopyalama gibi komutlarla yapılan işlemler checkpoint kapsamı dışında kalabilir. Checkpoint'leri oturum içindeki bir geri dönüş aracı olarak düşün; kalıcı değişiklik geçmişi için Git ve yedek kullanılır. Git, Modül 5'te ele alınır.` },
            { t: `h`, text: `Adım 4 — Gözlemini ve beklentini birlikte söyle` },
            { t: `p`, html: `Sonuç yakın ama doğru değilse “hayır, düzelt” yerine iki bilgi ver: <strong>ne gördün</strong> ve <strong>ne bekliyordun</strong>?` },
            { t: `code`, label: `Claude'a`, code: `the file was created but it is empty;\nI expected three bullet points in it` },
            { t: `p`, html: `Anlamı: “Dosya oluşturuldu ama boş; içinde üç madde olmasını bekliyordum.” Bu ifade, Claude'a hangi sonucu düzeltmesi gerektiğini somut olarak anlatır.` },
            { t: `h`, text: `Adım 5 — Aynı döngü sürüyorsa yeniden başla` },
            { t: `p`, html: `Pratik bir kural: İki düzeltme denemesi de sonuç vermediyse aynı konuşmayı uzatmak yerine temiz bir başlangıç yapmayı düşün. Konuşmayı temizlemek için:` },
            { t: `code`, label: `Claude oturumunda`, code: `/clear` },
            { t: `p`, html: `<code>/clear</code> konuşma bağlamını temizler; dosya değişikliklerini geri almaz. Sonra isteğini tek ve net bir mesajda yeniden yaz; başarısız denemelerden öğrendiğin gereksinimleri de ekle.` },
            { t: `h`, text: `Şimdi dene: bir değişikliği geri al` },
            { t: `p`, html: `Bu alıştırmayı gerçek Claude Code kurulduktan sonra, <code>poem.txt</code> dosyasının bulunmadığı bir deneme klasöründe yap:` },
            { t: `steps`, items: [
              `Claude'a şunu yaz: <code>write a poem about the sea in a file called poem.txt</code>`,
              `Dosyanın oluşturulmasını bekle ve içeriğini kontrol et.`,
              `Giriş alanı boşken <kbd>Esc</kbd>'ye iki kez bas ya da <code>/rewind</code> yaz.`,
              `Dosyayı istemeden önceki noktayı seç ve <strong>Restore code and conversation</strong> ile geri dön.`,
              `Terminale döndüğünde <code>ls</code> ile sonucu kontrol et: dosya checkpoint kapsamındaki bir düzenlemeyle oluşturulduysa artık listede görünmemeli.`
            ] }
          ],
          trouble: [
            { q: `Rewind menüsü farklı görünüyor`, a: `Menü adları ve kısayollar kullandığın Claude Code sürümüne göre değişebilir. Kullanılabilir komutları <code>/help</code> ile kontrol et.` },
            { q: `Geri aldım ama dosya hâlâ duruyor`, a: `Dosya bir terminal komutuyla oluşturulduysa checkpoint kapsamı dışında kalmış olabilir. Böyle durumlarda kalıcı geri dönüş için Git ve yedek gerekir.` }
          ],
          have: [
            `<kbd>Esc</kbd> ile çalışmayı durdurmayı öğrendin.`,
            `<code>/rewind</code> ile izlenen değişiklikleri geri almayı ve bunun sınırlarını öğrendin.`,
            `Sorunu “ne gördüm, ne bekliyordum” biçiminde tarif etmeyi öğrendin.`,
            `Döngü sürerse <code>/clear</code> ile temiz bir başlangıç yapmayı öğrendin.`
          ],
          note: `Bu derste aklımda kalan ayrım: <kbd>Esc</kbd> durdurur, <code>/rewind</code> izlenen değişiklikleri geri alır, <code>/clear</code> yalnızca konuşmayı temizler.`,
          next: `Sırada: Claude'un hangi işlemleri önce sana sormadan yapabileceğine karar vermek.`,
          prompt: `Claude Code'da Esc, /rewind ve /clear komutlarının farkını, hangisini ne zaman kullanacağımı bir tabloyla açıklar mısın?`,
          sandbox: {
            open: true, cwd: `~/my-first-project`,
            dirs: [`~`, `~/Documents`, `~/Downloads`, `~/my-first-project`],
            files: { "~/my-first-project/poem.txt": `` },
            claude: [
              { match: `the file was created but it is empty; i expected the poem`, out: [`Anlaşıldı: poem.txt oluşmuş ama boş kalmış.`, `Şiiri yazmamı istiyorsan dosya adını ve konuyu belirterek tekrar iste.`] },
              { match: `write a poem about the sea in a file called poem.txt`, write: { "~/my-first-project/poem.txt": `The sea is wide and blue,\nit hums a quiet tune,\nthe waves come in and go,\nbeneath the silver moon.` }, out: [`[OK] wrote poem.txt`] }
            ],
            try: [
              { cmd: `cat poem.txt`, desc: `dosya boş mu?` },
              { cmd: `claude "the file was created but it is empty; I expected the poem"`, desc: `gözlemini anlat` },
              { cmd: `claude "write a poem about the sea in a file called poem.txt"`, desc: `isteği net ver` },
              { cmd: `cat poem.txt`, desc: `sonucu oku` }
            ]
          }
        },
        {
          id: `m1-d5`, title: `Claude neye izinli`, minutes: 5, ready: true,
          intro: [
            `Claude Code dosyaları değiştirmek veya komut çalıştırmak için onay isteyebilir. Onay ekranı, yapılacak işlemi kontrol etme fırsatıdır. Ancak hangi işlemlerin sorulacağı, seçili izin moduna ve daha önce verdiğin izinlere bağlıdır.`,
            `Onayı alışkanlıkla vermek yerine önerilen işlemi oku; özellikle hangi dosyanın etkileneceğini ve işlemin ne yapacağını anlamaya çalış.`
          ],
          blocks: [
            { t: `h`, text: `Adım 1 — İzlenimi değil, planı oku` },
            { t: `list`, items: [
              `<strong>Hangi dosya?</strong> Tam yola bak. <code>notes.md</code> üzerinde bir değişiklik ile erişim bilgileri içerebilen <code>.env</code> dosyasındaki bir değişiklik aynı değildir.`,
              `<strong>Bir şey siliniyor, taşınıyor ya da üzerine mi yazılıyor?</strong> İşlemin kapsamını incele. <code>/rewind</code> her işlemi geri almaz; özellikle terminal komutlarının etkilerini geri getireceğini varsayma.`,
              `<strong>Seni şaşırtan bir işlem mi?</strong> Onaylama. Önce “Bu işlemle neyi başarmaya çalışıyorsun?” diye sor ya da istediğin kapsamı yeniden belirt.`
            ] },
            { t: `practice` },
            { t: `h`, text: `Adım 2 — Pratik terminalinde iki dosya oluştur` },
            { t: `p`, html: `Önce görünen dosyaları listele, sonra Claude'dan bir README.md ve bir .gitignore oluşturmasını iste:` },
            { t: `cmd`, code: `ls`, expect: `hello.txt` },
            { t: `cmd`, code: `claude "add a README.md describing this project, and a .gitignore"`, expect: `[OK] wrote README.md\n[OK] wrote .gitignore` },
            { t: `p`, html: `Şimdi iki dosyayı da bul ve <code>.gitignore</code> içeriğini oku:` },
            { t: `cmd`, code: `ls`, expect: `README.md  hello.txt` },
            { t: `cmd`, code: `ls -a`, expect: `.  ..  .gitignore  README.md  hello.txt` },
            { t: `cmd`, code: `cat .gitignore` },
            { t: `callout`, kind: `info`, title: `Gizli dosyalar`, html: `Bu simülasyonda noktayla başlayan adlar <code>ls</code> çıktısında gizlenir; <code>ls -a</code> ile görünür. Gerçek PowerShell'de gizli öğeleri göstermek için <code>Get-ChildItem -Force</code> kullanılabilir. Noktayla başlamak Windows'ta tek başına gizli dosya özelliği değildir.` },
            { t: `h`, text: `Adım 3 — İzin modlarını tanı` },
            { t: `p`, html: `Dersin anlattığı akışta <kbd>Shift</kbd> + <kbd>Tab</kbd> ile izin modları arasında geçilir; seçili mod giriş alanının yakınında görünür. Modların bulunabilirliği ve davranışı sürüme, hesaba ve ayarlara göre değişebilir.` },
            { t: `table`, head: [`Mod`, `Davranış ve kullanım`], rows: [
              [`<code>default</code>`, `İzin kurallarına göre onay ister. Öğrenirken kontrollü bir başlangıç sağlar; ama her işlem için mutlaka sorulacağını varsayma.`],
              [`<code>plan</code>`, `Görevi incelemek ve planlamak için kullanılır. Dosya değişikliklerine geçmeden önce önerilen yaklaşımı gözden geçirirsin.`],
              [`<code>acceptEdits</code>`, `Dosya düzenlemelerine otomatik izin verir. Komut çalıştırma izinlerini ayrıca kontrol et; kapsamını bildiğin işlerde kullan.`],
              [`<code>auto</code>`, `Kaynak derste, eylemleri otomatik bir güvenlik değerlendirmesinden geçiren ve bazı hesaplarda bulunan mod olarak anlatılır.`]
            ] },
            { t: `h`, text: `Adım 4 — “Always allow” kapsamını kontrol et` },
            { t: `p`, html: `Bazı onay ekranları belirli bir eylem türüne daha sonra tekrar sormadan izin vermeyi önerir. Dar ve tekrarlı işlemlerde bu yararlı olabilir. İznin hangi komuta, dosya yoluna ve süreye uygulandığını oku; yalnızca mevcut oturumla sınırlı olduğunu varsayma.` },
            { t: `p`, html: `Silme, taşıma veya üzerine yazma içeren geniş izinleri dikkatle değerlendir: izni verdikten sonra aynı kapsamda yeniden onay istenmeyebilir.` },
            { t: `h`, text: `Şimdi dene: önce planı gör` },
            { t: `p`, html: `Gerçek Claude Code kurulduğunda proje klasöründe başlat, <kbd>Shift</kbd> + <kbd>Tab</kbd> ile plan moduna geç ve şu isteği ver:` },
            { t: `code`, label: `Claude'a`, code: `add a README.md describing this project,\nand a .gitignore suitable for it` },
            { t: `p`, html: `Önce önerilen dosyaları ve içeriklerini oku, ardından uygulamaya geçişi onayla. Oluşan dosyaları listele ve içeriklerini kontrol et. Planı okumak, yanlış anlaşılmayı değişiklik yapılmadan yakalamana yardım eder.` }
          ],
          trouble: [
            { q: `.gitignore listede görünmüyor`, a: `Noktayla başlayan dosyalar <code>ls</code> çıktısında gizlenir. <code>ls -a</code> ile tekrar dene.` },
            { q: `Onay ekranı hiç çıkmadı`, a: `Seçili izin modu ya da daha önce verdiğin “always allow” izinleri bazı işlemlerin otomatik yürütülmesine izin veriyor olabilir. Giriş alanının yakınında seçili modu kontrol et.` }
          ],
          have: [
            `Onay ekranında dosya yolunu ve işlemin kapsamını okumayı öğrendin.`,
            `Gizli dosyaları <code>ls -a</code> ile görmeyi öğrendin.`,
            `İzin modları arasındaki farkı tanıdın.`,
            `Kalıcı bir izin verirken kapsamını kontrol etmeyi öğrendin.`
          ],
          note: `Her işlemden önce mutlaka bir onay ekranı çıkacağını varsaymamak gerektiğini; bu davranışı seçili izin modunun belirlediğini bu derste öğrendim.`,
          next: `Sırada: Modül 1'in özeti ve hızlı başvuru tabloları.`,
          prompt: `Claude Code'daki izin modlarını (default, plan, acceptEdits) yeni başlayan biri için karşılaştırır mısın? Hangi durumda hangisini seçmeliyim?`,
          sandbox: {
            open: true, cwd: `~/my-first-project`,
            dirs: [`~`, `~/Documents`, `~/Downloads`, `~/my-first-project`],
            files: { "~/my-first-project/hello.txt": `hello` },
            claude: [
              { match: `add a readme.md describing this project, and a .gitignore`, write: { "~/my-first-project/README.md": `# my-first-project\n\nMy first project folder for the Claude Code course.`, "~/my-first-project/.gitignore": `.DS_Store\nThumbs.db\n.env` }, out: [`[OK] wrote README.md`, `[OK] wrote .gitignore`] }
            ],
            try: [
              { cmd: `ls`, desc: `başlangıçta ne var?` },
              { cmd: `claude "add a README.md describing this project, and a .gitignore"`, desc: `iki dosya iste` },
              { cmd: `ls -a`, desc: `gizli dosyaları da gör` },
              { cmd: `cat .gitignore`, desc: `içeriği oku` }
            ]
          }
        },
        {
          id: `m1-d6`, title: `Modül 1 özeti`, minutes: 3, ready: true,
          intro: [
            `Terminali kullandın, Claude'dan dosya oluşturmasını istedin, dosyayı bulup içeriğini kontrol ettin. Bir sonuç yanlış olduğunda çalışmayı nasıl durduracağını, geri alma seçeneklerini ve izinlerin önemini öğrendin.`,
            `Şimdi bu temelin üzerine çıkmaya hazırsın: Modül 2, Claude Code'u kendi bilgisayarına kurmakla başlıyor. Bu sayfayı çalışırken hızlı başvuru olarak kullanabilirsin.`
          ],
          blocks: [
            { t: `h`, text: `Terminalinde kullanacağın komutlar` },
            { t: `table`, head: [`Komut`, `Ne yapar?`], rows: [
              [`<code>claude</code>`, `Claude Code'u bulunduğun klasörde başlatır.`],
              [`<code>pwd</code>`, `Çalışma dizinini, yani bulunduğun klasörü gösterir.`],
              [`<code>ls</code>`, `Bulunduğun klasörün içindekileri listeler.`],
              [`<code>cd klasöradı</code>`, `Belirtilen klasöre geçer; <code>cd ..</code> bir üst klasöre çıkar.`],
              [`<code>mkdir ad</code>`, `Yeni bir klasör oluşturur.`],
              [`<code>cat dosya</code>`, `Dosyanın içeriğini terminalde gösterir.`]
            ] },
            { t: `h`, text: `Claude oturumundaki tuş ve komutlar` },
            { t: `table`, head: [`Tuş veya komut`, `Ne yapar?`], rows: [
              [`<kbd>Esc</kbd>`, `Süren çalışmayı kesintiye uğratır.`],
              [`<kbd>Esc</kbd> <kbd>Esc</kbd> veya <code>/rewind</code>`, `Geri alma menüsünü açar. Çift <kbd>Esc</kbd> için giriş alanı boş olmalıdır.`],
              [`<kbd>Shift</kbd> + <kbd>Tab</kbd>`, `İzin modları arasında geçiş yapar.`],
              [`<code>/clear</code>`, `Konuşma bağlamını temizler; dosya değişikliklerini geri almaz.`],
              [`<code>/exit</code>`, `Claude Code oturumundan çıkar.`]
            ] },
            { t: `callout`, kind: `info`, title: `Not`, html: `Bunlar kaynak derste anlatılan temel kısayollardır. Kullanılabilir seçenekler ve davranışlar, kurulu sürüme ve ayarlara göre değişebilir.` },
            { t: `h`, text: `Zihinsel model: konum, istek, kontrol` },
            { t: `p`, html: `Terminalin bir çalışma dizini vardır. <code>claude</code> komutunu proje klasöründe çalıştırmak, Claude'a o projeyle ilgili bir başlangıç bağlamı verir. <code>pwd</code> konumunu, <code>ls</code> içeriği gösterir; <code>cd</code> ile başka bir klasöre geçersin. Proje klasörünü tek başına bir güvenlik sınırı olarak düşünme: başka konumlara erişim; izinlere, eklenen dizinlere ve sandbox ayarlarına bağlı olabilir.` },
            { t: `p`, html: `Çalışma döngüsü basittir: İsteğini anlat, öneriyi incele, uygun izinle uygulat ve sonucu kontrol et. Yanlış bir sonuçta çalışmayı durdur, ne gözlemlediğini söyle ve gerekiyorsa uygun geri alma yöntemini kullan.` },
            { t: `callout`, kind: `warn`, title: `Onay seçtiğin izinlere bağlıdır`, html: `Her işlemden önce mutlaka bir onay ekranı çıkacağını varsayma. İzin modu ve önceden tanımlı kurallar bazı işlemlerin otomatik yürütülmesine izin verebilir. Ayrıca <code>/rewind</code> her komutun etkisini geri getirmez, <code>/clear</code> ise yalnızca konuşmayı temizler; bu ikisini dosyalarını koruyan bir yedek sistemi yerine kullanma.` },
            { t: `h`, text: `Şimdilik öğrenmen gerekmeyenler` },
            { t: `p`, html: `<code>grep</code>, pipe, <code>chmod</code> ve <code>PATH</code> gibi konular gerçek ve yararlı becerilerdir; ancak ilk alıştırmalara başlamak için hepsini önceden öğrenmen gerekmez. İhtiyaç çıktıkça bir komutun ne yaptığını ve çıktısının ne anlama geldiğini Claude'a sorabilirsin.` },
            { t: `p`, html: `Bu araçların adları ve davranışları kullandığın kabuğa göre değişir. PowerShell, macOS/Linux kabukları ve WSL aynı ortam değildir; örnekleri kendi ortamına göre değerlendir.` },
            { t: `practice` }
          ],
          trouble: [],
          have: [
            `Nerede olduğunu bulmak, klasörleri listelemek ve yer değiştirmek.`,
            `Bir proje klasörü oluşturmak.`,
            `Claude'dan dosya istemek ve dosyanın içeriğini kontrol etmek.`,
            `Yanlış giden çalışmayı durdurmak ve geri alma seçeneklerini kullanmak.`,
            `İzin modlarını ve verilen onayların kapsamını değerlendirmek.`
          ],
          note: `Konum, istek, kontrol: Önce nerede olduğumu bilirim, sonra ne istediğimi açıkça söylerim, en sonunda sonucu kendim kontrol ederim.`,
          next: `Sırada: Claude Code'u kendi bilgisayarına kurmak ve ilk web sayfanı oluşturmaya başlamak.`,
          prompt: `Claude Code kursunun ilk modülünde pwd, ls, cd, mkdir, cat, Esc, /rewind, /clear ve izin modlarını öğrendim. Bu konulardan bana 5 soruluk kısa bir tekrar testi hazırlar mısın? Cevapları en sonda ver.`,
          sandbox: {
            open: false, cwd: `~`,
            dirs: [`~`, `~/Documents`, `~/Downloads`, `~/my-first-project`],
            files: { "~/my-first-project/hello.txt": `hello` },
            try: [
              { cmd: `pwd`, desc: `konum` },
              { cmd: `ls`, desc: `içerik` },
              { cmd: `cd my-first-project`, desc: `klasöre gir` },
              { cmd: `cat hello.txt`, desc: `dosyayı oku` }
            ]
          }
        }
      ]
    },
    { id: `m2`, no: 2, title: `İlk prompt'un`, sub: `Claude Code'u kur ve ilk sayfanı oluştur`, lessons: [
      {
        id: `m2-d1`, title: `Bir prompt'un anatomisi`, minutes: 7, ready: true,
        intro: [
          `Modül 1'deki alıştırmaları pratik terminalinde yaptın. Bu derste gerçek Claude Code'u kendi bilgisayarına kuracak ve tek bir cümleyle, tarayıcında açabileceğin bir web sayfası oluşturacaksın.`,
          `Claude Code zaten kuruluysa <code>claude --version</code> komutunu çalıştır. Bir sürüm numarası görüyorsan doğrudan “İlk sayfan” adımına geç.`
        ],
        blocks: [
          { t: `callout`, kind: `info`, title: `Hesap gereksinimi`, html: `Claude Code'u kullanmak için Anthropic'te uygun bir Claude planıyla giriş yapman gerekir. Güncel plan ve faturalandırma koşullarını kurulum sırasında Anthropic hesabında kontrol et.` },
          { t: `h`, text: `Adım 1 — Terminali aç` },
          { t: `p`, html: `Windows'ta <kbd>Win</kbd> + <kbd>X</kbd> tuşlarına bas ve <strong>Terminal</strong>'i seç. Bazı bilgisayarlarda bu seçenek <strong>Windows PowerShell</strong> adıyla görünür. Satırın başında <code>PS</code> yazıyorsa PowerShell'desin. Komut İstemi (CMD) kullanıyorsan kurulum komutu farklıdır; bir sonraki adımda ikisini de bulacaksın.` },
          { t: `h`, text: `Adım 2 — Resmî yükleyiciyi çalıştır` },
          { t: `p`, html: `Kullandığın kabuğa uygun olan <strong>tek</strong> komutu seç, kopyala, yapıştır ve <kbd>Enter</kbd>'a bas. İki komut da resmî yükleyiciyi indirip çalıştırır.` },
          { t: `code`, label: `PowerShell`, code: `irm https://claude.ai/install.ps1 | iex` },
          { t: `code`, label: `CMD`, code: `curl -fsSL https://claude.ai/install.cmd -o install.cmd && install.cmd && del install.cmd` },
          { t: `p`, html: `İşlem bitip komut satırı yeniden görünene kadar bekle. Bu ders Windows adımlarını izler; macOS ve Linux için kurulum komutu farklıdır.` },
          { t: `h`, text: `Adım 3 — Kurulumu doğrula` },
          { t: `cmd`, code: `claude --version`, expect: `2.x.x (Claude Code)` },
          { t: `p`, html: `Bir sürüm numarası ve “Claude Code” adını görmelisin; numaranın buradaki örnekle aynı olması gerekmez. Komut bulunamazsa terminali kapatıp yeniden aç ve tekrar dene.` },
          { t: `h`, text: `Adım 4 — Proje klasörünü hazırla` },
          { t: `p`, html: `Modül 1'deki klasör tarayıcıdaki simülasyondaydı; gerçek bilgisayarında ayrıca oluşturman gerekir. Klasörü oluştur, içine gir ve Claude'u başlat:` },
          { t: `code`, label: `Terminal`, code: `mkdir my-first-project\ncd my-first-project\nclaude` },
          { t: `p`, html: `Klasör zaten varsa <code>mkdir</code> adımını atla ve konumunu <code>pwd</code> ile kontrol et. İlk çalıştırmada istenirse Claude hesabınla giriş yap, ardından terminale dön.` },
          { t: `h`, text: `Adım 5 — İlk gerçek prompt'unu yaz` },
          { t: `p`, html: `Claude açılınca aşağıdaki isteği <strong>tek bir mesaj</strong> olarak gönder. Satırlar yalnızca okunabilirlik için bölündü. İstersen kendi adını, öğrendiğin konuyu ve yapmak istediğin üç şeyi de mesaja ekle.` },
          { t: `code`, label: `Claude'a`, code: `make a file called index.html - a simple one-page website about me,\nwith my name as a heading, a short paragraph about what I am learning,\nand a list of three things I want to build` },
          { t: `p`, html: `Anlamı: “Benim hakkımda tek sayfalık basit bir web sitesi olan index.html dosyasını oluştur; başlıkta adım, öğrendiklerimle ilgili kısa bir paragraf ve yapmak istediğim üç şeyin listesi olsun.” Önerilen dosya değişikliğini incele, istenirse onayla. Sonra <code>/exit</code> ile Claude'dan çık.` },
          { t: `h`, text: `Adım 6 — Sayfayı tarayıcıda aç` },
          { t: `cmd`, code: `start index.html` },
          { t: `p`, html: `Windows'ta bu komut dosyayı varsayılan uygulamasında, genellikle tarayıcıda açar. Sayfada bir başlık, kısa bir paragraf ve üç maddelik bir liste olduğunu kontrol et.` },
          { t: `practice` },
          { t: `h`, text: `Bu prompt neden işe yaradı?` },
          { t: `p`, html: `İstek, Claude'un tahmin etmek zorunda kalacağı noktaları azalttı. Akılda tutman gereken şablon basit: <strong>Nerede, ne ve gerektiğinde neden?</strong>` },
          { t: `table`, head: [`Parça`, `Bu örnekte`], rows: [
            [`Nerede`, `<code>index.html</code> adlı dosyada.`],
            [`Ne`, `Başlık, kısa paragraf ve üç maddelik liste içeren tek sayfalık kişisel site.`],
            [`Neden`, `Bu örnekte belirtilmedi. Amaç bir tasarım kararını etkiliyorsa ekle.`]
          ] },
          { t: `p`, html: `Bunu belirsiz bir istekle karşılaştır:` },
          { t: `code`, label: `Belirsiz istek`, code: `make me a website` },
          { t: `p`, html: `Bu istekte konu, dosya adı, bölümler ve görünüm belli değil. Claude bunları kendisi seçer; sen de sonradan seçmediğin ayrıntıları düzeltmek zorunda kalabilirsin.` },
          { t: `h`, text: `“Neden” karar vermeye yardım eder` },
          { t: `code`, label: `Claude'a`, code: `in index.html, make the text bigger and darker,\nbecause I am showing this to my grandmother\nand she finds it hard to read` },
          { t: `p`, html: `Anlamı: “index.html'de yazıyı büyüt ve koyulaştır, çünkü sayfayı büyükanneme göstereceğim ve okumakta zorlanıyor.” Gerekçe yalnızca yazı boyutunu değil, kontrast ve satır aralığı gibi ilgili kararları da doğru yöne çeker.` },
          { t: `h`, text: `Şimdi dene` },
          { t: `p`, html: `Claude'u yeniden başlat ve üç parçayı birlikte kullan:` },
          { t: `code`, label: `Claude'a`, code: `in index.html, add a section at the bottom with a way to contact me,\nbecause I want to share this page with friends` },
          { t: `p`, html: `Anlamı: “index.html'in en altına bana ulaşmanın bir yolunu içeren bir bölüm ekle, çünkü bu sayfayı arkadaşlarımla paylaşmak istiyorum.” Sayfayı tarayıcıda yenile; eklenen bölümün yerini, içeriğini ve kullandığı iletişim bilgisini kontrol et.` }
        ],
        trouble: [
          { q: `“irm” ya da “&&” tanınmıyor`, a: `Komutun kullandığın kabuğa ait olup olmadığını kontrol et: <code>irm</code> PowerShell komutudur; CMD'de çalışmaz. Eski Windows PowerShell sürümlerinde <code>&&</code> geçerli değildir. Satırın başında <code>PS</code> varsa PowerShell komutunu kullan.` },
          { q: `“claude” komutu bulunamıyor`, a: `Terminali kapatıp yeniden aç ve <code>claude --version</code> komutunu tekrar dene. Yükleyici bir PATH uyarısı verdiyse onun yönlendirmesini izle.` },
          { q: `SSL/TLS ya da başka bir kurulum hatası`, a: `Güvenlik kontrollerini kapatmaya çalışma. Hata mesajını oku ve resmî kurulum belgelerindeki yönlendirmeyi izle.` }
        ],
        have: [
          `Bilgisayarında çalışan bir Claude Code kurulumu.`,
          `<code>my-first-project</code> klasöründe, tek cümleyle oluşturulmuş bir <code>index.html</code> sayfası.`,
          `İyi bir isteğin şablonu: nerede, ne ve gerektiğinde neden.`
        ],
        note: `Bu derste isteğe “neden”i eklemenin, Claude'un yalnızca istenen değişikliği değil ilgili kararları da doğru yönde vermesine yardım ettiğini gördüm.`,
        next: `Sırada: Net bir değişikliği istemenin pratik yolu.`,
        prompt: `Claude Code'a iş verirken “nerede, ne ve neden” şablonunu kullanmayı öğreniyorum. “make me a website” gibi belirsiz bir isteği bu şablonla nasıl daha iyi yazarım? 3 örnek verir misin?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: {},
          cmds: [
            { match: `start index.html`, out: [`(simülasyon) index.html varsayılan tarayıcıda açılırdı.`, `Sayfada başlık, kısa paragraf ve üç maddelik liste olup olmadığını kontrol et.`] }
          ],
          claude: [
            { match: `make a file called index.html - a simple one-page website about me, with my name as a heading, a short paragraph about what I am learning, and a list of three things I want to build`,
              write: { "~/my-first-project/index.html": `<!doctype html>\n<html lang="en">\n<head><meta charset="utf-8"><title>About me</title></head>\n<body>\n  <h1>Your Name</h1>\n  <p>I am learning to build websites with Claude Code.</p>\n  <ul>\n    <li>A personal website</li>\n    <li>A recipe collection</li>\n    <li>A small game</li>\n  </ul>\n</body>\n</html>` },
              out: [`[OK] wrote index.html`] },
            { match: `in index.html, add a section at the bottom with a way to contact me, because I want to share this page with friends`,
              write: { "~/my-first-project/index.html": `<!doctype html>\n<html lang="en">\n<head><meta charset="utf-8"><title>About me</title></head>\n<body>\n  <h1>Your Name</h1>\n  <p>I am learning to build websites with Claude Code.</p>\n  <ul>\n    <li>A personal website</li>\n    <li>A recipe collection</li>\n    <li>A small game</li>\n  </ul>\n  <section>\n    <h2>Contact me</h2>\n    <p>Email: you@example.com</p>\n  </section>\n</body>\n</html>` },
              out: [`[OK] edited index.html — added a "Contact me" section at the bottom`] }
          ],
          try: [
            { cmd: `claude --version`, desc: `kurulum var mı?` },
            { cmd: `claude "make a file called index.html - a simple one-page website about me, with my name as a heading, a short paragraph about what I am learning, and a list of three things I want to build"`, desc: `ilk gerçek prompt` },
            { cmd: `cat index.html`, desc: `dosyayı oku` },
            { cmd: `claude "in index.html, add a section at the bottom with a way to contact me, because I want to share this page with friends"`, desc: `nerede + ne + neden` },
            { cmd: `start index.html`, desc: `tarayıcıda aç` }
          ]
        }
      },
      {
        id: `m2-d2`, title: `Netlik kaldıracı`, minutes: 6, ready: true,
        intro: [
          `Bir prompt'un şeklini biliyorsun: nerede, ne ve bazen neden. Bu derste kısa ama belirli talimatlarla sonucu nasıl daha kolay kontrol edeceğini göreceksin.`
        ],
        blocks: [
          { t: `h`, text: `Adım 1 — Önce belirsiz bir istek dene` },
          { t: `code`, label: `Claude'a`, code: `make my page better` },
          { t: `p`, html: `“Daha iyi” renk, metin, düzen ya da aralık anlamına gelebilir; Claude bunların birkaçını birden değiştirebilir. Sonucu açıp incele ve kendine sor: Bu değişikliklerin hangileri gerçekten istediğimdi?` },
          { t: `p`, html: `Karşılaştırma yapabilmek için başlangıç durumuna dön: giriş alanı boşken <kbd>Esc</kbd>'ye iki kez bas ya da <code>/rewind</code> yaz, uygun önceki noktayı ve <strong>Restore code and conversation</strong> seçeneğini seç. Geri almanın yalnızca izlenen değişiklikleri kapsadığını unutma.` },
          { t: `h`, text: `Adım 2 — Değişikliği adlandır` },
          { t: `code`, label: `Claude'a`, code: `in index.html, change the background to a light cream colour\nand make the heading font larger` },
          { t: `p`, html: `Anlamı: “index.html'de arka planı açık krem rengi yap ve başlık yazısını büyüt.” Bu kez dosya da iki değişiklik de belli. Sonucu bütün sayfayı yeniden değerlendirerek değil, yalnızca bu iki özelliğe bakarak kontrol edebilirsin.` },
          { t: `practice` },
          { t: `h`, text: `Hızlı netlik kontrolü` },
          { t: `list`, items: [
            `<strong>Dosyayı adlandırdın mı?</strong>`,
            `<strong>Gerçek değişikliği söyledin mi?</strong>`,
            `<strong>Yeni bir şey oluşturuluyorsa yerini belirttin mi?</strong>`
          ] },
          { t: `p`, html: `Göndermeden önce kendine sor: Bu talimatın tek bir makul yorumu var mı? Belirli olmak uzun olmak demek değildir; sonucu değiştirmeyen bir ayrıntıyı eklemene gerek yok.` },
          { t: `h`, text: `Belirsiz kelimelerin yerine ne yazmalı?` },
          { t: `table`, head: [`Belirsiz ifade`, `Daha yararlı yönlendirme`], rows: [
            [`“Daha iyi yap”`, `Özelliği adlandır: renk, boyut, aralık ya da metin.`],
            [`“Temizle”`, `Şu an neyin yanlış olduğunu söyle.`],
            [`“Stili düzelt”`, `Neyin yanlış göründüğünü ve ne beklediğini anlat.`],
            [`“Biraz içerik ekle”`, `Bölümü ve kabaca hangi içeriğin ekleneceğini belirt.`]
          ] },
          { t: `h`, text: `Henüz ne istediğini bilmiyorsan` },
          { t: `p`, html: `Sonucu seçemiyorsan süreç konusunda belirli ol: Claude'dan önce incelemesini ve seçenek önermesini iste.` },
          { t: `code`, label: `Claude'a`, code: `read index.html and tell me three things you would improve,\nand why - do not change anything yet` },
          { t: `p`, html: `Anlamı: “index.html'i oku; iyileştireceğin üç şeyi nedenleriyle söyle, henüz hiçbir şeyi değiştirme.” Önerilerden birini seç ve yalnızca o değişikliği iste. <strong>Önce bak, sonra hareket et</strong> kalıbı, istemediğin toplu değişiklikleri azaltır.` },
          { t: `h`, text: `Şimdi dene` },
          { t: `steps`, items: [
            `Bilerek belirsiz bir değişiklik iste ve sonucu incele.`,
            `Uygun geri alma yöntemiyle başlangıç durumuna dön.`,
            `Aynı değişikliği dosya ve özellik adı vererek yeniden iste.`,
            `İki sonucu kontrol etmek için harcadığın süreyi karşılaştır.`
          ] }
        ],
        trouble: [
          { q: `Claude istemediğim yerleri de değiştirdi`, a: `Değişikliği geri al ve isteği daralt: dosyayı, değişecek özelliği ve dokunulmaması gereken bölümü açıkça yaz. Örneğin “başlığı büyüt, paragraf metnine dokunma”.` },
          { q: `Geri aldım ama dosya eski hâline dönmedi`, a: `<code>/rewind</code> yalnızca izlenen dosya düzenlemelerini geri alır. Terminal komutlarıyla yapılan değişiklikler kapsam dışında kalabilir; dosyayı açıp kontrol et.` }
        ],
        have: [
          `Belirsiz ve net bir isteğin sonucunu karşılaştırdın.`,
          `Göndermeden önce uygulayabileceğin üç soruluk netlik kontrolü.`,
          `Ne istediğini bilmediğinde kullanacağın “önce incele, öneri sun, değiştirme” kalıbı.`
        ],
        note: `Netliğin uzunluk demek olmadığını bu derste anladım: Dosyayı ve değişecek özelliği adlandırmak çoğu zaman yeterli oluyor.`,
        next: `Sırada: Konuşma uzadıkça bağlamı odaklı tutmak.`,
        prompt: `“Daha iyi yap”, “temizle”, “stili düzelt” gibi belirsiz istekleri, bir web sayfası için daha net talimatlara dönüştürmeme yardım eder misin? Her biri için bir örnek yaz.`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<!doctype html>\n<html lang="en">\n<head><meta charset="utf-8"><title>About me</title></head>\n<body>\n  <h1>Your Name</h1>\n  <p>I am learning to build websites with Claude Code.</p>\n</body>\n</html>` },
          claude: [
            { match: `make my page better`, write: { "~/my-first-project/index.html": `<!doctype html>\n<html lang="en">\n<head><meta charset="utf-8"><title>Welcome!</title>\n<style>body{font-family:Georgia;background:#203040;color:#fff;padding:60px}h1{letter-spacing:4px}</style></head>\n<body>\n  <h1>YOUR NAME</h1>\n  <p>Hello and welcome to my brand new website, where I share my journey.</p>\n  <footer>Made with care</footer>\n</body>\n</html>` },
              out: [`[OK] edited index.html — changed the title, colours, font, heading text,`, `     rewrote the paragraph and added a footer`] },
            { match: `in index.html, change the background to a light cream colour and make the heading font larger`, write: { "~/my-first-project/index.html": `<!doctype html>\n<html lang="en">\n<head><meta charset="utf-8"><title>About me</title>\n<style>body{background:#fdf6e3}h1{font-size:3rem}</style></head>\n<body>\n  <h1>Your Name</h1>\n  <p>I am learning to build websites with Claude Code.</p>\n</body>\n</html>` },
              out: [`[OK] edited index.html — background: light cream, heading: larger`] },
            { match: `read index.html and tell me three things you would improve, and why - do not change anything yet`,
              out: [`Değişiklik yapmadım. Üç öneri:`, `1. Arka plan rengi ekle — sayfa şu an çok sade görünüyor.`, `2. Başlığı büyüt — sayfanın konusu ilk bakışta anlaşılsın.`, `3. Bir iletişim bölümü ekle — ziyaretçi sana nasıl ulaşacağını bilsin.`, `Hangisini uygulamamı istersin?`] }
          ],
          try: [
            { cmd: `cat index.html`, desc: `başlangıç hâli` },
            { cmd: `claude "make my page better"`, desc: `belirsiz istek` },
            { cmd: `cat index.html`, desc: `neler değişti?` },
            { cmd: `claude "read index.html and tell me three things you would improve, and why - do not change anything yet"`, desc: `önce öneri iste` },
            { cmd: `claude "in index.html, change the background to a light cream colour and make the heading font larger"`, desc: `net istek` }
          ]
        }
      },
      {
        id: `m2-d3`, title: `Bağlam pencereleri ve /clear`, minutes: 5, ready: true,
        intro: [
          `Claude'un bir yanıt üretirken kullanabildiği konuşma ve çalışma bilgilerine <strong>bağlam</strong> denir. Bu alan büyük olabilir ama sınırsız değildir; ilgisiz geçmiş, üzerinde çalıştığın görevin odağını bulanıklaştırabilir.`
        ],
        blocks: [
          { t: `h`, text: `Bağlamın içinde ne var?` },
          { t: `p`, html: `Senin mesajların, Claude'un yanıtları, okunan dosyaların içeriği ve araç çıktıları bağlama girer. Uzun oturumlarda bazı bilgiler özetlenebilir; geçmişin her zaman eksiksiz tutulduğunu varsayma.` },
          { t: `callout`, kind: `info`, title: `Dosya ile konuşma aynı şey değildir`, html: `Bir dosyanın içeriği okunduğunda bağlama girebilir. Konuşmayı temizlemek ise diskteki dosyayı silmez.` },
          { t: `h`, text: `Odağın kaydığını nasıl anlarsın?` },
          { t: `list`, items: [
            `Claude, bitmiş eski bir işe sürekli atıfta bulunuyor.`,
            `Küçük bir değişiklik isterken ilgisiz dosyalara yöneliyor.`
          ] },
          { t: `p`, html: `Bunlar bağlam karmaşasına işaret edebilir, ama tek olası neden bu değildir. Önce isteğinin açık olup olmadığını ve hangi dosyayı hedeflediğini kontrol et.` },
          { t: `h`, text: `Yeni görev için temiz başlangıç: /clear` },
          { t: `code`, label: `Claude oturumunda`, code: `/clear` },
          { t: `p`, html: `İlgisiz bir göreve geçerken konuşmayı temizle. <code>/clear</code> dosyalara dokunmaz ve önceki değişiklikleri geri almaz; yalnızca konuşma bağlamını temizler. Aynı iş üzerinde küçük düzeltmeler yapıyorsan geçmişi korumak yararlı olabilir; gerçekten görev değiştirdiğinde temiz bir konuşma aç.` },
          { t: `h`, text: `Aynı görev, uzun konuşma: /compact` },
          { t: `code`, label: `Claude oturumunda`, code: `/compact` },
          { t: `p`, html: `Hâlâ aynı görevi yapıyorsan ve konuşma uzadıysa, özetleyerek devam edebilirsin. <code>/compact</code> bunun içindir. Özet, önceki konuşmanın bütün ayrıntılarını koruyan bir kopya değildir.` },
          { t: `table`, head: [`Komut`, `Ne zaman tercih edilir?`], rows: [
            [`<code>/clear</code>`, `Yeni ya da ilgisiz bir görev; önceki konuşmanın ayrıntılarına ihtiyacın yok.`],
            [`<code>/compact</code>`, `Aynı görev sürüyor; yararlı geçmişi özetleyip yer açmak istiyorsun.`]
          ] },
          { t: `callout`, kind: `tip`, title: `Karar sorusu`, html: `“Önceki konuşmadaki bilgileri bu görevde kullanacak mıyım?” Cevap evetse bağlamı koru ya da <code>/compact</code> kullan; hayırsa <code>/clear</code> ile temiz başla.` },
          { t: `practice` },
          { t: `h`, text: `Şimdi dene` },
          { t: `steps`, items: [
            `Claude'dan <code>index.html</code> içindeki renkleri değiştirmesini iste.`,
            `Aynı konuşmada ilgisiz bir dosya iste: beş öğeli bir <code>shopping-list.md</code>.`,
            `Ardından <code>make the heading bigger</code> yaz ve Claude'un hangi dosyaya yöneldiğini gözlemle.`,
            `<code>/clear</code> kullan. Bu kez hedefi açıkça belirt: <code>in index.html, make the heading bigger</code>.`
          ] },
          { t: `p`, html: `İlk belirsiz istekte mutlaka bir hata çıkması gerekmez. Amaç, eski görevlerin etkisini ve açık bir dosya adı vermenin farkını gözlemlemek.` }
        ],
        trouble: [
          { q: `/clear sonrası dosyadaki değişiklik geri gelmedi`, a: `Bu beklenen davranış: <code>/clear</code> yalnızca konuşmayı temizler, dosyalara dokunmaz. Değişikliği geri almak için <code>/rewind</code> kullan.` },
          { q: `/compact sonrası Claude bir ayrıntıyı unuttu`, a: `Özet her ayrıntıyı korumaz. Önemli bir kuralı ya da kararı kısa bir mesajla yeniden hatırlat.` }
        ],
        have: [
          `Bağlamın oturumda kullanılan bilgi olduğunu, diskteki dosyaların kendisi olmadığını biliyorsun.`,
          `İlgisiz görevler arasında <code>/clear</code>, aynı uzun görevde <code>/compact</code> kullanmayı öğrendin.`,
          `Hangisini seçeceğine karar vermek için tek bir soru.`
        ],
        note: `Benim için belirleyici soru şu oldu: Önceki konuşmadaki bilgiye bu görevde ihtiyacım var mı? Yoksa <code>/clear</code>, varsa <code>/compact</code>.`,
        next: `Sırada: Sık kullanılan slash komutları.`,
        prompt: `Claude Code'da bağlam penceresi nedir? /clear ve /compact komutlarını hangi durumlarda kullanmalıyım? Kısa örneklerle açıklar mısın?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Your Name</h1>\n<p>I am learning to build websites with Claude Code.</p>` },
          cmds: [
            { match: `/clear`, out: [`(simülasyon) Konuşma bağlamı temizlendi. Dosyalar olduğu gibi duruyor.`] },
            { match: `/compact`, out: [`(simülasyon) Konuşma özetlendi; aynı görevle devam edebilirsin.`] }
          ],
          claude: [
            { match: `make a file called shopping-list.md with five items`, write: { "~/my-first-project/shopping-list.md": `# Shopping list\n\n- bread\n- milk\n- eggs\n- apples\n- coffee` }, out: [`[OK] wrote shopping-list.md`] },
            { match: `make the heading bigger`, out: [`Hangi başlığı kastediyorsun? Son çalıştığımız dosya shopping-list.md;`, `oradaki “# Shopping list” başlığını mı büyüteyim, index.html'deki başlığı mı?`] },
            { match: `in index.html, make the heading bigger`, write: { "~/my-first-project/index.html": `<h1 style="font-size:3rem">Your Name</h1>\n<p>I am learning to build websites with Claude Code.</p>` }, out: [`[OK] edited index.html — heading font-size: 3rem`] }
          ],
          try: [
            { cmd: `claude "make a file called shopping-list.md with five items"`, desc: `ilgisiz bir görev` },
            { cmd: `claude "make the heading bigger"`, desc: `belirsiz istek` },
            { cmd: `/clear`, desc: `konuşmayı temizle` },
            { cmd: `claude "in index.html, make the heading bigger"`, desc: `hedefi açıkça söyle` },
            { cmd: `ls`, desc: `dosyalar duruyor mu?` }
          ]
        }
      },
      {
        id: `m2-d4`, title: `Slash komutları`, minutes: 5, ready: true,
        intro: [
          `Claude'a verdiğin işlerin çoğunu doğal dille anlatırsın. <code>/</code> ile başlayan slash komutları ise oturumu yönetmek içindir: konuşmayı temizlemek, modeli seçmek, yardım almak ya da çıkmak gibi.`
        ],
        blocks: [
          { t: `h`, text: `Adım 1 — Komutları bul` },
          { t: `p`, html: `Tek bir <code>/</code> yazınca kullanılabilir komutların listesi açılır. Yazmaya devam ederek listeyi daraltabilirsin; örneğin <code>/cl</code>. Komutlar kurulumuna ve sürüme göre değişebileceği için yardım ekranına bak:` },
          { t: `code`, label: `Claude oturumunda`, code: `/help` },
          { t: `h`, text: `İlk gün için yedi komut` },
          { t: `table`, head: [`Komut`, `Ne yapar?`], rows: [
            [`<code>/clear</code>`, `Konuşma bağlamını temizleyerek yeni bir başlangıç sağlar.`],
            [`<code>/compact</code>`, `Konuşmayı özetleyip aynı görevle devam etmeye yardım eder.`],
            [`<code>/rewind</code>`, `Geri alma menüsünü açar. Giriş alanı boşken <kbd>Esc</kbd> <kbd>Esc</kbd> de aynı işi görür.`],
            [`<code>/help</code>`, `Yardımı ve kullanılabilir komutları gösterir.`],
            [`<code>/model</code>`, `Etkin modeli seçmeye ya da değiştirmeye yarar.`],
            [`<code>/init</code>`, `Projeyi anlatan bir <code>CLAUDE.md</code> kılavuzu oluşturmana yardım eder.`],
            [`<code>/exit</code>`, `Claude Code oturumundan çıkar.`]
          ] },
          { t: `callout`, kind: `warn`, title: `Hatırla`, html: `<code>/clear</code> dosya değişikliklerini geri almaz. <code>/rewind</code> ise terminal komutlarının bütün etkilerini kapsayan bir yedek değildir.` },
          { t: `h`, text: `Adım 2 — /init ile projeyi bir kez anlat` },
          { t: `code`, label: `Claude oturumunda`, code: `/init` },
          { t: `p`, html: `Geri döneceğin bir projede bu komutla başla. Claude proje yapısını inceler ve projenin ne olduğunu, nasıl çalışıldığını anlatan bir <code>CLAUDE.md</code> dosyası hazırlar.` },
          { t: `p`, html: `Okuma ya da yazma izni istenirse işlemi ve dosya yolunu incele. Oluşan dosyayı mutlaka aç ve oku; yanlış ya da eksik bilgileri düzelt. <code>CLAUDE.md</code> sonraki oturumlarda proje talimatlarını aktarır; içindeki kurallar doğru olduğunda her oturumda aynı açıklamaları tekrar yapman gerekmez.` },
          { t: `h`, text: `Adım 3 — /model ile ihtiyaca göre seç` },
          { t: `code`, label: `Claude oturumunda`, code: `/model` },
          { t: `p`, html: `Hesabında kullanılabilen modeller arasından seçim yapmanı sağlar. Modeller hız, yetenek ve kullanım maliyeti bakımından farklı olabilir. Başlarken varsayılan modelle devam edebilirsin.` },
          { t: `h`, text: `Slash komutu mu, doğal dil mi?` },
          { t: `table`, head: [`Durum`, `Ne kullanılır?`], rows: [
            [`Oturumu yönetiyorsan`, `<code>/clear</code>, <code>/model</code> ya da <code>/exit</code> gibi bir komut.`],
            [`Bir iş istiyorsan`, `“index.html dosyasındaki başlığı büyüt” gibi bir cümle.`]
          ] },
          { t: `p`, html: `Her iş için özel bir slash komutu olduğunu varsayma. Bazı kurulumlar özel komutlar ya da beceriler ekleyebilir; mevcut listeyi <code>/help</code> ile kontrol et.` },
          { t: `practice` },
          { t: `h`, text: `Şimdi dene` },
          { t: `p`, html: `Proje klasöründe <code>/init</code> çalıştır. Oluşan <code>CLAUDE.md</code> dosyasını oku ve projeyi senin anlatacağın şekilde açıklayan bir satırı düzenle.` }
        ],
        trouble: [
          { q: `Listede bir komutu göremiyorum`, a: `Komutlar sürüme ve kuruluma göre değişebilir. <code>/help</code> ile kullanılabilir komutları kontrol et; gerekirse Claude Code'u güncelle.` },
          { q: `CLAUDE.md içinde yanlış bilgi var`, a: `Dosyayı aç ve düzelt. Claude'un yazdığı kılavuz bir başlangıç taslağıdır; doğruluğunu sen kontrol etmelisin.` }
        ],
        have: [
          `Slash komutlarının oturumu yönettiğini, işlerin ise doğal dille istendiğini biliyorsun.`,
          `İlk gün için yedi komutun ne yaptığını öğrendin.`,
          `<code>/init</code> ile projeni bir kez anlatan bir <code>CLAUDE.md</code> oluşturabilirsin.`
        ],
        note: `<code>/init</code>'in oluşturduğu <code>CLAUDE.md</code>'yi olduğu gibi bırakmayıp okumanın ve düzeltmenin, sonraki oturumlarda zaman kazandırdığını gördüm. Bu sitenin de bir <code>CLAUDE.md</code> dosyası var.`,
        next: `Sırada: <code>@</code> ile Claude'u doğru dosyaya ve klasöre yöneltmek.`,
        prompt: `Claude Code'daki /clear, /compact, /rewind, /help, /model, /init ve /exit komutlarını bir tabloda karşılaştırır mısın? Her biri için bir kullanım örneği ver.`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Your Name</h1>\n<p>I am learning to build websites with Claude Code.</p>` },
          cmds: [
            { match: `/help`, out: [`(simülasyon) Kullanılabilir komutlardan bazıları:`, `  /clear  /compact  /rewind  /help  /model  /init  /exit`, `Gerçek listede kurulumuna göre daha fazla komut olabilir.`] },
            { match: `/init`, claude: true, write: { "~/my-first-project/CLAUDE.md": `# my-first-project\n\nA simple personal website made while learning Claude Code.\n\n## Files\n- index.html: the one-page site\n\n## How to view\nOpen index.html in a browser.` }, out: [`[OK] wrote CLAUDE.md — projeyi inceleyip bir kılavuz taslağı hazırladım.`, `Lütfen dosyayı okuyup yanlış ya da eksik bilgileri düzelt.`] },
            { match: `/model`, out: [`(simülasyon) Hesabında kullanılabilen modeller burada listelenir.`, `Başlarken varsayılan modelle devam edebilirsin.`] },
            { match: `/exit`, out: [`(simülasyon) Claude Code oturumundan çıkıldı.`] }
          ],
          try: [
            { cmd: `/help`, desc: `komutları gör` },
            { cmd: `/init`, desc: `CLAUDE.md oluştur` },
            { cmd: `cat CLAUDE.md`, desc: `kılavuzu oku` },
            { cmd: `/model`, desc: `model seçimi` }
          ]
        }
      },
      {
        id: `m2-d5`, title: `@file ve @directory`, minutes: 5, ready: true,
        intro: [
          `Bir dosyayı <code>@</code> ile işaret etmek, Claude'u isteğinle ilgili belirli bir kaynağa yöneltir. Bu özellikle bir dosyayı değiştirirken, iki kaynağı karşılaştırırken ya da bir örneğin biçimini izletirken işe yarar.`
        ],
        blocks: [
          { t: `h`, text: `Adım 1 — Bir dosyayı işaret et` },
          { t: `p`, html: `Önce Claude'dan ikinci bir dosya oluşturmasını iste:` },
          { t: `code`, label: `Claude'a`, code: `make a file called about.md\nwith a few paragraphs about what I am learning` },
          { t: `p`, html: `Artık <code>index.html</code> ve <code>about.md</code> hakkında ayrı ayrı konuşabilirsin:` },
          { t: `code`, label: `Claude'a`, code: `explain what @about.md says, in one sentence` },
          { t: `p`, html: `<code>@</code> yazınca bir dosya seçici açılabilir. <code>@ab</code> gibi birkaç harfle listeyi daralt, ok tuşlarıyla dosyayı seç ve <kbd>Tab</kbd> ya da <kbd>Enter</kbd> ile tamamla. Seçimden sonra yolun doğru olduğunu kontrol et.` },
          { t: `h`, text: `Adım 2 — Bir dosyayı kalıp olarak kullan` },
          { t: `code`, label: `Claude'a`, code: `using @index.html as the pattern,\nmake a second page called projects.html with the same styling` },
          { t: `p`, html: `Anlamı: “index.html'i kalıp alarak aynı stilde projects.html adlı ikinci bir sayfa yap.” Sonuçta yazı tipi, renkler ve aralıkların uyumlu olduğunu kontrol et.` },
          { t: `callout`, kind: `info`, title: `@ şart mı?`, html: `Claude bazen <code>@</code> olmadan da ilgili dosyayı bulup okuyabilir. <code>@</code> kullanmanın kazancı, hangi kaynağı kastettiğini açıkça belirtmendir.` },
          { t: `h`, text: `Adım 3 — Bir klasöre yönelt` },
          { t: `p`, html: `Cevabın hangi dosyada olduğunu bilmiyorsan proje içindeki bir klasörü işaret edebilirsin. Örneğin bir <code>pages/</code> klasörün varsa:` },
          { t: `code`, label: `Claude'a`, code: `look through @pages/\nand tell me which files mention my name` },
          { t: `p`, html: `Klasör seçmek, klasördeki her şeyin eksiksiz yükleneceği anlamına gelmez; Claude'un ilgili dosyaları ayrıca incelemesi gerekebilir. Erişim kapsamı izinlere ve ayarlara bağlıdır.` },
          { t: `practice` },
          { t: `h`, text: `Bağlamı tutumlu kullan` },
          { t: `p`, html: `Okunan dosyalar ve araç çıktıları bağlamda yer kaplar. Geniş bir klasörü inceletmek, ilgili tek bir dosyayı göstermekten daha fazla iş ve bağlam gerektirir.` },
          { t: `list`, items: [
            `Önemli bir ya da iki dosyayı işaret et.`,
            `Nereye bakılacağını biliyorsan geniş bir klasör yerine ilgili dosyayı seç.`,
            `Uzun dosyalarda ilgili bölümün adını ya da aradığın soruyu da yaz.`
          ] },
          { t: `callout`, kind: `tip`, title: `Bir benzetme`, html: `Toplantıda ilgili tek bir belgeyi paylaşmak odağı artırır; bütün dosya dolabını masaya boşaltmak aynı işi görmez.` },
          { t: `h`, text: `Her mesajda gerekli mi?` },
          { t: `p`, html: `Aynı dosya üzerinde çalışmayı sürdürüyorsan her seferinde <code>@</code> eklemen gerekmez. Dosya değiştirirken, iki kaynağı karşılaştırırken ya da bir yanlış anlaşılmayı giderirken yeniden kullan.` },
          { t: `h`, text: `Şimdi dene` },
          { t: `code`, label: `Claude'a`, code: `compare @index.html and @about.md -\nis anything said differently between them?` },
          { t: `p`, html: `İki dosyada adın, öğrendiğin konular ya da yapmak istediğin projeler farklı mı anlatılmış? Yanıttaki bulguları dosyaları açarak kendin karşılaştır.` }
        ],
        trouble: [
          { q: `@ yazınca dosya seçici açılmıyor`, a: `Dosya adını <code>@about.md</code> biçiminde elle yazabilirsin. Claude'u proje klasöründe başlattığını <code>pwd</code> ile kontrol et.` },
          { q: `Claude yanlış dosyaya baktı`, a: `Seçilen yolu kontrol et ve isteği doğru dosyayla yeniden gönder. Aynı adda birden fazla dosya varsa klasör yolunu da yaz.` }
        ],
        have: [
          `<code>@dosya</code> ile Claude'u belirli bir kaynağa yöneltmeyi öğrendin.`,
          `Bir dosyayı yeni sayfa için kalıp olarak kullanabilirsin.`,
          `Geniş bir klasör yerine ilgili dosyayı seçerek bağlamı tutumlu kullanmayı öğrendin.`
        ],
        note: `Bir dosyayı <code>@</code> ile açıkça seçmenin, yalnızca Claude'a değil bana da yardım ettiğini gördüm: Sonucu kontrol ederken neye bakacağımı biliyorum.`,
        next: `Sırada: Modül 2'nin özeti ve hızlı başvuru tablosu.`,
        prompt: `Claude Code'da @dosya ve @klasör ile bağlam vermenin faydası nedir? Bağlamı tutumlu kullanmak için 3 pratik öneri verir misin?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Your Name</h1>\n<p>I am learning to build websites with Claude Code.</p>\n<ul><li>A personal website</li><li>A recipe collection</li><li>A small game</li></ul>` },
          claude: [
            { match: `make a file called about.md with a few paragraphs about what I am learning`, write: { "~/my-first-project/about.md": `# About\n\nI am learning how to use the terminal and Claude Code.\n\nMy goal is to publish my own website.` }, out: [`[OK] wrote about.md`] },
            { match: `explain what @about.md says, in one sentence`, out: [`about.md, terminali ve Claude Code'u öğrendiğini ve kendi siteni yayınlamayı hedeflediğini anlatıyor.`] },
            { match: `using @index.html as the pattern, make a second page called projects.html with the same styling`, write: { "~/my-first-project/projects.html": `<h1>Projects</h1>\n<p>Things I want to build.</p>\n<ul><li>A personal website</li><li>A recipe collection</li><li>A small game</li></ul>` }, out: [`[OK] wrote projects.html — index.html ile aynı yapı ve stil`] },
            { match: `compare @index.html and @about.md - is anything said differently between them?`, out: [`index.html yapmak istediğin üç projeyi listeliyor; about.md bunlardan söz etmiyor.`, `about.md ise siteni yayınlama hedefini anlatıyor; bu bilgi index.html'de yok.`] }
          ],
          try: [
            { cmd: `claude "make a file called about.md with a few paragraphs about what I am learning"`, desc: `ikinci dosya` },
            { cmd: `claude "explain what @about.md says, in one sentence"`, desc: `dosyayı işaret et` },
            { cmd: `claude "using @index.html as the pattern, make a second page called projects.html with the same styling"`, desc: `kalıp olarak kullan` },
            { cmd: `claude "compare @index.html and @about.md - is anything said differently between them?"`, desc: `iki dosyayı karşılaştır` },
            { cmd: `ls`, desc: `hangi dosyalar var?` }
          ]
        }
      },
      {
        id: `m2-d6`, title: `Modül 2 özeti`, minutes: 3, ready: true,
        intro: [
          `Bir cümleden web sayfası oluşturmayı, istediğin değişikliği açıkça anlatmayı ve konuşma bağlamını yönetmeyi öğrendin. Bu modül, Claude ile etkili iletişim kurmanın temelini oluşturdu.`
        ],
        blocks: [
          { t: `h`, text: `Modül 2 hızlı başvuru` },
          { t: `table`, head: [`Fikir`, `Pratik hamle`], rows: [
            [`Prompt'un anatomisi`, `Nerede, ne ve gerektiğinde neden sorularını yanıtla.`],
            [`Netlik`, `Tek bir makul yorumu hedefle; dosyayı ve değişikliği adlandır.`],
            [`Bilmediğinde`, `Değiştirmeden önce incelemesini ve öneri sunmasını iste.`],
            [`Bağlam penceresi`, `Oturumda kullanılan bilgidir; diskteki dosyaların kendisi değildir.`],
            [`<code>/clear</code>`, `İlgisiz bir göreve geçerken konuşma bağlamını temizle.`],
            [`<code>/compact</code>`, `Aynı görevde uzayan konuşmayı özetleyerek devam et.`],
            [`<code>/init</code>`, `Projeyi açıklayan bir <code>CLAUDE.md</code> oluşturmana yardım eder.`],
            [`<code>@dosya</code>`, `İsteğini ilgili dosyaya açıkça yönelt; seçilen yolu kontrol et.`]
          ] },
          { t: `h`, text: `Zihinsel model` },
          { t: `p`, html: `İyi bir prompt, <strong>iş konusunda belirli, bağlam konusunda tutumludur</strong>. Neyi değiştirmek istediğini, hangi dosyaların ilgili olduğunu ve eski konuşmaya hâlâ ihtiyacın olup olmadığını bilinçli seç.` },
          { t: `p`, html: `Sık karşılaşılan sorun yalnızca kötü yazılmış bir cümle değildir: Dağınık bir konuşmaya gönderilen belirsiz bir istek de sonucu zorlaştırır.` },
          { t: `h`, text: `Saklamaya değer iki alışkanlık` },
          { t: `p`, html: `<strong>1. Atlamadan önce bak.</strong> Emin değilsen Claude'dan değiştirmek yerine okumasını ve öneri sunmasını iste. Önce seçenekleri gör, sonra hangi değişikliğin yapılacağını sen seç.` },
          { t: `code`, label: `Claude'a`, code: `read @index.html and suggest three improvements;\ndo not change anything yet` },
          { t: `p`, html: `<strong>2. İsim konusunda belirli ol.</strong> “Daha iyi” ya da “temizle” yerine renk, başlık, aralık, bölüm ve dosya adı ver. İnsanların farklı anlayacağı bir talimat Claude için de belirsizdir.` },
          { t: `code`, label: `Claude'a`, code: `in index.html, increase the main heading size\nand leave the paragraph text unchanged` },
          { t: `h`, text: `İşe başlamadan önce kısa kontrol` },
          { t: `list`, items: [
            `Hangi dosya ya da klasör üzerinde çalışılacak?`,
            `Tam olarak ne değişecek?`,
            `Amaç, seçimi etkiliyor mu?`,
            `İlgili bağlam var mı, yoksa yeni bir konuşma mı açılmalı?`,
            `Sonucun doğru olduğunu nasıl kontrol edeceksin?`
          ] },
          { t: `practice` }
        ],
        trouble: [],
        have: [
          `Tahmini azaltan prompt'lar yazmak.`,
          `<code>/clear</code> ile <code>/compact</code> arasında ihtiyaca göre seçim yapmak.`,
          `<code>@</code> ile doğru dosyaya yöneltmek.`,
          `Önce inceleme, sonra uygulama istemek.`,
          `Kendi bilgisayarındaki web sayfasını açıp değişiklikleri kontrol etmek.`
        ],
        note: `İş konusunda belirli, bağlam konusunda tutumlu: Bu modülden aklımda kalan tek cümle bu.`,
        next: `Sırada: Bu iletişim alışkanlıklarını kullanarak gerçek kod üzerinde değişiklik yapmak ve diff okumak.`,
        prompt: `Claude Code kursunun ikinci modülünde prompt yazmayı (nerede/ne/neden), netliği, /clear, /compact, /init ve @dosya kullanımını öğrendim. Bu konulardan 5 soruluk kısa bir tekrar testi hazırlar mısın? Cevapları en sonda ver.`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Your Name</h1>\n<p>I am learning to build websites with Claude Code.</p>` },
          claude: [
            { match: `read @index.html and suggest three improvements; do not change anything yet`, out: [`Değişiklik yapmadım. Üç öneri:`, `1. Başlığı büyüt.`, `2. Yapmak istediğin projeleri bir liste olarak ekle.`, `3. En alta bir iletişim bölümü ekle.`] },
            { match: `in index.html, increase the main heading size and leave the paragraph text unchanged`, write: { "~/my-first-project/index.html": `<h1 style="font-size:3rem">Your Name</h1>\n<p>I am learning to build websites with Claude Code.</p>` }, out: [`[OK] edited index.html — heading larger, paragraph unchanged`] }
          ],
          try: [
            { cmd: `claude "read @index.html and suggest three improvements; do not change anything yet"`, desc: `önce bak` },
            { cmd: `claude "in index.html, increase the main heading size and leave the paragraph text unchanged"`, desc: `belirli ol` },
            { cmd: `cat index.html`, desc: `sonucu kontrol et` }
          ]
        }
      }
    ] },
    { id: `m3`, no: 3, title: `Tek dosyada düzenlemeler`, sub: `Diff oku, karar ver, sonucu kontrol et`, lessons: [
      {
        id: `m3-d1`, title: `Bir diff okuma`, minutes: 5, ready: true,
        intro: [
          `Bir dosyayı değiştirirken edinmen gereken en önemli alışkanlık, önerilen değişikliği okumaktır. <strong>Diff</strong>, eski ve yeni içerik arasındaki farkı satır satır gösterir.`
        ],
        blocks: [
          { t: `callout`, kind: `warn`, title: `Onay ekranı her zaman gelmeyebilir`, html: `Onay isteyen izin modunda Claude öneriyi gösterip kararını bekler. Otomatik düzenleme izinleri açıksa değişiklik önceden uygulanmış olabilir; her seferinde bir onay ekranı göreceğini varsayma.` },
          { t: `h`, text: `Adım 1 — Küçük bir değişiklik iste` },
          { t: `code`, label: `Terminal`, code: `cd my-first-project\nclaude` },
          { t: `code`, label: `Claude'a`, code: `in index.html, change my main heading to say hello and then my name` },
          { t: `p`, html: `Anlamı: “index.html'deki ana başlığı önce merhaba, sonra adım yazacak şekilde değiştir.” Onay ekranı gelirse <strong>henüz kabul etme</strong>. Önce dosya adını ve değişen satırları oku.` },
          { t: `h`, text: `Adım 2 — Diff'i oku` },
          { t: `diff`, label: `index.html`, lines: [`  <body>`, `- <h1>My name</h1>`, `+ <h1>Hello, I'm Ayşe</h1>`, `  <p>I am learning to build websites.</p>`] },
          { t: `list`, items: [
            `<code>-</code> ile başlayan satır <strong>kaldırılır</strong>.`,
            `<code>+</code> ile başlayan satır <strong>eklenir</strong>.`,
            `İşaretsiz <strong>bağlam satırları</strong>, değişikliğin çevresinde aynı kalan içeriği gösterir; değişikliğin dosyanın neresinde olduğunu anlamana yardım eder.`
          ] },
          { t: `p`, html: `Bu örnek bir başlık satırını yenisiyle değiştiriyor. Tek bir parçaya bakıp dosyanın geri kalanının değişmediği sonucuna varma; önerideki diğer blokları da kontrol et.` },
          { t: `practice` },
          { t: `h`, text: `Adım 3 — Onay ekranındaki seçenekler` },
          { t: `table`, head: [`Seçenek`, `Anlamı`], rows: [
            [`Yes`, `Önerilen değişikliği uygular.`],
            [`Yes, and switch to accept edits`, `Değişikliği uygular ve dosya düzenlemelerini otomatik kabul eden moda geçer. Sonraki izin davranışını kontrol et.`],
            [`No`, `Bekleyen öneriyi reddeder.`]
          ] },
          { t: `p`, html: `Menü metni ve tuşlar sürüme göre değişebilir. Düzenleme doğruysa onayla; ardından <code>/exit</code> ile çık ve sayfayı aç:` },
          { t: `cmd`, code: `start index.html` },
          { t: `p`, html: `Başlığın istediğin biçimde değiştiğini ve diğer bölümlerin olduğu gibi kaldığını kontrol et.` },
          { t: `h`, text: `Büyük bir diff'i şu sırayla tara` },
          { t: `steps`, items: [
            `<strong>Hangi dosya?</strong> Değişiklik istediğin dosyalarda mı kalmış?`,
            `<strong>Ne kadar değişiklik?</strong> Kapsam, isteğinle orantılı mı?`,
            `<strong>Neler kaldırılıyor?</strong> Korumak istediğin bir içerik siliniyor mu?`
          ] },
          { t: `p`, html: `Küçük bir istek için beklenmedik büyüklükte bir diff görürsen açıklama iste ya da işi daralt. Satır sayısı tek başına bir hata kanıtı değildir; kapsamı incelemen gerektiğine dair bir işarettir.` }
        ],
        trouble: [
          { q: `Onay ekranı gelmedi, değişiklik doğrudan uygulandı`, a: `Seçili izin modu dosya düzenlemelerini otomatik kabul ediyor olabilir. Giriş alanının yakınındaki modu kontrol et; uygulanan değişikliği de diff'ten ya da dosyayı açarak incele.` },
          { q: `Diff'te beklemediğim satırlar var`, a: `Öneriyi kabul etme. <strong>No</strong> seç ve neyin değişmemesi gerektiğini kısa bir notla yaz ya da Claude'dan değişikliği açıklamasını iste.` }
        ],
        have: [
          `<code>-</code> kaldırılanı, <code>+</code> ekleneni gösterir; bağlam satırları konumu anlatır.`,
          `Onay ekranındaki üç seçeneğin farkını biliyorsun.`,
          `Büyük bir diff'i dosya, kapsam ve kaldırılan içerik sırasıyla tarayabilirsin.`
        ],
        note: `Diff'te önce eksi satırlara bakmayı not ettim: Neyin ekleneceğinden çok, neyin silineceği sürpriz olabiliyor.`,
        next: `Sırada: Bekleyen bir öneriyi kabul etmek, düzeltmek ya da reddetmek.`,
        prompt: `Bir diff'i nasıl okurum? Eksi ve artı ile başlayan satırlar ile bağlam satırlarını küçük bir HTML örneği üzerinden açıklar mısın?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<body>\n  <h1>My name</h1>\n  <p>I am learning to build websites.</p>\n</body>` },
          cmds: [
            { match: `start index.html`, out: [`(simülasyon) index.html varsayılan tarayıcıda açılırdı.`] }
          ],
          claude: [
            { match: `in index.html, change my main heading to say hello and then my name`, write: { "~/my-first-project/index.html": `<body>\n  <h1>Hello, I'm Ayşe</h1>\n  <p>I am learning to build websites.</p>\n</body>` },
              out: [`Önerilen değişiklik — index.html:`, `  <body>`, `- <h1>My name</h1>`, `+ <h1>Hello, I'm Ayşe</h1>`, `  <p>I am learning to build websites.</p>`, `(simülasyon: öneri kabul edildi)`, `[OK] edited index.html`] }
          ],
          try: [
            { cmd: `cat index.html`, desc: `önceki hâl` },
            { cmd: `claude "in index.html, change my main heading to say hello and then my name"`, desc: `diff'i gör` },
            { cmd: `cat index.html`, desc: `sonraki hâl` }
          ]
        }
      },
      {
        id: `m3-d2`, title: `Düzenlemeleri kabul etme ve ayarlama`, minutes: 3, ready: true,
        intro: [
          `Önerilen bir diff bir tekliftir. Onay bekleyen bir düzenlemede sıradaki adımı sen seçersin: kabul et, düzelt ya da reddet.`
        ],
        blocks: [
          { t: `h`, text: `Üç seçeneğin` },
          { t: `table`, head: [`Yanıt`, `Ne yaparsın?`], rows: [
            [`Kabul et`, `Doğru olan değişikliği uygulat.`],
            [`Düzelt`, `Bekleyen öneriyi reddet ve küçük bir ayarlama tarif et.`],
            [`Reddet`, `İstemediğin öneriyi uygulamadan bırak.`]
          ] },
          { t: `callout`, kind: `info`, title: `Otomatik izinler`, html: `Otomatik düzenleme izinleri açıksa dosya senin kararından önce değişmiş olabilir. Seçili modu kontrol et.` },
          { t: `h`, text: `Baştan anlatmak yerine küçük bir düzeltme` },
          { t: `code`, label: `Claude'a`, code: `in index.html, make my heading bigger` },
          { t: `p`, html: `Diff doğru yönde ama başlık fazla büyük olabilir. Bu durumda <strong>No</strong> seçeneğine gel ve <kbd>Tab</kbd> ile geri bildirim alanını aç. Menü farklıysa mevcut açıklama ya da geri bildirim seçeneğini kullan. Sonra yalnızca düzeltmeyi yaz:` },
          { t: `code`, label: `Geri bildirim`, code: `a little smaller` },
          { t: `p`, html: `“keep the colour” (rengi koru) ya da “leave the paragraph alone” (paragrafa dokunma) gibi kısa düzeltmeler, aynı hedef üzerinde kalmanı sağlar. Yeni gelen diff'i de okuyup değerlendir.` },
          { t: `practice` },
          { t: `h`, text: `Küçük adımlar, sık kontrol` },
          { t: `p`, html: `Büyük bir değişikliği okumadan kabul etmek yerine ayrı ayrı kontrol edebileceğin adımlar iste. Böylece bir sorun çıktığında hangi değişikliğin yol açtığını bulmak kolaylaşır.` },
          { t: `h`, text: `Şimdi dene` },
          { t: `code`, label: `Claude'a`, code: `in index.html, add a short sentence under my heading welcoming visitors` },
          { t: `p`, html: `Sayfanda üç küçük değişikliği birer birer iste. Her öneriyi oku ve en az birini kısa bir düzeltmeyle ayarla. Sonra sayfayı aç ve sonucun verdiğin kararlarla eşleştiğini kontrol et.` }
        ],
        trouble: [
          { q: `Geri bildirim alanını bulamıyorum`, a: `Menü sürüme göre değişebilir. Öneriyi reddet ve düzeltmeyi bir sonraki mesajda kısa bir cümleyle yaz.` },
          { q: `Düzeltmeden sonra başka şeyler de değişti`, a: `Yeni diff'i reddet ve neyin değişmemesi gerektiğini açıkça ekle; örneğin “only change the font size”.` }
        ],
        have: [
          `Bekleyen bir öneriyi kabul edebilir, düzeltebilir ya da reddedebilirsin.`,
          `Baştan anlatmak yerine kısa bir geri bildirimle öneriyi ayarlamayı öğrendin.`,
          `Değişiklikleri küçük ve gözden geçirilebilir tutmanın faydasını gördün.`
        ],
        note: `“a little smaller” gibi iki kelimelik bir düzeltmenin, isteği baştan yazmaktan çok daha hızlı sonuç verdiğini bu derste gördüm.`,
        next: `Sırada: Değiştirmeden önce açıklama istemek.`,
        prompt: `Claude Code'da bekleyen bir düzenleme önerisini kabul etmek, kısa bir geri bildirimle düzeltmek ve reddetmek arasında nasıl karar veririm? Basit örneklerle anlatır mısın?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Hello, I'm Ayşe</h1>\n<p>I am learning to build websites.</p>` },
          claude: [
            { match: `in index.html, make my heading bigger`, out: [`Önerilen değişiklik — index.html:`, `- <h1>Hello, I'm Ayşe</h1>`, `+ <h1 style="font-size:5rem">Hello, I'm Ayşe</h1>`, `(öneri bekliyor — kabul etmek yerine kısa bir düzeltme yazabilirsin)`] },
            { match: `a little smaller`, write: { "~/my-first-project/index.html": `<h1 style="font-size:3rem">Hello, I'm Ayşe</h1>\n<p>I am learning to build websites.</p>` }, out: [`Güncellenmiş öneri — index.html:`, `- <h1>Hello, I'm Ayşe</h1>`, `+ <h1 style="font-size:3rem">Hello, I'm Ayşe</h1>`, `(simülasyon: öneri kabul edildi)`, `[OK] edited index.html`] },
            { match: `in index.html, add a short sentence under my heading welcoming visitors`, write: { "~/my-first-project/index.html": `<h1 style="font-size:3rem">Hello, I'm Ayşe</h1>\n<p>Welcome, thanks for stopping by!</p>\n<p>I am learning to build websites.</p>` }, out: [`Önerilen değişiklik — index.html:`, `  <h1 style="font-size:3rem">Hello, I'm Ayşe</h1>`, `+ <p>Welcome, thanks for stopping by!</p>`, `(simülasyon: öneri kabul edildi)`, `[OK] edited index.html`] }
          ],
          try: [
            { cmd: `claude "in index.html, make my heading bigger"`, desc: `öneriyi gör` },
            { cmd: `claude "a little smaller"`, desc: `kısa düzeltme` },
            { cmd: `claude "in index.html, add a short sentence under my heading welcoming visitors"`, desc: `bir sonraki küçük adım` },
            { cmd: `cat index.html`, desc: `sonucu kontrol et` }
          ]
        }
      },
      {
        id: `m3-d3`, title: `Açıklama isteme`, minutes: 2, ready: true,
        intro: [
          `Claude'u yalnızca dosyaları değiştirmek için değil, anlamak için de kullan. Anlamadığın bir bölümü değiştirmeden önce ne yaptığını sor.`
        ],
        blocks: [
          { t: `h`, text: `Adım 1 — Önce gerçek dosyayı açıklat` },
          { t: `code`, label: `Claude'a`, code: `explain what @index.html does, in plain language, section by section` },
          { t: `p`, html: `Anlamı: “index.html'in ne yaptığını sade bir dille, bölüm bölüm açıkla.” <code>@index.html</code> ile ilgili dosyayı işaret edersin; başlığın, paragrafların ve stillerin ne işe yaradığını anlaşılır bir dille öğrenirsin.` },
          { t: `h`, text: `Saklamaya değer üç soru` },
          { t: `list`, items: [
            `<code>Explain @index.html like I have never seen HTML before.</code> — Daha önce hiç HTML görmemişim gibi açıkla.`,
            `<code>What would happen to my page if I deleted this part?</code> — Bu bölümü silersem sayfama ne olur?`,
            `<code>Why is this written this way instead of something simpler?</code> — Bu neden daha basit bir yolla değil de böyle yazılmış?`
          ] },
          { t: `p`, html: `“Bu bölüm” gibi ifadeler kullanırken ilgili kodu ya da bölümün adını da yaz. Açıklama olası tasarım nedenlerini ortaya çıkarır; yine de gerekçeyi dosyayla ve sayfanın davranışıyla karşılaştır.` },
          { t: `practice` },
          { t: `h`, text: `Adım 2 — Diff'i kabul etmeden önce açıklama iste` },
          { t: `p`, html: `Bekleyen bir öneriden emin değilsen <strong>No</strong> ve geri bildirim seçeneğini kullan (çoğu sürümde <strong>No</strong> seçiliyken <kbd>Tab</kbd> ile açılır) ve şunu yaz:` },
          { t: `code`, label: `Geri bildirim`, code: `before I approve, walk me through what this change does\nand what might look different on my page` },
          { t: `p`, html: `Anlamı: “Onaylamadan önce bu değişikliğin ne yaptığını ve sayfamda neyin farklı görünebileceğini adım adım anlat.” Açıklama istediğinle eşleşmiyorsa öneriyi daralt ya da reddet. Açıklamadan sonra yeniden sunulan diff'i de incele; öncekiyle aynı olduğunu varsayma.` },
          { t: `h`, text: `Şimdi dene` },
          { t: `p`, html: `Sayfanı baştan sona açıklat. Sonra tek bir bölüm için “Neden böyle yazılmış?” diye sor. Aldığın açıklamayı tarayıcıdaki sonuçla karşılaştır.` }
        ],
        trouble: [
          { q: `Açıklama çok teknik geldi`, a: `Seviyeyi belirt: “like I have never seen HTML before” ya da “in two sentences” gibi bir ek, açıklamayı sadeleştirir.` },
          { q: `Açıklama dosyayla uyuşmuyor`, a: `Dosyayı açıp ilgili satırı göster ve yeniden sor. Açıklama karar vermene yardım eder ama dosyanın kendisini kontrol etmenin yerini almaz.` }
        ],
        have: [
          `Bir dosyayı bölüm bölüm açıklatmayı öğrendin.`,
          `Saklamaya değer üç soru kalıbın var.`,
          `Bekleyen bir diff'i onaylamadan önce açıklama isteyebilirsin.`
        ],
        note: `Önce anla, sonra değiştir: Bir bölümü silmeden önce “bunu silersem ne olur?” diye sormayı bu dersten aldığım bir alışkanlık olarak not ettim.`,
        next: `Sırada: Görünümü değiştirmeden kodu toparlamak.`,
        prompt: `Basit bir HTML sayfasındaki <head>, <body>, <h1>, <p> ve <style> bölümlerinin ne işe yaradığını, HTML'i hiç görmemiş birine anlatır gibi açıklar mısın?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<style>h1 { color: #b33; }</style>\n<h1>Hello, I'm Ayşe</h1>\n<p>Welcome, thanks for stopping by!</p>` },
          claude: [
            { match: `explain what @index.html does, in plain language, section by section`, out: [`index.html üç bölümden oluşuyor:`, `1. <style>: Sayfanın görünüm kuralları. Burada başlığı kırmızı yapıyor.`, `2. <h1>: Sayfanın ana başlığı — ziyaretçinin ilk gördüğü büyük yazı.`, `3. <p>: Başlığın altındaki karşılama paragrafı.`] },
            { match: `what would happen to my page if I deleted the style part?`, out: [`<style> bölümünü silersen başlık kırmızı olmaktan çıkar ve tarayıcının varsayılan rengiyle (genellikle siyah) görünür.`, `Metinler ve sayfanın yapısı değişmez.`] }
          ],
          try: [
            { cmd: `claude "explain what @index.html does, in plain language, section by section"`, desc: `dosyayı açıklat` },
            { cmd: `claude "what would happen to my page if I deleted the style part?"`, desc: `silmeden önce sor` },
            { cmd: `cat index.html`, desc: `açıklamayı dosyayla karşılaştır` }
          ]
        }
      },
      {
        id: `m3-d4`, title: `Küçük refaktörler`, minutes: 5, ready: true,
        intro: [
          `Refaktör, kodun dışarıdan görünen davranışını koruyarak iç yapısını düzenlemektir. Bu dersteki web sayfasında hedef, görünümü ve işlevi değiştirmeden kodu toparlamak.`
        ],
        blocks: [
          { t: `h`, text: `Yaygın toparlamalar` },
          { t: `table`, head: [`İşlem`, `Anlamı`], rows: [
            [`Yeniden adlandır`, `Bir öğeye, kullanıldığı her yerde daha açık bir ad ver.`],
            [`Ayıkla`, `Tekrarlanan bir değeri ya da yapıyı tek bir yerde topla.`],
            [`Sadeleştir`, `Aynı işi yapan kodu daha anlaşılır hâle getir.`]
          ] },
          { t: `h`, text: `Adım 1 — Küçük ve belirli bir istek yap` },
          { t: `code`, label: `Claude'a`, code: `in index.html, put the colours in named variables\nat the top of the style block,\nwithout changing how the page looks` },
          { t: `p`, html: `Anlamı: “index.html'de renkleri, sayfanın görünümünü değiştirmeden, stil bloğunun başında adlandırılmış değişkenlere taşı.” Bir renk birden fazla yerde kullanılıyorsa, sonradan değiştirirken tutarsızlık çıkabilir. Adlandırılmış CSS değişkenleri ortak değerleri tek yerde toplar.` },
          { t: `diff`, label: `index.html — örnek`, lines: [`  <style>`, `+   :root { --brand: #b33; }`, `-   h1 { color: #b33; }`, `+   h1 { color: var(--brand); }`, `-   a { color: #b33; }`, `+   a { color: var(--brand); }`, `  </style>`] },
          { t: `h`, text: `Adım 2 — Diff'i oku` },
          { t: `list`, items: [
            `Değişkenler doğru değerlerle tanımlanmış mı?`,
            `Her kullanım doğru değişkene bağlanmış mı?`,
            `Yeni bir içerik ya da beklenmedik bir görünüm değişikliği var mı?`
          ] },
          { t: `practice` },
          { t: `h`, text: `Adım 3 — Görünümü ve işlevi doğrula` },
          { t: `cmd`, code: `start index.html` },
          { t: `p`, html: `Sayfayı aç ya da açık sekmeyi yenile. Renkler, yazı boyutları, aralıklar ve bağlantılar önceki gibi mi? Gerekirse farklı pencere genişliklerinde de bak.` },
          { t: `p`, html: `Bir şey beklenmedik biçimde değiştiyse dur. Hangi değişikliğin buna yol açtığını incele; uygun bir checkpoint varsa <code>/rewind</code> ile geri dön ya da önceki sürümle karşılaştırarak düzelt.` },
          { t: `callout`, kind: `tip`, title: `Toparlama ile yeni özelliği ayır`, html: `Aynı adımda hem kodu yeniden düzenleyip hem yeni bir özellik eklersen, bir sorun çıktığında kaynağını ayırmak zorlaşır. İki işi ayrı ve gözden geçirilebilir adımlarda yap.` },
          { t: `h`, text: `Şimdi dene` },
          { t: `code`, label: `Claude'a`, code: `read @index.html and suggest three small tidy-ups\nthat would not change how the page looks;\ndo not change anything yet` },
          { t: `steps`, items: [
            `Önerileri oku.`,
            `Küçük bir toparlama seç.`,
            `Yalnızca onu uygulat ve diff'i incele.`,
            `Sayfayı açıp görünümün ve davranışın korunduğunu doğrula.`
          ] }
        ],
        trouble: [
          { q: `Refaktörden sonra sayfanın görünümü değişti`, a: `Diff'te değişkenlerin değerlerini ve kullanıldıkları yerleri kontrol et. Gerekirse <code>/rewind</code> ile geri dön ve isteğe “without changing how the page looks” ekini koruyarak yeniden dene.` },
          { q: `Claude refaktörle birlikte yeni şeyler de ekledi`, a: `Öneriyi reddet ve isteği daralt: “only move the colours into variables; do not add anything new”.` }
        ],
        have: [
          `Refaktörün görünümü ve davranışı koruyan bir iç düzenleme olduğunu biliyorsun.`,
          `Renkleri adlandırılmış CSS değişkenlerinde toplamayı gördün.`,
          `Toparlamayı yeni özellikten ayrı bir adımda yapmayı öğrendin.`
        ],
        note: `Bu sitenin renkleri de CSS değişkenlerinde duruyor; aydınlık ve koyu temayı tek yerden değiştirebilmemi bu yaklaşım sağlıyor.`,
        next: `Sırada: Modül 3'ün özeti.`,
        prompt: `CSS'te renkleri değişkenlere (custom properties) taşımak neden faydalıdır? Basit bir örnekle önce/sonra hâlini gösterir misin?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<style>\n  h1 { color: #b33; }\n  a { color: #b33; }\n</style>\n<h1>Hello, I'm Ayşe</h1>\n<a href="about.html">About me</a>` },
          cmds: [
            { match: `start index.html`, out: [`(simülasyon) index.html tarayıcıda açılırdı. Renkler önceki gibi mi? Kontrol et.`] }
          ],
          claude: [
            { match: `read @index.html and suggest three small tidy-ups that would not change how the page looks; do not change anything yet`, out: [`Değişiklik yapmadım. Görünümü değiştirmeyecek üç toparlama:`, `1. Tekrarlanan #b33 rengini bir değişkende topla.`, `2. Başlık ve bağlantıyı bir <main> içine al.`, `3. Stil kurallarını alfabetik sıraya koy.`] },
            { match: `in index.html, put the colours in named variables at the top of the style block, without changing how the page looks`, write: { "~/my-first-project/index.html": `<style>\n  :root { --brand: #b33; }\n  h1 { color: var(--brand); }\n  a { color: var(--brand); }\n</style>\n<h1>Hello, I'm Ayşe</h1>\n<a href="about.html">About me</a>` },
              out: [`Önerilen değişiklik — index.html:`, `  <style>`, `+   :root { --brand: #b33; }`, `-   h1 { color: #b33; }`, `+   h1 { color: var(--brand); }`, `-   a { color: #b33; }`, `+   a { color: var(--brand); }`, `  </style>`, `(simülasyon: öneri kabul edildi)`, `[OK] edited index.html — görünüm aynı`] }
          ],
          try: [
            { cmd: `claude "read @index.html and suggest three small tidy-ups that would not change how the page looks; do not change anything yet"`, desc: `önce öneri` },
            { cmd: `claude "in index.html, put the colours in named variables at the top of the style block, without changing how the page looks"`, desc: `tek bir toparlama` },
            { cmd: `cat index.html`, desc: `sonucu oku` },
            { cmd: `start index.html`, desc: `görünümü doğrula` }
          ]
        }
      },
      {
        id: `m3-d5`, title: `Modül 3 özeti`, minutes: 2, ready: true,
        intro: [
          `Tek dosyada düzenleme döngüsünü kurdun: öneriyi oku, uygun yanıtı ver, gerektiğinde açıklama iste ve küçük toparlamalar yap. Proje büyüdüğünde de bu alışkanlıklar geçerli.`
        ],
        blocks: [
          { t: `h`, text: `Modül 3 hızlı başvuru` },
          { t: `table`, head: [`Beceri`, `Hamle`], rows: [
            [`Diff oku`, `<code>-</code> kaldırılanı, <code>+</code> ekleneni gösterir; bağlam satırları konumu anlatır.`],
            [`Gözden geçirme sırası`, `Hangi dosya → ne kadar değişiklik → ne kaldırılıyor?`],
            [`Yanıtla`, `Bekleyen öneriyi kabul et, kısa bir geri bildirimle düzelt ya da reddet.`],
            [`Önce anla`, `“Explain @index.html” ve “Why is it written this way?” diye sor.`],
            [`Toparla`, `Küçük bir refaktör yap; görünümü ve davranışı tarayıcıda kontrol et.`]
          ] },
          { t: `h`, text: `Zihinsel model` },
          { t: `p`, html: `<strong>İste → diff'i oku → kabul et ya da düzelt → sayfayı kontrol et.</strong> Değişikliğin kapsamını küçük tutmak, hem incelemeyi hem de bir sorunun kaynağını bulmayı kolaylaştırır.` },
          { t: `callout`, kind: `warn`, title: `İzin modunu bil`, html: `Onay gerektiren modlarda bekleyen değişiklikleri sen değerlendirirsin. Otomatik düzenleme izinleri açıksa her değişiklik için soru gelmeyebilir; seçili modu bil ve uygulanmış diff'leri de incele.` },
          { t: `practice` }
        ],
        trouble: [],
        have: [
          `Diff'te eklenen ve kaldırılan satırları ayırt etmek.`,
          `Bir öneriyi bilinçli olarak kabul etmek, düzeltmek ya da reddetmek.`,
          `Değiştirmeden önce açıklama istemek.`,
          `Küçük bir refaktör yapıp görünümün ve davranışın korunduğunu kontrol etmek.`
        ],
        note: `İste, oku, karar ver, kontrol et: Tek dosyada öğrendiğim bu döngüyü her değişiklikte uygulamayı hedefliyorum.`,
        next: `Sırada: Birden fazla dosyayı etkileyen değişiklikleri planlamak ve birlikte gözden geçirmek.`,
        prompt: `Claude Code kursunun üçüncü modülünde diff okumayı, önerileri kabul etme/düzeltme/reddetmeyi, açıklama istemeyi ve küçük refaktörleri öğrendim. 5 soruluk kısa bir tekrar testi hazırlar mısın? Cevapları en sonda ver.`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>My name</h1>\n<p>I am learning to build websites.</p>` },
          claude: [
            { match: `in index.html, change my main heading to say hello and then my name`, write: { "~/my-first-project/index.html": `<h1>Hello, I'm Ayşe</h1>\n<p>I am learning to build websites.</p>` },
              out: [`Önerilen değişiklik — index.html:`, `- <h1>My name</h1>`, `+ <h1>Hello, I'm Ayşe</h1>`, `  <p>I am learning to build websites.</p>`, `(simülasyon: öneri kabul edildi)`, `[OK] edited index.html`] }
          ],
          try: [
            { cmd: `claude "in index.html, change my main heading to say hello and then my name"`, desc: `iste ve diff'i oku` },
            { cmd: `cat index.html`, desc: `sonucu kontrol et` }
          ]
        }
      }
    ] },
    { id: `m4`, no: 4, title: `Çok sayfalı bir site kur`, sub: `Planla, sayfalara yay, bütünü gözden geçir`, lessons: [
      {
        id: `m4-d1`, title: `Planlama neden önemli`, minutes: 4, ready: true,
        intro: [
          `Siten birden fazla sayfaya çıktığında bir değişiklik başka dosyaları da etkiler. Bir sayfanın adını değiştirmek bağlantıları, ortak menüyü değiştirmek bütün sayfaları ilgilendirir. Bu yüzden düzenlemeye geçmeden önce yaklaşımı planla.`
        ],
        blocks: [
          { t: `h`, text: `Adım 1 — Düzenlemeyi değil, planı iste` },
          { t: `code`, label: `Claude'a`, code: `I want to add a second page called projects.html\nand link to it from my home page. Plan the change first:\nlist the files you would touch and in what order.\nDo not edit anything yet.` },
          { t: `p`, html: `Anlamı: “projects.html adında ikinci bir sayfa ekleyip ana sayfamdan ona bağlantı vermek istiyorum. Önce değişikliği planla: dokunacağın dosyaları ve sırasını listele. Henüz hiçbir şeyi düzenleme.” Böylece hangi dosyaların değişeceğini ve sırayı önceden görürsün. Eksik bir sayfayı ya da yanlış bir varsayımı, düzenleme başlamadan fark etmek çok daha kolaydır.` },
          { t: `practice` },
          { t: `h`, text: `Adım 2 — Planı eleştirel bir gözle oku` },
          { t: `list`, items: [
            `<strong>Kapsam:</strong> Etkilenen bütün dosyalar listede mi?`,
            `<strong>Sıra:</strong> Ortak stil ve bağlantı bağımlılıkları düşünülmüş mü?`,
            `<strong>Sınır:</strong> Dokunulmasını istemediğin bir dosya var mı?`
          ] },
          { t: `p`, html: `Her işin tek bir doğru sırası yoktur. Önemli olan, planın gerekçesinin anlaşılır olması ve bağımlılıkları atlamaması.` },
          { t: `h`, text: `Adım 3 — Plan modunu kullan` },
          { t: `p`, html: `<kbd>Shift</kbd> + <kbd>Tab</kbd> ile plan moduna geçebilirsin. Seçili modu arayüzden kontrol et; sürüm ve izin ayarlarına göre farklılık olabilir.` },
          { t: `callout`, kind: `warn`, title: `Plan, inceleme yerine geçmez`, html: `Planı okumak, uygulanan değişiklikleri sonradan incelemen gerektiği gerçeğini değiştirmez. Plan yönü belirler; diff ve tarayıcı sonucu doğrular.` },
          { t: `h`, text: `Şimdi dene` },
          { t: `code`, label: `Claude'a`, code: `plan how to give my site a projects page and an about page,\nboth linked from the home page;\nlist the files and the order, no edits yet` },
          { t: `p`, html: `Yalnızca planı oku. Eksik bir dosya ya da istemediğin bir adım varsa bunu açıkla ve planı yeniden düzenlet. Bu alıştırmada uygulamaya geçmek zorunda değilsin.` }
        ],
        trouble: [
          { q: `Claude planlamak yerine doğrudan düzenlemeye başladı`, a: `<kbd>Esc</kbd> ile durdur. İsteğe “do not edit anything yet” ekini koy ya da plan moduna geçip yeniden iste.` },
          { q: `Planda bir dosya eksik`, a: `Eksik dosyayı adıyla söyle: “you also need to update about.html”. Planı yeniden yazdır ve tekrar oku.` }
        ],
        have: [
          `Düzenlemeden önce dosya listesi ve sıra içeren bir plan istemeyi öğrendin.`,
          `Planı kapsam, sıra ve sınır açısından kontrol edebilirsin.`,
          `Plan modunun yerini ve sınırını biliyorsun.`
        ],
        note: `Bu sitenin Türkçe ve İngilizce sayfalarını birlikte güncellemem gerektiği için “önce hangi dosyalara dokunacaksın?” sorusu benim için özellikle önemli.`,
        next: `Sırada: Planlanan değişikliği ilgili bütün sayfalara tutarlı biçimde yaymak.`,
        prompt: `Çok sayfalı basit bir web sitesine yeni bir sayfa eklerken, değişiklik yapmadan önce nasıl bir plan istemeliyim? Bir planı kontrol etmek için hangi sorulara bakmalıyım?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Hello, I'm Ayşe</h1>\n<p>Welcome, thanks for stopping by!</p>` },
          claude: [
            { match: `I want to add a second page called projects.html and link to it from my home page. Plan the change first: list the files you would touch and in what order. Do not edit anything yet`,
              out: [`Plan (henüz hiçbir dosyayı değiştirmedim):`, `1. projects.html — yeni sayfa; index.html ile aynı yapı ve stil.`, `2. index.html — projects.html'e giden bir bağlantı ekle.`, `Dokunmayacağım dosyalar: yok.`, `Onaylarsan 1. adımdan başlarım.`] },
            { match: `plan how to give my site a projects page and an about page, both linked from the home page; list the files and the order, no edits yet`,
              out: [`Plan (düzenleme yok):`, `1. projects.html oluştur.`, `2. about.html oluştur.`, `3. index.html'e iki sayfaya giden bağlantıları ekle.`, `4. Üç sayfada ortak stilin aynı olduğunu kontrol et.`, `Sıra önerisi: önce sayfalar, sonra bağlantılar — böylece bağlantılar boşa gitmez.`] }
          ],
          try: [
            { cmd: `claude "I want to add a second page called projects.html and link to it from my home page. Plan the change first: list the files you would touch and in what order. Do not edit anything yet."`, desc: `önce planı iste` },
            { cmd: `ls`, desc: `hiçbir şey değişmedi mi?` },
            { cmd: `claude "plan how to give my site a projects page and an about page, both linked from the home page; list the files and the order, no edits yet"`, desc: `iki sayfalık plan` }
          ]
        }
      },
      {
        id: `m4-d2`, title: `Dosyalar arası düzenlemeler`, minutes: 4, ready: true,
        intro: [
          `Plan hazır olduğunda değişikliği ilgili bütün sayfalara tutarlı biçimde yay. Ortak bir menü, renk ya da alt bilgi için hangi sayfaların birlikte değişmesi gerektiğini belirle.`
        ],
        blocks: [
          { t: `h`, text: `Adım 1 — Ortak menüyü her sayfaya ekle` },
          { t: `code`, label: `Claude'a`, code: `add the same navigation menu - Home, Projects, About -\nto the top of every page,\nlinking each one to the right file` },
          { t: `p`, html: `Anlamı: “Her sayfanın en üstüne aynı gezinme menüsünü (Ana sayfa, Projeler, Hakkımda) ekle ve her birini doğru dosyaya bağla.” Claude birden fazla dosyada düzenleme önerebilir. Her dosyayı tek başına değil, değişikliğin bütünü içindeki rolüyle oku.` },
          { t: `practice` },
          { t: `h`, text: `Adım 2 — Dosyalar arasını gözden geçir` },
          { t: `list`, items: [
            `<strong>Eksiksiz mi?</strong> İlgili her sayfa değişikliği almış mı?`,
            `<strong>Tutarlı mı?</strong> Menü adları, sırası ve hedef bağlantılar uyumlu mu?`,
            `<strong>Planla sınırlı mı?</strong> Yalnızca amaçlanan dosyalara mı dokunulmuş?`
          ] },
          { t: `h`, text: `Adım 3 — Tarayıcıda gerçekten doğrula` },
          { t: `cmd`, code: `start index.html` },
          { t: `p`, html: `Ana sayfayı aç. Menüden diğer sayfalara geç ve her sayfadaki bağlantıları dene. Dosya adlarının, klasör yollarının ve büyük/küçük harflerin doğru olduğunu kontrol et.` },
          { t: `h`, text: `Adım 4 — Eksikliği somut olarak bildir` },
          { t: `p`, html: `Bir sayfada menü eksikse dosyayı ve belirtiyi adıyla söyle:` },
          { t: `code`, label: `Claude'a`, code: `the menu is missing on about.html;\nadd the same menu as on the other pages` },
          { t: `p`, html: `Anlamı: “about.html'de menü eksik; diğer sayfalardaki menünün aynısını oraya da ekle.” Düzeltmeden sonra ilgili bağlantıları yeniden dene.` }
        ],
        trouble: [
          { q: `Bir bağlantı “dosya bulunamadı” hatası veriyor`, a: `Bağlantıdaki dosya adını gerçek dosya adıyla karşılaştır; büyük/küçük harf ve klasör yolu da önemlidir. <code>ls</code> ile dosyanın adını kontrol et.` },
          { q: `Menü bir sayfada farklı görünüyor`, a: `O sayfanın aynı stil dosyasını ya da stil bloğunu kullanıp kullanmadığını sor ve sayfayı adıyla belirterek düzeltme iste.` }
        ],
        have: [
          `Ortak bir öğeyi bütün ilgili sayfalara birlikte uygulatmayı öğrendin.`,
          `Çok dosyalı bir diff'i eksiksizlik, tutarlılık ve kapsam açısından inceleyebilirsin.`,
          `Bağlantıları tarayıcıda deneyerek doğrulamayı ve eksikliği somut bildirmeyi öğrendin.`
        ],
        note: `Bu sitenin üst menüsü ve alt bilgisi altı sayfada ortak; birini değiştirdiğimde hepsini kontrol etmem gerektiğini bu ders netleştirdi.`,
        next: `Sırada: Büyük değişiklikleri gözden geçirilebilir parçalara bölmek.`,
        prompt: `Üç sayfalık basit bir HTML sitesine (index, projects, about) ortak bir gezinme menüsü eklemek istiyorum. Değişikliği nasıl isterim ve sonucu kontrol etmek için neye bakmalıyım?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: {
            "~/my-first-project/index.html": `<h1>Hello, I'm Ayşe</h1>`,
            "~/my-first-project/projects.html": `<h1>Projects</h1>`,
            "~/my-first-project/about.html": `<h1>About me</h1>`
          },
          cmds: [
            { match: `start index.html`, out: [`(simülasyon) index.html tarayıcıda açılırdı. Menüdeki her bağlantıyı tek tek dene.`] }
          ],
          claude: [
            { match: `add the same navigation menu - Home, Projects, About - to the top of every page, linking each one to the right file`,
              write: {
                "~/my-first-project/index.html": `<nav><a href="index.html">Home</a> <a href="projects.html">Projects</a> <a href="about.html">About</a></nav>\n<h1>Hello, I'm Ayşe</h1>`,
                "~/my-first-project/projects.html": `<nav><a href="index.html">Home</a> <a href="projects.html">Projects</a> <a href="about.html">About</a></nav>\n<h1>Projects</h1>`
              },
              out: [`[OK] edited index.html — menü eklendi`, `[OK] edited projects.html — menü eklendi`, `(simülasyon: about.html bu turda atlandı — kontrol ederek fark etmeye çalış)`] },
            { match: `the menu is missing on about.html; add the same menu as on the other pages`,
              write: { "~/my-first-project/about.html": `<nav><a href="index.html">Home</a> <a href="projects.html">Projects</a> <a href="about.html">About</a></nav>\n<h1>About me</h1>` },
              out: [`[OK] edited about.html — diğer sayfalardaki menünün aynısı eklendi`] }
          ],
          try: [
            { cmd: `claude "add the same navigation menu - Home, Projects, About - to the top of every page, linking each one to the right file"`, desc: `ortak menü` },
            { cmd: `cat about.html`, desc: `her sayfada var mı?` },
            { cmd: `claude "the menu is missing on about.html; add the same menu as on the other pages"`, desc: `eksikliği bildir` },
            { cmd: `cat about.html`, desc: `düzeldi mi?` }
          ]
        }
      },
      {
        id: `m4-d3`, title: `Görevleri parçalara bölme`, minutes: 2, ready: true,
        intro: [
          `“Bütün sitemi kur” ya da “her şeyi yeniden tasarla” gibi işler, tek seferde inceleyemeyeceğin büyüklükte değişiklikler üretebilir. Çözüm, işi tek tek kontrol edebileceğin parçalara bölmek.`
        ],
        blocks: [
          { t: `h`, text: `Adım 1 — Doğal adımları bul` },
          { t: `steps`, items: [
            `Projeler sayfasını içeriğiyle oluştur.`,
            `Hakkımda sayfasını içeriğiyle oluştur.`,
            `Ortak gezinme menüsünü bütün sayfalara ekle.`,
            `Renkleri ve yazı tiplerini uyumlu hâle getir.`
          ] },
          { t: `p`, html: `Adımların sırası projeye göre değişebilir. Her parçanın sonunda, siteyi açıp gözden geçirebileceğin çalışır bir durum hedefle.` },
          { t: `h`, text: `Adım 2 — Bir parça yap, sonra dur` },
          { t: `code`, label: `Claude'a`, code: `do step 1 only: create the projects page with a heading\nand a short list of things I have made.\nStop and let me review before the next step.` },
          { t: `p`, html: `Anlamı: “Yalnızca 1. adımı yap: başlığı ve yaptığım şeylerin kısa bir listesini içeren projeler sayfasını oluştur. Bir sonraki adımdan önce dur ve incelememe izin ver.” Her adımda diff'i oku ve sonucu tarayıcıda kontrol et.` },
          { t: `callout`, kind: `warn`, title: `Kabul etmek yedeklemek değildir`, html: `Kabul edilen bir adım tek başına kalıcı bir yedek değildir. Güvenilir bir geri dönüş noktası için uygun bir checkpoint ya da Git commit'i kullan; Git'i Modül 5'te göreceksin.` },
          { t: `practice` },
          { t: `h`, text: `Bağlamı ihtiyaca göre yönet` },
          { t: `p`, html: `Bir sonraki parça bağımsızsa <code>/clear</code> ile temiz başlayabilirsin. Aynı işe ait önemli kararlar hâlâ gerekliyse bağlamı koru ya da <code>/compact</code> ile özetle. Temiz başladığında kalan planı ve gerekli dosyaları yeniden belirt.` },
          { t: `h`, text: `Şimdi dene` },
          { t: `code`, label: `Claude'a`, code: `let us build my about page in steps. Step one:\njust the page with my name and a short bio.\nWe will add the rest after I look at it.` },
          { t: `p`, html: `Anlamı: “Hakkımda sayfamı adım adım yapalım. Birinci adım: yalnızca adımı ve kısa bir biyografiyi içeren sayfa. Ben baktıktan sonra gerisini ekleyeceğiz.” Sayfayı açıp inceledikten sonra bir sonraki adıma geç.` }
        ],
        trouble: [
          { q: `Claude durmadan sonraki adıma da geçti`, a: `<kbd>Esc</kbd> ile durdur ve isteğe açıkça “stop after this step” ya da “do step 1 only” yaz.` },
          { q: `Bir adımdan sonra site bozuldu`, a: `Yalnızca o adımın diff'ine bak; parçalar küçük olduğu için sorunun kaynağını bulmak kolaydır. Gerekirse <code>/rewind</code> ile o adımın öncesine dön.` }
        ],
        have: [
          `Büyük bir işi doğal ve kontrol edilebilir adımlara bölmeyi öğrendin.`,
          `Claude'dan tek bir adımı yapıp durmasını isteyebilirsin.`,
          `Adımlar arasında bağlamı ve geri dönüş noktalarını bilinçli yönetmeyi öğrendin.`
        ],
        note: `Bu site de tek seferde değil parça parça oluştu; her parçadan sonra durup sayfayı açmak, sorunları erken görmemi sağladı.`,
        next: `Sırada: Parçalar bittiğinde siteyi bir bütün olarak gözden geçirmek.`,
        prompt: `“Kişisel web sitemi kur” gibi büyük bir işi, her biri ayrı kontrol edilebilecek küçük adımlara nasıl bölerim? Örnek bir adım listesi hazırlar mısın?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Hello, I'm Ayşe</h1>` },
          claude: [
            { match: `do step 1 only: create the projects page with a heading and a short list of things I have made. Stop and let me review before the next step`,
              write: { "~/my-first-project/projects.html": `<h1>Projects</h1>\n<ul>\n  <li>My first web page</li>\n  <li>A shopping list in Markdown</li>\n</ul>` },
              out: [`[OK] wrote projects.html`, `1. adım tamam. İncelemen için burada duruyorum.`] },
            { match: `let us build my about page in steps. Step one: just the page with my name and a short bio. We will add the rest after I look at it`,
              write: { "~/my-first-project/about.html": `<h1>Ayşe</h1>\n<p>I am learning to build and publish websites with Claude Code.</p>` },
              out: [`[OK] wrote about.html — yalnızca ad ve kısa biyografi`, `Sen baktıktan sonra devam ederiz.`] }
          ],
          try: [
            { cmd: `claude "do step 1 only: create the projects page with a heading and a short list of things I have made. Stop and let me review before the next step."`, desc: `tek adım` },
            { cmd: `cat projects.html`, desc: `adımı incele` },
            { cmd: `claude "let us build my about page in steps. Step one: just the page with my name and a short bio. We will add the rest after I look at it."`, desc: `adım adım` },
            { cmd: `ls`, desc: `neler oluştu?` }
          ]
        }
      },
      {
        id: `m4-d4`, title: `Kendi diff'ini gözden geçirme`, minutes: 2, ready: true,
        intro: [
          `Her parçayı incelemek önemlidir; ama sonunda siteye bir bütün olarak da bakmalısın. Sitenin açılması, bütün sayfaların ve bağlantıların doğru olduğu anlamına gelmez.`
        ],
        blocks: [
          { t: `h`, text: `Adım 1 — Baştan sona gez` },
          { t: `p`, html: `Her sayfada amacı, tamamlanmış içeriği ve diğer sayfalarla uyumu kontrol et. Yer tutucu metinleri, yarım kalmış bölümleri ve unutulmuş bağlantıları aramayı alışkanlık hâline getir.` },
          { t: `h`, text: `Hızlı öz gözden geçirme` },
          { t: `table`, head: [`Kontrol`, `Ne arıyorsun?`], rows: [
            [`Eksiksiz`, `Her sayfa tamamlanmış; yarım bölüm ya da yer tutucu yok.`],
            [`Tutarlı`, `Ortak menü, renkler ve alt bilgi uyumlu.`],
            [`Bağlantılar`, `Her bağlantı amaçlanan gerçek hedefe gidiyor.`],
            [`Gerçek içerik`, `Örnek metinler yerine doğru ve sana ait içerik var.`]
          ] },
          { t: `h`, text: `Adım 2 — Claude'dan ikinci bir inceleme iste` },
          { t: `code`, label: `Claude'a`, code: `look over all my pages as if you are a first-time visitor.\nWhat is inconsistent, unfinished, or confusing?\nDo not change anything yet.` },
          { t: `p`, html: `Anlamı: “Bütün sayfalarıma siteyi ilk kez ziyaret eden biri gibi bak. Tutarsız, yarım kalmış ya da kafa karıştıran ne var? Henüz hiçbir şeyi değiştirme.” Bulguları dosya ve sayfa üzerinden doğrula. Hangi düzeltmelerin yapılacağına sen karar ver; önerilen her değişikliği uygulamak zorunda değilsin.` },
          { t: `practice` },
          { t: `callout`, kind: `warn`, title: `Dosya incelemesi, tarayıcının yerini tutmaz`, html: `Claude'un dosyaları incelemesi, sayfaları tarayıcıda gezmenin yerini almaz. Bir bağlantının doğru dosyaya gidip gitmediğini ve görünümü kendin kontrol et. “Bitti” demeden önce sonuca gerçekten bak.` }
        ],
        trouble: [
          { q: `Claude'un bulduğu sorun gerçek değil`, a: `Bulguyu dosyada ve tarayıcıda kontrol et. Yanlışsa bunu söyle ve geç; her öneriyi uygulamak zorunda değilsin.` },
          { q: `Yer tutucu metinleri bulamıyorum`, a: `Claude'dan bunları listelemesini iste: “list any placeholder or example text on my pages; do not change anything”.` }
        ],
        have: [
          `Parçalar bittiğinde siteyi bütün olarak gözden geçirmeyi öğrendin.`,
          `Eksiksizlik, tutarlılık, bağlantılar ve gerçek içerik için dört maddelik bir kontrol listen var.`,
          `Claude'dan ilk kez gelen bir ziyaretçi gözüyle inceleme isteyip bulguları doğrulayabilirsin.`
        ],
        note: `Bu siteyi yayınlamadan önce bağlantıları bir betikle tek tek kontrol ettirdim; ama sayfaları tarayıcıda gezmek yine de ayrı bir adım olarak kaldı.`,
        next: `Sırada: Modül 4'ün özeti.`,
        prompt: `Kişisel web sitemi yayınlamadan önce gözden geçirmek için bir kontrol listesi hazırlar mısın? Eksiksizlik, tutarlılık, bağlantılar ve içerik başlıklarını kullan.`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: {
            "~/my-first-project/index.html": `<nav><a href="index.html">Home</a> <a href="projects.html">Projects</a> <a href="about.html">About</a></nav>\n<h1>Hello, I'm Ayşe</h1>`,
            "~/my-first-project/projects.html": `<nav><a href="index.html">Home</a> <a href="projects.html">Projects</a> <a href="About.html">About</a></nav>\n<h1>Projects</h1>\n<p>Lorem ipsum dolor sit amet.</p>`,
            "~/my-first-project/about.html": `<nav><a href="index.html">Home</a> <a href="projects.html">Projects</a> <a href="about.html">About</a></nav>\n<h1>About me</h1>\n<p>I am learning to build and publish websites.</p>`
          },
          claude: [
            { match: `look over all my pages as if you are a first-time visitor. What is inconsistent, unfinished, or confusing? Do not change anything yet`,
              out: [`Değişiklik yapmadım. Bulgular:`, `1. projects.html — menüdeki About bağlantısı "About.html"e gidiyor; dosyanın adı "about.html".`, `2. projects.html — "Lorem ipsum" yer tutucu metni duruyor.`, `3. index.html — ziyaretçiye sitenin ne olduğunu anlatan bir cümle yok.`, `Hangilerini düzeltmemi istersin?`] }
          ],
          try: [
            { cmd: `cat projects.html`, desc: `kendin bak` },
            { cmd: `claude "look over all my pages as if you are a first-time visitor. What is inconsistent, unfinished, or confusing? Do not change anything yet."`, desc: `ikinci göz` },
            { cmd: `ls`, desc: `dosya adlarını karşılaştır` }
          ]
        }
      },
      {
        id: `m4-d5`, title: `Modül 4 özeti`, minutes: 2, ready: true,
        intro: [
          `Artık birden fazla sayfayı etkileyen bir değişikliği planlayabilir, tutarlı biçimde uygulayabilir ve küçük adımlarla kontrol edebilirsin. Son aşamada da siteyi bir bütün olarak gözden geçirirsin.`
        ],
        blocks: [
          { t: `h`, text: `Modül 4 hızlı başvuru` },
          { t: `table`, head: [`Beceri`, `Hamle`], rows: [
            [`Önce planla`, `Düzenlemeden önce plan, dosya listesi ve sıra iste; uygun olduğunda plan modunu kullan.`],
            [`Her sayfayı düşün`, `Ortak değişikliği bütün ilgili sayfalara uygulat; bağlantıları deneyerek doğrula.`],
            [`Büyük işi parçala`, `Doğal adımlara böl; her parçadan sonra diff'i ve sayfayı incele.`],
            [`Son inceleme`, `Eksiksizlik, tutarlılık, bağlantılar ve gerçek içerik kontrolü yap; Claude'dan da inceleme iste.`]
          ] },
          { t: `h`, text: `Zihinsel model` },
          { t: `p`, html: `<strong>Planla → değiştir → diff'i gözden geçir → sayfaları kontrol et.</strong> Tek dosyadaki döngü aynen sürüyor; eklenen alışkanlık, sayfalar arasındaki tutarlılığı birlikte düşünmek.` },
          { t: `p`, html: `Bir menü ya da stil ortaksa bütün ilgili sayfaları değerlendir. Büyük işi tek seferde incelemek yerine küçük adımlara ayır ve yayınlamadan önce bütün siteyi gez.` },
          { t: `practice` }
        ],
        trouble: [],
        have: [
          `Çok dosyalı bir değişikliği planlamak ve gözden geçirmek.`,
          `Paylaşılan öğeleri bütün sayfalarda tutarlı tutmak.`,
          `Büyük bir işi küçük ve kontrol edilen adımlarla yürütmek.`,
          `Bitmiş siteyi bir bütün olarak değerlendirmek.`
        ],
        note: `Planla, değiştir, gözden geçir, kontrol et: Çok sayfalı bir sitede bu döngüye “bütün sayfaları birlikte düşün” adımını ekledim.`,
        next: `Sırada: Siteni bilgisayarından internete taşıyıp paylaşılabilir bir adresle yayınlamak.`,
        prompt: `Claude Code kursunun dördüncü modülünde çok sayfalı bir site için planlamayı, dosyalar arası düzenlemeyi, işi parçalara bölmeyi ve son gözden geçirmeyi öğrendim. 5 soruluk kısa bir tekrar testi hazırlar mısın? Cevapları en sonda ver.`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: {
            "~/my-first-project/index.html": `<h1>Hello, I'm Ayşe</h1>`,
            "~/my-first-project/projects.html": `<h1>Projects</h1>`,
            "~/my-first-project/about.html": `<h1>About me</h1>`
          },
          try: [
            { cmd: `ls`, desc: `sitenin dosyaları` },
            { cmd: `cat about.html`, desc: `bir sayfayı oku` }
          ]
        }
      }
    ] },
    { id: `m5`, no: 5, title: `İlk projeni yayına alma`, sub: `Bilgisayarından internete`, lessons: [
      {
        id: `m5-d1`, title: `Localhost ile yayındaki web`, minutes: 2, ready: true,
        intro: [
          `Şu anda sitenin dosyaları senin bilgisayarında duruyor. <code>index.html</code> dosyasını doğrudan açtığında adres çubuğunda <code>file://</code> ile başlayan yerel bir yol görürsün. Bu yol, başka birinin bilgisayarından senin dosyana erişim sağlamaz.`
        ],
        blocks: [
          { t: `h`, text: `Üç tür adres` },
          { t: `table`, head: [`Adres türü`, `Ne demek?`], rows: [
            [`<code>file://</code>`, `Tarayıcı, kendi cihazındaki dosyayı doğrudan açar.`],
            [`<code>localhost</code>`, `Cihazında çalışan yerel bir sunucuya bağlanırsın. Başka birinin “localhost” adresi onun kendi cihazını gösterir.`],
            [`Herkese açık HTTPS adresi`, `İnternetten erişilebilen bir sunucu ya da barındırma hizmeti siteyi sunar.`]
          ] },
          { t: `p`, html: `Bilgisayarını kapattığında dosyaların silinmez; yalnızca o bilgisayarda çalışan yerel sunucu durur. Siteyi bağımsız bir barındırıcıda yayınlamak, kendi bilgisayarın kapalıyken de erişilebilir olmasını sağlar.` },
          { t: `h`, text: `Yayına almak ne gerektirir?` },
          { t: `steps`, items: [
            `Dosyaları bir barındırma akışına aktar.`,
            `Bir barındırıcı bu dosyaları bir web adresinde sunsun.`,
            `HTTPS bağlantısını yapılandır ya da sağlayıcının sunduğu HTTPS adresini kullan.`
          ] },
          { t: `p`, html: `Bu modülde GitHub, kaynak dosyaları tutmak ve barındırıcıya aktarmak için kullanılır. Ücretsiz plan olup olmadığı ve sınırları sağlayıcıya göre değişir.` },
          { t: `callout`, kind: `info`, title: `HTTPS ne sağlar?`, html: `HTTPS bağlantıyı şifreler. Sitenin içeriğinin güvenilir olduğunu tek başına kanıtlamaz.` },
          { t: `h`, text: `Claude'a sade bir açıklama sor` },
          { t: `code`, label: `Claude'a`, code: `in plain language, explain the difference between opening\nmy index.html as a file and putting it on a website` },
          { t: `p`, html: `Anlamı: “index.html'i bir dosya olarak açmak ile bir web sitesine koymak arasındaki farkı sade bir dille açıkla.”` },
          { t: `practice` },
          { t: `h`, text: `Erken yayınla, küçük adımlarla güncelle` },
          { t: `p`, html: `Basit bir sürümü erkenden yayınlamak, paylaşma ve güncelleme akışını öğrenmeni sağlar. Küçük güncellemeleri kontrol etmek ve gerekirse geri almak çok daha kolaydır.` }
        ],
        trouble: [
          { q: `Arkadaşıma gönderdiğim bağlantı açılmıyor`, a: `Bağlantı <code>file://</code> ya da <code>localhost</code> ile başlıyorsa yalnızca senin cihazında çalışır. Başkalarıyla paylaşmak için sitenin bir barındırıcıda yayınlanmış HTTPS adresini kullan.` }
        ],
        have: [
          `<code>file://</code>, <code>localhost</code> ve herkese açık adres arasındaki farkı biliyorsun.`,
          `Yayına almanın üç adımını öğrendin: aktar, sun, HTTPS.`,
          `Erken yayınlayıp küçük adımlarla güncellemenin faydasını biliyorsun.`
        ],
        note: `Bu siteyi önce bilgisayarımda <code>file://</code> ile açarak denedim; herkese açık adresi GitHub Pages sağlıyor.`,
        next: `Sırada: Git ile ihtiyacın olan beş komut.`,
        prompt: `file://, localhost ve herkese açık bir HTTPS adresi arasındaki farkı yeni başlayan birine sade bir dille açıklar mısın?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Hello, I'm Ayşe</h1>` },
          claude: [
            { match: `in plain language, explain the difference between opening my index.html as a file and putting it on a website`,
              out: [`Dosya olarak açtığında tarayıcı, senin bilgisayarındaki index.html'i okur (file://...).`, `Bu adres yalnızca senin cihazında çalışır; başkası açamaz.`, `Bir web sitesine koyduğunda dosyalar bir barındırıcıya yüklenir ve herkesin açabileceği`, `bir HTTPS adresinden sunulur. Bilgisayarın kapalı olsa bile site açık kalır.`] }
          ],
          try: [
            { cmd: `pwd`, desc: `dosyalar şu an burada` },
            { cmd: `claude "in plain language, explain the difference between opening my index.html as a file and putting it on a website"`, desc: `farkı sor` }
          ]
        }
      },
      {
        id: `m5-d2`, title: `Git: ihtiyacın olan beş komut`, minutes: 2, ready: true,
        intro: [
          `Git, projenin sürüm geçmişini tutar. Bir <strong>commit</strong>, izlenen dosyaların belirli bir andaki durumunu kaydeder. GitHub gibi bir <strong>remote</strong> (uzak depo) ise bu geçmişin uzaktaki bir kopyasını barındırır.`
        ],
        blocks: [
          { t: `callout`, kind: `info`, title: `Push, yayın demek değildir`, html: `Bir barındırıcı GitHub deposunu yayın kaynağı olarak kullanabilir. Ama bir yayın bağlantısı kurulmadıkça GitHub'a push yapmak siteyi tek başına web'de yayınlamaz.` },
          { t: `h`, text: `Beş temel komut` },
          { t: `table`, head: [`Komut`, `Ne yapar?`], rows: [
            [`<code>git init</code>`, `Klasörde bir Git deposu başlatır; genellikle proje başına bir kez çalıştırılır.`],
            [`<code>git add .</code>`, `Bulunduğun konumun altındaki, yok sayılmayan değişiklikleri bir sonraki commit için hazırlama alanına ekler.`],
            [`<code>git commit -m "mesaj"</code>`, `Hazırlanan değişiklikleri açıklayıcı bir mesajla kaydeder.`],
            [`<code>git remote add origin &lt;url&gt;</code>`, `Uzak deponun adresini <code>origin</code> adıyla tanımlar.`],
            [`<code>git push -u origin main</code>`, `Yerel <code>main</code> dalını uzak depoya gönderir ve takip ilişkisini ayarlar.`]
          ] },
          { t: `p`, html: `Bu temel akıştır. Git'in kurulu olması, kullanıcı kimliğinin tanımlanması, giriş yetkisi ve doğru dal adı gibi ön koşullar gerekebilir. Sonraki gönderimlerde çoğunlukla yalnızca <code>git push</code> yeterlidir.` },
          { t: `practice` },
          { t: `h`, text: `Zahmetli adımlarda yardım iste` },
          { t: `code`, label: `Claude'a`, code: `set up git in this folder, make a first commit,\nand push it to a new GitHub repo called my-first-site;\nwalk me through anything I need to click` },
          { t: `p`, html: `Anlamı: “Bu klasörde Git'i kur, ilk commit'i yap ve my-first-site adlı yeni bir GitHub deposuna gönder; tıklamam gereken her şeyde bana adım adım yol göster.” Uzak depoyu oluşturmadan ve göndermeden önce hedef hesabı, depo adını, görünürlüğü (herkese açık / özel) ve gönderilecek dosyaları kontrol et.` },
          { t: `h`, text: `Commit mesajı gelecekteki sana bir nottur` },
          { t: `p`, html: `“fix” yerine “fix the broken link on the about page” gibi, değişikliğin sonucunu anlatan kısa bir mesaj yaz.` },
          { t: `callout`, kind: `warn`, title: `Sırları commit'leme`, html: `Parolaları ve anahtarları depoya ekleme. <code>.gitignore</code> kullanmak, daha önce commit edilmiş bir sırrı geçmişten silmez. Göndermeden önce dosyaları ve hazırlanan değişiklikleri <code>git status</code> ile incele.` }
        ],
        trouble: [
          { q: `“src refspec main does not match any”`, a: `Henüz commit yapılmamış olabilir ya da dalının adı farklıdır (ör. <code>master</code>). Önce <code>git commit</code> yap; dal adını <code>git branch</code> ile kontrol et.` },
          { q: `Push sırasında giriş/yetki hatası`, a: `GitHub hesabınla giriş yapman gerekir. Hata mesajındaki yönlendirmeyi izle ya da Claude'dan adım adım yardım iste; parolanı sohbete yapıştırma.` },
          { q: `İstemediğim dosyalar da commit'e girdi`, a: `<code>git status</code> ile hazırlanan dosyaları kontrol et. Gitmemesi gereken dosyaları <code>.gitignore</code>'a ekle; daha önce commit edildilerse Claude'dan geçmişten nasıl çıkarılacağını sor.` }
        ],
        have: [
          `Commit ve remote kavramlarını biliyorsun.`,
          `Beş temel Git komutunun ne yaptığını öğrendin.`,
          `Açıklayıcı commit mesajı yazmayı ve sırları depodan uzak tutmayı öğrendin.`
        ],
        note: `Bu sitenin kaynak klasörlerini (CV, fotoğraf, ders notları) <code>.gitignore</code> ile depo dışında tutuyorum ve dosyaları <code>git add .</code> yerine adlarıyla ekliyorum.`,
        next: `Sırada: Depoyu bir barındırıcıya bağlayıp siteyi yayınlamak.`,
        prompt: `git init, git add, git commit, git remote add ve git push komutlarını yeni başlayan birine sırasıyla ve basit bir benzetmeyle açıklar mısın?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Hello, I'm Ayşe</h1>`, "~/my-first-project/about.html": `<h1>About me</h1>` },
          cmds: [
            { match: `git init`, out: [`Initialized empty Git repository in ~/my-first-project/.git/`] },
            { match: `git status`, out: [`On branch main`, `Untracked files:`, `  about.html`, `  index.html`] },
            { match: `git add .`, out: [] },
            { match: `git commit -m "first version of my site"`, out: [`[main (root-commit) a1b2c3d] first version of my site`, ` 2 files changed, 2 insertions(+)`] },
            { match: `git remote add origin https://github.com/you/my-first-site.git`, out: [] },
            { match: `git push -u origin main`, out: [`(simülasyon) Writing objects: 100% (4/4), done.`, `To https://github.com/you/my-first-site.git`, ` * [new branch]      main -> main`, `branch 'main' set up to track 'origin/main'.`] }
          ],
          try: [
            { cmd: `git init`, desc: `depoyu başlat` },
            { cmd: `git status`, desc: `ne değişti?` },
            { cmd: `git add .`, desc: `hazırla` },
            { cmd: `git commit -m "first version of my site"`, desc: `kaydet` },
            { cmd: `git remote add origin https://github.com/you/my-first-site.git`, desc: `uzak depoyu tanımla` },
            { cmd: `git push -u origin main`, desc: `gönder` }
          ]
        }
      },
      {
        id: `m5-d3`, title: `Vercel'e deploy`, minutes: 2, ready: true,
        intro: [
          `Sitenin dosyaları GitHub'da. Bu derste kaynak depoyu bir barındırıcıya bağlayacak ve siteyi paylaşılabilir bir HTTPS adresinde sunma akışını öğreneceksin. Ders Vercel üzerinden ilerler.`
        ],
        blocks: [
          { t: `h`, text: `Adım 1 — Bir kerelik bağlantı` },
          { t: `steps`, items: [
            `<strong>vercel.com</strong> adresine git ve GitHub hesabınla giriş yap.`,
            `İlgili GitHub deposunu içe aktar (<strong>Import</strong>).`,
            `Proje kökünü ve ayarları incele; sade HTML sitene uygun olduğundan emin olduktan sonra <strong>Deploy</strong>'a bas.`
          ] },
          { t: `p`, html: `Planların uygunluğu, kullanım sınırları ve arayüzdeki adlar değişebilir; hesabında görünen koşulları kontrol et. Dağıtım tamamlandığında verilen adresi aç; örnek bir adres <code>my-first-site.vercel.app</code> biçimindedir.` },
          { t: `callout`, kind: `info`, title: `Sade HTML sitesi neden kolay?`, html: `Tarayıcı HTML, CSS ve JavaScript dosyalarını doğrudan gösterebilir; bu yüzden sade bir statik site çoğunlukla derleme adımı gerektirmez. Yine de doğru proje kökünün ve yayınlanacak dosyaların seçilmesi gerekir.` },
          { t: `h`, text: `Adım 2 — Bir sayfa 404 veriyorsa` },
          { t: `code`, label: `Claude'a`, code: `I deployed my site to Vercel but one page shows 404 Not Found.\nHow do I work out which file it is looking for?` },
          { t: `p`, html: `Anlamı: “Sitemi Vercel'e yükledim ama bir sayfa 404 Not Found gösteriyor. Hangi dosyayı aradığını nasıl bulurum?” Önce bağlantının hedefini, dosyanın konumunu ve adını karşılaştır. <code>Projects.html</code> ile <code>projects.html</code> aynı kabul edilmeyebilir. Yanlış klasör, eksik dosya ya da yönlendirme ayarları da 404'e yol açabilir.` },
          { t: `practice` },
          { t: `h`, text: `Güncelleme döngüsü` },
          { t: `p`, html: `<strong>Değiştir → kontrol et → commit → push → dağıtımı izle → canlı siteyi kontrol et.</strong>` },
          { t: `p`, html: `Git entegrasyonu açıksa her push yeni bir dağıtım başlatabilir. Production dalına gönderim canlı siteyi günceller; diğer dallar önizleme dağıtımı oluşturabilir. Bu davranış proje ayarlarına bağlıdır; her push'un canlı siteyi değiştirdiğini varsayma.` },
          { t: `p`, html: `Dağıtım tamamlanınca ana sayfayı, diğer sayfaları ve bağlantıları canlı adreste dene. Güncellemenin anında ya da belirli bir sürede biteceği garanti değildir.` }
        ],
        trouble: [
          { q: `Dağıtım başarısız oldu`, a: `Dağıtım kaydındaki (log) hata mesajını oku ve Claude'a olduğu gibi göster. Sade HTML sitesinde derleme komutu gerekmez; proje kökünün doğru klasör olduğunu kontrol et.` },
          { q: `Push yaptım ama site değişmedi`, a: `Gönderdiğin dalın production dalı olup olmadığını ve dağıtımın tamamlandığını kontrol et. Tarayıcı önbelleği için sayfayı yenile.` }
        ],
        have: [
          `GitHub deposunu bir barındırıcıya bağlamanın adımlarını biliyorsun.`,
          `404 hatasında dosya adını, yolunu ve büyük/küçük harfi karşılaştırmayı öğrendin.`,
          `Değiştir → commit → push → dağıtımı izle → kontrol et döngüsünü biliyorsun.`
        ],
        note: `Ders Vercel'i anlatıyor; ben bu siteyi aynı mantıkla GitHub Pages'te yayınladım. Her gönderimden sonra yayının tamamlandığını ve canlı adresin açıldığını kontrol ettim.`,
        next: `Sırada: Ortam değişkenleri ve sırları güvenle yönetmek.`,
        prompt: `Statik bir HTML sitesini GitHub deposundan bir barındırma hizmetinde yayınlarken 404 hatası alıyorum. Nedenlerini ve kontrol etmem gerekenleri sırayla listeler misin?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<nav><a href="index.html">Home</a> <a href="Projects.html">Projects</a></nav>\n<h1>Hello, I'm Ayşe</h1>`, "~/my-first-project/projects.html": `<h1>Projects</h1>` },
          claude: [
            { match: `I deployed my site to Vercel but one page shows 404 Not Found. How do I work out which file it is looking for?`,
              out: [`404, istenen adreste bir dosya bulunamadığı anlamına gelir. index.html'e baktım:`, `menüdeki bağlantı "Projects.html"e gidiyor, ama dosyanın adı "projects.html".`, `Barındırıcı büyük/küçük harfi ayırt edebilir. Bağlantıyı "projects.html" yapmamı ister misin?`] }
          ],
          try: [
            { cmd: `ls`, desc: `dosya adları` },
            { cmd: `cat index.html`, desc: `bağlantının hedefi` },
            { cmd: `claude "I deployed my site to Vercel but one page shows 404 Not Found. How do I work out which file it is looking for?"`, desc: `404'ü sor` }
          ]
        }
      },
      {
        id: `m5-d4`, title: `Ortam değişkenleri ve sırlar`, minutes: 2, ready: true,
        intro: [
          `Sade bir kişisel site yalnızca herkese açık içerikten oluşabilir. Ama bir servise bağlanırken API anahtarı, parola ya da başka bir erişim bilgisi kullanman gerekebilir. Bu değerlerin açığa çıkmasını önlemelisin.`
        ],
        blocks: [
          { t: `h`, text: `Sır nedir?` },
          { t: `p`, html: `Sır, yetki sağlayan gizli bir değerdir: özel bir API anahtarı, parola ya da erişim belirteci (token) gibi. Her yapılandırma değeri sır değildir; ama örneğin bir veritabanı adresi kimlik bilgisi içeriyorsa özellikle korunmalıdır.` },
          { t: `h`, text: `Sırları kaynak koddan ayrı tut` },
          { t: `table`, head: [`Ortam`, `Nerede tutulur?`], rows: [
            [`Yerel geliştirme`, `Kullandığın araç destekliyorsa, Git dışında tutulan <code>.env.local</code> gibi bir ortam dosyasında.`],
            [`Barındırma ortamı`, `Sağlayıcının ortam değişkenleri ya da sır yönetimi ayarlarında. Vercel'de <strong>Settings → Environment Variables</strong>.`]
          ] },
          { t: `p`, html: `Kod, <code>CONTACT_FORM_KEY</code> gibi bir değişken adına başvurur; gizli değerin kendisi kaynak dosyaya yazılmaz. <code>.env.local</code> dosyasının otomatik okunup okunmadığı kullandığın uygulamaya ya da geliştirme aracına bağlıdır.` },
          { t: `callout`, kind: `warn`, title: `Tarayıcı kodu sır saklayamaz`, html: `Yalnızca HTML'den oluşan bir sayfa gizli bir anahtarı güvenle kullanamaz. Tarayıcıya gönderilen JavaScript, HTML ya da derlenmiş dosyalara eklenen değerler kullanıcılar tarafından görülebilir. Gizli anahtar gerektiren işlemleri sunucu tarafında yürüt; ortam değişkeni kullanmak tek başına değeri gizli tutmaz.` },
          { t: `h`, text: `.gitignore ve geçmiş kontrolü` },
          { t: `code`, label: `Claude'a`, code: `make sure any .env files are in my .gitignore,\nand check that none were ever accidentally committed` },
          { t: `p`, html: `Anlamı: “Bütün .env dosyalarının .gitignore'da olduğundan emin ol ve hiçbirinin yanlışlıkla commit edilmediğini kontrol et.” <code>.gitignore</code>, henüz izlenmeyen dosyaların yanlışlıkla eklenmesini önler; daha önce izlenen ya da commit edilen bir dosyayı geçmişten kendiliğinden çıkarmaz. Gerçek sırları sohbet mesajına ya da örnek çıktıya yapıştırma.` },
          { t: `practice` },
          { t: `h`, text: `Bir sır sızdıysa` },
          { t: `steps`, items: [
            `Yeni bir anahtar oluştur.`,
            `Uygulamayı yeni anahtarla güncelle.`,
            `Eski anahtarı iptal et ya da devre dışı bırak.`
          ] },
          { t: `p`, html: `Dosyayı silmek ya da yeni bir commit yapmak, eski değeri Git geçmişinden kaldırmaz. Commit edilmiş bir sırrı her zaman sızmış kabul et ve değiştir.` }
        ],
        trouble: [
          { q: `.env dosyam zaten commit edilmiş`, a: `Önce içindeki anahtarları iptal edip yenile. Ardından dosyayı izlemeden çıkar ve <code>.gitignore</code>'a ekle; Claude'dan bu adımlarda yardım isteyebilirsin.` },
          { q: `Ortam değişkeni canlı sitede okunmuyor`, a: `Değişkenin barındırıcının ayarlarına doğru adla eklendiğini ve ekledikten sonra yeni bir dağıtım yapıldığını kontrol et.` }
        ],
        have: [
          `Sırrın ne olduğunu ve neden kaynak koddan ayrı tutulduğunu biliyorsun.`,
          `Tarayıcıya giden kodun sır saklayamayacağını öğrendin.`,
          `Sızan bir anahtarı iptal edip yenilemenin adımlarını biliyorsun.`
        ],
        note: `Bu sitede hiçbir gizli anahtar yok; yine de <code>.env</code> dosyasını önlem olarak <code>.gitignore</code>'a ekledim.`,
        next: `Sırada: Alan adı, HTTPS ve yayınlamadan önce son tur.`,
        prompt: `API anahtarı gibi sırları bir web projesinde nasıl güvende tutarım? .env dosyası, .gitignore ve barındırıcının ortam değişkenleri arasındaki ilişkiyi basitçe anlatır mısın?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Hello, I'm Ayşe</h1>`, "~/my-first-project/.env.local": `CONTACT_FORM_KEY=ornek-deger-paylasma`, "~/my-first-project/.gitignore": `.DS_Store` },
          claude: [
            { match: `make sure any .env files are in my .gitignore, and check that none were ever accidentally committed`,
              write: { "~/my-first-project/.gitignore": `.DS_Store\n.env*` },
              out: [`[OK] edited .gitignore — ".env*" eklendi`, `Git geçmişini kontrol ettim: .env.local hiç commit edilmemiş.`, `Not: Bir sır daha önce commit edilmiş olsaydı, .gitignore onu geçmişten silmezdi.`] }
          ],
          try: [
            { cmd: `ls -a`, desc: `gizli dosyaları gör` },
            { cmd: `cat .gitignore`, desc: `.env yok sayılıyor mu?` },
            { cmd: `claude "make sure any .env files are in my .gitignore, and check that none were ever accidentally committed"`, desc: `kontrol ettir` },
            { cmd: `cat .gitignore`, desc: `sonucu oku` }
          ]
        }
      },
      {
        id: `m5-d5`, title: `Alan adları, HTTPS ve gerçekten yayınlama`, minutes: 2, ready: true,
        intro: [
          `Barındırıcının verdiği adresle siteni hemen paylaşabilirsin. Özel bir alan adı ise isteğe bağlı bir sonraki adımdır: seçtiğin adı kaydeder, barındırma hizmetine bağlar ve HTTPS erişimini doğrularsın.`
        ],
        blocks: [
          { t: `h`, text: `Adım 1 — Alan adını kaydet` },
          { t: `p`, html: `Bir alan adı kayıt kuruluşunda uygun bir ad seç ve kaydet. Kayıt genellikle süreli ve yenilenebilir bir kullanım hakkıdır; ilk yılın fiyatıyla yenileme ücretini ayrı ayrı kontrol et. Fiyat, uzantıya ve sağlayıcıya göre değişir.` },
          { t: `p`, html: `Alan adını kaydetmek, siteyi otomatik olarak doğru yere bağlamaz; adın hangi hizmeti göstereceğini ayrıca yapılandırırsın.` },
          { t: `h`, text: `Adım 2 — Barındırıcıya ekle ve DNS'i ayarla` },
          { t: `p`, html: `Alan adını barındırıcıdaki projene ekle. Ardından barındırıcının verdiği güncel DNS kayıtlarını, alan adının yetkili DNS sağlayıcısında tanımla. Bu sağlayıcı, alan adını satın aldığın yerden farklı olabilir.` },
          { t: `code`, label: `Claude'a`, code: `Vercel told me to add an A record and a CNAME for my domain.\nExplain in plain terms what each one does before I paste them in.` },
          { t: `p`, html: `Anlamı: “Vercel alan adım için bir A kaydı ve bir CNAME eklememi söyledi. Yapıştırmadan önce her birinin ne yaptığını sade bir dille açıkla.”` },
          { t: `table`, head: [`Kayıt`, `Ne yapar?`], rows: [
            [`A`, `Bir adı bir IPv4 adresine bağlar.`],
            [`CNAME`, `Bir adı başka bir alan adına yönlendirir.`]
          ] },
          { t: `p`, html: `Hangi ad için hangi kaydın gerektiğini barındırıcının proje ekranından al; örnek değerleri rastgele kopyalama. DNS değişikliklerinin görünmesi önbelleklere ve kayıt ayarlarına bağlıdır; değişiklik hemen görünmeyebilir. Barındırıcıdaki alan adı doğrulama durumunu kontrol et.` },
          { t: `practice` },
          { t: `h`, text: `Adım 3 — HTTPS'i doğrula` },
          { t: `p`, html: `Birçok yönetilen barındırıcı sertifika işlemlerini otomatik yürütür; bunun için DNS doğrulamasının ve sertifika oluşturmanın tamamlanması gerekir. HTTPS adresini aç ve sertifika uyarısı olmadığını kontrol et.` },
          { t: `callout`, kind: `info`, title: `Asma kilit her zaman görünmeyebilir`, html: `HTTPS bağlantıyı şifreler, içeriğin güvenilirliğini tek başına kanıtlamaz. Tarayıcılar güvenli bağlantıyı her zaman asma kilit simgesiyle göstermeyebilir.` },
          { t: `h`, text: `Adım 4 — “Yabancının turu”nu yap` },
          { t: `list`, items: [
            `Siteyi telefonunda ya da başka bir cihazda aç.`,
            `Bütün sayfa ve menü bağlantılarını dene.`,
            `HTTPS bağlantısında uyarı olmadığını doğrula.`,
            `Gerçek adını ve içeriğini kontrol et; örnek metinleri temizle.`
          ] }
        ],
        trouble: [
          { q: `Alan adı hâlâ eski yere gidiyor`, a: `DNS değişikliklerinin yayılması zaman alabilir. Barındırıcıdaki doğrulama durumunu kontrol et ve kayıtların barındırıcının gösterdiği değerlerle birebir aynı olduğundan emin ol.` },
          { q: `Sertifika uyarısı görüyorum`, a: `DNS doğrulaması ve sertifika oluşturma henüz tamamlanmamış olabilir. Barındırıcının alan adı ekranındaki durumu izle; uyarı sürerse kayıtları yeniden kontrol et.` }
        ],
        have: [
          `Özel alan adının isteğe bağlı bir adım olduğunu biliyorsun.`,
          `A ve CNAME kayıtlarının ne işe yaradığını öğrendin.`,
          `Yayınlamadan önce “yabancının turu” kontrol listen var.`
        ],
        note: `Bu sitede özel alan adı kullanmadım; GitHub Pages'in verdiği HTTPS adresiyle yayında. “Yabancının turu” listesini kendi sitem için de not ettim.`,
        next: `Sırada: Modül 5'in özeti ve yayına alma döngüsü.`,
        prompt: `Bir alan adını statik site barındırıcısına bağlarken A kaydı ve CNAME kaydı ne işe yarar? Sade bir dille ve bir benzetmeyle açıklar mısın?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Hello, I'm Ayşe</h1>` },
          claude: [
            { match: `Vercel told me to add an A record and a CNAME for my domain. Explain in plain terms what each one does before I paste them in`,
              out: [`A kaydı: alan adını (ör. ornek.com) bir sunucunun IP adresine bağlar — bir adresin sokak numarası gibi.`, `CNAME: bir adı (ör. www.ornek.com) başka bir alan adına yönlendirir — “şu adrese bak” notu gibi.`, `Değerleri barındırıcının proje ekranından birebir kopyala; örnek değer kullanma.`] }
          ],
          try: [
            { cmd: `claude "Vercel told me to add an A record and a CNAME for my domain. Explain in plain terms what each one does before I paste them in."`, desc: `DNS kayıtlarını sor` }
          ]
        }
      },
      {
        id: `m5-d6`, title: `Modül 5 özeti`, minutes: 1, ready: true,
        intro: [
          `Bir siteyi yerel dosyalardan herkese açık bir web adresine taşımanın temel akışını öğrendin. Yayın bağlantısı bir kez kurulduktan sonra küçük güncellemeleri aynı döngüyle sürdürebilirsin.`
        ],
        blocks: [
          { t: `h`, text: `Yayına alma döngüsü` },
          { t: `table`, head: [`Adım`, `Ne yaparsın?`], rows: [
            [`Anlık görüntü`, `Değişikliği kontrol et; <code>git add</code> ve <code>git commit</code> ile kaydet.`],
            [`Yükleme`, `Doğru uzak depoya ve dala <code>git push</code> ile gönder.`],
            [`Dağıtım`, `Bağlı barındırıcının dağıtımını izle ve başarılı olduğunu doğrula.`],
            [`Kontrol`, `Canlı HTTPS adresini başka bir cihazda aç; sayfaları ve bağlantıları dene.`]
          ] },
          { t: `p`, html: `<strong>Commit → push → dağıtımı doğrula → kontrol et.</strong> Otomatik yayın, Git entegrasyonuna ve production dalı ayarına bağlıdır; önizleme dağıtımı ile canlı site güncellemesini birbirinden ayırt et.` },
          { t: `h`, text: `Akılda tutmaya değer kurallar` },
          { t: `list`, items: [
            `<strong>Küçük ve sık güncelle:</strong> Her değişikliğin sonucunu kontrol et.`,
            `<strong>Sırları commit'leme:</strong> Ortam dosyalarını ve gizli değerleri Git dışında tut; sızan anahtarı değiştir.`,
            `<strong>404'te yolu incele:</strong> Bağlantıyı, dosya adını ve klasör konumunu karşılaştır.`,
            `<strong>Başka cihazda dene:</strong> Yayın adresini yalnızca kendi geliştirme ortamında test etme.`
          ] },
          { t: `p`, html: `Bu beceriler komut ezberlemekten çok, her adımın ne yaptığını anlamak ve sonucu kontrol etmekle ilgilidir.` },
          { t: `practice` }
        ],
        trouble: [],
        have: [
          `Dosyalarını bir Git deposunda sürümlemek.`,
          `Uzak depoyu bir barındırma akışına bağlamak.`,
          `Değişikliği gönderip dağıtımın sonucunu kontrol etmek.`,
          `İstersen özel alan adı ekleyip HTTPS erişimini doğrulamak.`
        ],
        note: `Commit, push, doğrula, kontrol et: Bu siteyi her güncellediğimde aynı dört adımı izliyorum ve yayınlamadan önce onay veriyorum.`,
        next: `Sırada: Proje talimatları, kısayollar ve dış araç bağlantılarıyla Claude Code kullanımını geliştirmek.`,
        prompt: `Claude Code kursunun beşinci modülünde yerel dosya ile yayındaki site farkını, Git'in beş temel komutunu, deploy, sırlar ve alan adı/HTTPS konularını öğrendim. 5 soruluk kısa bir tekrar testi hazırlar mısın? Cevapları en sonda ver.`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Hello, I'm Ayşe</h1>` },
          cmds: [
            { match: `git add index.html`, out: [] },
            { match: `git commit -m "update the home page heading"`, out: [`[main 4e5f6a7] update the home page heading`, ` 1 file changed, 1 insertion(+), 1 deletion(-)`] },
            { match: `git push`, out: [`(simülasyon) To https://github.com/you/my-first-site.git`, `   a1b2c3d..4e5f6a7  main -> main`, `Şimdi dağıtımı izle ve canlı adresi kontrol et.`] }
          ],
          try: [
            { cmd: `git add index.html`, desc: `anlık görüntü` },
            { cmd: `git commit -m "update the home page heading"`, desc: `kaydet` },
            { cmd: `git push`, desc: `yükle` }
          ]
        }
      }
    ] },
    { id: `m6`, no: 6, title: `Hooks, MCP ve iş akışı`, sub: `Çalışma biçimini yapılandır`, lessons: [
      {
        id: `m6-d1`, title: `CLAUDE.md: projeni Claude'a öğret`, minutes: 2, ready: true,
        intro: [
          `<code>CLAUDE.md</code>, projeyi ve çalışma tercihlerini anlatan sade bir metin dosyasıdır. Doğru konuma yerleştirildiğinde Claude Code'un proje talimatlarına katkıda bulunur ve aynı açıklamaları her oturumda yeniden yapma ihtiyacını azaltır.`,
          `<code>/init</code> ile bir başlangıç taslağı oluşturabilirsin. Bu ders, o taslağı doğru ve yararlı bilgilerle geliştirmeyle ilgili.`
        ],
        blocks: [
          { t: `h`, text: `İçine ne yazılır?` },
          { t: `table`, head: [`Başlık`, `Ne yazılır?`], rows: [
            [`Proje`, `Ne olduğu ve hangi sayfaları içerdiği.`],
            [`Çalıştırma`, `Siteyi nasıl açacağın ya da önizleyeceğin.`],
            [`Tercihler`, `Ortak stil ve içerik kuralları.`],
            [`Sınırlar`, `Yeniden adlandırılmaması ya da korunması gereken öğeler.`]
          ] },
          { t: `code`, label: `CLAUDE.md — örnek`, code: `# Kişisel sitem\n- Sayfalar: index.html, projects.html, about.html\n- Görmek için: index.html dosyasını tarayıcıda aç\n- Stil: krem arka plan, tutarlı başlık yazı tipi, parlak renk yok\n- Adım Ayşe; örnek ad yerine bunu kullan\n- Dosyaları yeniden adlandırmadan önce sor` },
          { t: `h`, text: `Adım 1 — Claude'dan taslak iste` },
          { t: `code`, label: `Claude'a`, code: `read my project and write a CLAUDE.md describing my pages,\nhow to open the site, and the style choices you notice` },
          { t: `p`, html: `Anlamı: “Projemi oku ve sayfalarımı, siteyi nasıl açacağımı ve fark ettiğin stil tercihlerini anlatan bir CLAUDE.md yaz.”` },
          { t: `h`, text: `Adım 2 — Taslağı oku ve tamamla` },
          { t: `p`, html: `Claude'un bilemeyeceği bilgileri, örneğin adını ve kişisel tercihlerini sen ekle. Dosya yollarını ve çalıştırma talimatlarını gerçek projeyle karşılaştır.` },
          { t: `practice` },
          { t: `h`, text: `Güncel ve kısa tut` },
          { t: `p`, html: `Proje değiştiğinde dosyayı da güncelle. Ana sayfan <code>index.html</code> iken notta <code>home.html</code> yazması Claude'u yanlış yönlendirir. Aynı düzeltmeyi tekrar tekrar yapıyorsan, bunu kısa bir proje kuralına dönüştür.` },
          { t: `callout`, kind: `warn`, title: `Bir talimat dosyası, bir güvence değildir`, html: `<code>CLAUDE.md</code> kalıcı bir talimat kaynağıdır; eksiksiz bir oturum hafızası ya da güvenlik sınırı değildir. Önemli işlerde talimatın uygulandığını sonuç üzerinden kontrol et.` }
        ],
        trouble: [
          { q: `Claude CLAUDE.md'deki kuralı uygulamadı`, a: `Kuralın kısa, açık ve güncel olduğunu kontrol et. Önemli işlerde kuralı isteğinde de hatırlat ve sonucu kendin doğrula.` },
          { q: `Taslakta yanlış dosya adları var`, a: `Taslak bir başlangıçtır. <code>ls</code> ile gerçek dosyaları kontrol et ve yanlış satırları düzelt.` }
        ],
        have: [
          `<code>CLAUDE.md</code>'nin dört bölümünü biliyorsun: proje, çalıştırma, tercihler, sınırlar.`,
          `Claude'dan taslak isteyip kendi bilgilerinle tamamlamayı öğrendin.`,
          `Tekrarlanan düzeltmeleri kalıcı bir kurala dönüştürmeyi öğrendin.`
        ],
        note: `Bu sitenin <code>CLAUDE.md</code> dosyası her yeni kararla büyüdü: marka, sayfalar, içerik kuralları ve yayından önce onay alınması gibi sınırlar orada yazılı.`,
        next: `Sırada: Özel slash komutları ve subagent'lar.`,
        prompt: `Kişisel bir web sitesi projesi için iyi bir CLAUDE.md dosyasında hangi bölümler olmalı? Kısa bir örnek şablon hazırlar mısın?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Hello, I'm Ayşe</h1>`, "~/my-first-project/projects.html": `<h1>Projects</h1>`, "~/my-first-project/about.html": `<h1>About me</h1>` },
          claude: [
            { match: `read my project and write a CLAUDE.md describing my pages, how to open the site, and the style choices you notice`,
              write: { "~/my-first-project/CLAUDE.md": `# Personal site\n- Pages: index.html, projects.html, about.html\n- To view: open index.html in a browser\n- Style: cream background, same heading font on every page` },
              out: [`[OK] wrote CLAUDE.md`, `Adın ve kişisel tercihlerin gibi bilemeyeceğim bilgileri lütfen sen ekle.`] }
          ],
          try: [
            { cmd: `ls`, desc: `projenin dosyaları` },
            { cmd: `claude "read my project and write a CLAUDE.md describing my pages, how to open the site, and the style choices you notice"`, desc: `taslak iste` },
            { cmd: `cat CLAUDE.md`, desc: `taslağı oku` }
          ]
        }
      },
      {
        id: `m6-d2`, title: `Slash komutları ve subagent'lar`, minutes: 2, ready: true,
        intro: [
          `Tekrarlanan istekleri kaydetmek ve büyük incelemeleri odaklı yardımcılara ayırmak, çalışma akışını daha düzenli hâle getirir. Bu derste özel slash komutlarını ve subagent'ları tanıyacaksın.`
        ],
        blocks: [
          { t: `h`, text: `Özel slash komutu: isteği bir kez kaydet` },
          { t: `p`, html: `<code>/clear</code> gibi yerleşik komutların yanında, kurulumunun desteklediği özel komut ya da becerilerle sık kullandığın talimatları kısa bir ad altında saklayabilirsin.` },
          { t: `code`, label: `Claude'a`, code: `create a slash command called /check\nthat looks over all my pages for broken links and missing menus` },
          { t: `p`, html: `Anlamı: “Bütün sayfalarımı kırık bağlantılar ve eksik menüler için tarayan /check adlı bir slash komutu oluştur.” Oluşan talimat dosyasını oku ve <code>/check</code> komutunun listede göründüğünü kontrol et. Kayıt biçimi ve konumu sürüme göre değişebilir.` },
          { t: `callout`, kind: `tip`, title: `Kapsamı belirt`, html: `Komutun önce inceleyip bulguları raporlamasını, düzeltmeleri ise ayrıca istemeni sağlayacak şekilde yaz. Böylece komut kendiliğinden dosya değiştirmez.` },
          { t: `practice` },
          { t: `h`, text: `Subagent: odaklı yardımcı` },
          { t: `p`, html: `Subagent, sınırları belli bir görevi ayrı bir çalışma bağlamında inceleyip sonucu ana konuşmaya bildiren bir yardımcıdır. Uzun dosya okumalarının ayrıntılarını ana konuşmadan uzak tutar.` },
          { t: `code`, label: `Claude'a`, code: `use a subagent to check every page for spelling mistakes\nand report back a single list; do not edit files` },
          { t: `p`, html: `Anlamı: “Her sayfayı yazım hataları için kontrol etmesi için bir subagent kullan ve tek bir liste olarak raporla; dosyaları düzenleme.” Bütün sayfalardaki yazım hatalarını taramak gibi büyük ve kendi içinde tamamlanabilir işler buna uygundur. Dönen listeyi doğrula ve hangi düzeltmeleri uygulayacağını sen seç.` },
          { t: `h`, text: `Ne zaman devretmemeli?` },
          { t: `p`, html: `Hızlı ve küçük bir düzenleme için yardımcı başlatmak gereksiz ek iş yaratır. Devretmeden önce hedefi, kapsamı, izin verilen işlemleri ve beklediğin raporu açıkça belirt.` },
          { t: `table`, head: [`Araç`, `Asıl kazanç`], rows: [
            [`Özel slash komutu`, `Tekrarlanan talimatı yeniden yazmadan çağırmak.`],
            [`Subagent`, `Sınırları belli bir işi ayrı bağlamda inceletip sonuç almak.`]
          ] }
        ],
        trouble: [
          { q: `/check komutu listede görünmüyor`, a: `Oluşan dosyanın konumunu ve adını kontrol et; Claude Code'u yeniden başlatman gerekebilir. Biçim sürüme göre değiştiği için <code>/help</code>'e bak.` },
          { q: `Subagent dosyaları değiştirdi`, a: `İsteğe “do not edit files” ekini açıkça yaz ve değişiklikleri <code>/rewind</code> ile geri al.` }
        ],
        have: [
          `Sık kullandığın bir isteği özel bir slash komutu olarak kaydetmeyi öğrendin.`,
          `Büyük ve bağımsız bir incelemeyi subagent'a devretmeyi öğrendin.`,
          `Küçük işlerde yardımcı başlatmanın gereksiz olduğunu biliyorsun.`
        ],
        note: `Bu sitede bağlantı kontrolünü her seferinde aynı biçimde yaptırdım; bu tür tekrarlanan bir kontrolün özel bir komuta dönüştürülebileceğini bu derste öğrendim.`,
        next: `Sırada: Hook'larla sıkıcı kısımları otomatikleştirmek.`,
        prompt: `Claude Code'da özel slash komutu ile subagent arasındaki farkı ve her birinin hangi durumda işe yaradığını kısa örneklerle açıklar mısın?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`, `~/my-first-project/.claude`, `~/my-first-project/.claude/commands`],
          files: { "~/my-first-project/index.html": `<nav><a href="index.html">Home</a> <a href="about.html">About</a></nav>\n<h1>Helo, I'm Ayşe</h1>`, "~/my-first-project/about.html": `<h1>About me</h1>\n<p>I am lerning to build websites.</p>` },
          cmds: [
            { match: `/check`, claude: true, out: [`/check raporu (değişiklik yapmadım):`, `- about.html: menü eksik.`, `- Kırık bağlantı bulunmadı.`] }
          ],
          claude: [
            { match: `create a slash command called /check that looks over all my pages for broken links and missing menus`,
              write: { "~/my-first-project/.claude/commands/check.md": `Look over all pages for broken links and missing menus.\nReport the findings as a list. Do not edit any files.` },
              out: [`[OK] wrote .claude/commands/check.md`, `Artık /check yazarak bu kontrolü çalıştırabilirsin.`] },
            { match: `use a subagent to check every page for spelling mistakes and report back a single list; do not edit files`,
              out: [`Subagent raporu (dosyalar değiştirilmedi):`, `- index.html: "Helo" → "Hello"`, `- about.html: "lerning" → "learning"`] }
          ],
          try: [
            { cmd: `claude "create a slash command called /check that looks over all my pages for broken links and missing menus"`, desc: `komutu kaydet` },
            { cmd: `cat .claude/commands/check.md`, desc: `talimat dosyasını oku` },
            { cmd: `/check`, desc: `komutu çalıştır` },
            { cmd: `claude "use a subagent to check every page for spelling mistakes and report back a single list; do not edit files"`, desc: `subagent'a devret` }
          ]
        }
      },
      {
        id: `m6-d3`, title: `Hooks: sıkıcı kısımları otomatikleştir`, minutes: 2, ready: true,
        intro: [
          `<strong>Hook</strong>, belirli bir Claude Code olayı gerçekleştiğinde tanımladığın komutu ya da kontrolü çalıştıran bir otomasyondur. Tekrarlanan mekanik işleri bir hatırlatmaya bağlı olmaktan çıkarır.`
        ],
        blocks: [
          { t: `h`, text: `Olay → otomatik işlem` },
          { t: `table`, head: [`Olay örneği`, `Yararlı işlem`], rows: [
            [`Dosya düzenlendikten sonra`, `Uygun HTML dosyalarında bir biçimlendirici çalıştırmak.`],
            [`Bir araç ya da komut çalışmadan önce`, `İşlemi bir izin politikasıyla değerlendirmek.`],
            [`Görev tamamlandığında`, `Bir bildirim ya da ses üretmek.`]
          ] },
          { t: `p`, html: `Olay adları, eşleştirme kuralları ve engelleme davranışı yapılandırmaya bağlıdır. Bir hook kurmak tek başına bütün riskleri engelleyen bir garanti değildir.` },
          { t: `h`, text: `Adım 1 — Kuralı anlatarak taslak oluştur` },
          { t: `code`, label: `Claude'a`, code: `add a hook that tidies up the spacing in any HTML file you edit,\nso my pages stay neat without me asking` },
          { t: `p`, html: `Anlamı: “Düzenlediğin her HTML dosyasındaki boşlukları düzelten bir hook ekle; böylece ben istemeden sayfalarım düzenli kalsın.” Claude'un önerdiği ayar dosyasını ve çalıştıracağı komutu incele: Hangi dosyalara uygulanacak, gereken biçimlendirici kurulu mu, hata olursa ne olacak?` },
          { t: `practice` },
          { t: `h`, text: `Sıradan bir istekten farkı ne?` },
          { t: `p`, html: `“Bunu her seferinde yap” cümlesi, modelin talimata uymasına bağlıdır. Hook ise eşleşen olayda program tarafından tetiklenir. Yine de komutun başarısı izinlere, dosya yollarına, araçların kurulu olmasına ve doğru yapılandırmaya bağlıdır.` },
          { t: `h`, text: `Adım 2 — Kurduktan sonra dene` },
          { t: `steps`, items: [
            `Küçük bir deneme dosyasında ilgili olayı tetikle.`,
            `Hook'un gerçekten çalıştığını ve beklenen sonucu verdiğini kontrol et.`,
            `Hata ya da eşleşmeyen dosya durumunu da değerlendir.`,
            `Otomatik düzenlemenin istemediğin içeriği değiştirmediğini incele.`
          ] }
        ],
        trouble: [
          { q: `Hook hiç çalışmıyor`, a: `Ayar dosyasının doğru konumda olduğunu, olay adının ve dosya eşleştirmesinin doğru yazıldığını kontrol et. Çalıştırılan aracın bilgisayarında kurulu olduğundan emin ol.` },
          { q: `Hook istemediğim dosyaları da değiştirdi`, a: `Eşleştirme kuralını daralt; örneğin yalnızca <code>.html</code> uzantılı dosyalar. Değişiklikleri Git ile kontrol et.` }
        ],
        have: [
          `Hook'un bir olaya bağlı otomatik işlem olduğunu biliyorsun.`,
          `Hook önerisini çalıştıracağı komut ve kapsam açısından incelemeyi öğrendin.`,
          `Kurduğun otomasyonu küçük bir dosyada test etmenin adımlarını biliyorsun.`
        ],
        note: `Hook ile “her seferinde yap” isteği arasındaki farkı bu derste öğrendim: Biri programın tetiklediği bir işlem, diğeri modelin hatırlamasına bağlı bir talimat.`,
        next: `Sırada: MCP ile Claude'a yeni araçlar bağlamak.`,
        prompt: `Claude Code'da hook nedir? Bir web sitesi projesinde işe yarayabilecek 3 basit hook örneği verir ve her birinin risklerini kısaca söyler misin?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`, `~/my-first-project/.claude`],
          files: { "~/my-first-project/index.html": `<h1>Hello, I'm Ayşe</h1>` },
          claude: [
            { match: `add a hook that tidies up the spacing in any HTML file you edit, so my pages stay neat without me asking`,
              write: { "~/my-first-project/.claude/settings.json": `{\n  "hooks": {\n    "PostToolUse": [\n      {\n        "matcher": "Edit|Write",\n        "hooks": [\n          { "type": "command", "command": "npx prettier --write \\"**/*.html\\"" }\n        ]\n      }\n    ]\n  }\n}` },
              out: [`[OK] wrote .claude/settings.json`, `Bu hook, Claude bir dosyayı düzenledikten sonra HTML dosyalarında prettier çalıştırır.`, `Not: prettier'ın kurulu olması gerekir; komutu ve kapsamı onaylamadan önce incele.`] }
          ],
          try: [
            { cmd: `claude "add a hook that tidies up the spacing in any HTML file you edit, so my pages stay neat without me asking"`, desc: `hook taslağı` },
            { cmd: `cat .claude/settings.json`, desc: `ayarı ve komutu incele` }
          ]
        }
      },
      {
        id: `m6-d4`, title: `MCP: Claude'a yeni araçlar ver`, minutes: 2, ready: true,
        intro: [
          `<strong>MCP</strong> (Model Context Protocol), bir yapay zekâ uygulamasını dış araçlar ve veri kaynaklarıyla buluşturan ortak bir protokoldür. Dosyalardan, tasarımlardan ya da başka servislerden bilgiyi elle taşımak yerine ilgili bağlantı üzerinden almayı sağlar.`
        ],
        blocks: [
          { t: `h`, text: `Standart bağlantı fikri` },
          { t: `p`, html: `Bir MCP sunucusu, belirli araçları ya da kaynakları istemciye sunar. Claude Code, yapılandırılan ve erişim verilen bu yetenekleri uygun görevlerde kullanabilir. Her bağlayıcının sunduğu işlemler farklıdır.` },
          { t: `h`, text: `Adım 1 — Bir bağlantıyı değerlendir` },
          { t: `code`, label: `Claude'a`, code: `what MCP connectors could help with my website,\nand what would each let you do?` },
          { t: `p`, html: `Anlamı: “Hangi MCP bağlayıcıları web siteme yardım edebilir ve her biri sana neyi yapma imkânı verir?” Önce ihtiyacını belirle: bir tasarımı okumak mı, bulut klasöründen dosya almak mı, başka bir serviste arama yapmak mı? Sonra sunucunun kaynağını, sunduğu araçları ve istediği erişimleri incele. Kurulum ve giriş yöntemi sağlayıcıya göre değişir.` },
          { t: `practice` },
          { t: `h`, text: `İsteklerin nasıl değişebilir?` },
          { t: `list`, items: [
            `“Bulut klasörümdeki fotoğrafı üst görsel olarak kullan.”`,
            `“Renkleri bu tasarıma uydur.”`,
            `“Hakkımda sayfası için bu kaynakta ilgili bilgileri ara.”`
          ] },
          { t: `p`, html: `Bunların yapılabilmesi, bağlı aracın ilgili kaynağa ve işleme erişim sunmasına bağlıdır. Bir bağlantı kurmak, bütün servise sınırsız erişim anlamına gelmez.` },
          { t: `h`, text: `Adım 2 — En az erişimle başla` },
          { t: `list`, items: [
            `Yalnızca güvendiğin sunucuları bağla.`,
            `Okumak yeterliyse yazma izni verme.`,
            `Parolayı ya da erişim anahtarını sohbete yapıştırma; desteklenen güvenli giriş yolunu kullan.`,
            `Bir aracın dış sistemde yapacağı değişikliği görevin kapsamıyla karşılaştır.`,
            `Gereksiz bağlantıları ve izinleri kaldır.`
          ] }
        ],
        trouble: [
          { q: `Bağladığım araç görünmüyor`, a: `MCP yapılandırmasını ve giriş adımını kontrol et; Claude Code'u yeniden başlatman gerekebilir. Bağlı araçların listesini Claude'a sorabilirsin.` },
          { q: `Araç istediğimden fazla erişim istiyor`, a: `Daha dar bir erişim seçeneği olup olmadığına bak. Yoksa ve görev için gerekmiyorsa bağlantıyı kurma.` }
        ],
        have: [
          `MCP'nin dış araçlar için ortak bir bağlantı yolu olduğunu biliyorsun.`,
          `Bir bağlayıcıyı ihtiyaç, kaynak ve istediği erişim açısından değerlendirmeyi öğrendin.`,
          `En az erişim ilkesini biliyorsun.`
        ],
        note: `Bu sitenin içeriklerini kendi dosyalarımdan aldım. Bir MCP bağlantısı kurduğumda önce yalnızca okuma izniyle başlamayı not ettim.`,
        next: `Sırada: Terminalin ötesi, Agent SDK.`,
        prompt: `MCP (Model Context Protocol) nedir? Yeni başlayan biri için basit bir benzetmeyle anlatır ve bir bağlantı kurarken dikkat edilmesi gereken güvenlik noktalarını listeler misin?`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/index.html": `<h1>Hello, I'm Ayşe</h1>` },
          claude: [
            { match: `what MCP connectors could help with my website, and what would each let you do?`,
              out: [`Ne işine yarayacağına göre birkaç örnek:`, `- Tasarım aracı bağlayıcısı: bir tasarımdaki renkleri ve ölçüleri okuyabilirim.`, `- Bulut depolama bağlayıcısı: bir klasördeki görseli sitene alabilirim.`, `- Belge bağlayıcısı: Hakkımda sayfası için notlarından bilgi arayabilirim.`, `Her birinde önce sunucunun kaynağını ve istediği izinleri kontrol et; okumak yeterliyse yazma izni verme.`] }
          ],
          try: [
            { cmd: `claude "what MCP connectors could help with my website, and what would each let you do?"`, desc: `seçenekleri sor` }
          ]
        }
      },
      {
        id: `m6-d5`, title: `Terminalin ötesi: Agent SDK`, minutes: 2, ready: true,
        intro: [
          `Terminalde Claude'u doğrudan sen yönlendirirsin. <strong>Agent SDK</strong> ise talimatları ve araç kullanımını bir programın içine yerleştirmeye yardım eder. Bu kursu tamamlamak için kullanman gerekmez.`
        ],
        blocks: [
          { t: `h`, text: `Konuşmadan programa` },
          { t: `table`, head: [`Terminalde`, `Agent SDK ile`], rows: [
            [`İsteği sen yazarsın.`, `Program talimatları gönderir ve sonuçları işler.`],
            [`Adımları etkileşimli olarak sen kontrol edersin.`, `Program izinleri, araçları ve denetim noktalarını yapılandırır.`],
            [`Oturumu sen yürütürsün.`, `Bir uygulama, zamanlayıcı ya da olay akışı süreci başlatabilir.`]
          ] },
          { t: `callout`, kind: `info`, title: `SDK tek başına bir hizmet değildir`, html: `Zamanlama ve olay tetikleme için ayrıca bir uygulama ya da çalıştırma ortamı gerekir. SDK tek başına, bilgisayar kapalıyken çalışan bir hizmet oluşturmaz.` },
          { t: `h`, text: `Örnek kullanım alanları` },
          { t: `list`, items: [
            `Bir klasördeki notlardan düzenli özet üretmek.`,
            `Bir uygulamanın içindeki özetleme yardımcısını çalıştırmak.`,
            `Bir olay gerçekleştiğinde belirli bir inceleme sürecini başlatmak.`
          ] },
          { t: `code`, label: `Claude'a`, code: `in plain language, describe one small thing I could automate\nwith the Agent SDK once I am comfortable,\nand what it would need` },
          { t: `p`, html: `Anlamı: “Kendimi hazır hissettiğimde Agent SDK ile otomatikleştirebileceğim küçük bir şeyi ve bunun için nelerin gerektiğini sade bir dille anlat.”` },
          { t: `practice` },
          { t: `h`, text: `Ne zaman kullanmalı?` },
          { t: `p`, html: `Sık tekrarlanan, adımları anlaşılmış ya da bir ürünün içinde çalışması gereken görevlerde düşün. Tek seferlik ve keşif niteliğindeki işlerde terminal daha doğrudandır.` },
          { t: `h`, text: `Önce elle doğrula` },
          { t: `p`, html: `İş akışını önce etkileşimli olarak dene. Doğru girdiyi, beklenen çıktıyı, gereken izinleri ve hata durumlarını anla. Sonra otomasyona taşı ve gerekli yerlere insan kontrolü ile hata raporu ekle.` }
        ],
        trouble: [
          { q: `SDK'ya ne zaman geçeceğimi bilmiyorum`, a: `Aynı işi terminalde birkaç kez sorunsuz yaptıysan ve adımları netse, otomasyona hazır olabilir. Emin değilsen terminalde kalmak daha güvenlidir.` }
        ],
        have: [
          `Terminal ile Agent SDK arasındaki farkı biliyorsun.`,
          `SDK'nın hangi tür işlere uygun olduğunu öğrendin.`,
          `Bir süreci otomatikleştirmeden önce elle doğrulamanın önemini biliyorsun.`
        ],
        note: `Şimdilik terminalde çalışmak benim için yeterli; Agent SDK'yı, adımlarını iyice anladığım tekrarlı bir iş olduğunda düşüneceğim bir sonraki adım olarak not ettim.`,
        next: `Sırada: Modül 6'nın özeti.`,
        prompt: `Claude Agent SDK ile otomatikleştirilebilecek, yeni başlayan biri için uygun 3 küçük iş örneği verir misin? Her biri için neye ihtiyaç olacağını kısaca yaz.`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: {},
          claude: [
            { match: `in plain language, describe one small thing I could automate with the Agent SDK once I am comfortable, and what it would need`,
              out: [`Örnek: Her hafta notlar klasöründeki yeni dosyaları okuyup kısa bir özet dosyası yazan küçük bir program.`, `Gerekenler: SDK'nın kurulu olduğu bir çalışma ortamı, programı haftada bir çalıştıracak bir zamanlayıcı,`, `klasörü okuma ve tek bir özet dosyası yazma izni, bir de hata olursa sana haber verecek bir yol.`, `Önce aynı işi terminalde elle birkaç kez dene.`] }
          ],
          try: [
            { cmd: `claude "in plain language, describe one small thing I could automate with the Agent SDK once I am comfortable, and what it would need"`, desc: `bir örnek iste` }
          ]
        }
      },
      {
        id: `m6-d6`, title: `Modül 6 özeti`, minutes: 1, ready: true,
        intro: [
          `Bu modülde tek tek istek vermekten, çalışma biçimini yapılandırmaya geçtin. Ortak amaç, doğru bilgiyi kalıcı hâle getirmek ve tekrarlanan işleri uygun araçla azaltmak.`
        ],
        blocks: [
          { t: `h`, text: `Modül 6 araç seti` },
          { t: `table`, head: [`Araç`, `Ne kazandırır?`], rows: [
            [`<code>CLAUDE.md</code>`, `Proje bilgisi, tercihler ve çalışma kuralları için kalıcı talimat dosyası.`],
            [`Özel slash komutları`, `Tekrarlanan bir isteği kısa bir adla çağırmak.`],
            [`Subagent'lar`, `Sınırları belli işleri ayrı bağlamda inceletip rapor almak.`],
            [`Hooks`, `Eşleşen olayda yapılandırılmış bir komutu ya da kontrolü çalıştırmak.`],
            [`MCP`, `Dış araçlara ve veri kaynaklarına erişim bağlantıları.`],
            [`Agent SDK`, `Model ve araç akışını bir programın içine yerleştirmek.`]
          ] },
          { t: `h`, text: `Ortak çizgi: tekrarı doğru yere taşı` },
          { t: `list`, items: [
            `Bilgi tekrar ediyorsa proje notuna (<code>CLAUDE.md</code>) yaz.`,
            `İstek tekrar ediyorsa özel bir komut olarak kaydet.`,
            `Mekanik bir işlem tekrar ediyorsa test edilmiş bir otomasyona (hook) dönüştür.`,
            `Dış bilgiye sürekli ihtiyaç varsa uygun bir bağlantıyı (MCP) değerlendir.`
          ] },
          { t: `callout`, kind: `tip`, title: `Her tekrarı hemen otomatikleştirme`, html: `Önce süreci anla. Kapsamı, izinleri, bakımı ve hata durumlarını değerlendirdikten sonra uygun aracı seç.` },
          { t: `practice` }
        ],
        trouble: [],
        have: [
          `Projeye kalıcı ve güncel talimatlar eklemek.`,
          `Yeniden kullanılabilir istekler hazırlamak.`,
          `Büyük incelemeleri odaklı yardımcılara ayırmak.`,
          `Olay tabanlı otomasyonun nerede işe yaradığını ayırt etmek.`,
          `Dış araç erişimini en az izinle planlamak.`,
          `Bir işin programa taşınmaya hazır olup olmadığını değerlendirmek.`
        ],
        note: `Tekrarı doğru yere taşı: Bu sitede tekrar eden kuralları <code>CLAUDE.md</code>'ye yazmak, her oturumda aynı şeyleri yeniden anlatma ihtiyacını azalttı.`,
        next: `Sırada: Bitirme projesi, kendi siteni yayınlamak.`,
        prompt: `Claude Code kursunun altıncı modülünde CLAUDE.md, özel slash komutları, subagent'lar, hooks, MCP ve Agent SDK konularını öğrendim. 5 soruluk kısa bir tekrar testi hazırlar mısın? Cevapları en sonda ver.`,
        sandbox: {
          cwd: `~/my-first-project`,
          dirs: [`~`, `~/my-first-project`],
          files: { "~/my-first-project/CLAUDE.md": `# Personal site\n- Pages: index.html, projects.html, about.html\n- To view: open index.html in a browser\n- My name is Ayşe; use it instead of example names\n- Ask before renaming files` },
          try: [
            { cmd: `cat CLAUDE.md`, desc: `kalıcı talimatlar` }
          ]
        }
      }
    ] },
    { id: `m7`, no: 7, title: `Bitirme projesi: kendi siteni yayınla`, sub: `Küçük ama gerçek bir site`, lessons: [
      {
        id: `m7-d1`, title: `Bitirme projesinin brief'i`, minutes: 2, ready: true,
        intro: [
          `Bitirme projesinde kendine ait küçük bir site planlayıp yayınlayacaksın. Hedef, gerçekten kullanabileceğin ve başkalarıyla paylaşabileceğin bitmiş bir sonuç.`
        ],
        blocks: [
          { t: `h`, text: `Görevin: küçük ama gerçek bir site` },
          { t: `p`, html: `Şu biçimlerden sana yarayan birini seç:` },
          { t: `list`, items: [
            `<strong>Kişisel site:</strong> kim olduğun, ne yaptığın, iletişim.`,
            `<strong>Portfolyo:</strong> birkaç proje ve kısa açıklamaları.`,
            `<strong>Tanıtım sayfası:</strong> bir yan proje ya da küçük bir işletme.`,
            `<strong>Etkinlik ya da davetiye sayfası.</strong>`
          ] },
          { t: `p`, html: `Bir ana sayfa ve ihtiyacın olan iki ya da üç ek sayfa yeterli. Gereksiz sayfaları ve özellikleri ilk sürümün kapsamından çıkar.` },
          { t: `h`, text: `Adım 1 — İnşa etmeden önce planla` },
          { t: `code`, label: `Claude'a`, code: `I want to build a personal portfolio site:\na home page, a projects page, and a contact page.\nPlan the pages and the order to build them in.\nDo not write anything yet.` },
          { t: `p`, html: `Anlamı: “Kişisel bir portfolyo sitesi yapmak istiyorum: bir ana sayfa, bir projeler sayfası ve bir iletişim sayfası. Sayfaları ve yapılış sırasını planla. Henüz hiçbir şey yazma.”` },
          { t: `practice` },
          { t: `h`, text: `Adım 2 — Planı oku` },
          { t: `list`, items: [
            `İstediğin sayfaların hepsi planda var mı?`,
            `Ortak görünüm, menü ve bağlantılar düşünülmüş mü?`,
            `İnşa sırası anlaşılır mı?`
          ] },
          { t: `p`, html: `Yanlış varsayımları, dosyalar oluşturulmadan önce düzelt.` },
          { t: `h`, text: `İnce dilimler hâlinde yayınla` },
          { t: `p`, html: `Önce basit ve gezinilebilir bir iskelet oluştur. Sonra bir sayfanın gerçek içeriğini, ardından diğer içerikleri ve iletişimi ekle. Tamamlanan her parçada diff'i, yerel sonucu ve dağıtımdan sonra canlı siteyi kontrol et.` },
          { t: `callout`, kind: `info`, title: `Kişisel bilgilerde acele etme`, html: `İlk sürümü küçük tutmak yayınlama akışını erkenden doğrulamanı sağlar. Bunun için kişisel ya da gizli bilgileri aceleyle paylaşman gerekmez; yayınlanacak içeriği bilerek seç.` }
        ],
        trouble: [
          { q: `Ne tür bir site yapacağıma karar veremiyorum`, a: `Gerçekten kullanacağın bir sonucu seç: Birine bağlantısını göndermek isteyeceğin bir sayfa. Emin değilsen kişisel bir siteyle başla; en az sayfayla tamamlanır.` }
        ],
        have: [
          `Bitirme projesi için bir biçim seçtin.`,
          `Kapsamı küçük tutmanın ve sayfa planını önce okumanın önemini biliyorsun.`,
          `İnce dilimlerle ilerleme planın var: iskelet, içerik, iletişim.`
        ],
        note: `Benim bitirme projem bu site: Orvena. Ana sayfa, Öğrenme Yolculuğum ve Hakkımda sayfalarından oluşuyor; Türkçe ve İngilizce.`,
        next: `Sırada: Bütün sayfaların iskeletini kurmak ve ilk gün yayınlamak.`,
        prompt: `Kişisel bir portfolyo sitesi yapmak istiyorum: ana sayfa, projeler ve iletişim. İlk sürüm için kapsamı küçük tutan bir sayfa planı ve yapım sırası önerir misin?`,
        sandbox: {
          cwd: `~`,
          dirs: [`~`, `~/my-portfolio`],
          files: {},
          claude: [
            { match: `I want to build a personal portfolio site: a home page, a projects page, and a contact page. Plan the pages and the order to build them in. Do not write anything yet`,
              out: [`Plan (henüz dosya yazmadım):`, `1. Üç sayfanın iskeleti: index.html, projects.html, contact.html — her birinde başlık ve ortak menü.`, `2. Ana sayfanın gerçek içeriği: adın ve kısa bir tanıtım.`, `3. Projeler sayfası: 2–3 proje ve kısa açıklamaları.`, `4. İletişim sayfası: e-posta ve profil bağlantıları.`, `Her adımdan sonra yayınlayıp kontrol etmeni öneririm.`] }
          ],
          try: [
            { cmd: `cd my-portfolio`, desc: `proje klasörüne gir` },
            { cmd: `claude "I want to build a personal portfolio site: a home page, a projects page, and a contact page. Plan the pages and the order to build them in. Do not write anything yet."`, desc: `planı iste` },
            { cmd: `ls`, desc: `henüz dosya yok` }
          ]
        }
      },
      {
        id: `m7-d2`, title: `Sayfaları kur, ilk gün deploy et`, minutes: 2, ready: true,
        intro: [
          `Plan hazır. Önce bütün sayfaların kaba biçimini ve aralarındaki bağlantıları oluşturacaksın. Ardından yayınlama akışını, içerik henüz basitken doğrulayacaksın.`
        ],
        blocks: [
          { t: `h`, text: `Adım 1 — Önce bütün iskeleti kur` },
          { t: `code`, label: `Claude'a`, code: `build the skeleton of my site: a home, projects, and contact page,\neach with just a heading and one placeholder line,\nand a shared menu linking all three` },
          { t: `p`, html: `Anlamı: “Sitemin iskeletini kur: ana sayfa, projeler ve iletişim sayfaları; her birinde yalnızca bir başlık ve bir yer tutucu satır olsun, üçünü birbirine bağlayan ortak bir menü de olsun.” Diff'leri oku. Her sayfayı aç; başlıkların ve menü bağlantılarının doğru olduğunu kontrol et.` },
          { t: `callout`, kind: `tip`, title: `Önce bütün, sonra ayrıntı`, html: `Bir sayfayı diğerleri oluşmadan kusursuzlaştırmaya çalışma. Önce bütün sitenin yapısını gör.` },
          { t: `practice` },
          { t: `h`, text: `Adım 2 — Erken yayınla` },
          { t: `code`, label: `Claude'a`, code: `set up git, push this to a new GitHub repo,\nand walk me through getting it live on Vercel` },
          { t: `p`, html: `Anlamı: “Git'i kur, bunu yeni bir GitHub deposuna gönder ve Vercel'de yayına almam için bana adım adım yol göster.” Depo hedefini, görünürlüğü ve gönderilecek dosyaları kontrol et. Barındırıcıdaki proje kökünü ve dağıtım ayarlarını doğrula. İlk dağıtımın tamamlandığını ve verilen adresin açıldığını gör.` },
          { t: `callout`, kind: `warn`, title: `Yer tutucu, gerçek bilgi değildir`, html: `İskeletin herkese açık olmasını istemiyorsan sağlayıcının önizleme ya da erişim kısıtlaması seçeneklerini değerlendir. Henüz tamamlanmamış örnek içeriği gerçek bilgi gibi sunma.` },
          { t: `h`, text: `Adım 3 — Kilometre taşını kaydet` },
          { t: `p`, html: `Çalışan iskeleti açıklayıcı bir commit mesajıyla kaydet ve uzak depoya gönder. Canlı ya da önizleme adresinde bütün sayfaları yeniden gez. Bu commit, sonraki değişiklikleri karşılaştırabileceğin bir sürüm kaydıdır.` }
        ],
        trouble: [
          { q: `Menüdeki bir bağlantı canlı sitede 404 veriyor`, a: `Bağlantıdaki dosya adını gerçek dosya adıyla karşılaştır; büyük/küçük harf ve klasör yolu önemlidir.` },
          { q: `Dağıtım tamamlandı ama adres açılmıyor`, a: `Barındırıcıdaki proje kökünün doğru klasör olduğunu ve <code>index.html</code>'in o klasörde bulunduğunu kontrol et.` }
        ],
        have: [
          `Bütün sayfaların iskeletini ortak bir menüyle kurdun.`,
          `Yayın akışını içerik henüz basitken doğruladın.`,
          `Çalışan iskeleti bir commit ile kilometre taşı olarak kaydettin.`
        ],
        note: `Bu sitede de önce sayfaların iskeleti ve ortak menüsü oluştu; içerik ve tasarım ayrıntıları sonradan, adım adım geldi.`,
        next: `Sırada: İskeleti gerçek içerikle doldurmak.`,
        prompt: `Üç sayfalık (ana sayfa, projeler, iletişim) basit bir HTML sitesinin iskeletini ortak bir menüyle nasıl kurarım? Kısa bir örnek kod gösterir misin?`,
        sandbox: {
          cwd: `~/my-portfolio`,
          dirs: [`~`, `~/my-portfolio`],
          files: {},
          cmds: [
            { match: `git add .`, out: [] },
            { match: `git commit -m "add the skeleton of all three pages with a shared menu"`, out: [`[main (root-commit) 1a2b3c4] add the skeleton of all three pages with a shared menu`, ` 3 files changed, 12 insertions(+)`] }
          ],
          claude: [
            { match: `build the skeleton of my site: a home, projects, and contact page, each with just a heading and one placeholder line, and a shared menu linking all three`,
              write: {
                "~/my-portfolio/index.html": `<nav><a href="index.html">Home</a> <a href="projects.html">Projects</a> <a href="contact.html">Contact</a></nav>\n<h1>Home</h1>\n<p>(placeholder) A short intro will go here.</p>`,
                "~/my-portfolio/projects.html": `<nav><a href="index.html">Home</a> <a href="projects.html">Projects</a> <a href="contact.html">Contact</a></nav>\n<h1>Projects</h1>\n<p>(placeholder) My projects will go here.</p>`,
                "~/my-portfolio/contact.html": `<nav><a href="index.html">Home</a> <a href="projects.html">Projects</a> <a href="contact.html">Contact</a></nav>\n<h1>Contact</h1>\n<p>(placeholder) How to reach me will go here.</p>`
              },
              out: [`[OK] wrote index.html`, `[OK] wrote projects.html`, `[OK] wrote contact.html`, `Üç sayfada da aynı menü var.`] },
            { match: `set up git, push this to a new GitHub repo, and walk me through getting it live on Vercel`,
              out: [`(simülasyon) Adımlar:`, `1. git init, ilk commit ve yeni GitHub deposuna push — depo adını ve görünürlüğü sen onayla.`, `2. vercel.com'da GitHub ile giriş yap ve depoyu Import et.`, `3. Proje kökünü kontrol et ve Deploy'a bas.`, `4. Verilen adresi aç ve üç sayfayı menüden gez.`] }
          ],
          try: [
            { cmd: `claude "build the skeleton of my site: a home, projects, and contact page, each with just a heading and one placeholder line, and a shared menu linking all three"`, desc: `iskeleti kur` },
            { cmd: `ls`, desc: `sayfalar` },
            { cmd: `cat contact.html`, desc: `bir sayfayı oku` },
            { cmd: `claude "set up git, push this to a new GitHub repo, and walk me through getting it live on Vercel"`, desc: `erken yayınla` },
            { cmd: `git add .`, desc: `hazırla` },
            { cmd: `git commit -m "add the skeleton of all three pages with a shared menu"`, desc: `kilometre taşı` }
          ]
        }
      },
      {
        id: `m7-d3`, title: `Gerçek içerikle doldur`, minutes: 3, ready: true,
        intro: [
          `İskeleti kişisel bir siteye dönüştüren şey, doğru ve sana ait içeriktir. Sayfa sayfa ilerleyip yer tutucuları adınla, kendi açıklamalarınla ve gerçek projelerinle değiştir.`
        ],
        blocks: [
          { t: `h`, text: `Adım 1 — Her yer tutucuyu değiştir` },
          { t: `code`, label: `Claude'a`, code: `on my home page, replace the placeholder heading with Ayşe Yılmaz\nand write a warm two-sentence intro saying I am learning\nto build things and I make small useful websites` },
          { t: `p`, html: `Anlamı: “Ana sayfamdaki yer tutucu başlığı Ayşe Yılmaz ile değiştir ve bir şeyler yapmayı öğrendiğimi, küçük ve işe yarar web siteleri yaptığımı söyleyen sıcak, iki cümlelik bir giriş yaz.” Örnekteki adı kendi adınla değiştir. Her sayfa için gerçek malzemeyi ver: ne yaptığın, hangi projeler üzerinde çalıştığın ve bunların senin için önemi. Claude'un yazdığı metindeki gerçekleri ve tonu diff üzerinden kontrol et.` },
          { t: `practice` },
          { t: `h`, text: `Adım 2 — Kendi görsellerini ekle` },
          { t: `code`, label: `Claude'a`, code: `I have added photo.jpg to my project.\nPut it on the home page next to my intro, at a sensible size.` },
          { t: `p`, html: `Anlamı: “Projeme photo.jpg ekledim. Onu ana sayfada giriş metninin yanına, makul bir boyutta koy.” Dosyayı proje klasörüne koy; adını ve konumunu açıkça belirt. Görselin sayfa düzenine uyduğunu, mobilde taşmadığını ve uygun bir alternatif metni (<code>alt</code>) olduğunu kontrol et.` },
          { t: `callout`, kind: `warn`, title: `Görsel hakları`, html: `Yalnızca kullanma hakkın olan görselleri yayınla. Fotoğrafın hazır değilse sade bir grafik ya da bilinçli bir görsel alan kullanabilirsin; ama unutulmuş bir “fotoğraf buraya” notunu yayında bırakma.` },
          { t: `h`, text: `Adım 3 — Kulağa senin gibi gelsin` },
          { t: `code`, label: `Claude'a`, code: `read my about page and rewrite anything that sounds stiff\nor generic so it sounds like a real person wrote it;\nkeep my facts exactly the same` },
          { t: `p`, html: `Anlamı: “Hakkımda sayfamı oku; kulağa katı ya da sıradan gelen her şeyi, gerçek bir insan yazmış gibi duyulacak şekilde yeniden yaz; bilgilerimi olduğu gibi koru.” Metni yüksek sesle oku. Doğal olmayan satırları düzelt ve yeni bir başarı, yetenek ya da kişisel bilgi uydurulmadığını doğrula.` },
          { t: `h`, text: `Bir sayfayı tamamla, kontrol et, yayınla` },
          { t: `p`, html: `Bir sayfanın gerçek içeriği hazır olduğunda commit ve push yap. Otomatik dağıtım tamamlandıktan sonra canlı sürümü açıp doğrula; sonra bir sonraki sayfaya geç.` }
        ],
        trouble: [
          { q: `Claude bilmediğim bir bilgi ekledi`, a: `Diff'te bulduğun satırı reddet ya da düzelt ve isteğe “keep my facts exactly the same; do not add anything new about me” ekini koy.` },
          { q: `Fotoğraf görünmüyor`, a: `Dosya adının ve uzantısının (ör. <code>photo.jpg</code> / <code>Photo.JPG</code>) koddakiyle birebir aynı olduğunu ve dosyanın doğru klasörde olduğunu kontrol et.` }
        ],
        have: [
          `Yer tutucuları kendi adın ve açıklamalarınla değiştirmeyi öğrendin.`,
          `Kendi görselini sayfaya ekleyip mobilde ve <code>alt</code> metninde kontrol etmeyi öğrendin.`,
          `Metni doğallaştırırken bilgilerini korumayı öğrendin.`
        ],
        note: `Bu sitenin hakkımda bilgileri yalnızca CV'mden, ders konuları yalnızca ders notlarımdan geliyor; Claude'dan metni düzenlemesini isterken yeni bilgi eklememesini özellikle istedim.`,
        next: `Sırada: Ziyaretçilerin sana ulaşabilmesi için bir yol eklemek.`,
        prompt: `Kişisel web sitemin Hakkımda metnini daha doğal ve samimi bir dille yeniden yazmak istiyorum, ama bilgilerimin değişmemesi gerekiyor. Bunu bir yapay zekâdan isterken nelere dikkat etmeliyim?`,
        sandbox: {
          cwd: `~/my-portfolio`,
          dirs: [`~`, `~/my-portfolio`],
          files: {
            "~/my-portfolio/index.html": `<nav><a href="index.html">Home</a> <a href="projects.html">Projects</a> <a href="contact.html">Contact</a></nav>\n<h1>Home</h1>\n<p>(placeholder) A short intro will go here.</p>`,
            "~/my-portfolio/photo.jpg": `(bu bir görsel dosyası; terminalde içeriği okunmaz)`
          },
          claude: [
            { match: `on my home page, replace the placeholder heading with Ayşe Yılmaz and write a warm two-sentence intro saying I am learning to build things and I make small useful websites`,
              write: { "~/my-portfolio/index.html": `<nav><a href="index.html">Home</a> <a href="projects.html">Projects</a> <a href="contact.html">Contact</a></nav>\n<h1>Ayşe Yılmaz</h1>\n<p>Hi, I'm Ayşe — I'm learning to build things, one small step at a time. I make small, useful websites.</p>` },
              out: [`Önerilen değişiklik — index.html:`, `- <h1>Home</h1>`, `+ <h1>Ayşe Yılmaz</h1>`, `- <p>(placeholder) A short intro will go here.</p>`, `+ <p>Hi, I'm Ayşe — I'm learning to build things, one small step at a time. I make small, useful websites.</p>`, `(simülasyon: öneri kabul edildi)`, `[OK] edited index.html`] },
            { match: `I have added photo.jpg to my project. Put it on the home page next to my intro, at a sensible size`,
              write: { "~/my-portfolio/index.html": `<nav><a href="index.html">Home</a> <a href="projects.html">Projects</a> <a href="contact.html">Contact</a></nav>\n<h1>Ayşe Yılmaz</h1>\n<img src="photo.jpg" alt="Portrait of Ayşe Yılmaz" width="240" style="max-width:100%;height:auto">\n<p>Hi, I'm Ayşe — I'm learning to build things, one small step at a time. I make small, useful websites.</p>` },
              out: [`[OK] edited index.html — photo.jpg eklendi (240px genişlik, mobilde küçülür, alt metni var)`] }
          ],
          try: [
            { cmd: `ls`, desc: `photo.jpg yerinde mi?` },
            { cmd: `claude "on my home page, replace the placeholder heading with Ayşe Yılmaz and write a warm two-sentence intro saying I am learning to build things and I make small useful websites"`, desc: `gerçek içerik` },
            { cmd: `claude "I have added photo.jpg to my project. Put it on the home page next to my intro, at a sensible size."`, desc: `görseli ekle` },
            { cmd: `cat index.html`, desc: `sonucu oku` }
          ]
        }
      },
      {
        id: `m7-d4`, title: `Sana ulaşmanın bir yolunu ekle`, minutes: 4, ready: true,
        intro: [
          `Bir ziyaretçinin sana ulaşabilmesi için karmaşık bir sisteme ihtiyacın olmayabilir. Önce açık bir iletişim bağlantısını düşün; form gerekiyorsa uygun bir hizmetle ekle.`
        ],
        blocks: [
          { t: `h`, text: `Birinci seviye: net bağlantılar` },
          { t: `code`, label: `Claude'a`, code: `on my contact page, add a button that opens a new email\nto me at ayse@example.com, and links to my Instagram and GitHub` },
          { t: `p`, html: `Anlamı: “İletişim sayfama, bana ayse@example.com adresine yeni bir e-posta açan bir düğme ile Instagram ve GitHub bağlantılarımı ekle.” Örnek adresi, yayınlamak istediğin kendi adresinle değiştir. E-posta bağlantısı, ziyaretçinin cihazında uygun bir e-posta uygulaması varsa yeni bir mesaj açar. Sosyal bağlantıları gerçek profil adreslerinle doğrula.` },
          { t: `practice` },
          { t: `h`, text: `İkinci seviye: iletişim formu` },
          { t: `code`, label: `Claude'a`, code: `add a simple contact form - name, email, message -\nto my contact page, using a form service like Formspree\nso submissions get emailed to me without my own backend` },
          { t: `p`, html: `Anlamı: “İletişim sayfama ad, e-posta ve mesaj alanları olan basit bir form ekle; gönderimler kendi sunucum olmadan bana e-postayla gelsin diye Formspree gibi bir form hizmeti kullan.” Böyle bir üçüncü taraf hizmet gönderimleri işler; kendi sunucunu işletmen gerekmez.` },
          { t: `list`, items: [
            `Hizmetin güncel planını, kullanım sınırlarını, spam kontrollerini ve veri işleme koşullarını kontrol et.`,
            `Gerekli hesap ve uç nokta ayarlarını tamamla.`,
            `Formun etiketlerini, zorunlu alanlarını, başarı ve hata mesajlarını incele.`,
            `Gizli bir erişim anahtarı gerekiyorsa onu tarayıcı koduna yerleştirme.`
          ] },
          { t: `h`, text: `Bir ziyaretçi gibi test et` },
          { t: `cmd`, code: `start contact.html` },
          { t: `p`, html: `Önce yerelde bağlantıları ve görünümü dene; sonra canlı sayfadan kendine bir test mesajı gönder. Mesajın gelen kutuna ulaştığını ve bir hata olduğunda kullanıcıya anlaşılır bir bilgi gösterildiğini kontrol et.` },
          { t: `callout`, kind: `warn`, title: `Başarı mesajı yetmez`, html: `Test gönderimini yalnızca kendi hesabına ya da izin verilen bir test hedefine yap. Ekranda başarı mesajının görünmesi, iletinin gerçekten ulaştığını tek başına kanıtlamaz; gelen kutunu kontrol et.` }
        ],
        trouble: [
          { q: `E-posta düğmesi hiçbir şey açmıyor`, a: `Ziyaretçinin cihazında bir e-posta uygulaması tanımlı olmayabilir. Adresi sayfada düz metin olarak da göstermek iyi bir yedektir.` },
          { q: `Form gönderiliyor ama mesaj gelmiyor`, a: `Form hizmetindeki hesabı ve e-posta doğrulamasını kontrol et; spam klasörüne de bak. Formun gönderim adresinin (uç nokta) doğru olduğundan emin ol.` }
        ],
        have: [
          `E-posta ve profil bağlantılarıyla basit bir iletişim yolu eklemeyi öğrendin.`,
          `Gerektiğinde bir form hizmetiyle iletişim formu eklemenin adımlarını biliyorsun.`,
          `İletişimi uçtan uca, gelen kutusunu kontrol ederek test etmeyi öğrendin.`
        ],
        note: `Bu sitede form yerine birinci seviyeyi seçtim: e-posta, GitHub ve LinkedIn bağlantıları. Telefon ve adres bilgisi bilerek yer almıyor.`,
        next: `Sırada: Cilalama, son gözden geçirme ve yayın kararı.`,
        prompt: `Statik bir kişisel siteye iletişim yolu eklemek istiyorum. Yalnızca e-posta ve sosyal bağlantılar ile bir form hizmeti kullanmanın artılarını ve eksilerini karşılaştırır mısın?`,
        sandbox: {
          cwd: `~/my-portfolio`,
          dirs: [`~`, `~/my-portfolio`],
          files: { "~/my-portfolio/contact.html": `<nav><a href="index.html">Home</a> <a href="projects.html">Projects</a> <a href="contact.html">Contact</a></nav>\n<h1>Contact</h1>\n<p>(placeholder) How to reach me will go here.</p>` },
          cmds: [
            { match: `start contact.html`, out: [`(simülasyon) contact.html tarayıcıda açılırdı. E-posta düğmesini ve profil bağlantılarını tek tek dene.`] }
          ],
          claude: [
            { match: `on my contact page, add a button that opens a new email to me at ayse@example.com, and links to my Instagram and GitHub`,
              write: { "~/my-portfolio/contact.html": `<nav><a href="index.html">Home</a> <a href="projects.html">Projects</a> <a href="contact.html">Contact</a></nav>\n<h1>Contact</h1>\n<p><a class="button" href="mailto:ayse@example.com">Email me</a></p>\n<p>ayse@example.com</p>\n<ul>\n  <li><a href="https://instagram.com/your-profile">Instagram</a></li>\n  <li><a href="https://github.com/your-profile">GitHub</a></li>\n</ul>` },
              out: [`[OK] edited contact.html — e-posta düğmesi ve iki profil bağlantısı eklendi`, `Not: Instagram ve GitHub adreslerini kendi profil adreslerinle değiştir.`] }
          ],
          try: [
            { cmd: `claude "on my contact page, add a button that opens a new email to me at ayse@example.com, and links to my Instagram and GitHub"`, desc: `birinci seviye` },
            { cmd: `cat contact.html`, desc: `bağlantıları kontrol et` },
            { cmd: `start contact.html`, desc: `ziyaretçi gibi dene` }
          ]
        }
      },
      {
        id: `m7-d5`, title: `Cilala, gözden geçir ve yayınla`, minutes: 2, ready: true,
        intro: [
          `Sayfaların, gerçek içeriğin ve iletişim yolun hazır. Şimdi siteyi ilk kez gelen bir ziyaretçi gibi değerlendirip yayın kararını vereceksin.`
        ],
        blocks: [
          { t: `h`, text: `Son rötuş turu` },
          { t: `list`, items: [
            `<strong>İlk izlenim:</strong> Ana sayfa kim olduğunu ve ne sunduğunu açıkça anlatıyor mu?`,
            `<strong>Mobil:</strong> Küçük ekranda yazılar, görseller ve menü kullanılabiliyor mu?`,
            `<strong>Bağlantılar:</strong> Her sayfadan menüyü ve iletişim hedeflerini denedin mi?`,
            `<strong>Artıklar:</strong> Örnek metin, unutulmuş bir yer tutucu ya da yarım bir bölüm var mı?`
          ] },
          { t: `h`, text: `İkinci bir inceleme iste` },
          { t: `code`, label: `Claude'a`, code: `review my whole site as if you are about to publish it.\nList anything unfinished, inconsistent, broken on mobile,\nor confusing, and the three most worth fixing first.\nDo not change anything yet.` },
          { t: `p`, html: `Anlamı: “Bütün siteme yayınlamak üzereymişsin gibi bak. Yarım kalmış, tutarsız, mobilde bozuk ya da kafa karıştırıcı her şeyi listele ve önce düzeltmeye en değer üçünü söyle. Henüz hiçbir şeyi değiştirme.” Bulguları kontrol et. Öncelikli eksikleri küçük adımlarla düzelt, kalan iyileştirmeleri not al.` },
          { t: `callout`, kind: `warn`, title: `Kod incelemesi, telefon testi değildir`, html: `Claude'un kodu incelemesi, gerçek bir telefonda yapılan testin yerini almaz; mobil sorunları canlı sayfada da dene.` },
          { t: `practice` },
          { t: `h`, text: `Yayın öncesi kontrol` },
          { t: `table`, head: [`Kontrol`, `Doğrulama`], rows: [
            [`Canlı HTTPS adresi`, `Doğru yayın adresi açılıyor; sertifika uyarısı yok.`],
            [`Telefon`, `Görünüm ve gezinme küçük ekranda çalışıyor.`],
            [`Bağlantılar`, `Menüler ve sayfa bağlantıları doğru hedefe gidiyor.`],
            [`Gerçek içerik`, `Yer tutucular temizlenmiş; ad ve bilgiler doğru.`],
            [`İletişim`, `Test mesajı gerçekten alınmış.`]
          ] },
          { t: `h`, text: `Yayın kararını ver` },
          { t: `p`, html: `Bir ziyaretçi siteyi anlayabiliyor, sayfaları gezebiliyor ve sana ulaşabiliyorsa temel hedefi sağladın. Mükemmellik için süresiz beklemek yerine gerekli düzeltmeleri tamamla ve yayınla; yeni iyileştirmeleri sonradan ekleyebilirsin.` }
        ],
        trouble: [
          { q: `Bitmeyen bir iyileştirme listem var`, a: `Listeyi “yayından önce şart” ve “sonra eklenebilir” diye ikiye ayır. Yalnızca ilk grubu tamamla ve yayınla.` }
        ],
        have: [
          `Son rötuş için dört maddelik bir tur listen var.`,
          `Claude'dan önceliklendirilmiş bir son inceleme isteyebilirsin.`,
          `Beş maddelik yayın öncesi kontrolle bilinçli bir yayın kararı verebilirsin.`
        ],
        note: `Bu siteyi yayınlamadan önce bağlantıları ve iki temayı kontrol ettim, farklı ekran genişliklerinde ekran görüntüleriyle baktım; her yayından önce de onay verdim.`,
        next: `Sırada: Kursun özeti.`,
        prompt: `Kişisel web sitemi yayınlamadan önce kullanabileceğim bir yayın öncesi kontrol listesi hazırlar mısın? Mobil, bağlantılar, içerik, HTTPS ve iletişim başlıklarını kullan.`,
        sandbox: {
          cwd: `~/my-portfolio`,
          dirs: [`~`, `~/my-portfolio`],
          files: {
            "~/my-portfolio/index.html": `<h1>Ayşe Yılmaz</h1>\n<img src="photo.jpg" width="900">\n<p>Hi, I'm Ayşe. I make small, useful websites.</p>`,
            "~/my-portfolio/projects.html": `<h1>Projects</h1>\n<p>(placeholder) My projects will go here.</p>`,
            "~/my-portfolio/contact.html": `<h1>Contact</h1>\n<p><a href="mailto:ayse@example.com">Email me</a></p>`
          },
          claude: [
            { match: `review my whole site as if you are about to publish it. List anything unfinished, inconsistent, broken on mobile, or confusing, and the three most worth fixing first. Do not change anything yet`,
              out: [`Değişiklik yapmadım. Bulgular:`, `- projects.html: yer tutucu metin duruyor.`, `- index.html: görsel 900px sabit genişlikte; telefonda taşar. alt metni de yok.`, `- Hiçbir sayfada ortak menü yok.`, `- contact.html: e-posta adresi örnek adres gibi görünüyor.`, `Önce düzeltmeye en değer üçü: 1) yer tutucu, 2) mobilde taşan görsel, 3) eksik menü.`] }
          ],
          try: [
            { cmd: `claude "review my whole site as if you are about to publish it. List anything unfinished, inconsistent, broken on mobile, or confusing, and the three most worth fixing first. Do not change anything yet."`, desc: `son inceleme` },
            { cmd: `cat index.html`, desc: `bulguyu doğrula` }
          ]
        }
      },
      {
        id: `m7-d6`, title: `Modül 7 özeti: yayınladın`, minutes: 2, ready: true,
        intro: [
          `Kursun sonunda hedef, küçük ve gerçek bir siteyi planlayıp yayınlayabileceğin bir çalışma döngüsü kurmak. Bu ders, tamamladığın adımları ve bir sonraki projene taşıyacağın alışkanlıkları bir araya getiriyor.`
        ],
        blocks: [
          { t: `h`, text: `Kurs boyunca kazandığın beceriler` },
          { t: `table`, head: [`Modül`, `Beceri`], rows: [
            [`1. Terminal temelleri`, `Konumunu bulmak, dosya ve klasörleri görmek; pratik ortamında ilk adımları atmak.`],
            [`2. İlk prompt`, `Kurulum akışını tanımak ve açık isteklerle bir sayfa oluşturmak.`],
            [`3. Düzenleme`, `Diff okumak, öneriyi ayarlamak, açıklama istemek ve küçük refaktörler yapmak.`],
            [`4. Çok sayfalı site`, `Birden fazla dosyada planlı ve tutarlı değişiklik yapmak.`],
            [`5. Yayınlama`, `Git, uzak depo, barındırma, HTTPS ve alan adı akışını anlamak.`],
            [`6. İş akışı araçları`, `Proje talimatlarını, komutları, yardımcıları, hook'ları ve bağlantıları tanımak.`],
            [`7. Bitirme projesi`, `Küçük bir siteyi gerçek içerik ve iletişimle tamamlayıp kontrol etmek.`]
          ] },
          { t: `h`, text: `Asıl beceri: döngüyü sürdürmek` },
          { t: `p`, html: `<strong>Planla → ne istediğini anlat → diff'i incele → sonucu kontrol et → tamamlanan parçayı yayınla → tekrarla.</strong> Aynı yaklaşım tek satırlık bir değişiklikte de, daha büyük bir projede de işe yarar.` },
          { t: `h`, text: `Sonraki proje` },
          { t: `p`, html: `Bir sonraki proje için gerçekten işine yarayacak küçük bir fikir seç. Kapsamı sınırla, bir ilk sürüm tanımla ve aynı kontrol döngüsüyle ilerle.` },
          { t: `practice` }
        ],
        trouble: [],
        have: [
          `Terminalde rahatça gezinmek ve Claude Code'u kendi bilgisayarında kullanmak.`,
          `Açık istekler yazıp diff'leri bilinçli olarak incelemek.`,
          `Çok sayfalı bir siteyi planlı ve tutarlı biçimde geliştirmek.`,
          `Siteyi Git ve bir barındırıcıyla yayınlayıp güncellemek.`,
          `Kendi küçük ve gerçek siteni bitirip paylaşmak.`
        ],
        note: `Amaç komut ezberlemek değil; açık istek vermek, değişikliği incelemek ve sonucu bitirip yayınlamak. Bu site, o döngünün ilk ürünü.`,
        next: `Bir sonraki adım: Öğrendiklerini kullanarak kendi küçük projeni seçmek ve aynı döngüyle ilerlemek.`,
        prompt: `Claude Code ile ilk kişisel sitemi yayınladım. Aynı “planla, anlat, diff'i incele, kontrol et, yayınla” döngüsüyle yapabileceğim, yeni başlayan biri için uygun 5 küçük proje fikri önerir misin?`,
        sandbox: {
          cwd: `~/my-portfolio`,
          dirs: [`~`, `~/my-portfolio`],
          files: { "~/my-portfolio/index.html": `<h1>Ayşe Yılmaz</h1>`, "~/my-portfolio/projects.html": `<h1>Projects</h1>`, "~/my-portfolio/contact.html": `<h1>Contact</h1>` },
          cmds: [
            { match: `git push`, out: [`(simülasyon) To https://github.com/you/my-portfolio.git`, `   4e5f6a7..8b9c0d1  main -> main`, `Dağıtımı izle ve canlı adresi başka bir cihazda aç.`] }
          ],
          try: [
            { cmd: `ls`, desc: `bitmiş site` },
            { cmd: `git push`, desc: `yayınla` }
          ]
        }
      }
    ] }
  ]
};
