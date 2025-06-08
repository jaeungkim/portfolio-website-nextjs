export const dynamic = "force-static";

import { getSortedPostsData } from "@/src/lib/posts";
import Date from "@/src/components/common/Date";
import type { Metadata } from "next";
import { Link } from "@/src/i18n/routing";

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
      <div className="flex flex-col space-y-16">
        {posts.map((post) => (
          <article
            key={post.id}
            className="md:grid md:grid-cols-4 md:items-baseline"
          >
            <Link
              href={`/blog/${post.id}`}
              className="md:col-span-3 group relative flex flex-col items-start"
            >
              <div
                aria-hidden="true"
                className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
              />

              <h2 className="relative z-10 text-base font-semibold  text-zinc-800 dark:text-zinc-100">
                {post.title}
              </h2>

              <Date dateString={post.date} mobile />

              <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {post.summary}
              </p>
            </Link>

            <Date dateString={post.date} mobile={false} />
          </article>
        ))}
      </div>
    </div>
  );
}
