"use client";

import { memo } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import type { Post } from "../lib/types";
import ArticleDate from "./ArticleDate";

interface ArticleProps {
  post: Post;
  index: number;
}

function Article({ post, index }: ArticleProps) {
  const [ref, inView] = useInView({ triggerOnce: true });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.01 }}
      className="md:grid md:grid-cols-4 md:items-baseline"
    >
      <Link
        href={`/blog/${post.id}`}
        className="md:col-span-3 group relative flex flex-col items-start"
      >
        <div
          aria-hidden="true"
          className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 dark:bg-zinc-800/50 sm:-inset-x-6 sm:rounded-2xl"
        />

        <h2 className="relative z-10 text-base font-semibold text-zinc-800 dark:text-zinc-100">
          {post.title}
        </h2>

        <ArticleDate dateString={post.date} mobile />

        <p className="relative z-10 mt-2 text-sm text-zinc-600 dark:text-zinc-400">
          {post.summary}
        </p>

        <div className="relative z-10 mt-4 flex items-center text-sm font-medium text-zinc-500">
          Read more
          <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
        </div>
      </Link>

      <ArticleDate dateString={post.date} mobile={false} />
    </motion.article>
  );
}

export default memo(Article);

