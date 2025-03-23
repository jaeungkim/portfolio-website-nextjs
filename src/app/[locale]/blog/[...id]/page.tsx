export const dynamic = "force-dynamic";

import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getPostData } from "@/lib/posts";

import BackButton from "@/src/components/BackButton";
import ScrollIndicator from "@/src/components/ScrollIndicator";
import ScrollToTopButton from "@/src/components/ScrollToTopButton";
import MDXClient from "./MDXClient";
import { UtterancesComments } from "./UtterancesComments";

export async function generateMetadata({ params }) {
  const { id } = await params;

  if (!id || id.length !== 2) {
    return {
      title: "Post Not Found",
    };
  }

  const [category, slug] = id.map(decodeURIComponent);

  const postData = await getPostData([category, slug]);

  if (!postData) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: postData.title,
    description: postData.summary || "",
  };
}

export default async function PostPage({ params }) {
  const { id } = await params;

  if (!id || id.length !== 2) {
    notFound();
  }

  const [category, slug] = id.map(decodeURIComponent);

  const postData = await getPostData([category, slug]);

  if (!postData) {
    notFound();
  }

  return (
    <>
      <ScrollIndicator />
      <ScrollToTopButton />
      <BackButton />

      <article className="prose lg:prose-lg dark:prose-invert prose-a:text-cyan-600 hover:prose-a:text-cyan-500 mx-auto overflow-auto !max-w-none">
        <h1 className="text-4xl font-bold mb-6">{postData.title}</h1>
        <MDXClient source={postData.contentHtml} />
      </article>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">Comments</h2>
        <UtterancesComments repo="jaeungkim/portfolio-website-nextjs" />
      </section>
    </>
  );
}
