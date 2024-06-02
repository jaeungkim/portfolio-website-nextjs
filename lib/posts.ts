import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";
import prism from "remark-prism";

const postsDirectory = path.join(process.cwd(), "posts");

const categories = ["daily", "studying"];

export function getSortedPostsData() {
  let allPostsData = [];

  categories.forEach((category) => {
    const categoryDirectory = path.join(postsDirectory, category);
    const fileNames = fs.readdirSync(categoryDirectory);

    const postsData = fileNames
      .map((fileName) => {
        const id = fileName.replace(/\.mdx$/, "");
        // Include the category in the id
        const fullId = `${category}/${id}`;
        const fullPath = path.join(categoryDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, "utf8");
        const matterResult = matter(fileContents);

        if (matterResult.data.tags && matterResult.data.tags.length > 0) {
          return {
            id: fullId, // Use the fullId including the category
            category,
            ...(matterResult.data as {
              date: string;
              title: string;
              tags: string[];
            }),
          };
        }
      })
      .filter((post) => post != null);
    allPostsData = allPostsData.concat(postsData);
  });

  return allPostsData.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAllPostIds() {
  let paths = [];

  categories.forEach((category) => {
    const categoryDirectory = path.join(postsDirectory, category);
    const fileNames = fs.readdirSync(categoryDirectory);

    const categoryPaths = fileNames.map((fileName) => {
      const postId = fileName.replace(/\.mdx$/, "");
      return {
        params: {
          id: [category, postId], // Update this to be an array
        },
      };
    });

    paths = paths.concat(categoryPaths);
  });

  return paths;
}

export async function getPostData(id: string[]) {
  const [category, postId] = id;

  if (!category || !postId) {
    throw new Error(`Invalid post ID: ${id.join("/")}`);
  }

  const fullPath = path.join(postsDirectory, category, `${postId}.mdx`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // postId itself is the slug, no need to use match
  const slug = postId;

  const matterResult = matter(fileContents);

  const contentHtml = await serialize(matterResult.content, {
    mdxOptions: {
      remarkPlugins: [prism],
    },
    scope: matterResult.data,
  });

  return {
    slug,
    id: id.join("/"), // Concatenate category and postId for the full ID
    tags: matterResult.data.tags || [],
    contentHtml,
    ...(matterResult.data as { date: string; title: string }),
  };
}
