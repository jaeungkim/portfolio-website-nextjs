import { notFound } from "next/navigation";
import { Metadata } from "next";

import BackButton from "@/app/components/BackButton";
import ScrollIndicator from "@/app/components/ScrollIndicator";
import ScrollToTopButton from "@/app/components/ScrollToTopButton";
import { getPostData } from "@/lib/posts";
import MDXClient from "./MDXClient";
import { UtterancesComments } from "./UtterancesComments";

interface PostPageProps {
  params: { id: string[] };
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  if (params.id.length !== 2) return { title: "Post Not Found" };

  const [category, slug] = params.id.map(decodeURIComponent);

  const postData = await getPostData([category, slug]);
  if (!postData) return { title: "Post Not Found" };

  return { title: postData.title, description: postData.summary || "" };
}

export default async function PostPage({ params }: PostPageProps) {
  if (params.id.length !== 2) return notFound();

  const [category, slug] = params.id.map(decodeURIComponent);

  const postData = await getPostData([category, slug]);
  if (!postData) return notFound();

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
