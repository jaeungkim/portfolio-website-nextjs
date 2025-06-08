import fs from "fs/promises";
import path from "path";
import { cache } from "react";
import { compileMDX } from "next-mdx-remote/rsc";
import BlurImage from "@/src/components/image/BlurImage";
import { Post } from "@/src/types/blog";

type Frontmatter = {
  title: string;
  date: string;
  summary: string;
};

const POSTS_DIR = path.join(process.cwd(), "src", "posts");
const mdxComponents = { img: BlurImage, BlurImage };

function extractFrontmatter(raw: string): Frontmatter | null {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;

  const yaml = Object.fromEntries(
    match[1]
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean)
      .map((l) => {
        const [key, ...rest] = l.split(":");
        const value = rest.join(":").trim();
        return [
          key,
          value.startsWith("[")
            ? JSON.parse(value)
            : value.replace(/^["']|["']$/g, ""),
        ];
      })
  ) as Frontmatter;

  return yaml.title && yaml.date ? yaml : null;
}

export const getSortedPostsData = cache(async (): Promise<Post[]> => {
  const files = (await fs.readdir(POSTS_DIR)).filter((f) => f.endsWith(".mdx"));

  const posts = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
      const fm = extractFrontmatter(raw);
      return fm
        ? {
            id: file.replace(/\.mdx$/, ""),
            title: fm.title,
            date: fm.date,
            summary: fm.summary,
          }
        : null;
    })
  );

  return posts
    .filter((post): post is Post => post !== null)
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
});

export const getPostData = cache(async (slug: string) => {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = await fs.readFile(filePath, "utf8").catch(() => null);
  if (!raw) return null;

  const { content, frontmatter } = await compileMDX<Frontmatter>({
    source: raw,
    components: mdxComponents,
    options: { parseFrontmatter: true },
  });

  if (!frontmatter.title || !frontmatter.date) return null;

  return {
    id: slug,
    slug,
    title: frontmatter.title,
    date: frontmatter.date,
    summary: frontmatter.summary,
    content,
  };
});
