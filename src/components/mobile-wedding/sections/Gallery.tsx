import Image from "next/image";
import { motion } from "motion/react";

interface GalleryProps {
  onOpenLightbox: (index: number) => void;
  images: string[];
}

export default function Gallery({ onOpenLightbox, images }: GalleryProps) {
  return (
    <motion.div
      className="h-[90svh] flex flex-col items-center justify-center px-6 text-center bg-gray-50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <div className="text-center space-y-8 w-full">
        <div className="space-y-6">
          <h2 className="text-2xl font-light text-gray-700 tracking-wide">Gallery</h2>
          <div className="w-16 h-px bg-gray-200 mx-auto"></div>
        </div>

        <div className="w-full px-2">
          <div className="grid grid-cols-3 gap-1">
            {images.map((src, index) => (
              <motion.div
                key={`${src}-${index}`}
                className="relative aspect-square overflow-hidden cursor-pointer group"
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
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 33vw, 300px"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
