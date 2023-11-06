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
  // Define tab to tags mapping
  const primaryKeywords = {
    Study: "leetcode",
    Travel: "travel",
    Daily: "vlog",
  };

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  //Tabs
  const [activeTab, setActiveTab] = useState("Study"); // New state for active tab

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    // Reset the selected tags when switching tabs
    setSelectedTags([]);
  };

  const tabs = Object.keys(primaryKeywords);

  // Determine the posts to display based on the active tab's primary keyword
  const filteredPostsByPrimary = useMemo(() => {
    return allPostsData.filter((post) =>
      post.tags
        .map((t) => t.toLowerCase())
        .includes(primaryKeywords[activeTab].toLowerCase())
    );
  }, [allPostsData, activeTab, primaryKeywords]);

  // Get secondary tags for pills excluding the primary keyword
  const secondaryTags = useMemo(() => {
    const allSecondaryTags = new Set<string>();
    filteredPostsByPrimary.forEach((post) => {
      post.tags.forEach((tag) => {
        if (tag.toLowerCase() !== primaryKeywords[activeTab].toLowerCase()) {
          allSecondaryTags.add(tag);
        }
      });
    });
    return Array.from(allSecondaryTags);
  }, [filteredPostsByPrimary, activeTab, primaryKeywords]);

  // Further filter posts by selected secondary tags
  const finalFilteredPosts = useMemo(() => {
    if (selectedTags.length === 0) {
      return filteredPostsByPrimary;
    }
    return filteredPostsByPrimary.filter((post) =>
      selectedTags.every((tag) => post.tags.includes(tag))
    );
  }, [filteredPostsByPrimary, selectedTags]);

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

      <div className="flex justify-center">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => handleTabClick(tab)}
            className={`mx-2 px-4 py-2 text-sm font-medium rounded-full ${
              activeTab === tab ? "text-white" : "bg-transparent text-cyan-500"
            }`}
          >
            {tab.replace("/", " / ")}
          </button>
        ))}
      </div>

      <motion.div className="mt-14 sm:mt-16">
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex flex-col space-y-16">
            <div className="flex flex-wrap justify-center">
              {secondaryTags.map((tag) => (
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
            {finalFilteredPosts.map((post, index) => (
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
