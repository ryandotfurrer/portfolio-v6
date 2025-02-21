import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: z.object({
    description: z.string(),
    heroImage: z.string().optional(),
    heroImageAltText: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    slug: z.string().optional(),
    tags: z.array(z.string()).optional(),
    title: z.string(),
    updatedDate: z.coerce.date().optional(),
  }),
});

const projects: ReturnType<typeof defineCollection> = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string(),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    heroImageAltText: z.string().optional(),
    tags: z.array(z.string()).optional(),
    links: z
      .object({
        github: z.string().optional(),
        site: z.string().optional(),
      })
      .optional(),
  }),
});

const speaking = defineCollection({
  loader: glob({ base: './src/content/speaking', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    title: z.string(),
    slug: z.string().optional(),
    description: z.string(),
    pubDate: z.coerce.date().optional(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
    heroImageAltText: z.string().optional(),
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { blog, projects, speaking };
