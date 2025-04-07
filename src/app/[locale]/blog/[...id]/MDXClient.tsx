"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import { mdxComponents } from "@/src/components/mdx/MdxComponents";
interface MDXClientProps {
  source: MDXRemoteSerializeResult;
}

export default function MDXClient({ source }: MDXClientProps) {
  return <MDXRemote {...source} components={mdxComponents} />;
}
