"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { BGMPlayer } from "../components/BGM";
import { BGM_CONFIG } from "../constants";

// 애니메이션 설정 상수
const HERO_ANIMATION = {
  container: {
    initial: { opacity: 0, scale: 1.05 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 1.2, ease: "easeOut" },
    viewport: { once: true },
  },
  title: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut" },
    viewport: { once: true },
  },
  subtitle: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, ease: "easeOut", delay: 0.3 },
    viewport: { once: true },
  },
} as const;

const HERO_IMAGE = "https://images.jaeungkim.com/mobile-wedding/gallery/wedding13.jpeg";
const WEDDING_DATE = "2025년 10월 25일 토요일 오전 11시 30분";
const WEDDING_QUOTE = "어디든, 너와 함께라면";

export default function WeddingHero() {
  return (
    <div className="relative h-[95svh]" {...HERO_ANIMATION.container}>
      <BGMPlayer
        src={BGM_CONFIG.src}
        loop={BGM_CONFIG.loop}
        volume={BGM_CONFIG.volume}
      />

      <Image
        src={HERO_IMAGE}
        alt="웨딩 히어로 이미지"
        fill
        className="object-cover"
        priority
        sizes="100vw"
      />

      <div className="absolute inset-0 flex items-end justify-center pb-16">
        <div className="text-center text-white px-6">
          <div {...HERO_ANIMATION.title} className="mb-8">
            <h1 className="text-2xl md:text-3xl font-light mb-4 tracking-[0.15em]">
              Our Wedding Day
            </h1>
            <div
              className="w-16 h-px bg-white/60 mx-auto mb-4"
              aria-hidden="true"
            />
            <p className="text-sm md:text-base font-light tracking-[0.2em]">
              — {WEDDING_DATE} —
            </p>
          </div>

          <div {...HERO_ANIMATION.subtitle} className="space-y-3">
            <p className="text-sm md:text-base font-light leading-relaxed">
              "{WEDDING_QUOTE}"
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
