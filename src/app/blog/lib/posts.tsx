import { cache } from "react";
import React from "react";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import BlurImage from "@/src/components/shared/image/BlurImage";

// Types
export interface Post {
  id: string;
  title: string;
  date: string;
  summary: string;
}

export type PostData = {
  slug: string;
  id: string;
  content: React.ReactNode;
  date: string;
  title: string;
  summary: string;
};

// Types for better type safety
type Frontmatter = {
  title: string;
  date: string;
  summary?: string;
};

// Constants for better maintainability
const POSTS_DIR = path.join(process.cwd(), "src", "app", "blog", "posts");
const MDX_EXTENSION = ".mdx";
const PLACEHOLDERS_CACHE_FILE = path.join(
  process.cwd(),
  ".next",
  "placeholders.json"
);

/**
 * 플레이스홀더 캐시를 로드합니다.
 * React cache를 사용하여 요청당 한 번만 로드되도록 최적화합니다.
 */
const loadPlaceholders = cache(async (): Promise<Record<string, string>> => {
  try {
    const cacheContent = await fs.readFile(PLACEHOLDERS_CACHE_FILE, "utf-8");
    return JSON.parse(cacheContent);
  } catch {
    return {};
  }
});

/**
 * 플레이스홀더가 포함된 MDX 컴포넌트를 생성합니다.
 */
function createMdxComponents(
  placeholders: Record<string, string>
): Record<string, React.ComponentType<any>> {
  const BlurImageWithPlaceholder = ({
    url,
    alt,
  }: {
    url: string;
    alt?: string;
  }) => {
    const blurDataURL = placeholders[url] || undefined;
    return <BlurImage url={url} alt={alt} blurDataURL={blurDataURL} />;
  };

  return {
    img: BlurImageWithPlaceholder,
    BlurImage: BlurImageWithPlaceholder,
  };
}

/**
 * Get all MDX files from the posts directory
 */
async function getMdxFiles(): Promise<string[]> {
  try {
    const files = await fs.readdir(POSTS_DIR);
    return files.filter((file) => file.endsWith(MDX_EXTENSION));
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return [];
  }
}

/**
 * Extract frontmatter from MDX file content
 */
function extractFrontmatter(fileContent: string): Frontmatter {
  const { data } = matter(fileContent);
  return data as Frontmatter;
}

/**
 * Convert filename to post ID (remove .mdx extension)
 */
function filenameToId(filename: string): string {
  return filename.replace(MDX_EXTENSION, "");
}

/**
 * Parse a single MDX file into a Post object
 */
async function parseMdxFile(filename: string): Promise<Post> {
  const filePath = path.join(POSTS_DIR, filename);

  try {
    const fileContent = await fs.readFile(filePath, "utf8");
    const frontmatter = extractFrontmatter(fileContent);

    return {
      id: filenameToId(filename),
      title: frontmatter.title,
      date: frontmatter.date,
      summary: frontmatter.summary ?? "",
    };
  } catch (error) {
    console.error(`Error parsing file ${filename}:`, error);
    throw new Error(`Failed to parse post: ${filename}`);
  }
}

/**
 * Sort posts by date (newest first)
 */
function sortPostsByDate(posts: Post[]): Post[] {
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA; // Newest first
  });
}

/**
 * Get all posts sorted by date (newest first)
 * Cached for performance
 */
export const getSortedPostsData = cache(async (): Promise<Post[]> => {
  const mdxFiles = await getMdxFiles();

  if (mdxFiles.length === 0) {
    return [];
  }

  try {
    const posts = await Promise.all(
      mdxFiles.map((filename) => parseMdxFile(filename))
    );

    return sortPostsByDate(posts);
  } catch (error) {
    console.error("Error getting sorted posts:", error);
    return [];
  }
});

/**
 * Get all post slugs (filenames without extension)
 * Cached for performance
 */
export const getAllPostSlugs = cache(async (): Promise<string[]> => {
  const mdxFiles = await getMdxFiles();
  return mdxFiles.map((filename) => filenameToId(filename));
});

/**
 * Check if a file exists
 */
async function fileExists(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Validate frontmatter has required fields
 */
function validateFrontmatter(frontmatter: Frontmatter): boolean {
  return !!(frontmatter.title && frontmatter.date);
}

/**
 * Get post data by slug
 * Cached for performance
 */
export const getPostData = cache(
  async (slug: string): Promise<PostData | null> => {
    const filePath = path.join(POSTS_DIR, `${slug}${MDX_EXTENSION}`);

    // Check if file exists first
    if (!(await fileExists(filePath))) {
      return null;
    }

    try {
      const fileContent = await fs.readFile(filePath, "utf8");
      const placeholders = await loadPlaceholders();
      const mdxComponents = createMdxComponents(placeholders);

      const { content, frontmatter } = await compileMDX<Frontmatter>({
        source: fileContent,
        components: mdxComponents,
        options: { parseFrontmatter: true },
      });

      // Validate required frontmatter fields
      if (!validateFrontmatter(frontmatter)) {
        console.warn(`Invalid frontmatter for post: ${slug}`);
        return null;
      }

      return {
        slug,
        id: slug,
        content,
        date: frontmatter.date,
        title: frontmatter.title,
        summary: frontmatter.summary ?? "",
      };
    } catch (error) {
      console.error(`Error getting post data for ${slug}:`, error);
      return null;
    }
  }
);

