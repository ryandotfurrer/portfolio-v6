import { glob } from 'astro/loaders';
import { defineCollection, z } from 'astro:content';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
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
    const response = await fetch(
      'https://api.beehiiv.com/v2/publications/pub_f7c08d84-11c7-4475-99c7-a10f84a965bd/posts',
      {
        headers: {
          Authorization: `Bearer ${import.meta.env.BEEHIIV_API_KEY}`,
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();

    return data.data.map((post: any) => ({
      id: post.id,
      slug: post.slug,
      title: post.title,
      subtitle: post.subtitle,
      pubDate: new Date(post.publish_date * 1000), // Convert timestamp to Date
      thumbnailUrl: post.thumbnail_url,
      contentTags: post.content_tags,
      // content: post.content.free.web,
      // Add other fields as needed
    }));
  },
  schema: z.object({
    id: z.string(),
    slug: z.string(),
    title: z.string(),
    subtitle: z.string().optional(),
    pubDate: z.date(),
    thumbnailUrl: z.string().optional(),
    contentTags: z.array(z.string()).optional(),
    // content: z.string(),
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
