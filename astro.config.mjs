// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // site: 'https://USERNAME.github.io', // set before deploy; add base: '/repo' unless repo is USERNAME.github.io
  vite: {
    plugins: [tailwindcss()]
  }
});