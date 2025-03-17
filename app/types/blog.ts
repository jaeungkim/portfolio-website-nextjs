import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface Post {
  id: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  category: string;
}

export type PostData = {
  slug: string;
  id: string;
  tags: string[];
  contentHtml: MDXRemoteSerializeResult;
  date: string;
  title: string;
  summary: string;
};
