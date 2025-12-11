/**
 * 블로그 목록 스켈레톤 - 포스트 목록 로딩 중 표시
 */
export default function PostsSkeleton() {
  return (
    <div className="flex flex-col space-y-16">
      {Array.from({ length: 5 }).map((_, index) => (
        <div key={index} className="md:grid md:grid-cols-4 md:items-baseline">
          <div className="md:col-span-3 flex flex-col items-start">
            <div className="h-5 w-48 skeleton" />
            <div className="mt-2 h-4 w-24 skeleton md:hidden" />
            <div className="mt-3 space-y-2 w-full">
              <div className="h-4 w-full skeleton" />
              <div className="h-4 w-3/4 skeleton" />
            </div>
            <div className="mt-4 h-4 w-20 skeleton" />
          </div>
          <div className="hidden md:block">
            <div className="h-4 w-24 skeleton" />
          </div>
        </div>
      ))}
    </div>
  );
}
