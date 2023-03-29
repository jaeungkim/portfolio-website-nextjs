import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import remarkMdx from "remark-mdx";
import prism from "remark-prism";
import { serialize } from "next-mdx-remote/serialize";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.mdx$/, "");

    // Extract the slug from the filename
    const match = id.match(/^([\w-]+)/);
    const slug = match ? match[1] : "";

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf8");

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the id and slug
    return {
      id,
      slug,
      tags: matterResult.data.tags || [],
      ...(matterResult.data as { date: string; title: string }),
    };
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}
export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.mdx$/, ""),
      },
    };
  });
}

export async function getPostData(id: string) {
  const fullPath = path.join(postsDirectory, `${id}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // Extract the slug from the filename
  const match = id.match(/^([\w-]+)/);
  const slug = match ? match[1] : "";

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const contentHtml = await serialize(matterResult.content, {
    mdxOptions: {
      remarkPlugins: [prism],
    },
    scope: matterResult.data,
  });

  // Combine the data with the id and contentHtml
  return {
    slug,
    id,
    tags: matterResult.data.tags || [], // if tags key is not present in the front matter, assign an empty array as default value
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}
