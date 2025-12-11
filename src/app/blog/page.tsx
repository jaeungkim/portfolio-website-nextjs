import type { Metadata } from "next";
import { Suspense } from "react";
import Article from "./components/Article";
import PostsSkeleton from "./components/PostsSkeleton";
import { getSortedPostsData } from "./lib/posts";

export const dynamic = "force-static";

export const metadata: Metadata = {
  title: "Jaeung Kim - Blog",
  description: "A collection of photo stories",
};

/**
 * 포스트 목록 - 데이터 페칭을 담당하는 async 컴포넌트
 * Suspense 내부에서 스트리밍됨
 */
async function PostsList() {
  const posts = await getSortedPostsData();

  return (
    <div className="flex flex-col space-y-16">
      {posts.map((post, index) => (
        <Article key={post.id} post={post} index={index} />
      ))}
    </div>
  );
}

/**
 * 블로그 페이지 - 쉘 UI가 즉시 렌더링되고 포스트 목록은 스트리밍됨
 */
export default function BlogPage() {
  return (
    <div className="py-4 max-w-5xl mx-auto px-4">
      <h1 className="mb-12 text-4xl font-bold text-neutral-800 dark:text-neutral-100 sm:text-5xl">
        Travel
      </h1>

      <Suspense fallback={<PostsSkeleton />}>
        <PostsList />
      </Suspense>
    </div>
  );
}
