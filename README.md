# Friseur-Jacqueline

Webseite für den Friseursalon **Jacqueline Dickhaus** (Kamp-Lintfort).
Statische Seite, gebaut mit **Astro** + **Tailwind CSS**, einzelne interaktive Inseln in **React** (Navbar, Leistungen-Tabs). Schriften über **Bunny Fonts** (DSGVO-konform, EU-Server).

Live: https://friseur-jacqueline-dickhaus.de

## Lokale Entwicklung

```bash
npm install
npm run dev        # Dev-Server (http://localhost:8080 bzw. nächster freier Port)
npm run build      # Produktions-Build nach dist/
npm run preview    # gebauten Build lokal ansehen
```

> Hinweis (OneDrive): Liegt das Projekt in einem OneDrive-Ordner, können hängende
> `astro dev`-Prozesse den Build blockieren ("file is being used by another process"
> oder der Build hängt am Start). Dann alle Node-Prozesse beenden und neu bauen:
> `Get-CimInstance Win32_Process -Filter "name='node.exe'"` → `Stop-Process -Id <ids> -Force`.

## Struktur

- `src/components/` – Seiten-Bausteine (Hero, About, Leistungen, Galerie, Kontakt, Footer, Navbar)
- `src/layouts/BaseLayout.astro` – `<head>`, Meta/SEO, JSON-LD, globale Skripte/CSS
- `src/pages/` – `index.astro`, `Impressum`, `Datenschutz`, `admin` (interne Preisverwaltung, `noindex`)
- `public/` – statische Assets (Bilder, `robots.txt`); alles hier wird 1:1 nach `dist/` kopiert
- `public/images/` – die auf der Seite genutzten Bilder

Bilder für die Web-Auslieferung verkleinert halten (Kamera-Originale sind mehrere MB;
Web-Versionen ~200–300 KB). Ungenutzte Medien in `public/` blähen den Upload auf.

## Deployment (Strato-Webspace)

Zugang per SSH-Key, Alias `strato` ist in `~/.ssh/config` hinterlegt
(`su483349@…ssh.w2.strato.hosting`). Web-Root auf dem Server: **`/home/www/public`**.
Der Ordner **`Back`** dort ist ein Backup und wird beim Deploy **immer ausgeschlossen**.

Lokal ist kein `rsync` vorhanden, auf Strato schon → Upload per tar, Austausch serverseitig:

```bash
# 1. Bauen
npm run build

# 2. dist/ von ungenutzten Altmedien befreien (nur dist, nicht public!)
cd dist
rm -f brown.mp4 brown2.mp4 blond.mp4 evelina.JPG guelnar.JPG "73 - QM6A1591.JPG" scissors-bg.png
rm -rf stock

# 3. In Temp-Ordner auf den Server laden
ssh strato 'rm -rf /home/www/public_new && mkdir -p /home/www/public_new'
tar czf - . | ssh strato 'tar xzf - -C /home/www/public_new'

# 4. Serverseitig sauber austauschen (Back bleibt erhalten), dann Temp entfernen
ssh strato 'rsync -a --delete --exclude=Back /home/www/public_new/ /home/www/public/ && rm -rf /home/www/public_new'
```

Kontrolle: `curl -I https://friseur-jacqueline-dickhaus.de/` → 200.

## Hinweise

- **Kontakt/Buchung:** Terminvereinbarung ausschließlich **telefonisch** (02842 1219526).
  Online-Buchung (SumUp) wurde bewusst entfernt – nicht wieder einbauen ohne Rücksprache.
- **SEO:** `site`-URL in `astro.config.mjs`; Sitemap + `robots.txt` werden erzeugt;
  Google-Unternehmensprofil ist in den strukturierten Daten (`sameAs`) verlinkt.
