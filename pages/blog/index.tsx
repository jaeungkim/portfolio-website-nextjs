import { GetStaticProps } from "next";
import Head from "next/head";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Date from "../../components/shared/date";
import Layout from "../../components/shared/layout";
import { getSortedPostsData } from "../../lib/posts";
import Link from "next/link";
import { useInView } from "react-intersection-observer";

interface Post {
  id: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
}

interface ArticleProps {
  post: Post;
  index: number;
}

const Article: React.FC<ArticleProps> = ({ post, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  return (
    <motion.article
      ref={ref}
      className="md:grid md:grid-cols-4 md:items-baseline"
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.01 }}
      key={post.id}
    >
      <div className="md:col-span-3 group relative flex flex-col items-start">
        <h2 className="text-base font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          <div className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"></div>
          <Link href={`/blog/${post.id}`}>
            <span className="absolute -inset-y-6 -inset-x-4 z-20 sm:-inset-x-6 sm:rounded-2xl"></span>
            <span className="relative z-10">{post.title}</span>
          </Link>
        </h2>
        <Date dateString={post.date} mobile={true} />
        <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {post.summary}
        </p>
        <div
          aria-hidden="true"
          className="relative z-10 mt-4 flex items-center text-sm font-medium text-cyan-500"
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
      <Date dateString={post.date} mobile={false} />
    </motion.article>
  );
};

interface BlogProps {
  allPostsData: Post[];
}

export default function Blog({ allPostsData }: BlogProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagClick = useMemo(() => {
    return (tag: string) => {
      setSelectedTags((prevSelectedTags) =>
        prevSelectedTags.includes(tag)
          ? prevSelectedTags.filter((t) => t !== tag)
          : [...prevSelectedTags, tag]
      );
    };
  }, []);

  const tags = useMemo(
    () => Array.from(new Set(allPostsData.flatMap((post) => post.tags))),
    [allPostsData]
  );

  const postMatchesSelectedTags = (post: Post) =>
    selectedTags.every((tag) => post.tags.includes(tag));

  return (
    <Layout>
      <Head>
        <title>Jaeung Kim - Blog</title>
      </Head>
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        Blog
      </h1>
      <p className="my-6 text-base text-zinc-600 dark:text-zinc-400">
        Welcome to my personal blog, where I share my thoughts and experiences
        on various topics including technology, travel, personal development and
        more. Join me on this journey as I explore the world and share my
        perspective through written word.
      </p>
      <motion.div className="mt-14 sm:mt-16">
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            <div className="flex flex-wrap justify-center">
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
            {allPostsData.filter(postMatchesSelectedTags).map((post, index) => (
              <Article post={post} index={index} key={post.id} />
            ))}
          </div>
        </div>
      </motion.div>
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
