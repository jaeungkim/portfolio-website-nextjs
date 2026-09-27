import fs from "fs/promises";
import path from "path";

export const POSTS_DIR = path.join(
  process.cwd(),
  "src",
  "app",
  "[lang]",
  "(main)",
  "blog",
  "_posts",
);

export async function listPostSlugs() {
  return (await fs.readdir(POSTS_DIR))
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => path.basename(file, ".mdx"));
}

export function readPostSource(slug: string) {
  return fs.readFile(path.join(POSTS_DIR, `${slug}.mdx`), "utf8");
}

export function extractImageUrls(content: string): string[] {
  return Array.from(
    content.matchAll(/<BlurImage\b[^>]*?\burl=["']([^"']+)["']/g),
    (match) => match[1],
  );
}
