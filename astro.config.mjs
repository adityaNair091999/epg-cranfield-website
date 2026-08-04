import { defineConfig } from 'astro/config';

// Static site output — Netlify serves the generated `dist/` folder.
// If/when you connect a live Sanity project, content is fetched at build time.
export default defineConfig({
  site: 'https://energy-power-group.netlify.app',
  output: 'static',
  trailingSlash: 'ignore',
  build: {
    format: 'directory',
  },
});
