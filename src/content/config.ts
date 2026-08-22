import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    category: z.enum(['web', 'mobile', 'saas', 'python']),
    image: z.string(),
    liveUrl: z.string().optional(),
    downloadUrl: z.string().optional(),
    featured: z.boolean().default(false),
    order: z.number(),
  }),
});

export const collections = {
  projects: projectsCollection,
};
