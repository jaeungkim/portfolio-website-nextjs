import { cache } from "react";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import {
  frontmatterSchema,
  type Frontmatter,
  type Post,
  type PostData,
} from "./types";
import { POSTS_DIR, MDX_EXTENSION } from "./constants";
import { loadPlaceholders } from "@/src/lib/placeholders";
import { createMdxComponents } from "@/mdx-components";

export type { Post, PostData } from "./types";

async function getMdxFiles(): Promise<string[]> {
  try {
    const files = await fs.readdir(POSTS_DIR);
    return files.filter((file) => file.endsWith(MDX_EXTENSION));
  } catch (error) {
    console.error("포스트 디렉토리 읽기 오류:", error);
    return [];
  }
}

function filenameToSlug(filename: string): string {
  return filename.replace(MDX_EXTENSION, "");
}

function sortPostsByDate(posts: Post[]): Post[] {
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

function parseFrontmatter(fileContent: string, filename: string): Frontmatter {
  const { data } = matter(fileContent);
  const result = frontmatterSchema.safeParse(data);

  if (!result.success) {
    const errors = result.error.issues
      .map((issue) => `  - ${issue.path.join(".")}: ${issue.message}`)
      .join("\n");
    throw new Error(`[${filename}] Frontmatter 유효성 검사 실패:\n${errors}`);
  }

  return result.data;
}

async function parseMdxFileToPost(filename: string): Promise<Post> {
  const filePath = path.join(POSTS_DIR, filename);
  const fileContent = await fs.readFile(filePath, "utf8");
  const frontmatter = parseFrontmatter(fileContent, filename);

  return {
    id: filenameToSlug(filename),
    title: frontmatter.title,
    date: frontmatter.date,
    summary: frontmatter.summary,
  };
}

export const getSortedPostsData = cache(async (): Promise<Post[]> => {
  const mdxFiles = await getMdxFiles();

  if (mdxFiles.length === 0) {
    return [];
  }

  try {
    const posts = await Promise.all(
      mdxFiles.map((filename) => parseMdxFileToPost(filename)),
    );
    return sortPostsByDate(posts);
  } catch (error) {
    console.error("포스트 목록 조회 오류:", error);
    throw error;
  }
});

export const getAllPostSlugs = cache(async (): Promise<string[]> => {
  const mdxFiles = await getMdxFiles();
  return mdxFiles.map((filename) => filenameToSlug(filename));
});

export const getPostData = cache(
  async (slug: string): Promise<PostData | null> => {
    const filePath = path.join(POSTS_DIR, `${slug}${MDX_EXTENSION}`);

    try {
      const [fileContent, placeholders] = await Promise.all([
        fs.readFile(filePath, "utf8"),
        loadPlaceholders(),
      ]);

      const mdxComponents = createMdxComponents(placeholders);

      const { content, frontmatter: validatedFrontmatter } =
        await compileMDX<Frontmatter>({
          source: fileContent,
          components: mdxComponents,
          options: {
            parseFrontmatter: true,
          },
        });

      return {
        slug,
        id: slug,
        content,
        date: validatedFrontmatter.date,
        title: validatedFrontmatter.title,
        summary: validatedFrontmatter.summary,
      };
    } catch (error) {
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return null;
      }
      console.error(`[${slug}] 포스트 데이터 조회 오류:`, error);
      throw error;
    }
  },
);
