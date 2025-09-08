"use client";

import React, { useState } from "react";
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
import Introduction from "./sections/Introduction";
import WeddingLocation from "./sections/WeddingLocation";
import WeddingCalendar from "./sections/WeddingCalendar";
import Gallery from "./sections/Gallery";
import BankInfo from "./sections/BankInfo";
import Epilogue from "./sections/Epilogue";

// 섹션 컴포넌트 타입 매핑
const SECTION_COMPONENTS = {
  GettingMarried,
  Introduction,
  WeddingCalendar,
  WeddingLocation,
  BankInfo,
  Epilogue,
} as const;

export default function MainWeddingScreen({}: MainWeddingScreenProps = {}) {
  const [showTimeline, setShowTimeline] = useState(false);

  const toggleTimeline = () => {
    setShowTimeline(!showTimeline);
  };

  // GSAP 애니메이션 훅 사용
  useWeddingAnimations([showTimeline]);

  // 섹션 렌더링 함수
  const renderSection = (section: (typeof WEDDING_SECTIONS)[number]) => {
    const SectionComponent =
      SECTION_COMPONENTS[
        section.componentName as keyof typeof SECTION_COMPONENTS
      ];

    if (section.key === "wedding-calendar") {
      return (
        <div key={`group-${section.key}`}>
          <div data-section={section.key}>
            <SectionComponent />
          </div>
          <div data-section="gallery">
            <Gallery
              images={GALLERY_IMAGES}
              onToggleTimeline={toggleTimeline}
              showTimeline={showTimeline}
            />
          </div>
        </div>
      );
    }

    return (
      <div key={section.key} data-section={section.key}>
        <SectionComponent />
      </div>
    );
  };

  return (
    <motion.div
      className="min-h-screen flex justify-center text-neutral-700"
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
