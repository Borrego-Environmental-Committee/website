import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: process.env.SITE_URL || 'http://localhost:4321',
  base: process.env.SITE_BASE || '/',
  trailingSlash: 'always',
  integrations: [
    sitemap({ filter: (page) => !page.includes('/email-preview/') }),
  ],
  outDir: process.env.EMAIL_PREVIEW === '1' ? './.email-preview' : './dist',
});
