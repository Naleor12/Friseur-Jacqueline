import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://friseur-jacqueline-dickhaus.de',
  integrations: [
    tailwind(),
    react(),
    sitemap({
      // Nur echte Inhaltsseiten in die Sitemap; Admin & Rechtsseiten raus
      filter: (page) =>
        !page.includes('/admin') &&
        !page.includes('/Impressum') &&
        !page.includes('/Datenschutz'),
    }),
  ],
  server: {
    port: 8080,          // Sicherer Port, vermeidet Konflikte
    host: '127.0.0.1'   // Bindet an IPv4, umgeht IPv6 (::1)
  }
});
