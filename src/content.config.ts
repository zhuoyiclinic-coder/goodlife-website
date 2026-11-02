// 知識庫文章：src/content/learn/*.md（frontmatter 欄位見下方 schema）
import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const learn = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/learn' }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    link: z.string(),
    updated: z.union([z.string(), z.date()]).transform((d) => (typeof d === 'string' ? d : d.toISOString().slice(0, 10))),
    sources: z.array(z.string()).default([]),
  }),
});

export const collections = { learn };
