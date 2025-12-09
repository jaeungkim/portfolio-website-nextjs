import Image from "next/image";

interface Props {
  url: string;
  alt?: string;
  blurDataURL?: string;
}

const BlurImage = ({ url, alt, blurDataURL }: Props) => {
  // 개발 모드에서 디버깅 로그
  if (process.env.NODE_ENV === "development" && typeof window === "undefined") {
    if (blurDataURL) {
      console.log(`[BlurImage] 플레이스홀더 있음: ${url}`);
    } else {
      console.warn(`[BlurImage] 플레이스홀더 없음: ${url}`);
    }
  }

  return (
    <Image
      src={url}
      alt={alt || ""}
      width={1080}
      height={1440}
      quality={75}
      className="rounded-[2px]"
      placeholder={blurDataURL ? "blur" : undefined}
      blurDataURL={blurDataURL}
    />
  );
};

export default BlurImage;
