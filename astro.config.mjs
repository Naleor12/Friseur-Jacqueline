import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://friseur-jacqueline-dickhaus.de',
  integrations: [
    tailwind(),
    sitemap({
      filter: (page) =>
        !page.includes('/404') &&
        !page.includes('/Impressum') &&
        !page.includes('/Datenschutz'),
    }),
  ],
  server: {
    port: 8080,
    host: '127.0.0.1',
  },
});
