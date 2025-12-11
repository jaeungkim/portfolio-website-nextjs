import type React from "react";
import type { MDXComponents } from "mdx/types";
import BlurImage from "@/src/components/shared/image/BlurImage";
import { InlineCode } from "@/src/components/shared/CodeBlock";

interface BlurImageProps {
  url: string;
  alt?: string;
  blurDataURL?: string;
}

/**
 * MDX 컴포넌트 팩토리 함수
 * 플레이스홀더 데이터를 주입하여 BlurImage 컴포넌트 생성
 * rehype-pretty-code가 코드 블록을 처리하므로 여기서는 인라인 코드만 스타일링
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
    // rehype-pretty-code가 pre/code를 처리하므로 인라인 코드만 스타일링
    // data-rehype-pretty-code-figure 속성이 없는 code만 인라인 코드로 처리
    code: ({ children, ...props }: React.ComponentPropsWithoutRef<"code">) => {
      // rehype-pretty-code가 생성한 코드 블록은 그대로 통과
      if ("data-language" in props || "data-theme" in props) {
        return <code {...props}>{children}</code>;
      }
      // 인라인 코드
      return <InlineCode>{children}</InlineCode>;
    },
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
    code: ({ children, ...props }: React.ComponentPropsWithoutRef<"code">) => {
      if ("data-language" in props || "data-theme" in props) {
        return <code {...props}>{children}</code>;
      }
      return <InlineCode>{children}</InlineCode>;
    },
    ...components,
  };
}
