import CodeBlock from "@/src/components/mdx/CodeBlock/CodeBlock";
import Image from "next/image";

export const mdxComponents = {
  pre: (props: any) => <CodeBlock {...props} />,
  Image,
};
