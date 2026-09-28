import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z
    .object({
      title: z.string(),
      description: z.string().optional(),
      permalink: z.string().optional(),
      image: z.string().optional(),
      sitemap: z.union([z.boolean(), z.string()]).optional(),
    })
    .passthrough(),
});

export const collections = { pages };
