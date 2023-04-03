import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import prism from "remark-prism";

const postsDirectory = path.join(process.cwd(), "posts");

function getPostMetadata(fileName) {
  const id = fileName.replace(/\.mdx$/, "");

  const match = id.match(/^([\w-]+)/);
  const slug = match ? match[1] : "";

  const fullPath = path.join(postsDirectory, fileName);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const matterResult = matter(fileContents);

  return {
    id,
    slug,
    tags: matterResult.data.tags || [],
    ...(matterResult.data as { date: string; title: string }),
  };
}

export function getSortedPostsData() {
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map(getPostMetadata);

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => ({
    params: {
      id: fileName.replace(/\.mdx$/, ""),
    },
  }));
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  const match = id.match(/^([\w-]+)/);
  const slug = match ? match[1] : "";

  const matterResult = matter(fileContents);

  const contentHtml = await serialize(matterResult.content, {
    mdxOptions: {
      remarkPlugins: [prism],
    },
    scope: matterResult.data,
  });

  return {
    slug,
    id,
    tags: matterResult.data.tags || [],
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}
