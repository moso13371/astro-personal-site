import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const posts = defineCollection({
  loader: glob({ pattern: '**/[^_]*.{md,mdx}', base: "./src/content/posts" }),
  schema: z.object({
    title: z.string(),
    publishDate: z.coerce.date(),
    isDraft: z.boolean().default(false),
    summary: z.string(),
    tags: z.array(z.string()).default([]),
    heroImage: z.string().optional()
  })
});

export const collections = { posts };
