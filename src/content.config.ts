import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    kicker: z.string(),
    summary: z.string(),
    category: z.enum(['Security', 'AI', 'Web', 'Automation', 'Experiment']),
    year: z.string(),
    status: z.enum(['Live', 'In development', 'Archived', 'Proof of concept', 'Concept build', 'Concept case study']),
    role: z.string(),
    timeline: z.string(),
    client: z.string().optional(),
    stack: z.array(z.string()),
    liveUrl: z.url().optional(),
    repoUrl: z.url().optional(),
    cover: z.string(),
    coverAlt: z.string(),
    gallery: z.array(z.object({ src: z.string(), alt: z.string(), caption: z.string().optional() })).default([]),
    featured: z.boolean().default(false),
    order: z.number(),
    service: z.string().optional(),
    disclaimer: z.string().optional(),
    prove: z.array(z.string()).default([]),
  }),
});

export const collections = { projects };
