// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // User site (repo is mmvillanueva.github.io), so no `base` is needed.
  site: 'https://mmvillanueva.github.io',
  vite: {
    plugins: [tailwindcss()]
  }
});