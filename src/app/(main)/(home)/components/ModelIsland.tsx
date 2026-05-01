"use client";

import dynamic from "next/dynamic";

const ModelContent = dynamic(
  () =>
    import("@/src/app/(main)/(home)/components/ModelContent").then(
      (mod) => mod.ModelContent,
    ),
  { ssr: false },
);

export function ModelIsland() {
  return <ModelContent />;
}
