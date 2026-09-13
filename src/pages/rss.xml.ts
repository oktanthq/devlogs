import rss from "@astrojs/rss";
import type { APIContext } from "astro";
import { getCollection } from "astro:content";

export async function GET(context: APIContext) {
  const posts = (
    await getCollection("devlogs", ({ data }) => data.status === "published")
  ).sort((a, b) => b.data.date.getTime() - a.data.date.getTime());

  return rss({
    title: "Oktant Devlogs",
    description:
      "Weekly development logs from the Oktant engineering team: the roadmap, the decisions, and what is being built.",
    site: context.site ?? new URL("https://dev.oktant.tech"),
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/devlogs/${post.id}/`,
      categories: [post.data.milestone, post.data.author, ...post.data.tags],
    })),
    customData: `<language>en-us</language>`,
  });
}