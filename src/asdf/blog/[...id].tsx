// import Layout from "@/src/components/shared/layout";
// import Head from "next/head";
// import utilStyles from "@/styles/utils.module.css";
// import { GetStaticProps, GetStaticPaths } from "next";
// import { MDXRemote } from "next-mdx-remote";
// import type { MDXRemoteSerializeResult } from "next-mdx-remote";
// import dynamic from "next/dynamic";
// import ScrollIndicator from "@/src/components/shared/scrollIndicator";
// import BackButton from "@/src/components/shared/backButton";
// import mdxComponents from "@/src/components/shared/mdxComponents";
// import { getAllPostIds, getPostData } from "@/src/lib/posts";

// // Dynamic import for UtterancesComments
// const UtterancesComments = dynamic(() =>
//   import("@/src/components/shared/utterancesComments").then(
//     (mod) => mod.UtterancesComments
//   )
// );

// interface PostData {
//   id: string;
//   title: string;
//   date: string;
//   tags: string[];
//   contentHtml: MDXRemoteSerializeResult;
// }

// interface PostProps {
//   postData: PostData;
// }

// export default function Post({ postData }: PostProps) {
//   return (
//     <Layout>
//       <Head>
//         <title>{postData.title}</title>
//       </Head>
//       <ScrollIndicator />
//       <BackButton />
//       <article className="prose lg:prose-lg dark:prose-invert prose-a:text-cyan-600 hover:prose-a:text-cyan-500 mx-auto overflow-auto !max-w-none">
//         <h1 className={utilStyles.headingXl}>{postData.title}</h1>
//         <div key={postData.id}>
//           <MDXRemote {...postData.contentHtml} components={mdxComponents} />
//         </div>
//       </article>
//       <div>
//         <h1 className={utilStyles.headingXl}>Comments</h1>
//         <UtterancesComments repo="jaeungkim/portfolio-website-nextjs" />
//       </div>
//     </Layout>
//   );
// }

// export const getStaticPaths: GetStaticPaths = async () => {
//   const paths = getAllPostIds();
//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async ({ params }) => {
//   if (!params || !Array.isArray(params.id)) {
//     return { notFound: true };
//   }

//   const postData = await getPostData(params.id);
//   return {
//     props: {
//       postData,
//     },
//   };
// };
