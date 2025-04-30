// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';
import vercel from '@astrojs/vercel';

// https://astro.build/config
export default defineConfig({
  experimental: {
    contentIntellisense: true,
  },
  site: 'https://ryanfurrer.com',
  integrations: [
    mdx({
      syntaxHighlight: 'shiki',
      shikiConfig: { theme: 'min-light' },
    }),
    react(),
    sitemap(),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel(),
});
