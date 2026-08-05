import { defineConfig } from 'astro/config';

// Static site output — the host (Cloudflare) serves the generated `dist/` folder.
// Content is fetched from Sanity at build time.
export default defineConfig({
  site: 'https://epg-cranfield-website.aditya-nair2-817.workers.dev',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
