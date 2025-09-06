import Image from "next/image";
import { motion } from "motion/react";

interface GalleryProps {
  onOpenLightbox: (index: number) => void;
  images: string[];
}

export default function Gallery({ onOpenLightbox, images }: GalleryProps) {
  return (
    <motion.div
      className="h-[90svh] flex flex-col justify-center"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <h1 className="h-8 text-xl font-medium text-center mb-[64px]">갤러리</h1>

      <div className="grid grid-cols-3 gap-1">
        {images.map((src, index) => (
          <motion.div
            key={`${src}-${index}`}
            className="relative aspect-[3/4]"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            viewport={{ once: true }}
            onClick={() => onOpenLightbox(index)}
          >
            <Image
              src={src}
              alt={`Photo ${index + 1}`}
              fill
              className="object-cover"
            />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
