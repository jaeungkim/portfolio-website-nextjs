/**
 * 개별 포스트 콘텐츠 스켈레톤 - MDX 콘텐츠 로딩 중 표시
 */
export default function PostSkeleton() {
  return (
    <div className="prose-lg animate-pulse">
      <div className="space-y-4">
        <div className="h-4 w-full skeleton" />
        <div className="h-4 w-5/6 skeleton" />
        <div className="h-4 w-4/5 skeleton" />
      </div>

      <div className="my-8 h-64 w-full skeleton" />

      <div className="space-y-4">
        <div className="h-4 w-full skeleton" />
        <div className="h-4 w-3/4 skeleton" />
      </div>
    </div>
  );
}
