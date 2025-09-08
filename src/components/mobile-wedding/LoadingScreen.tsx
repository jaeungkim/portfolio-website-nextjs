"use client";

import { useSvgLoader } from "./hooks/useSvgLoader";
import type { LoadingScreenProps } from "./types";

export default function LoadingScreen({
  onLoadingComplete,
}: LoadingScreenProps) {
  const { welcomeRef, weddingRef } = useSvgLoader(onLoadingComplete);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center select-none max-w-[280px] mx-auto">
        <div ref={welcomeRef} className="mb-8 inline-block" />
        <div ref={weddingRef} className="inline-block" />
      </div>
    </div>
  );
}
