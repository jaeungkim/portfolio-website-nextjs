import Image, { type ImageProps } from "next/image";

import getBase64 from "@/src/utils/getBase64";

const BlurImage = async ({ url, alt }: ImageProps & { url: string }) => {
  const { base64, img } = await getBase64(url);

  return (
    <Image
      {...img}
      alt={alt || ""}
      width={1080}
      height={1440}
      quality={75}
      src={url}
      placeholder="blur"
      className="rounded-[2px]"
      blurDataURL={base64}
    />
  );
};

export default BlurImage;
