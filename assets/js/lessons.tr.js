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
    { id: `m2`, no: 2, title: `İlk prompt'un`, lessons: [
      { id: `m2-d1`, title: `Bir prompt'un anatomisi`, minutes: 7 },
      { id: `m2-d2`, title: `Netlik kaldıracı`, minutes: 6 },
      { id: `m2-d3`, title: `Bağlam pencereleri ve /clear`, minutes: 5 },
      { id: `m2-d4`, title: `Slash komutları`, minutes: 5 },
      { id: `m2-d5`, title: `@file ve @directory`, minutes: 5 },
      { id: `m2-d6`, title: `Modül 2 özeti`, minutes: 3 }
    ] },
    { id: `m3`, no: 3, title: `Tek dosyada düzenlemeler`, lessons: [
      { id: `m3-d1`, title: `Bir diff okuma`, minutes: 5 },
      { id: `m3-d2`, title: `Düzenlemeleri kabul etme ve ayarlama`, minutes: 3 },
      { id: `m3-d3`, title: `Açıklama isteme`, minutes: 2 },
      { id: `m3-d4`, title: `Küçük refaktörler`, minutes: 5 },
      { id: `m3-d5`, title: `Modül 3 özeti`, minutes: 2 }
    ] },
    { id: `m4`, no: 4, title: `Çok sayfalı bir site kur`, lessons: [
      { id: `m4-d1`, title: `Planlama neden önemli`, minutes: 4 },
      { id: `m4-d2`, title: `Dosyalar arası düzenlemeler`, minutes: 4 },
      { id: `m4-d3`, title: `Görevleri parçalara bölme`, minutes: 2 },
      { id: `m4-d4`, title: `Kendi diff'ini gözden geçirme`, minutes: 2 },
      { id: `m4-d5`, title: `Modül 4 özeti`, minutes: 2 }
    ] },
    { id: `m5`, no: 5, title: `İlk projeni yayına alma`, lessons: [
      { id: `m5-d1`, title: `Localhost ile yayındaki web`, minutes: 2 },
      { id: `m5-d2`, title: `Git: ihtiyacın olan beş komut`, minutes: 2 },
      { id: `m5-d3`, title: `Vercel'e deploy`, minutes: 2 },
      { id: `m5-d4`, title: `Ortam değişkenleri ve sırlar`, minutes: 2 },
      { id: `m5-d5`, title: `Alan adları, HTTPS ve gerçekten yayınlama`, minutes: 2 },
      { id: `m5-d6`, title: `Modül 5 özeti`, minutes: 1 }
    ] },
    { id: `m6`, no: 6, title: `Hooks, MCP ve iş akışı`, lessons: [
      { id: `m6-d1`, title: `CLAUDE.md: projeni Claude'a öğret`, minutes: 2 },
      { id: `m6-d2`, title: `Slash komutları ve subagent'lar`, minutes: 2 },
      { id: `m6-d3`, title: `Hooks: sıkıcı kısımları otomatikleştir`, minutes: 2 },
      { id: `m6-d4`, title: `MCP: Claude'a yeni araçlar ver`, minutes: 2 },
      { id: `m6-d5`, title: `Terminalin ötesi: Agent SDK`, minutes: 2 },
      { id: `m6-d6`, title: `Modül 6 özeti`, minutes: 1 }
    ] },
    { id: `m7`, no: 7, title: `Bitirme projesi: kendi siteni yayınla`, lessons: [
      { id: `m7-d1`, title: `Bitirme projesinin brief'i`, minutes: 2 },
      { id: `m7-d2`, title: `Sayfaları kur, ilk gün deploy et`, minutes: 2 },
      { id: `m7-d3`, title: `Gerçek içerikle doldur`, minutes: 3 },
      { id: `m7-d4`, title: `Sana ulaşmanın bir yolunu ekle`, minutes: 4 },
      { id: `m7-d5`, title: `Cilala, gözden geçir ve yayınla`, minutes: 2 },
      { id: `m7-d6`, title: `Modül 7 özeti: yayınladın`, minutes: 2 }
    ] }
  ]
};
