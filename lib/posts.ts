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

const categories = ["daily", "studying", "travel"];

export function getSortedPostsData() {
  let allPostsData = [];

  categories.forEach((category) => {
    const categoryDirectory = path.join(postsDirectory, category);
    const fileNames = fs.readdirSync(categoryDirectory);

    const postsData = fileNames
      .map((fileName) => {
        const id = fileName.replace(/\.mdx$/, "");
        const fullPath = path.join(categoryDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        // Include only posts with non-empty tags array
        if (matterResult.data.tags && matterResult.data.tags.length > 0) {
          return {
            id,
            category,
            ...(matterResult.data as {
              date: string;
              title: string;
              tags: string[];
            }),
          };
        }
      })
      .filter((post) => post != null); // Remove undefined entries from the array

    allPostsData = allPostsData.concat(postsData);
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
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
