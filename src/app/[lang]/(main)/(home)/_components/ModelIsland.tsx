"use client";

import dynamic from "next/dynamic";
import { ModelLoader } from "@/app/[lang]/(main)/(home)/_components/ModelLoader";

export const ModelIsland = dynamic(
  () =>
    import("@/app/[lang]/(main)/(home)/_components/ModelContent").then(
      (mod) => mod.ModelContent,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="absolute inset-0 grid place-items-center">
        <ModelLoader />
      </div>
    ),
  },
);
