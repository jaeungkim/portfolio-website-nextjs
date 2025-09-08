"use client";

import React from "react";
import { motion } from "motion/react";
import {
  GALLERY_IMAGES,
  WEDDING_SECTIONS,
  MOBILE_CONTAINER_STYLES,
  BGM_CONFIG,
} from "./constants";
import type { MainWeddingScreenProps } from "./types";
import { useWeddingAnimations } from "./hooks/useWeddingAnimations";
import { BGMPlayer } from "./components/BGM";

import WeddingHero from "./sections/WeddingHero";
import GettingMarried from "./sections/GettingMarried";
import GettingMarried2 from "./sections/GettingMarried2";
import Introduction from "./sections/Introduction";
import WeddingLocation from "./sections/WeddingLocation";
import WeddingCalendar from "./sections/WeddingCalendar";
import Gallery from "./sections/Gallery";
import BankInfo from "./sections/BankInfo";
import Epilogue from "./sections/Epilogue";

// 섹션 컴포넌트 타입 매핑
const SECTION_COMPONENTS = {
  GettingMarried,
  GettingMarried2,
  Introduction,
  WeddingCalendar,
  Gallery,
  WeddingLocation,
  BankInfo,
  Epilogue,
} as const;

export default function MainWeddingScreen({}: MainWeddingScreenProps = {}) {
  // GSAP 애니메이션 훅 사용
  useWeddingAnimations();

  // 섹션 렌더링 함수
  const renderSection = (section: (typeof WEDDING_SECTIONS)[number]) => {
    const Component =
      SECTION_COMPONENTS[
        section.componentName as keyof typeof SECTION_COMPONENTS
      ];

    return <Component key={section.key} />;
  };

  return (
    <motion.div
      className="min-h-screen flex justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* BGM 플레이어 - 부동 음악 컨트롤 */}
      <BGMPlayer
        src={BGM_CONFIG.src}
        autoPlay={BGM_CONFIG.autoPlay}
        loop={BGM_CONFIG.loop}
        volume={BGM_CONFIG.volume}
      />

      <div className="relative" style={MOBILE_CONTAINER_STYLES}>
        <WeddingHero />
        {WEDDING_SECTIONS.map(renderSection)}
      </div>
    </motion.div>
  );
}
