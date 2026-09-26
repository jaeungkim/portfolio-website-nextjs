import Image from "next/image";
import { cn } from "@/src/lib/cn";

interface BlurImageProps {
  url: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

export function BlurImage({
  url,
  alt,
  width,
  height,
  blurDataURL,
  priority = false,
  className,
  sizes = "(max-width: 512px) 100vw, 512px",
}: BlurImageProps) {
  return (
    <div className="not-prose my-0 overflow-hidden rounded-md">
      <Image
        src={url}
        alt={alt}
        width={width}
        height={height}
        preload={priority}
        sizes={sizes}
        className={cn("block h-auto w-full", className)}
        placeholder={blurDataURL ? "blur" : undefined}
        blurDataURL={blurDataURL}
      />
    </div>
  );
}
