import Head from "next/head";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/shared/layout";
import Article from "@/components/blog/Article";
import { getSortedPostsData } from "@/lib/posts";
import { GetStaticProps } from "next";
interface Post {
  id: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  category: string;
}

interface BlogProps {
  allPostsData: Post[];
}

export default function Blog({ allPostsData }: BlogProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [decryptName, setDecryptName] = useState<string>();
  const [activeTab, setActiveTab] = useState("daily");
  const categories = ["Daily", "Studying", "Travel"];

  const handleTagClick = (tag: string) => {
    setSelectedTags((prevSelectedTags) =>
      prevSelectedTags.includes(tag)
        ? prevSelectedTags.filter((t) => t !== tag)
        : [...prevSelectedTags, tag]
    );
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab.toLowerCase());
    setSelectedTags([]);
  };

  const filteredPostsByCategory = useMemo(() => {
    return allPostsData.filter(
      (post) => post.category.toLowerCase() === activeTab
    );
  }, [allPostsData, activeTab]);

  const secondaryTags = useMemo(() => {
    const tagsSet = new Set<string>();
    filteredPostsByCategory.forEach((post) => {
      post.tags.forEach((tag) => {
        if (tag.toLowerCase() !== activeTab) {
          tagsSet.add(tag);
        }
      });
    });
    return Array.from(tagsSet);
  }, [filteredPostsByCategory, activeTab]);

  const finalFilteredPosts = useMemo(() => {
    return selectedTags.length === 0
      ? filteredPostsByCategory
      : filteredPostsByCategory.filter((post) =>
          selectedTags.every((tag) => post.tags.includes(tag))
        );
  }, [filteredPostsByCategory, selectedTags]);

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
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => handleTabClick(category)}
            className={`mx-2 px-4 py-2 text-sm font-medium rounded-full ${
              activeTab === category.toLowerCase()
                ? "text-white"
                : "bg-transparent text-cyan-500"
            }`}
          >
            {category}
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
