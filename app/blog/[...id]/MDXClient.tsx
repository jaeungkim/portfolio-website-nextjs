"use client";

import { MDXRemote, MDXRemoteSerializeResult } from "next-mdx-remote";
import mdxComponents from "./mdxComponents";

interface MDXClientProps {
  source: MDXRemoteSerializeResult;
}

export default function MDXClient({ source }: MDXClientProps) {
  return <MDXRemote {...source} components={mdxComponents} />;
}
