import fs from "fs/promises";
import path from "path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "src", "posts");
const OUT_FILE = path.join(process.cwd(), "src", "posts.json");

async function generatePostIndex() {
  const files = (await fs.readdir(POSTS_DIR)).filter((f) => f.endsWith(".mdx"));

  const index = await Promise.all(
    files.map(async (file) => {
      const raw = await fs.readFile(path.join(POSTS_DIR, file), "utf8");
      const { data } = matter(raw);
      return {
        id: file.replace(/\.mdx$/, ""),
        title: data.title,
        date: data.date,
        summary: data.summary ?? "",
      };
    })
  );

  await fs.writeFile(OUT_FILE, JSON.stringify(index, null, 2));
  console.log(`✅ posts.json generated (${index.length} posts)`);
}

generatePostIndex().catch((err) => {
  console.error("❌ Failed to generate posts:", err);
  process.exit(1);
});
