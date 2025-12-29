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

/**
 * MDX 파일 목록 조회
 */
async function getMdxFiles(): Promise<string[]> {
  try {
    const files = await fs.readdir(POSTS_DIR);
    return files.filter((file) => file.endsWith(MDX_EXTENSION));
  } catch (error) {
    console.error("포스트 디렉토리 읽기 오류:", error);
    return [];
  }
}

/**
 * 파일명에서 slug 추출
 */
function filenameToSlug(filename: string): string {
  return filename.replace(MDX_EXTENSION, "");
}

/**
 * 날짜 기준 내림차순 정렬
 */
function sortPostsByDate(posts: Post[]): Post[] {
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

/**
 * Frontmatter 추출 및 Zod 스키마 유효성 검사
 * 빌드 시점에 잘못된 frontmatter 감지
 */
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

/**
 * 단일 MDX 파일을 Post 메타데이터로 파싱
 */
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

/**
 * 정렬된 모든 포스트 메타데이터 조회
 * React cache()로 요청 단위 메모이제이션
 */
export const getSortedPostsData = cache(async (): Promise<Post[]> => {
  const mdxFiles = await getMdxFiles();

  if (mdxFiles.length === 0) {
    return [];
  }

  try {
    const posts = await Promise.all(
      mdxFiles.map((filename) => parseMdxFileToPost(filename))
    );
    return sortPostsByDate(posts);
  } catch (error) {
    console.error("포스트 목록 조회 오류:", error);
    throw error; // 빌드 시점 에러를 노출
  }
});

/**
 * 모든 포스트 slug 조회 (generateStaticParams용)
 */
export const getAllPostSlugs = cache(async (): Promise<string[]> => {
  const mdxFiles = await getMdxFiles();
  return mdxFiles.map((filename) => filenameToSlug(filename));
});

/**
 * slug로 개별 포스트 데이터 조회
 * MDX 컴파일 및 플레이스홀더 주입 포함
 */
export const getPostData = cache(
  async (slug: string): Promise<PostData | null> => {
    const filePath = path.join(POSTS_DIR, `${slug}${MDX_EXTENSION}`);

    try {
      const [fileContent, placeholders] = await Promise.all([
        fs.readFile(filePath, "utf8"),
        loadPlaceholders(),
      ]);

      const mdxComponents = createMdxComponents(placeholders);

      const { content, frontmatter } = await compileMDX<Frontmatter>({
        source: fileContent,
        components: mdxComponents,
        options: {
          parseFrontmatter: true,
        },
      });

      // Zod 유효성 검사
      const validatedFrontmatter = parseFrontmatter(fileContent, slug);

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
      throw error; // 빌드 시점 에러를 노출
    }
  }
);
