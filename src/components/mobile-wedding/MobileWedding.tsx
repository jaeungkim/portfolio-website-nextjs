"use client";

import { useState, useCallback } from "react";
import LoadingScreen from "./LoadingScreen";
import MainWeddingScreen from "./MainWeddingScreen";

export default function MobileWedding() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = useCallback(() => {
    setIsLoading(false);
  }, []);

  return isLoading ? (
    <LoadingScreen onLoadingComplete={handleLoadingComplete} />
  ) : (
    <MainWeddingScreen />
  );
}
