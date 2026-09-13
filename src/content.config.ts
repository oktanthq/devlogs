import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { glob } from "astro/loaders";

function slugFromPath(entry: string): string {
  return entry
    .replace(/\\/g, "/")
    .replace(/\.(md|mdx)$/, "")
    .split("/")
    .filter(Boolean)
    .join("-");
}

const devlogs = defineCollection({
  loader: glob({
    base: "./src/content/devlogs",
    pattern: "**/*.{md,mdx}",
    generateId: ({ entry }) => slugFromPath(entry),
  }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    author: z.enum(["abdullah", "harris", "moiz"]),
    week: z.number().int().min(1).max(53),
    milestone: z.string().regex(/^M[0-9]+$/i),
    status: z.enum(["draft", "published"]).default("published"),
    tags: z.array(z.string()).default([]),
  }),
});

export const collections = { devlogs };