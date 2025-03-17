import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { Post, PostData } from "@/app/types/blog";

/* Constants */
const POSTS_DIR = path.join(process.cwd(), "posts");
const CATEGORIES = ["daily", "studying"] as const;

/* Helpers */
const isValidCategory = (
  category: string
): category is (typeof CATEGORIES)[number] =>
  CATEGORIES.includes(category as any);

const parsePostFile = (category: string, fileName: string): Post | null => {
  const filePath = path.join(POSTS_DIR, category, fileName);

  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { data } = matter(fileContents);

    const title = data.title as string | undefined;
    const date = data.date as string | undefined;
    const summary = (data.summary as string) ?? "";
    const tags = (data.tags as string[]) ?? [];

    if (!title || !date) {
      console.warn(`Missing required fields in ${filePath}`);
      return null;
    }

    return {
      id: `${category}/${fileName.replace(/\.mdx$/, "")}`,
      title,
      date,
      summary,
      tags,
      category,
    };
  } catch (error) {
    console.error(`Error reading post file ${filePath}`, error);
    return null;
  }
};

/* Get all posts sorted by date */
export function getSortedPostsData(): Post[] {
  return CATEGORIES.flatMap((category) => {
    const categoryDir = path.join(POSTS_DIR, category);

    if (!fs.existsSync(categoryDir)) {
      console.warn(`Category directory not found: ${categoryDir}`);
      return [];
    }

    return fs
      .readdirSync(categoryDir)
      .filter((fileName) => fileName.endsWith(".mdx"))
      .map((fileName) => parsePostFile(category, fileName))
      .filter((post): post is Post => post !== null);
  }).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/* Get a single post's data */
export async function getPostData(
  id: string[] | string
): Promise<PostData | null> {
  const postIdArray = Array.isArray(id) ? id : id.split("/");

  if (postIdArray.length !== 2) {
    console.warn(`Invalid post ID format: ${id}`);
    return null;
  }

  const [category, postId] = postIdArray;

  if (!isValidCategory(category)) {
    console.warn(`Invalid category: ${category}`);
    return null;
  }

  const filePath = path.join(POSTS_DIR, category, `${postId}.mdx`);

  if (!fs.existsSync(filePath)) {
    console.warn(`Post not found: ${filePath}`);
    return null;
  }

  try {
    const fileContents = fs.readFileSync(filePath, "utf8");
    const { content, data } = matter(fileContents);

    const title = data.title as string | undefined;
    const date = data.date as string | undefined;
    const summary = (data.summary as string) ?? "";
    const tags = (data.tags as string[]) ?? [];

    if (!title || !date) {
      console.warn(`Missing required fields in post ${filePath}`);
      return null;
    }

    const contentHtml: MDXRemoteSerializeResult = await serialize(content);

    return {
      slug: postId,
      id: `${category}/${postId}`,
      tags,
      contentHtml,
      date,
      title,
      summary,
    };
  } catch (error) {
    console.error(`Error processing post ${filePath}`, error);
    return null;
  }
}
