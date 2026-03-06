import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPostSlugs, getPostData } from "../lib/posts";
import { formatDate } from "../lib/utils";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
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

export default async function PostPage({ params }: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const postData = await getPostData(slug);

  if (!postData) notFound();

  const { default: Post } = await import(`../posts/${slug}.mdx`);

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
          {formatDate(postData.date)}
        </time>
      </header>
      <div className="prose-lg">
        <Post />
      </div>
    </article>
  );
}
