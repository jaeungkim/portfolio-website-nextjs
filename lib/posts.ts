import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import prism from "remark-prism";

// Define posts directory and categories
const POSTS_DIR = path.join(process.cwd(), "posts");
const CATEGORIES = ["daily", "studying"];

/**
 * Get all sorted posts data from available categories.
 */
export function getSortedPostsData() {
  return CATEGORIES.flatMap((category) => {
    const categoryDir = path.join(POSTS_DIR, category);

    // Check if category directory exists
    if (!fs.existsSync(categoryDir)) return [];

    return fs
      .readdirSync(categoryDir)
      .map((fileName) => {
        const filePath = path.join(categoryDir, fileName);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);

        if (!data.title || !data.date) return null;

        return {
          id: `${category}/${fileName.replace(/\.mdx$/, "")}`,
          category,
          ...(data as { date: string; title: string; tags?: string[] }),
        };
      })
      .filter(Boolean) // Remove null values
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  });
}

/**
 * Get all post IDs formatted for Next.js dynamic routing.
 */
export function getAllPostIds() {
  return CATEGORIES.flatMap((category) => {
    const categoryDir = path.join(POSTS_DIR, category);

    if (!fs.existsSync(categoryDir)) return [];

    return fs.readdirSync(categoryDir).map((fileName) => ({
      params: {
        id: [category, fileName.replace(/\.mdx$/, "")],
      },
    }));
  });
}

/**
 * Fetch post data by category and post ID.
 */
export async function getPostData(id: string[]) {
  const [category, postId] = id;

  if (!category || !postId) {
    throw new Error(`Invalid post ID: ${id.join("/")}`);
  }

  const filePath = path.join(POSTS_DIR, category, `${postId}.mdx`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Post not found: ${id.join("/")}`);
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContents);

  const contentHtml = await serialize(content, {
    mdxOptions: {
      remarkPlugins: [prism],
    },
    scope: data,
  });

  return {
    slug: postId,
    id: id.join("/"),
    tags: data.tags || [],
    contentHtml,
    ...(data as { date: string; title: string }),
  };
}
