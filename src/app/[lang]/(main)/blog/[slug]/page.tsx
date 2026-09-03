import { notFound } from "next/navigation";
import { lang } from "next/root-params";
import type { Metadata } from "next";
import {
  getAllPostSlugs,
  getPostData,
} from "@/src/app/[lang]/(main)/blog/lib/posts";
import { formatDate } from "@/src/app/[lang]/(main)/blog/lib/utils";
import { OG_LOCALES, isLocale } from "@/src/i18n/config";
import {
  getDictionary,
  getLocale,
  localeAlternates,
} from "@/src/i18n/dictionaries";

export async function generateStaticParams() {
  const locale = await lang();
  if (!isLocale(locale)) return [];

  const slugs = await getAllPostSlugs(locale);
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const postData = await getPostData(slug, locale);

  if (!postData) {
    return {
      title: dict.blog.notFoundTitle,
    };
  }

  return {
    title: postData.title,
    description: postData.summary,
    alternates: await localeAlternates(`/blog/${slug}`),
    openGraph: {
      title: postData.title,
      description: postData.summary,
      type: "article",
      locale: OG_LOCALES[locale],
      publishedTime: postData.date,
    },
    twitter: {
      card: "summary",
      title: postData.title,
      description: postData.summary,
    },
  };
}

export default async function PostPage({
  params,
}: PageProps<"/[lang]/blog/[slug]">) {
  const { slug } = await params;
  const locale = await getLocale();
  const postData = await getPostData(slug, locale);

  if (!postData) notFound();

  const { default: Post } = await import(`../posts/${slug}.${locale}.mdx`);

  return (
    <article className="prose dark:prose-invert mx-auto max-w-3xl">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-foreground">
          {postData.title}
        </h1>
        <time
          dateTime={postData.date}
          className="text-sm text-muted-foreground"
        >
          {await formatDate(postData.date)}
        </time>
      </header>
      <div className="prose-lg">
        <Post />
      </div>
    </article>
  );
}
