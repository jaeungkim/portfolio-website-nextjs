"use client";

import { useState } from "react";
import LoadingScreen from "./LoadingScreen";
import MainWeddingScreen from "./MainWeddingScreen";

export default function MobileWedding() {
  const [isLoading, setIsLoading] = useState(true);

  return isLoading ? (
    <LoadingScreen onLoadingComplete={() => setIsLoading(false)} />
  ) : (
    <MainWeddingScreen />
  );
}
