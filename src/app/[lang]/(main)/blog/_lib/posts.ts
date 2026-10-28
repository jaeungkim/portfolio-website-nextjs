import { cacheLife } from "next/cache";
import matter from "gray-matter";
import {
  extractImageUrls,
  listPostSlugs,
  readPostSource,
} from "@/app/[lang]/(main)/blog/_lib/post-files";
import placeholders from "@/app/[lang]/(main)/blog/_data/placeholders.json";

const placeholderMap = placeholders as Record<
  string,
  { width: number; height: number } | undefined
>;

type Frontmatter = { title: string; date: string; summary: string };

async function readPost(slug: string) {
  const { data, content } = matter(await readPostSource(slug));
  const date = new Date(data.date);
  if (
    Number.isNaN(date.getTime()) ||
    date.toISOString().slice(0, 10) !== data.date
  ) {
    throw new Error(`${slug}.mdx: date must be a valid, quoted YYYY-MM-DD`);
  }
  const url = extractImageUrls(content)[0];
  const size = url ? placeholderMap[url] : undefined;
  return {
    slug,
    ...(data as Frontmatter),
    hero:
      url && size ? { url, width: size.width, height: size.height } : undefined,
  };
}

export type Post = Awaited<ReturnType<typeof readPost>>;

export async function getAllPostSlugs() {
  "use cache";
  cacheLife("max");
  return listPostSlugs();
}

export async function getSortedPostsData() {
  "use cache";
  cacheLife("max");
  const posts = await Promise.all((await getAllPostSlugs()).map(readPost));
  return posts.sort((a, b) => b.date.localeCompare(a.date));
}

export async function getPostData(slug: string) {
  "use cache";
  cacheLife("max");
  return (await getAllPostSlugs()).includes(slug) ? readPost(slug) : null;
}
