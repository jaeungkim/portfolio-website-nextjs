"use client";

import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

const ModelContent = dynamic(() => import("./ModelContent"), {
  ssr: false,
});

export default function ModelIsland() {
  if (usePathname() !== "/") {
    return null;
  }

  return <ModelContent />;
}
