import { Suspense } from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPostSlugs, getPostData } from "../lib/posts";
import { formatDate } from "../lib/utils";
import PostSkeleton from "../components/PostSkeleton";

interface PageProps {
  params: Promise<{ slug: string }>;
}

/**
 * 빌드 시점에 존재하지 않는 slug에 대해 404 반환
 */
export const dynamicParams = false;

/**
 * 정적 사이트 생성 강제
 */
export const dynamic = "force-static";

/**
 * 빌드 시점에 모든 포스트 slug를 정적 파라미터로 생성
 */
export async function generateStaticParams() {
  const slugs = await getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}

/**
 * 포스트별 동적 메타데이터 생성
 */
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const postData = await getPostData(slug);

  if (!postData) {
    return {
      title: "Post Not Found",
    };
  }

  return {
    title: `${postData.title} | Jaeung Kim`,
    description: postData.summary,
    openGraph: {
      title: postData.title,
      description: postData.summary,
      type: "article",
      publishedTime: postData.date,
    },
    twitter: {
      card: "summary",
      title: postData.title,
      description: postData.summary,
    },
  };
}

/**
 * 포스트 콘텐츠 - 데이터 페칭을 담당하는 async 컴포넌트
 * Suspense 내부에서 스트리밍됨
 */
async function PostContent({ slug }: { slug: string }) {
  const postData = await getPostData(slug);

  if (!postData) notFound();

  return (
    <>
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4 text-neutral-800 dark:text-neutral-100">
          {postData.title}
        </h1>
        <time
          dateTime={postData.date}
          className="text-sm text-neutral-600 dark:text-neutral-400"
        >
          {formatDate(postData.date)}
        </time>
      </header>
      <div className="prose-lg">{postData.content}</div>
    </>
  );
}

/**
 * 포스트 페이지 - 쉘 UI가 즉시 렌더링되고 콘텐츠는 스트리밍됨
 */
export default async function PostPage({ params }: PageProps) {
  const { slug } = await params;

  return (
    <article className="prose dark:prose-invert mx-auto max-w-3xl px-4 py-8">
      <Suspense fallback={<PostSkeleton />}>
        <PostContent slug={slug} />
      </Suspense>
    </article>
  );
}
