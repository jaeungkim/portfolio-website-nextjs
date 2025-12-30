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
          className="absolute -inset-y-6 -inset-x-4 z-0 scale-95 bg-muted opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl"
        />

        <h2 className="relative z-10 text-base font-semibold text-foreground">
          {post.title}
        </h2>

        <ArticleDate dateString={post.date} mobile />

        <p className="relative z-10 mt-2 text-sm text-muted-foreground">
          {post.summary}
        </p>

        <div className="relative z-10 mt-4 flex items-center text-sm font-medium text-muted-foreground">
          Read more
          <ArrowRight className="ml-1 h-4 w-4" aria-hidden="true" />
        </div>
      </Link>

      <ArticleDate dateString={post.date} mobile={false} />
    </motion.article>
  );
}

export default memo(Article);
