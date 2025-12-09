"use client";

import { memo } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "motion/react";
import dayjs from "dayjs";
import clsx from "clsx";
import type { Post } from "../lib/posts";
import Link from "next/link";

interface ArticleProps {
  post: Post;
  index: number;
}

interface DateProps {
  dateString: string;
  mobile: boolean;
}

const ArticleDate = memo(function ArticleDate({
  dateString,
  mobile,
}: DateProps) {
  const date = dayjs(dateString);

  return (
    <time
      className={clsx(
        "relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500",
        mobile ? "md:hidden pl-3.5" : "hidden md:block mt-1"
      )}
      dateTime={dateString}
    >
      {mobile && (
        <span className="absolute inset-y-0 left-0 flex items-center">
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
        </span>
      )}
      {date.format("MMMM D, YYYY")}
    </time>
  );
});

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
            />
          </svg>
        </div>
      </Link>

      <ArticleDate dateString={post.date} mobile={false} />
    </motion.article>
  );
}

export default memo(Article);

