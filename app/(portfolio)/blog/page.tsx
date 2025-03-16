import { getSortedPostsData } from "@/lib/posts";
import { Suspense } from "react";
import BlogContent from "./BlogContent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Jaeung Kim - Blog",
  description: "Welcome to my personal blog",
};

export default async function Blog() {
  const allPostsData = await getSortedPostsData(); // Fetch on server

  return (
    <Suspense fallback={<p>Loading...</p>}>
      <BlogContent allPostsData={allPostsData} />
    </Suspense>
  );
}
