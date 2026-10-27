import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Static site output — the host (Cloudflare) serves the generated `dist/` folder.
// Content is fetched from Sanity at build time.
export default defineConfig({
  site: 'https://www.maple-research.uk',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
  // Generates /sitemap-index.xml listing every page at its official address
  // (https://www… with a trailing slash), for Google Search Console.
  integrations: [sitemap()],
});
