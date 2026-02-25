import Image from "next/image";

interface Props {
  url: string;
  alt?: string;
  blurDataURL?: string;
  priority?: boolean;
}

const BlurImage = ({ url, alt, blurDataURL, priority = false }: Props) => {
  return (
    <Image
      src={url}
      alt={alt || ""}
      width={1080}
      height={1440}
      quality={75}
      priority={priority}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      className="rounded-md"
      placeholder={blurDataURL ? "blur" : undefined}
      blurDataURL={blurDataURL}
    />
  );
};

export default BlurImage;
