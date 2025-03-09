import Head from "next/head";
import { GetStaticProps, GetStaticPaths } from "next";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import dynamic from "next/dynamic";

import Layout from "@/components/shared/layout";
import ScrollIndicator from "@/components/shared/scrollIndicator";
import ScrollToTopButton from "@/components/shared/scrollToTopButton";
import BackButton from "@/components/shared/backButton";
import mdxComponents from "@/components/shared/mdxComponents";
import { getAllPostIds, getPostData } from "@/lib/posts";

// Dynamically import comments to improve performance
const UtterancesComments = dynamic(
  () =>
    import("@/components/shared/utterancesComments").then(
      (mod) => mod.UtterancesComments
    ),
  { ssr: false }
);

interface PostProps {
  postData: {
    id: string;
    title: string;
    contentHtml: MDXRemoteSerializeResult;
  };
}

export default function Post({ postData }: PostProps) {
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>

      <ScrollIndicator />
      <ScrollToTopButton />
      <BackButton />

      <article className="prose lg:prose-lg dark:prose-invert prose-a:text-cyan-600 hover:prose-a:text-cyan-500 mx-auto overflow-auto !max-w-none">
        <h1 className="text-4xl font-bold mb-6">{postData.title}</h1>
        <MDXRemote {...postData.contentHtml} components={mdxComponents} />
      </article>

      <section className="mt-16">
        <h2 className="text-2xl font-bold">Comments</h2>
        <UtterancesComments repo="jaeungkim/portfolio-website-nextjs" />
      </section>
    </Layout>
  );
}

/**
 * Generate static paths for all posts.
 */
export const getStaticPaths: GetStaticPaths = async () => ({
  paths: getAllPostIds(),
  fallback: false,
});

/**
 * Fetch post data at build time.
 */
export const getStaticProps: GetStaticProps<PostProps> = async ({ params }) => {
  if (!params?.id || !Array.isArray(params.id)) return { notFound: true };

  const postData = await getPostData(params.id);
  return { props: { postData } };
};
