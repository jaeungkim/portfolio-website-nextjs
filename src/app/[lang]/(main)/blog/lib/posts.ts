import fs from "fs/promises";
import path from "path";
import { cacheLife } from "next/cache";
import matter from "gray-matter";
import {
  parseFrontmatter,
  type Post,
  type PostData,
} from "@/src/app/[lang]/(main)/blog/lib/types";
import {
  POSTS_DIR,
  MDX_EXTENSION,
} from "@/src/app/[lang]/(main)/blog/lib/constants";
import { extractImageUrls } from "@/src/app/[lang]/(main)/blog/scripts/extract-image-urls";
import placeholders from "@/src/app/[lang]/(main)/blog/data/placeholders.json";

export type { Post, PostData } from "@/src/app/[lang]/(main)/blog/lib/types";

// Posts are written once, in English, and served unchanged under every locale.

// Let a missing posts dir throw: a failed build or regeneration keeps the last good
// page, where returning [] would cache an empty blog.
async function getMdxFiles(): Promise<string[]> {
  const files = await fs.readdir(POSTS_DIR);
  return files.filter((file) => file.endsWith(MDX_EXTENSION));
}

function filenameToSlug(filename: string): string {
  return filename.slice(0, -MDX_EXTENSION.length);
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
  cacheLife("max");
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
  cacheLife("max");
  const mdxFiles = await getMdxFiles();
  return mdxFiles.map((filename) => filenameToSlug(filename));
}

const placeholderMap = placeholders as Record<
  string,
  { width: number; height: number } | undefined
>;

function resolveHero(content: string): PostData["hero"] {
  const url = extractImageUrls(content)[0];
  const size = url ? placeholderMap[url] : undefined;
  return url && size
    ? { url, width: size.width, height: size.height }
    : undefined;
}

export async function getPostData(slug: string): Promise<PostData | null> {
  "use cache";
  cacheLife("max");
  const filename = `${slug}${MDX_EXTENSION}`;
  const filePath = path.join(POSTS_DIR, filename);

  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data, content } = matter(fileContent);
    const frontmatter = parseFrontmatter(data, filename);

    return {
      slug,
      id: slug,
      date: frontmatter.date,
      title: frontmatter.title,
      summary: frontmatter.summary,
      hero: resolveHero(content),
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
