import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';
import { getSecret } from 'astro:env/server';

const beehiivAPIKey = getSecret('BEEHIIV_API_KEY');

const blog = defineCollection({
  // Load Markdown and MDX files in the `src/content/blog/` directory.
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  // Type-check frontmatter using a schema
  schema: z.object({
    description: z.string(),
    heroImage: z.string().optional(),
    heroImageAltText: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    title: z.string(),
    updatedDate: z.coerce.date().optional(),
  }),
});

const newsletters = defineCollection({
  loader: async () => {
    if (!beehiivAPIKey) {
      throw new Error('BEEHIIIVE_API_KEY is not defined');
    }
    const response = await fetch(beehiivAPIKey);
    const data = await response.json();
    // Transform the data to match the required format
    return data.map((newsletter: any) => ({
      id: newsletter.id, // Ensure each entry has a unique id
      ...newsletter,
    }));
  },
  schema: z.object({
    description: z.string(),
    heroImage: z.string().optional(),
    heroImageAltText: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    title: z.string(),
  }),
});

const projects: ReturnType<typeof defineCollection> = defineCollection({
  loader: glob({ base: './src/content/projects', pattern: '**/*.{md,mdx}' }),
  schema: z.object({
    description: z.string(),
    heroImage: z.string().optional(),
    heroImageAltText: z.string().optional(),
    pubDate: z.coerce.date().optional(),
    tags: z.array(z.string()).optional(),
    title: z.string(),
    updatedDate: z.coerce.date().optional(),
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

export const collections = { blog, projects, newsletters, speaking };
