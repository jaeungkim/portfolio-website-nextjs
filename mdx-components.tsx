import type React from "react";
import type { MDXComponents } from "mdx/types";
import BlurImage from "@/src/components/shared/BlurImage";
import { InlineCode } from "@/src/components/shared/InlineCode";
import placeholders from "@/src/app/(main)/blog/data/placeholders.json";

type PlaceholderEntry = {
  blurDataURL: string;
  width: number;
  height: number;
};

interface BlurImageProps {
  url?: string;
  src?: string;
  alt?: string;
  priority?: boolean;
  width?: number;
  height?: number;
  className?: string;
  sizes?: string;
  quality?: number;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const placeholderMap = placeholders as unknown as Record<
    string,
    PlaceholderEntry
  >;

  function BlurImageWithPlaceholder({
    url,
    src,
    alt,
    priority,
    width,
    height,
    className,
    sizes,
    quality,
  }: BlurImageProps) {
    const imageUrl = url ?? src;

    if (!imageUrl) {
      return null;
    }

    const entry = placeholderMap[imageUrl];

    return (
      <BlurImage
        url={imageUrl}
        alt={alt}
        blurDataURL={entry?.blurDataURL}
        priority={priority}
        width={width ?? entry?.width}
        height={height ?? entry?.height}
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
