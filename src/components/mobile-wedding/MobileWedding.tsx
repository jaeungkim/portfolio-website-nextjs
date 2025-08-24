"use client";

import { useState } from "react";
import LoadingScreen from "./LoadingScreen";
import MainWeddingScreen from "./MainWeddingScreen";

export default function MobileWedding() {
  const [isLoading, setIsLoading] = useState(true);


  // 로딩 완료 핸들러
  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  // 로딩 상태에 따라 적절한 컴포넌트 렌더링
  if (isLoading) {
    return (
      <LoadingScreen
        onLoadingComplete={handleLoadingComplete}
      />
    );
  }

  return (
    <MainWeddingScreen
    />
  );
}
