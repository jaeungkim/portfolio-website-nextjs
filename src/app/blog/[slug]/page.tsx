import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPostSlugs, getPostData } from "../lib/posts";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;
export const dynamic = "force-static";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getPostData(slug);

  if (!postData) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${postData.title} | Jaeung Kim`,
    description: postData.summary,
    openGraph: {
      title: postData.title,
      description: postData.summary,
      type: "article",
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
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const postData = await getPostData(slug);
  if (!postData) notFound();

  return (
      <article className="prose dark:prose-invert mx-auto overflow-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">{postData.title}</h1>
        {postData.content}
      </article>
  );
}

