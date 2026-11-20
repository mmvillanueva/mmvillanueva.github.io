// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  // User site (repo is mmvillanueva.github.io), so no `base` is needed.
  site: 'https://mmvillanueva.github.io',
  // Astro's Fonts API: preloads the font files and generates a size-matched fallback font,
  // so there is no visible font swap or layout jump while the real fonts load.
  // Files come from the already-installed @fontsource packages (no network needed at build).
  fonts: [
    {
      provider: fontProviders.local(),
      name: 'Instrument Serif',
      cssVariable: '--font-instrument-serif',
      fallbacks: ['Georgia', 'serif'],
      options: {
        variants: [
          { weight: 400, style: 'normal', src: ['@fontsource/instrument-serif/files/instrument-serif-latin-400-normal.woff2'],
            unicodeRange: ['U+0000-00FF', 'U+0131', 'U+0152-0153', 'U+02BB-02BC', 'U+02C6', 'U+02DA', 'U+02DC', 'U+0304', 'U+0308', 'U+0329', 'U+2000-206F', 'U+20AC', 'U+2122', 'U+2191', 'U+2193', 'U+2212', 'U+2215', 'U+FEFF', 'U+FFFD'] },
          // latin-ext carries the peso sign (₱)
          { weight: 400, style: 'normal', src: ['@fontsource/instrument-serif/files/instrument-serif-latin-ext-400-normal.woff2'],
            unicodeRange: ['U+0100-02BA', 'U+02BD-02C5', 'U+02C7-02CC', 'U+02CE-02D7', 'U+02DD-02FF', 'U+0304', 'U+0308', 'U+0329', 'U+1D00-1DBF', 'U+1E00-1E9F', 'U+1EF2-1EFF', 'U+2020', 'U+20A0-20AB', 'U+20AD-20C0', 'U+2113', 'U+2C60-2C7F', 'U+A720-A7FF'] },
        ],
      },
    },
    {
      provider: fontProviders.local(),
      name: 'IBM Plex Mono',
      cssVariable: '--font-ibm-plex-mono',
      fallbacks: ['ui-monospace', 'monospace'],
      options: {
        variants: [
          { weight: 400, style: 'normal', src: ['@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-400-normal.woff2'],
            unicodeRange: ['U+0000-00FF', 'U+0131', 'U+0152-0153', 'U+02BB-02BC', 'U+02C6', 'U+02DA', 'U+02DC', 'U+0304', 'U+0308', 'U+0329', 'U+2000-206F', 'U+20AC', 'U+2122', 'U+2191', 'U+2193', 'U+2212', 'U+2215', 'U+FEFF', 'U+FFFD'] },
        ],
      },
    },
  ],
  vite: {
    plugins: [tailwindcss()]
  }
});