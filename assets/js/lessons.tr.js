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
