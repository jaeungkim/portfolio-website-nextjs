import Image from "next/image";

import { cn } from "@/src/utils/cn";
import { getImage } from "@/src/utils/getImage";

export default async function DynamicImage({
  url,
  alt,
  containerClass,
}: {
  url: string;
  alt?: string;
  containerClass?: string;
}) {
  const { base64, img } = await getImage(url);

  return (
    <div className={cn("relative", containerClass)}>
      <Image
        {...img}
        alt={alt || ""}
        placeholder="blur"
        className="rounded-[2px]"
        blurDataURL={base64}
        width={1080}
        height={1440}
        quality={75}
      />
    </div>
  );
}
