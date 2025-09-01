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

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut" as const,
    },
  },
};

const galleryImages = [
  "/images/mobile-wedding/gallery/main.jpeg",
  "/images/mobile-wedding/gallery/main22.jpeg",
  "/images/mobile-wedding/gallery/main23.jpeg",
];

export default function Gallery() {
  return (
    <motion.div
      className="h-[90vh] flex flex-col items-center justify-center px-6 text-center bg-gray-50"
      variants={sectionVariants}
    >
      <h2 className="text-3xl font-serif text-gray-800 mb-8">
        Our Wedding Gallery
      </h2>
      <div className="max-w-2xl mx-auto">
        <div className="grid grid-cols-1 gap-4">
          {galleryImages.map((src, index) => (
            <motion.div
              key={src}
              variants={imageVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="relative h-48 rounded-lg overflow-hidden shadow-lg"
            >
              <Image
                src={src}
                alt={`Wedding photo ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
