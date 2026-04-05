import { glob } from "astro/loaders";
import { z } from "astro/zod";
import { defineCollection } from "astro:content";

const blog = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/blog" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    author: z.string().default("Threadzip Team"),
    tags: z.array(z.string()).default([]),
    cover: z.string().optional(),
    featured: z.boolean().default(false),
  }),
});

const legal = defineCollection({
  loader: glob({ pattern: "**/[^_]*.{md,mdx}", base: "./src/content/legal" }),
  schema: z.object({
    title: z.string(),
    effectiveDate: z.string(),
  }),
});

export const collections = { blog, legal };
