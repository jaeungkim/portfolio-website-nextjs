import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  getAllPostSlugs,
  getPostData,
} from "@/app/[lang]/(main)/blog/_lib/posts";
import { formatDate } from "@/app/[lang]/(main)/blog/_lib/format-date";
import { OG_LOCALES } from "@/i18n/config";
import {
  getDictionary,
  getLocale,
  localeAlternates,
} from "@/i18n/dictionaries";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);
  const postData = await getPostData(slug);

  if (!postData) notFound();

  return {
    title: postData.title,
    description: postData.summary,
    alternates: await localeAlternates(`/blog/${slug}`),
    openGraph: {
      title: postData.title,
      type: "article",
      siteName: dict.site.name,
      url: `/${locale}/blog/${slug}`,
      locale: OG_LOCALES[locale],
      publishedTime: postData.date,
      ...(postData.hero && {
        images: [{ ...postData.hero, alt: postData.title }],
      }),
    },
  };
}

export default async function PostPage({
  params,
}: PageProps<"/[lang]/blog/[slug]">) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  if (!postData) notFound();

  const { default: Post } = await import(`../_posts/${slug}.mdx`);

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
