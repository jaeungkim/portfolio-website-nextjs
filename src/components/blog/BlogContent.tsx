import { getSortedPostsData } from "@/lib/posts";
import Article from "./Article";

export default async function BlogContent() {
  const allPostsData = await getSortedPostsData();

  return (
    <div className="flex flex-col space-y-16">
      {allPostsData.map((post, index) => (
        <Article key={post.id} post={post} index={index} />
      ))}
    </div>
  );
}
