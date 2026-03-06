import Image from "next/image";

interface AnimatedProfileLogoProps {
  className?: string;
}

export default function AnimatedProfileLogo({
  className,
}: AnimatedProfileLogoProps) {
  return (
    <div
      className={`relative flex items-center justify-center opacity-0 animate-in fade-in duration-1000 fill-mode-forwards ${className}`}
    >
      <Image
        src="/icons/jaekim.svg"
        alt="Jaeung Kim Logo"
        width={100}
        height={30}
        className="object-contain dark:invert w-auto h-auto"
        preload
      />
    </div>
  );
}
