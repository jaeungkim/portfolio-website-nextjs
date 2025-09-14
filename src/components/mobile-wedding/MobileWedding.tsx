"use client";

import { Suspense, lazy, useEffect } from "react";
import ErrorBoundary from "./components/ErrorBoundary";

// 메인 컴포넌트들을 지연 로딩으로 최적화
const MainWeddingScreen = lazy(() => import("./MainWeddingScreen"));

// 줌 방지 함수들 (스크롤은 허용)
let initialDistance = 0;

const preventZoom = (event: TouchEvent) => {
  if (event.touches.length === 2) {
    const touch1 = event.touches[0];
    const touch2 = event.touches[1];
    const currentDistance = Math.sqrt(
      Math.pow(touch2.clientX - touch1.clientX, 2) +
      Math.pow(touch2.clientY - touch1.clientY, 2)
    );

    if (initialDistance === 0) {
      initialDistance = currentDistance;
    }

    // 줌 제스처 감지 (거리가 크게 변하면 줌으로 간주)
    if (Math.abs(currentDistance - initialDistance) > 50) {
      event.preventDefault();
      initialDistance = currentDistance;
    }
  } else {
    initialDistance = 0;
  }
};

const preventWheelZoom = (event: WheelEvent) => {
  if (event.ctrlKey) {
    event.preventDefault();
  }
};

const preventKeyZoom = (event: KeyboardEvent) => {
  if ((event.ctrlKey || event.metaKey) && (event.key === '+' || event.key === '-' || event.key === '=')) {
    event.preventDefault();
  }
};

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
  useEffect(() => {
    // 뷰포트 메타 태그 설정으로 줌 방지
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
      viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
    } else {
      const meta = document.createElement('meta');
      meta.name = 'viewport';
      meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
      document.head.appendChild(meta);
    }

    // 터치 줌 방지 이벤트 리스너 추가
    document.addEventListener('touchstart', preventZoom, { passive: false });
    document.addEventListener('touchmove', preventZoom, { passive: false });
    document.addEventListener('wheel', preventWheelZoom, { passive: false });
    document.addEventListener('keydown', preventKeyZoom);

    // 클린업 함수
    return () => {
      document.removeEventListener('touchstart', preventZoom);
      document.removeEventListener('touchmove', preventZoom);
      document.removeEventListener('wheel', preventWheelZoom);
      document.removeEventListener('keydown', preventKeyZoom);
    };
  }, []);

  return (
    <div
      className="min-h-screen overflow-y-auto"
      style={{
        touchAction: 'pan-y pinch-zoom',
        WebkitTouchCallout: 'none',
        WebkitUserSelect: 'none',
        KhtmlUserSelect: 'none',
        MozUserSelect: 'none',
        msUserSelect: 'none',
        userSelect: 'none'
      }}
    >
      <ErrorBoundary>
        <Suspense fallback={<LoadingFallback />}>
          <MainWeddingScreen />
        </Suspense>
      </ErrorBoundary>
    </div>
  );
}
