<#
  Ders metinlerini ElevenLabs ile seslendirir.

  Çıktı: assets/audio/{tr|en}/{id}.mp3 ve {id}.js (cümle zamanlamaları; listen.js okur).
  Okunacak metin, ders sayfasının kendisinden alınır (scripts/metin-cikar.html, Edge/Chrome ile),
  böylece oynatıcının okuduğu cümlelerle birebir aynıdır.

  API anahtarı yalnızca ELEVENLABS_API_KEY ortam değişkeninden okunur; hiçbir dosyaya yazılmaz.
  Metni ve ayarları değişmemiş ders atlanır (kredi harcanmaz); yeniden üretmek için -Force.

  Örnekler:
    .\scripts\seslendir.ps1 -Ids m1-d1 -DryRun      # yalnızca karakter sayısı (kredi harcamaz)
    .\scripts\seslendir.ps1 -Ids m1-d1
    .\scripts\seslendir.ps1 -Ids m1-d1,m1-d2 -Lang tr
#>
param(
  [Parameter(Mandatory = $true)][string[]]$Ids,
  [ValidateSet("tr", "en")][string]$Lang = "tr",
  [string]$VoiceId = "i6R4vMs6x0h8Fiv7b1NI",
  [string]$ModelId = "eleven_multilingual_v2",
  [string]$OutputFormat = "mp3_44100_64",
  [switch]$DryRun,
  [switch]$Force,
  [switch]$Show     # okunuşu değişen cümleleri listeler (-DryRun ile kredi harcamadan)
)

# ---------- Okunuş: yalnızca sese giden metinde, sayfadaki yazı değişmez ----------
function Convert-Speech([string]$s) {
  if ($Lang -ne "tr") { return $s }
  $s = $s.Replace("file://", "file")
  $s = $s -creplace '(\w)@(\w+)\.(\w+)', '$1 et $2 nokta $3'          # ayse@example.com
  $s = $s -creplace '\$ ile\b', 'dolar işaretiyle'
  $s = $s -creplace '\$ işaret', 'dolar işaret'
  $s = $s -creplace '\$', 'dolar işareti'
  $s = $s -creplace '@ ile\b', 'et işaretiyle'
  $s = $s -creplace '@(?=\S)', 'et '                                  # @index.html, @file
  $s = $s -creplace '@', 'et işareti'
  $s = $s -creplace '~/', 'tilda eğik çizgi '
  $s = $s -creplace '~', 'tilda'
  $s = $s -creplace '\\', ' ters eğik çizgi '
  $s = $s.Replace("büyük/küçük", "büyük küçük").Replace("macOS/Linux", "macOS ya da Linux")
  $s = $s.Replace("açık / özel", "açık ya da özel").Replace("Settings → Pages", "Settings, Pages")
  $s = $s -creplace '^- ', 'eksi işareti '                            # diff: "- kaldırılanı"
  $s = $s -creplace '(^|\s)\.(?=[A-Za-z])', '$1nokta '                 # .gitignore, .env
  $s = $s -creplace '(?<=\s)\.(?=\s)', 'nokta'                         # git add .
  $s = $s -creplace '(^|\s)/(?=\s)', '$1eğik çizgi'                   # "/ işareti"
  $s = $s -creplace '(^|\s)/(?=[A-Za-z])', '$1slash '                 # /clear, /init
  $s = $s -creplace '(\S)/(?=[\s,.;:!?]|$)', '$1'                     # my-first-project/
  $s = $s -creplace '(\S)/(?=\S)', '$1 eğik çizgi '                   # yol içindeki /
  $s = $s -creplace '([A-Za-z0-9])\.(?=[A-Za-z])', '$1 nokta '        # index.html
  $s = $s -creplace '\s*→\s*', ', sonra '
  $s = $s -creplace ' \+ ', ' artı '
  $s = $s -creplace '([A-Za-z0-9])_(?=[A-Za-z0-9])', '$1 '            # CONTACT_FORM_KEY
  $s = $s -creplace '\b(?!e-posta)([a-z0-9]+)-(?=[a-z0-9])', '$1 '    # my-first-project
  return ($s -creplace '\s{2,}', ' ').Trim()
}

