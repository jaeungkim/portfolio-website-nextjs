import Image from "next/image";

interface Props {
  url: string;
  alt?: string;
}

const BlurImage = ({ url, alt }: Props) => {
  return (
    <Image
      src={url}
      alt={alt || ""}
      width={1080}
      height={1440}
      quality={75}
      className="rounded-[2px]"
    />
  );
};

export default BlurImage;