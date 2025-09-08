"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import {
  GALLERY_IMAGES,
  WEDDING_SECTIONS,
  MOBILE_CONTAINER_STYLES,
} from "./constants";
import type { MainWeddingScreenProps } from "./types";
import { useWeddingAnimations } from "./hooks/useWeddingAnimations";

import dynamic from "next/dynamic";
import { ComponentType } from "react";

// 섹션 컴포넌트 동적 임포트로 번들 크기 최적화
const WeddingHero = dynamic(() => import("./sections/WeddingHero"), {
  loading: () => <div className="h-[90svh] bg-gray-100 animate-pulse" />,
});

const GettingMarried = dynamic(() => import("./sections/GettingMarried"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});

const Introduction = dynamic(() => import("./sections/Introduction"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});

const WeddingLocation = dynamic(() => import("./sections/WeddingLocation"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});

const WeddingCalendar = dynamic(() => import("./sections/WeddingCalendar"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});

const Gallery = dynamic(() => import("./sections/Gallery"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});

const BankInfo = dynamic(() => import("./sections/BankInfo"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});

const Epilogue = dynamic(() => import("./sections/Epilogue"), {
  loading: () => <div className="h-64 bg-gray-100 animate-pulse" />,
});

// 섹션 컴포넌트 타입 매핑
const SECTION_COMPONENTS: Record<string, ComponentType<any>> = {
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
      <div className="relative" style={MOBILE_CONTAINER_STYLES}>
        <WeddingHero />
        {WEDDING_SECTIONS.map(renderSection)}
      </div>
    </motion.div>
  );
}
