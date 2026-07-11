import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import netlify from '@astrojs/netlify';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://parawongling.netlify.app', // Temporary Netlify site URL for sitemap.xml
  adapter: netlify(),
  integrations: [react(), mdx(), keystatic(), sitemap()]
});