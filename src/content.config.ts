import { defineCollection, z } from "astro:content";

const stringOrArray = z.union([z.string(), z.array(z.string())]);

const cases = defineCollection({
  type: "content",
  schema: z.object({
    title: z.string(),
    cover: z.string().optional(),
    banner_image: z.string().optional(),
    gallery: z.array(z.string()).optional(),
    gallery_styles: z.array(z.string().nullable()).optional(),
    year: z.number(),
    tags: z.array(z.string()),
    star_summary: z.string(),
    contexte: stringOrArray,
    probleme: stringOrArray,
    hypothese: stringOrArray,
    solution: stringOrArray,
    methodologie: stringOrArray,
    livrables: stringOrArray.optional(),
    resultat: stringOrArray,
    challenges: z.array(z.string()),
    variant: z.enum(['default', 'secondary']).optional().default('default'),
    external_url: z.string().optional(),
    featured: z.boolean().optional().default(false),
  }),
});

const pillar = z.object({ label: z.string(), title: z.string(), desc: z.string(), back_title: z.string().optional(), back_href: z.string().optional() });
const service = z.object({ number: z.string(), title: z.string(), desc: z.string(), count: z.number() });
const sideProject = z.object({ title: z.string(), href: z.string(), year: z.number() });

const home = defineCollection({
  type: "content",
  schema: z.object({
    // Hero
    hero_label: z.string(),
    hero_headline: z.string(),
    hero_pillars: z.array(pillar),
    // Services
    services_label: z.string(),
    services_title: z.string(),
    services: z.array(service),
    // Side Projects
    side_projects_label: z.string(),
    side_projects_title: z.string(),
    side_projects: z.array(sideProject),
    // Venn
    venn_label: z.string(),
    venn_title: z.string(),
    venn_circles: z.array(z.string()),
    venn_center: z.string(),
    venn_caption: z.string(),
    // Tools Banner
    tools: z.array(z.string()),
    clients: z.array(z.string()),
  }),
});

export const collections = { cases, home };
