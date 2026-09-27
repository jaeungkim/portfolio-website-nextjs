import type { Metadata } from "next";
import { Article } from "@/app/[lang]/(main)/blog/_components/Article";
import { getSortedPostsData } from "@/app/[lang]/(main)/blog/_lib/posts";
import { getDictionary, localeAlternates } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: dict.blog.metaTitle,
    description: dict.blog.metaDescription,
    alternates: await localeAlternates("/blog"),
  };
}

export default async function BlogPage() {
  const dict = await getDictionary();
  const posts = await getSortedPostsData();

  return (
    <>
      <h1 className="mb-12 text-4xl font-bold sm:text-5xl">
        {dict.blog.title}
      </h1>

      <div className="flex flex-col space-y-16">
        {posts.map((post) => (
          <Article key={post.slug} post={post} />
        ))}
      </div>
    </>
  );
}
