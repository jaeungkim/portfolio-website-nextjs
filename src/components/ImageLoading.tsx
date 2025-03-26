import Image, { ImageProps } from "next/image";
import React, { useState } from "react";

export default function ImageLoading(props: ImageProps) {
  const [loading, setLoading] = useState(true);

  return (
    <div className="relative">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 animate-pulse z-10">
          <span className="text-xs text-gray-500">Loading image...</span>
        </div>
      )}
      <Image
        {...props}
        onLoad={() => setLoading(false)}
        className={`transition-opacity duration-300 ${
          loading ? "opacity-0" : "opacity-100"
        } ${props.className ?? ""}`}
      />
    </div>
  );
}
