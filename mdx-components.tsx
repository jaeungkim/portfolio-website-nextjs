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
  url: string;
  alt?: string;
  priority?: boolean;
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  const placeholderMap = placeholders as Record<
    string,
    PlaceholderEntry | undefined
  >;

  function BlurImageWithPlaceholder({ url, alt, priority }: BlurImageMdxProps) {
    const entry = placeholderMap[url];

    // Fail the build rather than ship a blank slot with a guessed aspect ratio.
    if (!entry) {
      throw new Error(
        `No blur placeholder for ${url}. Run \`pnpm generate-placeholders\`.`,
      );
    }

    return (
      <BlurImage
        url={url}
        alt={alt ?? ""}
        blurDataURL={entry.blurDataURL}
        priority={priority}
        width={entry.width}
        height={entry.height}
      />
    );
  }

  return {
    BlurImage: BlurImageWithPlaceholder,
    code: InlineCode,
    ...components,
  };
}
