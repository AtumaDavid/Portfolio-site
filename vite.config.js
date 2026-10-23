// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
// })

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// Public site address for link previews and SEO tags in index.html.
// Set SITE_URL (e.g. https://atumadavid.com) when building; Netlify and
// Vercel production builds are picked up automatically. Without one, the
// tags fall back to relative paths.
const siteUrl = (
  process.env.SITE_URL ||
  (process.env.CONTEXT === 'production' && process.env.URL) ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL && `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`) ||
  ''
).replace(/\/$/, '');

const siteUrlPlugin = {
  name: 'site-url',
  // 'pre' so the placeholders are filled before Vite parses the HTML's URLs.
  transformIndexHtml: { order: 'pre', handler: (html) => html.replaceAll('%SITE_URL%', siteUrl) },
};

export default defineConfig({
  plugins: [react(), siteUrlPlugin],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
