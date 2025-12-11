/**
 * 블로그 목록 스켈레톤 - 포스트 목록 로딩 중 표시
 */
export default function PostsSkeleton() {
  return (
    <div className="flex flex-col space-y-16">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="md:grid md:grid-cols-4 md:items-baseline">
          <div className="md:col-span-3 flex flex-col items-start">
            {/* 제목 스켈레톤 */}
            <div className="h-5 w-48 bg-zinc-200 dark:bg-zinc-700 rounded animate-pulse" />

            {/* 날짜 스켈레톤 (모바일) */}
            <div className="mt-2 h-4 w-24 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse md:hidden" />

            {/* 요약 스켈레톤 */}
            <div className="mt-3 space-y-2 w-full">
              <div className="h-4 w-full bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse" />
            </div>

            {/* Read more 스켈레톤 */}
            <div className="mt-4 h-4 w-20 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse" />
          </div>

          {/* 날짜 스켈레톤 (데스크탑) */}
          <div className="hidden md:block">
            <div className="h-4 w-24 bg-zinc-100 dark:bg-zinc-800 rounded animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
}

