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
import type { Locale } from "@/src/i18n/config";

export type { Post, PostData } from "@/src/app/[lang]/(main)/blog/lib/types";

/** Posts are `<slug>.<locale>.mdx`, so each locale reads its own edition. */
function localeSuffix(locale: Locale): string {
  return `.${locale}${MDX_EXTENSION}`;
}

async function getMdxFiles(locale: Locale): Promise<string[]> {
  try {
    const files = await fs.readdir(POSTS_DIR);
    return files.filter((file) => file.endsWith(localeSuffix(locale)));
  } catch (error) {
    console.error("포스트 디렉토리 읽기 오류:", error);
    return [];
  }
}

function filenameToSlug(filename: string, locale: Locale): string {
  return filename.slice(0, -localeSuffix(locale).length);
}

function sortPostsByDate(posts: Post[]): Post[] {
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

async function parseMdxFileToPost(
  filename: string,
  locale: Locale,
): Promise<Post> {
  const filePath = path.join(POSTS_DIR, filename);
  const fileContent = await fs.readFile(filePath, "utf8");
  const { data } = matter(fileContent);
  const frontmatter = parseFrontmatter(data, filename);

  return {
    id: filenameToSlug(filename, locale),
    title: frontmatter.title,
    date: frontmatter.date,
    summary: frontmatter.summary,
  };
}

export async function getSortedPostsData(locale: Locale): Promise<Post[]> {
  "use cache";
  cacheLife("days");
  const mdxFiles = await getMdxFiles(locale);

  if (mdxFiles.length === 0) {
    return [];
  }

  try {
    const posts = await Promise.all(
      mdxFiles.map((filename) => parseMdxFileToPost(filename, locale)),
    );
    return sortPostsByDate(posts);
  } catch (error) {
    console.error("포스트 목록 조회 오류:", error);
    throw error;
  }
}

export async function getAllPostSlugs(locale: Locale): Promise<string[]> {
  "use cache";
  cacheLife("days");
  const mdxFiles = await getMdxFiles(locale);
  return mdxFiles.map((filename) => filenameToSlug(filename, locale));
}

export async function getPostData(
  slug: string,
  locale: Locale,
): Promise<PostData | null> {
  "use cache";
  cacheLife("days");
  const filename = `${slug}${localeSuffix(locale)}`;
  const filePath = path.join(POSTS_DIR, filename);

  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const { data } = matter(fileContent);
    const frontmatter = parseFrontmatter(data, filename);

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
