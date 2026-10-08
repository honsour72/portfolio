import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  output: 'static',
  site: 'https://m-rogozin.ru',
  trailingSlash: 'always',
  devToolbar: { enabled: false },
  integrations: [sitemap()],
});
