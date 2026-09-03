import type { MDXComponents } from "mdx/types";
import { BlurImage } from "@/src/components/shared/BlurImage";
import { InlineCode } from "@/src/components/shared/InlineCode";
import placeholders from "@/src/app/[lang]/(main)/blog/data/placeholders.json";

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
  const placeholderMap = placeholders as Record<
    string,
    PlaceholderEntry | undefined
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
  }: BlurImageMdxProps) {
    const imageUrl = url ?? src;

    if (!imageUrl) {
      return null;
    }

    const entry = placeholderMap[imageUrl];

    // Fail the build rather than ship a blank slot with a guessed aspect ratio.
    if (!entry) {
      throw new Error(
        `No blur placeholder for ${imageUrl}. Run \`pnpm generate-placeholders\`.`,
      );
    }

    return (
      <BlurImage
        url={imageUrl}
        alt={alt ?? ""}
        blurDataURL={entry.blurDataURL}
        priority={priority}
        width={width ?? entry.width}
        height={height ?? entry.height}
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
