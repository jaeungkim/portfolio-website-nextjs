import type { Metadata } from "next";
import { Article } from "@/src/app/[lang]/(main)/blog/components/Article";
import { getSortedPostsData } from "@/src/app/[lang]/(main)/blog/lib/posts";
import {
  getDictionary,
  getLocale,
  localeAlternates,
} from "@/src/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: dict.blog.metaTitle,
    description: dict.blog.metaDescription,
    alternates: await localeAlternates("/blog"),
  };
}

export default async function BlogPage() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const posts = await getSortedPostsData(locale);

  return (
    <>
      <h1 className="mb-12 text-4xl font-bold text-foreground sm:text-5xl">
        {dict.blog.title}
      </h1>

      <div className="flex flex-col space-y-16">
        {posts.map((post, index) => (
          <Article key={post.id} post={post} index={index} />
        ))}
      </div>
    </>
  );
}
