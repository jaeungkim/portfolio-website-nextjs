import Head from "next/head";
import { getSortedPostsData } from "../lib/posts";
import Date from "../components/shared/date";
import { GetStaticProps } from "next";
import Layout from "../components/shared/layout";
import ViewCounter from "../components/shared/viewCounter";
import { useState } from "react";

export default function Blog({
  allPostsData,
}: {
  allPostsData: {
    tags: string[];
    date: string;
    summary: string;
    title: string;
    id: string;
  }[];
}) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const tags: string[] = Array.from(
    new Set(allPostsData.flatMap((post) => post.tags))
  );

  function handleTagClick(tag: string) {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  }

  function postMatchesSelectedTags(post: any) {
    return selectedTags.every((tag: string) => post.tags.includes(tag));
  }

  return (
    <Layout>
      <Head>
        <title>Jaeung Kim - Blog</title>
      </Head>
      <div className="mt-16 sm:mt-20">
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            <div className="flex flex-wrap justify-center mt-6">
              {tags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => handleTagClick(tag)}
                  className={`mx-2 my-1 px-3 py-1 border rounded-full text-sm font-medium ${
                    selectedTags.includes(tag)
                      ? "bg-zinc-500 text-zinc-50 dark:bg-zinc-800 dark:text-zinc-100"
                      : "border-zinc-500 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400"
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
            {allPostsData
              .filter(postMatchesSelectedTags)
              .map(({ id, date, summary, title, tags }) => (
                <article
                  className="md:grid md:grid-cols-4 md:items-baseline"
                  key={id}
                >
                  <div className="md:col-span-3 group relative flex flex-col items-start">
                    <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
                      <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
                      <a href={`/posts/${id}`}>
                        <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
                        <span className="relative z-10">{title}</span>
                      </a>
                    </h2>
                    <Date dateString={date} mobile={true} />
                    <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      {summary}
                    </p>
                    <div
                      aria-hidden="true"
                      className="relative z-10 mt-4 flex items-center text-sm font-medium text-teal-500"
                    >
                      Read article
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        aria-hidden="true"
                        className="ml-1 h-4 w-4 stroke-current"
                      >
                        <path
                          d="M6.75 5.75 9.25 8l-2.5 2.25"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        ></path>
                      </svg>
                    </div>
                  </div>
                  <Date dateString={date} mobile={false} />
                </article>
              ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const allPostsData = getSortedPostsData();
  return {
    props: {
      allPostsData,
    },
  };
};
