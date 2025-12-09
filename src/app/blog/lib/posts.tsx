import { cache } from "react";
import React from "react";
import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import BlurImage from "@/src/components/shared/image/BlurImage";
import type { Frontmatter, Post, PostData } from "./types";
import { POSTS_DIR, MDX_EXTENSION } from "./constants";
import { loadPlaceholders } from "@/src/lib/placeholders";

export type { Post, PostData } from "./types";

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

async function getMdxFiles(): Promise<string[]> {
  try {
    const files = await fs.readdir(POSTS_DIR);
    return files.filter((file) => file.endsWith(MDX_EXTENSION));
  } catch (error) {
    console.error("Error reading posts directory:", error);
    return [];
  }
}

function extractFrontmatter(fileContent: string): Frontmatter {
  const { data } = matter(fileContent);
  return data as Frontmatter;
}

function filenameToId(filename: string): string {
  return filename.replace(MDX_EXTENSION, "");
}

function validateFrontmatter(frontmatter: Frontmatter): boolean {
  return !!(frontmatter.title && frontmatter.date);
}

function sortPostsByDate(posts: Post[]): Post[] {
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA;
  });
}

async function parseMdxFile(filename: string): Promise<Post> {
  const filePath = path.join(POSTS_DIR, filename);
  const fileContent = await fs.readFile(filePath, "utf8");
  const frontmatter = extractFrontmatter(fileContent);

  if (!validateFrontmatter(frontmatter)) {
    throw new Error(`Invalid frontmatter in file: ${filename}`);
  }

  return {
    id: filenameToId(filename),
    title: frontmatter.title,
    date: frontmatter.date,
    summary: frontmatter.summary ?? "",
  };
}

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

export const getAllPostSlugs = cache(async (): Promise<string[]> => {
  const mdxFiles = await getMdxFiles();
  return mdxFiles.map((filename) => filenameToId(filename));
});

export const getPostData = cache(
  async (slug: string): Promise<PostData | null> => {
    const filePath = path.join(POSTS_DIR, `${slug}${MDX_EXTENSION}`);

    try {
      const fileContent = await fs.readFile(filePath, "utf8");
      const placeholders = await loadPlaceholders();
      const mdxComponents = createMdxComponents(placeholders);

      const { content, frontmatter } = await compileMDX<Frontmatter>({
        source: fileContent,
        components: mdxComponents,
        options: { parseFrontmatter: true },
      });

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
      if ((error as NodeJS.ErrnoException).code === "ENOENT") {
        return null;
      }
      console.error(`Error getting post data for ${slug}:`, error);
      return null;
    }
  }
);
