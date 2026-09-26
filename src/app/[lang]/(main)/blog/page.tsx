import type { Metadata } from "next";
import { Article } from "@/src/app/[lang]/(main)/blog/components/Article";
import { getSortedPostsData } from "@/src/app/[lang]/(main)/blog/lib/posts";
import { OG_LOCALES } from "@/src/i18n/config";
import {
  getDictionary,
  getLocale,
  localeAlternates,
} from "@/src/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return {
    title: dict.blog.metaTitle,
    description: dict.blog.metaDescription,
    alternates: {
      ...(await localeAlternates("/blog")),
      types: { "application/rss+xml": "/feed.xml" },
    },
    openGraph: {
      type: "website",
      siteName: dict.site.name,
      title: dict.blog.metaTitle,
      description: dict.blog.metaDescription,
      url: `/${locale}/blog`,
      locale: OG_LOCALES[locale],
    },
  };
}

export default async function BlogPage() {
  const dict = await getDictionary();
  const posts = await getSortedPostsData();

  return (
    <>
      <h1 className="mb-12 text-4xl font-bold text-foreground sm:text-5xl">
        {dict.blog.title}
      </h1>

      <div className="flex flex-col space-y-16">
        {posts.map((post) => (
          <Article key={post.id} post={post} />
        ))}
      </div>
    </>
  );
}
