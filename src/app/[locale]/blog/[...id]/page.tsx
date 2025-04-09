import { notFound } from "next/navigation";
import { getPostData } from "@/lib/posts";

import BackButton from "@/src/components/common/BackButton";
import ScrollIndicator from "@/src/components/common/ScrollIndicator";
import ScrollToTopButton from "@/src/components/common/ScrollToTopButton";
import MDXClient from "./MDXClient";
import { UtterancesComments } from "./UtterancesComments";

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
      {/* <BackButton /> */}

      <article className="prose dark:prose-invert mx-auto overflow-auto max-w-3xl">
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
