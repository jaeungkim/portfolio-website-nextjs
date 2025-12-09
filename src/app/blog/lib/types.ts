import type React from "react";

export interface Frontmatter {
  title: string;
  date: string;
  summary?: string;
}

export interface Post {
  id: string;
  title: string;
  date: string;
  summary: string;
}

export interface PostData {
  slug: string;
  id: string;
  content: React.ReactNode;
  date: string;
  title: string;
  summary: string;
}

