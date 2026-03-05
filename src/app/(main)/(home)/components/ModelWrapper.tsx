"use client";

import dynamic from "next/dynamic";

const ModelDynamic = dynamic(() => import("./ModelContent"), { ssr: false });

export default function ModelWrapper() {
  return (
    <div className="absolute inset-0">
      <ModelDynamic />
    </div>
  );
}
