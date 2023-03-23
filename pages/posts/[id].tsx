import Layout from "../../components/shared/layout";
import { getAllPostIds, getPostData } from "../../lib/posts";
import Head from "next/head";
import utilStyles from "../../styles/utils.module.css";
import { GetStaticProps, GetStaticPaths } from "next";
import { useRouter } from "next/router";
import ViewCounter from "../../components/shared/viewCounter";
import ScrollIndicator from "../../components/shared/scrollIndicator";
import BackButton from "../../components/shared/backButton";

export default function Post({
  postData,
}: {
  postData: {
    id: string;
    title: string;
    date: string;
    tags: string[];
    contentHtml: string;
  };
}) {
  const router = useRouter();
  return (
    <Layout>
      <Head>
        <title>{postData.title}</title>
      </Head>
      <ScrollIndicator />
      <BackButton />
      <ViewCounter slug={postData.id} />
      <article className="prose prose-tr:border-none lg:prose-xl dark:prose-invert mx-auto overflow-auto">
        <h1 className={utilStyles.headingXl}>{postData.title}</h1>
        <div dangerouslySetInnerHTML={{ __html: postData.contentHtml }} />
      </article>
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
