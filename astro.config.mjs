// @ts-check
import { defineConfig, envField } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwindcss from '@tailwindcss/vite';

import vercel from '@astrojs/vercel';

import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  experimental: {
    contentIntellisense: true,
  },
  site: 'https://ryanfurrer.com',
  integrations: [mdx(), sitemap(), react()],
  vite: {
    plugins: [tailwindcss()],
  },
  adapter: vercel(),
  // env: {
  //   schema: {
  //     BEEHIIV_API_KEY_SECRET: envField.string({
  //       context: 'server',
  //       access: 'secret',
  //     }),
  //   },
  // },
});
