import { getCollection } from "astro:content";
import type { CollectionEntry } from "astro:content";

/** All published devlogs, newest first. */
export async function getPublishedDevlogs(): Promise<CollectionEntry<"devlogs">[]> {
  const entries = await getCollection("devlogs", ({ data }) => data.status === "published");
  return entries.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}