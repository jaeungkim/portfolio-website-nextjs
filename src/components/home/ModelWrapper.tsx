"use client";

import dynamic from "next/dynamic";

const Model3D = dynamic(() => import("./Model"), {
  ssr: false,
});

export default function ModelWrapper() {
  return <Model3D />;
}

