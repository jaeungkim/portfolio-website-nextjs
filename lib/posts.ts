import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { Post, PostData } from "@/app/constants/blog";

const POSTS_DIR = path.join(process.cwd(), "posts");
const CATEGORIES = ["daily", "studying"];

export function getSortedPostsData(): Post[] {
  return CATEGORIES.flatMap((category) => {
    const categoryDir = path.join(POSTS_DIR, category);
    if (!fs.existsSync(categoryDir)) return [];

    return fs
      .readdirSync(categoryDir)
      .map((fileName) => {
        const filePath = path.join(categoryDir, fileName);
        const fileContents = fs.readFileSync(filePath, "utf8");
        const { data } = matter(fileContents);

        if (!data.title || !data.date || !data.summary) return null;

        return {
          id: `${category}/${fileName.replace(/\.mdx$/, "")}`,
          title: data.title,
          date: data.date,
          summary: data.summary,
          tags: data.tags || [],
          category,
        };
      })
      .filter((post): post is Post => post !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  });
}

export async function getPostData(
  id: string[] | string
): Promise<PostData | null> {
  const postIdArray = Array.isArray(id) ? id : id.split("/");
  if (postIdArray.length !== 2) return null;

  const [category, postId] = postIdArray;
  const filePath = path.join(POSTS_DIR, category, `${postId}.mdx`);
  if (!fs.existsSync(filePath)) return null;

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(fileContents);

  const contentHtml: MDXRemoteSerializeResult = await serialize(content);

  return {
    slug: postId,
    id: `${category}/${postId}`,
    tags: data.tags || [],
    contentHtml,
    date: data.date,
    title: data.title,
    summary: data.summary || "",
  };
}
