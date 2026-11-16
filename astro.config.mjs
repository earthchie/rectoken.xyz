import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://rectoken.xyz',
  i18n: {
    locales: ['en', 'th'],
    defaultLocale: 'th',
    routing: {
      prefixDefaultLocale: true,
      redirectToDefaultLocale: false,
    },
  },
  redirects: {
    '/': '/th/',
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'th',
        locales: { en: 'en-US', th: 'th-TH' },
      },
      filter: (page) => !page.includes('/404') && !page.includes('/search'),
    }),
  ],
  build: {
    format: 'directory',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
