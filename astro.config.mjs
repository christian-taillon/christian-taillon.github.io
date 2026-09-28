import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://christiant.io',
  output: 'static',
  integrations: [react(), sitemap({ changefreq: 'monthly', priority: 0.7 })],
  vite: { plugins: [tailwindcss()] },
});
