import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const pageSchema = z
  .object({
    title: z.string(),
    description: z.string().optional(),
    permalink: z.string().optional(),
    image: z.string().optional(),
  })
  .passthrough();

const guides = defineCollection({
  loader: glob({
    pattern: 'docs/**/*.{md,markdown}',
    base: '.',
  }),
  schema: pageSchema,
});

const rootGuides = defineCollection({
  loader: glob({
    pattern: '*.{md,markdown}',
    base: '.',
  }),
  schema: pageSchema,
});

const briefs = defineCollection({
  loader: glob({
    pattern: '_briefs/**/*.{md,markdown}',
    base: '.',
  }),
  schema: z
    .object({
      title: z.string(),
      description: z.string().optional(),
      date: z.coerce.date(),
    })
    .passthrough(),
});

export const collections = { guides, rootGuides, briefs };
