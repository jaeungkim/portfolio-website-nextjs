import fs from "fs/promises";
import path from "path";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkBreaks from "remark-breaks";
import remarkGfm from "remark-gfm";
import { mdxComponents } from "@/src/components/mdx/MdxComponents";
import type { Post, PostData } from "@/src/app/types/blog";

const POSTS_DIR = path.resolve(process.cwd(), "posts");
export const CATEGORIES = ["daily", "personal"] as const;
type Category = (typeof CATEGORIES)[number];

const isValidCategory = (category: string): category is Category =>
  CATEGORIES.includes(category as Category);

const mdxOpts = {
  parseFrontmatter: true,
  mdxOptions: {
    remarkPlugins: [remarkGfm, remarkBreaks],
    rehypePlugins: [rehypePrettyCode, rehypeSlug],
    format: "mdx" as const,
  },
};

const readFile = async (filePath: string): Promise<string | null> => {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch {
    return null;
  }
};

const extractPost = async (
  category: Category,
  filePath: string,
  fileName: string
): Promise<Post | null> => {
  const raw = await readFile(filePath);
  if (!raw) return null;

  try {
    const { frontmatter } = await compileMDX<{
      title: string;
      date: string;
      summary?: string;
      tags?: string[];
    }>({ source: raw, options: mdxOpts });

    if (!frontmatter.title || !frontmatter.date) return null;

    return {
      id: `${category}/${fileName.replace(/\.mdx$/, "")}`,
      title: frontmatter.title,
      date: frontmatter.date,
      summary: frontmatter.summary ?? "",
      tags: frontmatter.tags ?? [],
      category,
    };
  } catch {
    return null;
  }
};

export const getSortedPostsData = async (): Promise<Post[]> => {
  const postsPerCategory = await Promise.all(
    CATEGORIES.map(async (category) => {
      const dir = path.join(POSTS_DIR, category);
      try {
        const files = await fs.readdir(dir);
        const mdxFiles = files.filter((f) => f.endsWith(".mdx"));

        const posts = await Promise.all(
          mdxFiles.map((file) =>
            extractPost(category, path.join(dir, file), file)
          )
        );

        return posts.filter(Boolean) as Post[];
      } catch {
        return [];
      }
    })
  );

  return postsPerCategory.flat().sort((a, b) => {
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
};

export const getPostData = async (
  id: string[] | string
): Promise<PostData | null> => {
  const [category, slug] = Array.isArray(id) ? id : id.split("/");

  if (!isValidCategory(category) || !slug) return null;

  const filePath = path.join(POSTS_DIR, category, `${slug}.mdx`);
  const raw = await readFile(filePath);
  if (!raw) return null;

  try {
    const { content, frontmatter } = await compileMDX<{
      title: string;
      date: string;
      summary?: string;
      tags?: string[];
    }>({
      source: raw,
      options: mdxOpts,
      components: mdxComponents,
    });

    if (!frontmatter.title || !frontmatter.date) return null;

    return {
      id: `${category}/${slug}`,
      slug,
      title: frontmatter.title,
      date: frontmatter.date,
      summary: frontmatter.summary ?? "",
      tags: frontmatter.tags ?? [],
      content,
    };
  } catch {
    return null;
  }
};
