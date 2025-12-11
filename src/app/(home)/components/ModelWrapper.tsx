"use client";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

const Model3D = dynamic(() => import("./Model"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-zinc-300 dark:border-zinc-600 border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

export default function ModelWrapper() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px",
  });

  return (
    <div ref={ref} className="w-full h-full">
      {inView && <Model3D />}
    </div>
  );
}

