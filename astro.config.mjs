// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { SITE } from './src/config/site.ts';

export default defineConfig({
  site: SITE.url,
  output: 'static',
  trailingSlash: 'never',
  compressHTML: true,
  build: {
    format: 'file',
    inlineStylesheets: 'always',
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date(),
      filter: (page) => !page.includes('/404') && !page.includes('/og/'),
      serialize(item) {
        const u = new URL(item.url);
        const p = u.pathname.replace(/\/$/, '') || '/';
        if (p === '/') { item.priority = 1.0; item.changefreq = 'weekly'; }
        else if (p.startsWith('/track/') || p.startsWith('/peptide-calculator')) { item.priority = 0.9; }
        else if (p.startsWith('/compare') || p === '/best-peptide-tracker-apps') { item.priority = 0.8; }
        else if (p.startsWith('/guides')) { item.priority = 0.7; item.changefreq = 'monthly'; }
        else if (['/privacy', '/terms'].includes(p)) { item.priority = 0.2; item.changefreq = 'yearly'; }
        return item;
      },
    }),
  ],
  image: { service: { entrypoint: 'astro/assets/services/sharp' } },
});
