import { notFound } from "next/navigation";
import { getAllPostSlugs, getPostData } from "@/src/utils/posts";

import ScrollIndicator from "@/src/components/common/ScrollIndicator";
import ScrollToTopButton from "@/src/components/common/buttons/ScrollToTopButton";
import { UtterancesComments } from "@/src/components/blog/UtterancesComments";
import { Link } from "@/src/i18n/routing";

export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false; // ensures 404 for unknown slugs

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const postData = await getPostData(slug);

  if (!postData) {
    notFound();
  }

  return (
    <>
      <ScrollIndicator />
      <ScrollToTopButton />

      <article className="prose dark:prose-invert mx-auto overflow-auto max-w-3xl">
        <h1 className="text-4xl font-bold mb-6">{postData.title}</h1>
        {postData.content}
      </article>

      {/* <section className="mt-16">
        <h2 className="text-2xl font-bold">Comments</h2>
        <UtterancesComments repo="jaeungkim/portfolio-website-nextjs" />
      </section> */}
    </>
  );
}
