import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";

import type { Post, PostData } from "@/src/app/types/blog";

/* Constants */
const POSTS_DIR = path.join(process.cwd(), "posts");
export const CATEGORIES = ["daily", "personal"] as const;
type Category = (typeof CATEGORIES)[number];

/* Utils */
const isValidCategory = (category: string): category is Category =>
  CATEGORIES.includes(category as any);

const getPostFilePath = (category: string, fileName: string) =>
  path.join(POSTS_DIR, category, fileName);

/* Core: Parse Frontmatter from MDX */
function extractPostMetadata(
  category: Category,
  fileName: string,
  content: string
): Post | null {
  const { data } = matter(content);
  const title = data.title as string | undefined;
  const date = data.date as string | undefined;
  const summary = (data.summary as string) ?? "";
  const tags = (data.tags as string[]) ?? [];

  if (!title || !date) return null;

  return {
    id: `${category}/${fileName.replace(/\.mdx$/, "")}`,
    title,
    date,
    summary,
    tags,
    category,
  };
}

/* Public: Get All Posts (sorted) */
export function getSortedPostsData(): Post[] {
  return CATEGORIES.flatMap((category) => {
    const categoryDir = path.join(POSTS_DIR, category);
    if (!fs.existsSync(categoryDir)) return [];

    return fs
      .readdirSync(categoryDir)
      .filter((file) => file.endsWith(".mdx"))
      .map((fileName) => {
        const fullPath = getPostFilePath(category, fileName);
        try {
          const content = fs.readFileSync(fullPath, "utf8");
          return extractPostMetadata(category, fileName, content);
        } catch (err) {
          console.warn(`Error reading ${fullPath}:`, err);
          return null;
        }
      })
      .filter((post): post is Post => post !== null);
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/* Public: Get Single Post by ID */
export async function getPostData(
  id: string[] | string
): Promise<PostData | null> {
  const [category, slug] = Array.isArray(id) ? id : id.split("/");

  if (!isValidCategory(category) || !slug) return null;

  const filePath = getPostFilePath(category, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  try {
    const rawContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(rawContent);

    const title = data.title as string | undefined;
    const date = data.date as string | undefined;
    const summary = (data.summary as string) ?? "";
    const tags = (data.tags as string[]) ?? [];

    if (!title || !date) return null;

    const contentHtml: MDXRemoteSerializeResult = await serialize(content, {
      mdxOptions: {
        remarkPlugins: [remarkGfm, remarkBreaks],
        rehypePlugins: [rehypePrettyCode, rehypeSlug],
        format: "mdx",
      },
    });

    return {
      id: `${category}/${slug}`,
      slug,
      title,
      date,
      summary,
      tags,
      contentHtml,
    };
  } catch (error) {
    console.error(`Error processing post at ${filePath}`, error);
    return null;
  }
}
