import { Suspense } from "react";
import type { Metadata } from "next";
import BlogContent from "@/src/components/blog/BlogContent";

export const metadata: Metadata = {
  title: "Jaeung Kim - Blog",
  description: "A collection of photo stories",
};

export default function BlogPage() {
  return (
    <div className="px-4 py-10 max-w-5xl mx-auto">
      <h1 className="mb-8 text-4xl font-bold text-neutral-800 dark:text-neutral-100 sm:text-5xl">
        Blog
      </h1>

      <Suspense fallback={<p className="text-center mt-10">Loading posts...</p>}>
        <BlogContent />
      </Suspense>
    </div>
  );
}