$ErrorActionPreference = "Stop"
[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12

$root = Split-Path -Parent $PSScriptRoot
$outDir = Join-Path $root "assets\audio\$Lang"
$settings = [ordered]@{ stability = 0.5; similarity_boost = 0.75; style = 0.0; use_speaker_boost = $true }
$maxChars = 9500   # eleven_multilingual_v2 tek istekte en fazla 10.000 karakter
$utf8 = New-Object System.Text.UTF8Encoding $false

# ---------- 1. Metni ders sayfasından çıkar ----------
$browser = @(
  "${env:ProgramFiles(x86)}\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Microsoft\Edge\Application\msedge.exe",
  "$env:ProgramFiles\Google\Chrome\Application\chrome.exe",
  "$env:LOCALAPPDATA\Google\Chrome\Application\chrome.exe"
) | Where-Object { Test-Path $_ } | Select-Object -First 1
if (-not $browser) { throw "Edge ya da Chrome bulunamadı." }

$Ids = @($Ids | ForEach-Object { $_ -split "," } | Where-Object { $_ })
$pageUri = ([Uri](Join-Path $PSScriptRoot "metin-cikar.html")).AbsoluteUri + "?lang=$Lang&ids=" + ($Ids -join ",")
$profileDir = Join-Path $env:TEMP "orvena-seslendir-profil"
$tmpOut = Join-Path $env:TEMP "orvena-seslendir-out.html"
$tmpErr = Join-Path $env:TEMP "orvena-seslendir-err.txt"

$browserArgs = @("--headless=new", "--disable-gpu", "--no-first-run", "--allow-file-access-from-files",
  "--user-data-dir=`"$profileDir`"", "--virtual-time-budget=30000", "--dump-dom", "`"$pageUri`"")
Start-Process -FilePath $browser -ArgumentList $browserArgs -Wait -NoNewWindow `
  -RedirectStandardOutput $tmpOut -RedirectStandardError $tmpErr

$raw = [IO.File]::ReadAllText($tmpOut, [Text.Encoding]::UTF8)
$m = [regex]::Match($raw, '<pre id="out">@@BEGIN@@(.*?)@@END@@</pre>', "Singleline")
if (-not $m.Success) { throw "Ders metni çıkarılamadı. Tarayıcı çıktısı: $tmpOut" }
$data = [Net.WebUtility]::HtmlDecode($m.Groups[1].Value) | ConvertFrom-Json

$key = $env:ELEVENLABS_API_KEY
if (-not $DryRun -and -not $key) { throw "ELEVENLABS_API_KEY ortam değişkeni tanımlı değil." }
if (-not (Test-Path $outDir)) { New-Item -ItemType Directory -Force $outDir | Out-Null }

$sha = [Security.Cryptography.SHA256]::Create()

foreach ($id in $Ids) {
  $items = $data.$id
  if (-not $items) { throw "$id : metin yok" }
  if ($items -isnot [array] -and $items.PSObject.Properties.Name -contains "error") { throw "$id : $($items.error)" }
  $items = @($items)

  # ---------- 2. Seslendirilecek metni kur ----------
  # Cümleler arası boşluk, öğeler (başlık, paragraf, madde) arası satır sonu.
  # Noktalama ile bitmeyen cümleye (ör. başlık) nokta eklenir; böylece ses orada durur.
  $sb = New-Object System.Text.StringBuilder
  $spans = New-Object System.Collections.ArrayList
  $prevG = $null
  foreach ($it in $items) {
    if ($sb.Length -gt 0) {
      if ($it.g -ne $prevG) { [void]$sb.Append("`n") } else { [void]$sb.Append(" ") }
    }
    $t = Convert-Speech ([string]$it.t)
    if ($Show -and $t -ne [string]$it.t) { Write-Host ("  {0}`n    → {1}" -f $it.t, $t) }
    if ($t -notmatch '[.!?…:]$') { $t += "." }
    $start = $sb.Length
    [void]$sb.Append($t)
    [void]$spans.Add(@($start, $sb.Length))
    $prevG = $it.g
  }
  $text = $sb.ToString()

  $sig = $text + "|" + $VoiceId + "|" + $ModelId + "|" + $OutputFormat + "|" + ($settings | ConvertTo-Json -Compress)
  $hash = -join ($sha.ComputeHash($utf8.GetBytes($sig)) | ForEach-Object { $_.ToString("x2") })

  $jsPath = Join-Path $outDir "$id.js"
  $mp3Path = Join-Path $outDir "$id.mp3"
  Write-Host ("{0}: {1} cümle, {2} karakter" -f $id, $items.Count, $text.Length)

  if ($DryRun) { continue }
  if (-not $Force -and (Test-Path $jsPath) -and (Test-Path $mp3Path) -and
      ([IO.File]::ReadAllText($jsPath, $utf8)).Contains("`"hash`":`"$hash`"")) {
    Write-Host "  değişiklik yok, atlandı"
    continue
  }
  if ($text.Length -gt $maxChars) { throw "$id : metin $maxChars karakterden uzun; parçalama henüz yok." }

  # ---------- 3. ElevenLabs isteği ----------
  $body = [ordered]@{ text = $text; model_id = $ModelId; voice_settings = $settings } | ConvertTo-Json -Depth 4
  $uri = "https://api.elevenlabs.io/v1/text-to-speech/$VoiceId/with-timestamps?output_format=$OutputFormat"
  try {
    $resp = Invoke-RestMethod -Method Post -Uri $uri -Headers @{ "xi-api-key" = $key } `
      -ContentType "application/json; charset=utf-8" -Body ($utf8.GetBytes($body))
  } catch {
    $detail = if ($_.ErrorDetails) { $_.ErrorDetails.Message } else { "" }
    throw "$id : ElevenLabs hatası: $($_.Exception.Message) $detail"
  }

  # ---------- 4. Cümle zamanlamaları ----------
  $al = $resp.alignment
  $starts = @($al.character_start_times_seconds)
  $ends = @($al.character_end_times_seconds)
  if ($starts.Count -ne $text.Length) {
    throw "$id : zamanlama uzunluğu ($($starts.Count)) metinle ($($text.Length)) uyuşmuyor."
  }
  $out = New-Object System.Collections.ArrayList
  for ($i = 0; $i -lt $items.Count; $i++) {
    $a = $spans[$i][0]; $b = $spans[$i][1] - 1
    [void]$out.Add([ordered]@{ t = [string]$items[$i].t; s = [math]::Round([double]$starts[$a], 3); e = [math]::Round([double]$ends[$b], 3) })
  }

  [IO.File]::WriteAllBytes($mp3Path, [Convert]::FromBase64String($resp.audio_base64))
  $json = [ordered]@{
    hash = $hash; voice = $VoiceId; model = $ModelId; format = $OutputFormat
    audio = "$id.mp3"; sentences = $out.ToArray()
  } | ConvertTo-Json -Depth 5 -Compress
  $js = "/* scripts/seslendir.ps1 tarafından üretildi; elle düzenleme. */`n" +
        "window.ORVENA_AUDIO = window.ORVENA_AUDIO || {};`n" +
        "window.ORVENA_AUDIO[`"$id`"] = $json;`n"
  [IO.File]::WriteAllText($jsPath, $js, $utf8)

  $kb = [math]::Round((Get-Item $mp3Path).Length / 1KB)
  $dur = [math]::Round([double]$ends[-1])
  Write-Host ("  kaydedildi: {0}.mp3 ({1} KB, ~{2} sn)" -f $id, $kb, $dur)
}
