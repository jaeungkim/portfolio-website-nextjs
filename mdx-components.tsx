import type React from "react";
import type { MDXComponents } from "mdx/types";
import BlurImage from "@/src/components/shared/BlurImage";
import { InlineCode } from "@/src/components/shared/CodeBlock";

interface BlurImageProps {
  url: string;
  alt?: string;
  blurDataURL?: string;
}

/**
 * MDX 컴포넌트 팩토리 함수
 * 플레이스홀더 데이터를 주입하여 BlurImage 컴포넌트 생성
 */
export function createMdxComponents(
  placeholders: Record<string, string>
): MDXComponents {
  const BlurImageWithPlaceholder = ({ url, alt }: BlurImageProps) => {
    const blurDataURL = placeholders[url] || undefined;
    return <BlurImage url={url} alt={alt} blurDataURL={blurDataURL} />;
  };

  return {
    img: BlurImageWithPlaceholder,
    BlurImage: BlurImageWithPlaceholder,
    code: InlineCode,
  };
}

/**
 * 기본 MDX 컴포넌트 (플레이스홀더 없이 사용)
 * Next.js App Router의 mdx-components.tsx 컨벤션 준수
 */
export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    img: BlurImage,
    BlurImage,
    code: InlineCode,
    ...components,
  };
}
