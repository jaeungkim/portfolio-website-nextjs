import Layout from "@/components/shared/layout";
import Head from "next/head";
import utilStyles from "@/styles/utils.module.css";
import { GetStaticProps, GetStaticPaths } from "next";
import { MDXRemote } from "next-mdx-remote";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";
import dynamic from "next/dynamic";
import ScrollIndicator from "@/components/shared/scrollIndicator";
import ScrollToTopButton from "@/components/shared/scrollToTopButton";
import BackButton from "@/components/shared/backButton";
import ViewCounter from "@/components/shared/viewCounter";
import mdxComponents from "@/components/shared/mdxComponents";
import { getAllPostIds, getPostData } from "@/lib/posts";

// Dynamic import for UtterancesComments
const UtterancesComments = dynamic(() =>
  import("@/components/shared/utterancesComments").then(
    (mod) => mod.UtterancesComments
  )
);

interface PostData {
  id: string;
  title: string;
  date: string;
  tags: string[];
  contentHtml: MDXRemoteSerializeResult;
}

interface PostProps {
  postData: PostData;
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
      <ViewCounter slug={postData.id} />
      <article className="prose lg:prose-lg dark:prose-invert mx-auto overflow-auto !max-w-none">
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div key={postData.id}>
          <MDXRemote {...postData.contentHtml} components={mdxComponents} />
        </div>
      </article>
      <div>
        <h1 className={utilStyles.headingXl}>Comments</h1>
        <UtterancesComments repo="jaeungkim/portfolio-website-nextjs" />
      </div>
    </Layout>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const postData = await getPostData(params?.id as string);
  return {
    props: {
      postData,
    },
  };
};
