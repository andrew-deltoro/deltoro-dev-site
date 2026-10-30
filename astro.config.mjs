// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://deltoro.dev',
  trailingSlash: 'ignore',
  integrations: [sitemap({ filter: (page) => !page.includes('/thanks') && !page.includes('/card') })],
  build: { inlineStylesheets: 'auto' },
  compressHTML: true,
});