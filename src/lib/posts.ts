import { cache } from "react";
import postsJson from "@/src/posts.json";
import fs from "fs/promises";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import BlurImage from "@/src/components/common/image/BlurImage";
import { Post } from "@/src/types/blog";

type Frontmatter = { title: string; date: string; summary: string };

const POSTS_DIR = path.join(process.cwd(), "src", "posts");
const mdxComponents = { img: BlurImage, BlurImage };

export const getSortedPostsData = cache(async (): Promise<Post[]> => {
  return (postsJson as Post[]).sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
});

export const getPostData = cache(async (slug: string) => {
  const raw = await fs
    .readFile(path.join(POSTS_DIR, `${slug}.mdx`), "utf8")
    .catch(() => null);
  if (!raw) return null;

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source: raw,
    components: mdxComponents,
    options: { parseFrontmatter: true },
  });

  return frontmatter.title && frontmatter.date
    ? {
        id: slug,
        slug,
        title: frontmatter.title,
        date: frontmatter.date,
        summary: frontmatter.summary,
        content,
      }
    : null;
});
