"use client";

import dynamic from "next/dynamic";

const ModelContent = dynamic(() => import("./ModelContent"), {
  ssr: false,
});

export default function ModelIsland() {
  return <ModelContent />;
}
