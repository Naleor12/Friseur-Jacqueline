# Friseur-Jacqueline

Webseite für den Friseursalon **Jacqueline Dickhaus** (Kamp-Lintfort) im Warm-Editorial-Boutique-Design.
Statische Seite, gebaut mit **Astro** + **Tailwind CSS**, Preis-Menü als kleine **React**-Insel. Schriften (*Cormorant Garamond* & *Plus Jakarta Sans*) über **Bunny Fonts** (DSGVO-konform, EU-Server).

Live: https://friseur-jacqueline-dickhaus.de

## Lokale Entwicklung

```powershell
npm install
npm run dev        # Dev-Server (http://127.0.0.1:8080)
npm run build      # Produktions-Build nach dist/
npm run preview    # Gebauten Build lokal ansehen
npm run deploy     # Build + dist-Bereinigung + Strato-Upload
```

> Hinweis (OneDrive): Falls hängende `astro dev`-Prozesse den Build blockieren,
> Node-Prozesse beenden (`Stop-Process -Name node -Force`) und neu bauen.

## Struktur

- `src/data/salon.ts` – Zentrale Stammdaten (Adresse, Telefon, E-Mail, Öffnungszeiten, Google-Profil)
- `src/data/services.json` – Leistungen & Preise (Damen, Herren, Kinder)
- `src/components/` – Seiten-Bausteine (`Navbar`, `Hero`, `About`, `Leistungen`, `ServicesMenu`, `Team`, `Galerie`, `Reviews`, `Faq`, `Kontakt`, `Footer`, `CookieBanner`)
- `src/layouts/BaseLayout.astro` – `<head>`, Meta/SEO, JSON-LD (`HairSalon` + `AggregateRating`)
- `src/pages/` – `index.astro`, `Impressum.astro`, `Datenschutz.astro`
- `public/images/*-opt.webp` & `public/jacqueline_1.JPG` – Web-optimierte Bilder

## Deployment (Strato-Webspace)

Zugang per SSH-Key, Alias `strato` ist in `~/.ssh/config` hinterlegt
(`su483349@…ssh.w2.strato.hosting`). Web-Root auf dem Server: **`/home/www/public`**.
Der Ordner **`Back`** dort ist ein Backup und wird beim Deploy **immer ausgeschlossen**.

Ein-Befehl-Deployment über [deploy.ps1](deploy.ps1):

```powershell
npm run deploy
```

Das Skript baut nach `dist/`, entfernt ungenutzte Altmedien ausschließlich aus `dist/` (nicht aus `public/`), lädt per `tar` nach `/home/www/public_new`, tauscht serverseitig mit `rsync -a --delete --exclude=Back` nach `/home/www/public/` und prüft abschließend den HTTP-Status.
