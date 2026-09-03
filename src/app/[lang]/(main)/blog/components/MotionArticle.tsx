"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";

const REVEAL_STAGGER_S = 0.01;
const REVEAL_DURATION_S = 0.6;

interface MotionArticleProps {
  index: number;
  className?: string;
  children: ReactNode;
}

export function MotionArticle({
  index,
  className,
  children,
}: MotionArticleProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: REVEAL_DURATION_S,
        delay: index * REVEAL_STAGGER_S,
      }}
      className={className}
    >
      {children}
    </motion.article>
  );
}
