import Image from "next/image";

interface Props {
  url: string;
  alt?: string;
  blurDataURL?: string;
}

const BlurImage = ({ url, alt, blurDataURL }: Props) => {
  return (
    <Image
      src={url}
      alt={alt || ""}
      width={1080}
      height={1440}
      quality={75}
      className="rounded-md"
      placeholder={blurDataURL ? "blur" : undefined}
      blurDataURL={blurDataURL}
    />
  );
};

export default BlurImage;
