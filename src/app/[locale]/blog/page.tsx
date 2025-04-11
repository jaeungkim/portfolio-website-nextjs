import { Suspense } from "react";
import BlogContentLoader from "./BlogContentLoader";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jaeung Kim - Blog",
  description: "Welcome to my personal blog",
};

export default function Blog() {
  return (
    <>
      <h1 className="mb-4 text-4xl font-bold text-neutral-800 dark:text-neutral-100 sm:text-5xl">
        Blog
      </h1>

      <div className="py-4">
        <p className="text-gray-500 dark:text-gray-400">
          Currently renovating my blog page...!
        </p>
      </div>

      <Suspense
        fallback={<p className="text-center mt-10">Loading posts...</p>}
      >
        <BlogContentLoader />
      </Suspense>
    </>
  );
}
