import { GetStaticProps } from "next";
import Head from "next/head";
import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/shared/layout";
import { getSortedPostsData } from "../../lib/posts";
import Article from "@/components/blog/Article";
interface Post {
  id: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
}

interface BlogProps {
  allPostsData: Post[];
}

export default function Blog({ allPostsData }: BlogProps) {
  // Define tab to tags mapping
  const primaryKeywords = {
    Daily: "vlog",
    Study: "leetcode",
    Travel: "travel",
  };

  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  //Tabs
  const [activeTab, setActiveTab] = useState("Daily"); // New state for active tab

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
