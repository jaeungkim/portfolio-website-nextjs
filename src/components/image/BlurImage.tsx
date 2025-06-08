import Image, { type ImageProps } from "next/image";

import getBase64 from "@/src/utils/getBase64";

const DynamicImage = async ({
  url,
  ...props
}: ImageProps & { url: string }) => {
  const base64 = await getBase64(url);

  return (
    <Image
      {...props}
      alt={props.alt || ""}
      width={1080}
      height={1440}
      quality={75}
      src={url}
      placeholder="blur"
      blurDataURL={base64}
    />
  );
};

export default DynamicImage;
