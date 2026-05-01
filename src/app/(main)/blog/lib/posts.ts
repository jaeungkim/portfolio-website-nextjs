import fs from "fs/promises";
import path from "path";
import { cacheLife } from "next/cache";
import matter from "gray-matter";
import {
  parseFrontmatter,
  type Post,
  type PostData,
} from "@/src/app/(main)/blog/lib/types";
import { POSTS_DIR, MDX_EXTENSION } from "@/src/app/(main)/blog/lib/constants";

export type { Post, PostData } from "@/src/app/(main)/blog/lib/types";

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

async function parseMdxFileToPost(filename: string): Promise<Post> {
  const filePath = path.join(POSTS_DIR, filename);
  const fileContent = await fs.readFile(filePath, "utf8");
  const { data } = matter(fileContent);
  const frontmatter = parseFrontmatter(data, filename);

  return {
    id: filenameToSlug(filename),
    title: frontmatter.title,
    date: frontmatter.date,
    summary: frontmatter.summary,
  };
}

export async function getSortedPostsData(): Promise<Post[]> {
  "use cache";
  cacheLife("days");
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
}

export async function getAllPostSlugs(): Promise<string[]> {
  "use cache";
  cacheLife("days");
  const mdxFiles = await getMdxFiles();
  return mdxFiles.map((filename) => filenameToSlug(filename));
}

export async function getPostData(slug: string): Promise<PostData | null> {
  "use cache";
  cacheLife("days");
  const filePath = path.join(POSTS_DIR, `${slug}${MDX_EXTENSION}`);

  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data } = matter(fileContent);
    const frontmatter = parseFrontmatter(data, `${slug}${MDX_EXTENSION}`);

    return {
      slug,
      id: slug,
      date: frontmatter.date,
      title: frontmatter.title,
      summary: frontmatter.summary,
    };
  } catch (error) {
    if (
      error instanceof Error &&
      "code" in error &&
      (error as NodeJS.ErrnoException).code === "ENOENT"
    ) {
      return null;
    }
    console.error(`[${slug}] 포스트 데이터 조회 오류:`, error);
    throw error;
  }
}
