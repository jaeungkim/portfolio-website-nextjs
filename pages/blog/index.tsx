import { GetStaticProps } from "next";
import Head from "next/head";
import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import Layout from "@/components/shared/layout";
import { getSortedPostsData } from "@/lib/posts";
import Article from "@/components/blog/Article";

interface Post {
  id: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  category: string; // Add this line to include the category property
}

interface BlogProps {
  allPostsData: Post[];
}

export default function Blog({ allPostsData }: BlogProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [decryptName, setDecryptName] = useState<string>();
  //Tabs
  const [activeTab, setActiveTab] = useState("daily"); // New state for active tab
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
    setSelectedTags([]); // Reset tags when changing category
  };

  // Filter posts by category
  const filteredPostsByCategory = useMemo(() => {
    return allPostsData.filter(
      (post) => post.category.toLowerCase() === activeTab
    );
  }, [allPostsData, activeTab]);

  // Get unique secondary tags for the selected category
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

  // Further filter posts by selected tags
  const finalFilteredPosts = useMemo(() => {
    return selectedTags.length === 0
      ? filteredPostsByCategory
      : filteredPostsByCategory.filter((post) =>
          selectedTags.every((tag) => post.tags.includes(tag))
        );
  }, [filteredPostsByCategory, selectedTags]);

  useEffect(() => {
    async function decryptAndRetrieveData() {
      try {
        console.log("Attempting to retrieve data from localStorage");
        console.log("localStorage keys available:", Object.keys(localStorage));

        const encryptedData = localStorage.getItem("encryptedUserInfo");
        const iv = localStorage.getItem("userInfoIV");
        const base64Key = localStorage.getItem("encryptionKey");

        if (!encryptedData || !iv || !base64Key) {
          console.error("No encrypted data, IV, or key found in Local Storage");
          console.log("encryptedData:", encryptedData);
          console.log("IV:", iv);
          console.log("Key:", base64Key);
          return;
        }

        const encryptedBuffer = Uint8Array.from(atob(encryptedData), (c) =>
          c.charCodeAt(0)
        );
        const ivBuffer = Uint8Array.from(atob(iv), (c) => c.charCodeAt(0));
        const keyBuffer = Uint8Array.from(atob(base64Key), (c) =>
          c.charCodeAt(0)
        );

        // Import the key
        const key = await window.crypto.subtle.importKey(
          "raw",
          keyBuffer,
          {
            name: "AES-GCM",
            length: 256,
          },
          true,
          ["decrypt"]
        );

        const decryptedData = await window.crypto.subtle.decrypt(
          {
            name: "AES-GCM",
            iv: ivBuffer,
          },
          key,
          encryptedBuffer
        );

        const dec = new TextDecoder();
        const decryptedStr = dec.decode(decryptedData);
        const userInfo = JSON.parse(decryptedStr);
        console.log(userInfo);
        setDecryptName(userInfo.name);
      } catch (error) {
        console.error("Error decrypting or retrieving data:", error);
      }
    }

    decryptAndRetrieveData();
  }, []);

  return (
    <Layout>
      <Head>
        <title>Jaeung Kim - Blog</title>
      </Head>
      <h1 className="mb-4 text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
        Blog
      </h1>
      <p>{decryptName}</p>
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
