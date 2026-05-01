import type { MDXComponents } from "mdx/types";
import { BlurImage } from "@/src/components/shared/BlurImage";
import { InlineCode } from "@/src/components/shared/InlineCode";
import placeholders from "@/src/app/(main)/blog/data/placeholders.json";

const FALLBACK_WIDTH = 1080;
const FALLBACK_HEIGHT = 1440;

interface PlaceholderEntry {
  blurDataURL: string;
  width: number;
  height: number;
}

interface BlurImageMdxProps {
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
  const placeholderMap = placeholders as Record<string, PlaceholderEntry>;

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
  }: BlurImageMdxProps) {
    const imageUrl = url ?? src;

    if (!imageUrl) {
      return null;
    }

    const entry = placeholderMap[imageUrl];

    return (
      <BlurImage
        url={imageUrl}
        alt={alt ?? ""}
        blurDataURL={entry?.blurDataURL}
        priority={priority}
        width={width ?? entry?.width ?? FALLBACK_WIDTH}
        height={height ?? entry?.height ?? FALLBACK_HEIGHT}
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
