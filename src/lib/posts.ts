import fs from "fs/promises";
import path from "path";
import Image from "next/image";
import { compileMDX } from "next-mdx-remote/rsc";
import type { Post, PostData } from "@/src/types/blog";
import { cache } from "react";
import DynamicImage from "@/src/components/image/dynamic-image";

// === Constants ===
const POSTS_DIR = path.join(process.cwd(), "posts");
const mdxComponents = { Image, DynamicImage };

type Frontmatter = {
  title: string;
  date: string;
  summary?: string;
  tags?: string[];
};

// === Utils ===
const readFileSafe = async (filePath: string): Promise<string | null> => {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
};

const parsePost = async (
  raw: string,
  fileName: string
): Promise<Post | null> => {
  try {
    const { frontmatter } = await compileMDX<Frontmatter>({
      source: raw,
      options: { parseFrontmatter: true },
    });

    if (!frontmatter.title || !frontmatter.date) return null;

    return {
      id: fileName.replace(/\.mdx$/, ""),
      title: frontmatter.title,
      date: frontmatter.date,
      summary: frontmatter.summary ?? "",
      tags: frontmatter.tags ?? [],
    };
  } catch {
    return null;
  }
};

// === Public API ===

export const getSortedPostsData = cache(async (): Promise<Post[]> => {
  try {
    const files = await fs.readdir(POSTS_DIR);
    const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

    const posts = await Promise.all(
      mdxFiles.map(async (file) => {
        const raw = await readFileSafe(path.join(POSTS_DIR, file));
        return raw ? await parsePost(raw, file) : null;
      })
    );

    return posts
      .filter((post): post is Post => Boolean(post))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
});

export const getPostData = cache(
  async (slug: string): Promise<PostData | null> => {
    const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
    const raw = await readFileSafe(filePath);
    if (!raw) return null;

    try {
      const { content, frontmatter } = await compileMDX<Frontmatter>({
        source: raw,
        options: { parseFrontmatter: true },
        components: mdxComponents,
      });

      if (!frontmatter.title || !frontmatter.date) return null;

      return {
        id: slug,
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        summary: frontmatter.summary ?? "",
        tags: frontmatter.tags ?? [],
        content,
      };
    } catch (e) {
      console.error("MDX compilation failed:", e);
      return null;
    }
  }
);
