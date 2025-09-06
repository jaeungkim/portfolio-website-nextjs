import Image from "next/image";
import { motion } from "motion/react";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

interface GalleryProps {
  onOpenLightbox: (index: number) => void;
  images: string[];
}

export default function Gallery({ onOpenLightbox, images }: GalleryProps) {
  return (
    <motion.div
      className="h-[90svh] w-full flex flex-col items-center justify-center px-6 text-center"
      variants={sectionVariants}
    >
      <h1 className="h-8 text-xl font-medium text-center mb-[64px]">갤러리</h1>

      <div className="w-full grid grid-cols-3 gap-1">
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="relative aspect-[3/4]"
            onClick={() => onOpenLightbox(index)}
          >
            <Image
              src={src}
              alt={`Photo ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
