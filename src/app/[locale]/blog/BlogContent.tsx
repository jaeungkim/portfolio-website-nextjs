"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Article from "./Article";
import { Post } from "@/src/app/types/blog";

interface BlogProps {
  allPostsData: Post[];
}

const categories = ["Daily", "Personal"];

export default function BlogContent({ allPostsData }: BlogProps) {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState("daily");

  const handleTagClick = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleTabClick = (tab: string) => {
    const normalized = tab.toLowerCase();
    if (normalized !== activeTab) {
      setActiveTab(normalized);
      setSelectedTags([]); // reset tags on tab change
    }
  };

  // Filter by category
  const filteredPosts = allPostsData.filter(
    (post) => post.category.toLowerCase() === activeTab
  );

  // Get unique tags from filtered posts (excluding the active category name as tag)
  const tagSet = new Set<string>();
  for (const post of filteredPosts) {
    for (const tag of post.tags || []) {
      if (tag.toLowerCase() !== activeTab) tagSet.add(tag);
    }
  }
  const availableTags = Array.from(tagSet).sort((a, b) => a.localeCompare(b));

  // Filter posts by selected tags
  const displayedPosts =
    selectedTags.length === 0
      ? filteredPosts
      : filteredPosts.filter((post) =>
          selectedTags.every((tag) => post.tags?.includes(tag))
        );

  return (
    <>
      {/* Category Tabs */}
      <div className="flex justify-center">
        {categories.map((category) => {
          const normalized = category.toLowerCase();
          return (
            <button
              key={category}
              onClick={() => handleTabClick(category)}
              className={`border border-solid mx-2 my-1 px-3 py-1 text-sm font-medium rounded-full
                ${
                  activeTab === normalized
                    ? "bg-neutral-800 text-white"
                    : "border-neutral-500 text-neutral-500 dark:border-neutral-800 dark:text-neutral-400"
                }`}
            >
              {category}
            </button>
          );
        })}
      </div>

      {/* Filter Tags */}
      {availableTags.length > 0 && (
        <div className="flex flex-wrap justify-center mt-6">
          {availableTags.map((tag) => (
            <button
              key={tag}
              onClick={() => handleTagClick(tag)}
              className={`mx-2 my-1 px-3 py-1 border rounded-full text-sm font-medium ${
                selectedTags.includes(tag)
                  ? "bg-neutral-500 text-white dark:bg-neutral-800 dark:text-white"
                  : "border-neutral-500 text-neutral-500 dark:border-neutral-800 dark:text-neutral-400"
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      )}

      {/* Blog Posts */}
      <motion.div className="mt-14 sm:mt-16">
        <div className="md:border-l md:border-neutral-100 md:pl-6 md:dark:border-neutral-700/40">
          <div className="flex flex-col space-y-16">
            {displayedPosts.length > 0 ? (
              displayedPosts.map((post, index) => (
                <Article key={post.id} post={post} index={index} />
              ))
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">
                No posts found.
              </p>
            )}
          </div>
        </div>
      </motion.div>
    </>
  );
}
