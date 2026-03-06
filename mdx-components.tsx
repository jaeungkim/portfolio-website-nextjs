import type React from "react";
import type { MDXComponents } from "mdx/types";
import BlurImage from "@/src/components/shared/BlurImage";
import { InlineCode } from "@/src/components/shared/InlineCode";
import placeholders from "@/src/app/(main)/blog/data/placeholders.json";

interface BlurImageProps {
  url: string;
  alt?: string;
  blurDataURL?: string;
  preload?: boolean;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const placeholderMap = placeholders as Record<string, string>;

  function BlurImageWithPlaceholder({ url, alt, preload }: BlurImageProps) {
    const blurDataURL = placeholderMap[url];

    return (
      <BlurImage
        url={url}
        alt={alt}
        blurDataURL={blurDataURL}
        preload={preload}
      />
    );
  }

  return {
    img: BlurImageWithPlaceholder,
    BlurImage: BlurImageWithPlaceholder,
    code: InlineCode,
    ...components,
  };
}
