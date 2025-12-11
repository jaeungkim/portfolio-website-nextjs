/**
 * 개별 포스트 콘텐츠 스켈레톤 - MDX 콘텐츠 로딩 중 표시
 */
export default function PostSkeleton() {
  return (
    <div className="prose-lg animate-pulse">
      {/* 본문 단락 스켈레톤 */}
      <div className="space-y-4">
        <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded" />
        <div className="h-4 w-5/6 bg-zinc-200 dark:bg-zinc-700 rounded" />
        <div className="h-4 w-4/5 bg-zinc-200 dark:bg-zinc-700 rounded" />
      </div>

      {/* 이미지 플레이스홀더 */}
      <div className="my-8 h-64 w-full bg-zinc-100 dark:bg-zinc-800 rounded" />

      {/* 추가 단락 */}
      <div className="space-y-4">
        <div className="h-4 w-full bg-zinc-200 dark:bg-zinc-700 rounded" />
        <div className="h-4 w-3/4 bg-zinc-200 dark:bg-zinc-700 rounded" />
      </div>
    </div>
  );
}

