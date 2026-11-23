import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const news = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/news' }),
  schema: z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    category: z.string().min(1),
    published: z.iso.date().optional(),
    sample: z.boolean().default(false),
    draft: z.boolean().default(false),
    email: z.boolean().default(false),
    image: z.object({
      path: z.string().regex(/^images\/[a-z0-9][a-z0-9-]*\.(jpg|jpeg|webp|png)$/),
      alt: z.string().min(1),
    }),
    meetingStartsAt: z.iso.datetime({ offset: true }).optional(),
    related: z.array(z.string()).default([]),
  }).refine((entry) => entry.sample || Boolean(entry.published), {
    path: ['published'],
    message: 'Announcements need a publication date. Clearly labeled samples may omit it.',
  }),
});

export const collections = { news };
