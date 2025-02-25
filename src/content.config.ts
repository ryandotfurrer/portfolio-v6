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
    try {
      const response = await fetch(
        `https://api.beehiiv.com/v2/publications/${import.meta.env.BEEHIIV_PUBLICATION_ID}/posts`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.BEEHIIV_API_KEY}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        console.error('Failed to fetch newsletters:', response.statusText);
        return [];
      }

      const data = await response.json();

      if (!data.data || data.data.length === 0) {
        console.warn('No newsletters data found');
        return [];
      }

      return data.data.map((post: any) => ({
        id: post.id,
        title: post.title,
        description: post.subtitle,
        pubDate: new Date(post.publish_date * 1000), // Convert timestamp to Date
        heroImage: post.thumbnail_url,
        tags: post.content_tags,
        webURL: post.web_url,
      }));
    } catch (error) {
      console.error('Error fetching newsletters:', error);
      return [];
    }
  },
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    webURL: z.string(),
  }),
});

const archivedBlog = defineCollection({
  loader: async () => {
    try {
      const response = await fetch(`https://api-us.storyblok.com/v2/cdn`, {
        headers: {
          Authorization: `Bearer ${import.meta.env.BEEHIIV_API_KEY}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        console.error(
          'Failed to fetch blog posts from storyblok:',
          response.statusText,
        );
        return [];
      }

      const data = await response.json();
      console.log('Fetched storybook blog posts data:', data);

      if (!data.data || data.data.length === 0) {
        console.warn('No newsletters data found');
        return [];
      }

      return data.data.map((post: any) => ({
        id: post.id,
        title: post.title,
        description: post.subtitle,
        pubDate: new Date(post.publish_date * 1000), // Convert timestamp to Date
        heroImage: post.thumbnail_url,
        tags: post.content_tags,
        webURL: post.web_url,
      }));
    } catch (error) {
      console.error('Error fetching newsletters:', error);
      return [];
    }
  },
  schema: z.object({
    id: z.string(),
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    heroImage: z.string().optional(),
    tags: z.array(z.string()).optional(),
    webURL: z.string(),
  }),
});

const projects = defineCollection({
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
