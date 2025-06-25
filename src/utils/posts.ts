import { cache } from "react";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import BlurImage from "@/src/components/common/image/BlurImage";
import type { Post, PostData } from "@/src/types/blog";

type Frontmatter = { title: string; date: string; summary?: string };

const POSTS_DIR = path.join(process.cwd(), "src", "posts");
const mdxComponents = { img: BlurImage, BlurImage };

export const getSortedPostsData = cache(async (): Promise<Post[]> => {
  const files = (await fs.readdir(POSTS_DIR)).filter((f) => f.endsWith(".mdx"));

  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
      const { data } = matter(raw);
      const frontmatter = data as Frontmatter;

      return {
        id: file.replace(/\.mdx$/, ""),
        title: data.title,
        date: data.date,
        summary: data.summary ?? "",
      } satisfies Post;
    })
  );

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
});

export const getAllPostSlugs = cache(async () => {
  return (await fs.readdir(POSTS_DIR))
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
});

export const getPostData = cache(
  async (slug: string): Promise<PostData | null> => {
    const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
    let raw: string;
    try {
      raw = await fs.readFile(filePath, "utf8");
    } catch {
      return null;
    }

    const { content, frontmatter } = await compileMDX<Frontmatter>({
      source: raw,
      components: mdxComponents,
      options: { parseFrontmatter: true },
    });

    if (!frontmatter.title || !frontmatter.date) return null;

    return {
      slug,
      id: slug,
      content,
      date: frontmatter.date,
      title: frontmatter.title,
      summary: frontmatter.summary ?? "",
    };
  }
);
