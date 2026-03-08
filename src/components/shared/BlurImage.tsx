import Image from "next/image";
import { cn } from "@/src/lib/cn";

interface Props {
  url: string;
  alt?: string;
  blurDataURL?: string;
  preload?: boolean;
  priority?: boolean;
  className?: string;
  sizes?: string;
  quality?: number;
}

export default function BlurImage({
  url,
  alt,
  blurDataURL,
  preload,
  priority,
  className,
  sizes = "(max-width: 768px) 100vw, 768px",
  quality = 75,
}: Props) {
  const shouldPreload = preload ?? priority ?? false;

  return (
    <div className="not-prose my-0 overflow-hidden rounded-md">
      <Image
        src={url}
        alt={alt || ""}
        width={1080}
        height={1440}
        quality={quality}
        preload={shouldPreload}
        sizes={sizes}
        className={cn("block h-auto w-full", className)}
        placeholder={blurDataURL ? "blur" : undefined}
        blurDataURL={blurDataURL}
      />
    </div>
  );
}
