import type React from "react";
import type { MDXComponents } from "mdx/types";
import BlurImage from "@/src/components/shared/BlurImage";
import { InlineCode } from "@/src/components/shared/InlineCode";
import placeholders from "@/src/app/(main)/blog/data/placeholders.json";

interface BlurImageProps {
  url?: string;
  src?: string;
  alt?: string;
  blurDataURL?: string;
  preload?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const placeholderMap = placeholders as Record<string, string>;

  function BlurImageWithPlaceholder({
    url,
    src,
    alt,
    preload,
    priority,
    className,
    sizes,
    quality,
  }: BlurImageProps) {
    const imageUrl = url ?? src;

    if (!imageUrl) {
      return null;
    }

    const blurDataURL = placeholderMap[imageUrl];

    return (
      <BlurImage
        url={imageUrl}
        alt={alt}
        blurDataURL={blurDataURL}
        preload={preload}
        priority={priority}
        className={className}
        sizes={sizes}
        quality={quality}
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
