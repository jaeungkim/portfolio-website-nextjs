import { Suspense, lazy } from "react";
import ErrorBoundary from "./components/ErrorBoundary";

// 메인 컴포넌트들을 지연 로딩으로 최적화
const MainWeddingScreen = lazy(() => import("./MainWeddingScreen"));

// 로딩 컴포넌트
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-white">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-neutral-900 mx-auto mb-4"></div>
      <p className="text-gray-600">로딩 중...</p>
    </div>
  </div>
);

export default function MobileWedding() {
  return (
    <>
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <MainWeddingScreen />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
