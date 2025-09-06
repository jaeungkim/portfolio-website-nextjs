import Image from "next/image";
import { motion } from "motion/react";

export default function WeddingHero() {
  return (
    <motion.div
      className="relative h-[90svh]"
      initial={{ opacity: 0, scale: 1.05 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
      viewport={{ once: true }}
    >
      <Image
        src="/images/mobile-wedding/gallery/main24.jpeg"
        alt="Wedding Hero"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      <div className="absolute inset-0  flex items-end justify-center pb-16">
        <div className="text-center text-white px-6 max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
            className="mb-8"
          >
            <h1 className="text-2xl md:text-3xl font-light mb-4 tracking-[0.15em]">
              Our Wedding Day
            </h1>
            <div className="w-16 h-px bg-white/60 mx-auto mb-4"></div>
            <p className="text-sm md:text-base font-light tracking-[0.2em]">
              — 2025년 5월 18일 일요일 —
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
            viewport={{ once: true }}
            className="space-y-3"
          >
            <p className="text-sm md:text-base font-light leading-relaxed">
              "함께 걷는 길, 그 길 위에 우리의 사랑이 피어납니다"
            </p>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
