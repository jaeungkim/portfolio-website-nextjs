"use client";

import { useState, useEffect } from "react";
import MetallicPaint, { parseLogoImage } from "./MetallicPaint";

interface IconButtonProps {
  href: string;
  icon: string;
}

const metallicParams = {
  patternScale: 2,
  refraction: 0.015,
  edge: 1,
  patternBlur: 0.005,
  liquid: 0.07,
  speed: 0.3,
};

export default function IconButton({ href, icon }: IconButtonProps) {
  const [imageData, setImageData] = useState<ImageData | null>(null);

  useEffect(() => {
    async function loadIcon() {
      try {
        const response = await fetch(icon);
        const blob = await response.blob();
        const file = new File([blob], "icon.svg", { type: blob.type });
        const parsedData = await parseLogoImage(file);
        setImageData(parsedData?.imageData ?? null);
      } catch (err) {
        console.error("Error loading icon:", err);
      }
    }

    loadIcon();
  }, [icon]);

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="block size-10 rounded-lg overflow-hidden hover:opacity-80 transition-opacity"
    >
      {imageData ? (
        <MetallicPaint imageData={imageData} params={metallicParams} />
      ) : (
        <div className="size-10 bg-muted-foreground/20 rounded-lg animate-pulse" />
      )}
    </a>
  );
}
