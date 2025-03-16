import { MDXRemoteSerializeResult } from "next-mdx-remote";

export interface Post {
  id: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  category: string;
}

export interface PostData {
  slug: string;
  id: string;
  tags: string[];
  contentHtml: MDXRemoteSerializeResult<
    Record<string, unknown>,
    Record<string, unknown>
  >;
  date: string;
  title: string;
  summary: string;
}
