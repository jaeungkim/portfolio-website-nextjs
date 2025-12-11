"use client";

import dynamic from "next/dynamic";
import { useInView } from "react-intersection-observer";

const Model3D = dynamic(() => import("./Model"), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="size-8 border-2 border-muted border-t-foreground rounded-full animate-spin" />
    </div>
  ),
});

export default function ModelWrapper() {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "200px",
  });

  return (
    <div ref={ref} className="absolute inset-0">
      {inView && <Model3D />}
    </div>
  );
}
