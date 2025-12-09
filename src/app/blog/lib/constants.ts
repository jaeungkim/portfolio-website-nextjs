import path from "path";

export const POSTS_DIR = path.join(process.cwd(), "src", "app", "blog", "posts");
export const MDX_EXTENSION = ".mdx";
export const PLACEHOLDERS_CACHE_FILE = path.join(
  process.cwd(),
  ".next",
  "placeholders.json"
);

