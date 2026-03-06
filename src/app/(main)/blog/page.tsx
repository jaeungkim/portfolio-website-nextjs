import type { Metadata } from "next";
import Article from "./components/Article";
import { getSortedPostsData } from "./lib/posts";

export const metadata: Metadata = {
  title: "Jaeung Kim - Blog",
  description: "A collection of photo stories",
};

export default async function BlogPage() {
  const posts = await getSortedPostsData();

  return (
    <>
      <h1 className="mb-12 text-4xl font-bold text-foreground sm:text-5xl">
        Travel
      </h1>

      <div className="flex flex-col space-y-16">
        {posts.map((post, index) => (
          <Article key={post.id} post={post} index={index} />
        ))}
      </div>
    </>
  );
}
