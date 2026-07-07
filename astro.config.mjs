import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';
import vercel from '@astrojs/vercel';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://astro-personal-site.vercel.app', // ⚠️ 請在此處更換成您正確的線上網址，以便產生精準的 sitemap.xml
  adapter: vercel(),
  integrations: [react(), mdx(), keystatic(), sitemap()]
});