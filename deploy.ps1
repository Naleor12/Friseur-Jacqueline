$ErrorActionPreference = "Stop"

Write-Host "1/4 Baue Produktions-Build..." -ForegroundColor Cyan
$env:ASTRO_TELEMETRY_DISABLED = "1"
npm run build
if ($LASTEXITCODE -ne 0) { throw "Build fehlgeschlagen." }

Write-Host "2/4 Entferne ungenutzte Altmedien aus dist/..." -ForegroundColor Cyan
$prunePaths = @(
  "dist\brown.mp4",
  "dist\brown2.mp4",
  "dist\blond.mp4",
  "dist\evelina.JPG",
  "dist\guelnar.JPG",
  "dist\73 - QM6A1591.JPG",
  "dist\scissors-bg.png",
  "dist\2.jpg",
  "dist\2bw.jpg",
  "dist\jacqueline.JPG",
  "dist\JD_Logo_dark_RGB.jpg",
  "dist\JD_Logo_dark_RGB.svg",
  "dist\JD_Logo_light_RGB.jpg",
  "dist\JD_Logo_light_RGB.svg",
  "dist\stock",
  "dist\images\2bw.jpg",
  "dist\images\blond.jpg",
  "dist\images\braut.jpg",
  "dist\images\coloration.JPG",
  "dist\images\coloration-beispiel.JPG",
  "dist\images\favicon.svg",
  "dist\images\ghairb.jpg",
  "dist\images\JD_Logo_dark_RGB.jpg",
  "dist\images\laden1.JPG",
  "dist\images\laden2.JPG",
  "dist\images\laden3.JPG",
  "dist\images\ladenbw.JPG",
  "dist\images\TeamArbeit.jpg",
  "dist\images\jacqueline-opt.webp"
)

foreach ($path in $prunePaths) {
  if (Test-Path $path) {
    Remove-Item $path -Recurse -Force
  }
}

Write-Host "3/4 Lade bereinigtes dist/ auf Strato hoch (Back bleibt unberuehrt)..." -ForegroundColor Cyan
ssh strato "rm -rf /home/www/public_new && mkdir -p /home/www/public_new"
if ($LASTEXITCODE -ne 0) { throw "SSH-Verbindung zu strato fehlgeschlagen." }

# Windows tar -> stdout -> ssh strato
cmd /c "tar -C dist -czf - . | ssh strato `"tar xzf - -C /home/www/public_new`""
if ($LASTEXITCODE -ne 0) { throw "Upload nach /home/www/public_new fehlgeschlagen." }

ssh strato "rsync -a --delete --exclude=Back /home/www/public_new/ /home/www/public/ && rm -rf /home/www/public_new"
if ($LASTEXITCODE -ne 0) { throw "Serverseitiger rsync-Tausch fehlgeschlagen." }

Write-Host "4/4 Pruefe Live-Erreichbarkeit..." -ForegroundColor Cyan
curl.exe -sI https://friseur-jacqueline-dickhaus.de/ | Select-Object -First 5
Write-Host "Deployment erfolgreich abgeschlossen!" -ForegroundColor Green
