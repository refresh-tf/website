import { defineContentConfig, defineCollection, z } from "@nuxt/content";

export default defineContentConfig({
  collections: {
    meta: defineCollection({
      type: "data",
      source: "*.json",
      schema: z.object({
        maps: z.array(z.string()),
        credits: z.record(
          z.object({
            avatar: z.string(),
            name: z.string(),
            role: z.string(),
          }),
        ),
      }),
    }),
    maps: defineCollection({
      type: "data",
      source: "maps/*.json",
      schema: z.object({
        prefix: z.string(),
        name: z.string(),
        thumbnail: z.string(),
        description: z.string(),

        tf2mLink: z.string().url().nullable(),
        tftvLink: z.string().url().nullable(),
        workshopLink: z.string().url().nullable(),
        albumLink: z.string().url().nullable(),
        githubLink: z.string().url().nullable(),

        originalAuthors: z
          .array(
            z.object({
              comment: z.string(),
              link: z.string().url(),
            }),
          )
          .optional(),

        refreshAuthors: z.array(z.string()),
        comparisons: z.array(
          z.object({
            name: z.string(),
            version: z.string(),
            title: z.string(),
          }),
        ),
        versions: z.array(
          z.object({
            suffix: z.string(),
            download: z.string().url(),
            date: z.string(),
            changes: z.array(
              z.object({
                type: z.string(),
                message: z.string(),
              }),
            ),
          }),
        ),
      }),
    }),
  },
});
