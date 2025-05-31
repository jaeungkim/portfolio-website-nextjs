import { getSortedPostsData } from "@/lib/posts";
import BlogContent from "./BlogContent";

export default async function BlogContentLoader() {
  const allPostsData = await getSortedPostsData();

  return <BlogContent allPostsData={allPostsData} />;
}
