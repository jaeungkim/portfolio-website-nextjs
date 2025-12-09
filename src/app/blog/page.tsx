import Article from "@/src/components/blog/Article";
import { getSortedPostsData } from "@/src/utils/posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jaeung Kim - Blog",
  description: "A collection of photo stories",
};

export default async function BlogPage() {
  const posts = await getSortedPostsData();

  return (
    <div className="py-4 max-w-5xl mx-auto">
      <h1 className="mb-12 text-4xl font-bold text-neutral-800 dark:text-neutral-100 sm:text-5xl">
        Travel
      </h1>

      {/* render list directly; no Suspense needed */}
      <div className="flex flex-col space-y-16">
        {posts.map((post, index) => (
          <Article key={post.id} post={post} index={index} />
        ))}
      </div>
    </div>
  );
}

