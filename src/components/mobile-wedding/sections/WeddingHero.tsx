import Image from "next/image";
import { motion } from "motion/react";

const heroVariants = {
  hidden: { opacity: 0, scale: 1.05 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: "easeOut" as const,
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" as const },
  },
};

export default function WeddingHero() {
  return (
    <motion.div
      className="relative h-screen"
      variants={heroVariants}
      initial="hidden"
      animate="visible"
    >
      <Image
        src="/images/mobile-wedding/gallery/main23.jpeg"
        alt="Wedding Hero"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent flex items-end justify-center pb-20">
        <div className="text-center text-white px-6 max-w-3xl mx-auto">
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            className="mb-6"
          >
            <h1 className="text-3xl md:text-4xl font-light mb-3 tracking-[0.2em] uppercase">
              Our Wedding Day
            </h1>
            <p className="text-sm md:text-base font-light mb-4 tracking-[0.3em] uppercase">
              — Sun, May 18th, 2025 —
            </p>
          </motion.div>

          <motion.div
            variants={textVariants}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="space-y-2"
          >
            <p className="text-sm md:text-base font-light italic leading-relaxed tracking-wide">
              Forever begins with a single step,
            </p>
            <p className="text-sm md:text-base font-light italic leading-relaxed tracking-wide">
              And love guides us every step of the way.
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
