import Image from "next/image";
import type { MDXComponents } from "mdx/types";
import placeholders from "@/app/[lang]/(main)/blog/_data/placeholders.json";

const placeholderMap = placeholders as Record<
  string,
  { blurDataURL: string; width: number; height: number } | undefined
>;

function BlurImage({
  url,
  alt,
  priority,
}: {
  url: string;
  alt: string;
  priority?: boolean;
}) {
  const entry = placeholderMap[url];
  if (!entry) {
    throw new Error(
      `No blur placeholder for ${url}. Run \`pnpm generate-placeholders\`.`,
    );
  }
  return (
    <div className="not-prose overflow-hidden rounded-md">
      <Image
        src={url}
        alt={alt}
        width={entry.width}
        height={entry.height}
        preload={priority}
        sizes="(max-width: 512px) 100vw, 512px"
        className="block h-auto w-full"
        placeholder="blur"
        blurDataURL={entry.blurDataURL}
      />
    </div>
  );
}

const components: MDXComponents = { BlurImage };

export function useMDXComponents(): MDXComponents {
  return components;
}
