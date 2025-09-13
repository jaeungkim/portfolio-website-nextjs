"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  GALLERY_IMAGES,
  WEDDING_SECTIONS,
  MOBILE_CONTAINER_STYLES,
  BGM_CONFIG,
} from "./constants";
import type { MainWeddingScreenProps } from "./types";
import { useWeddingAnimations } from "./hooks/useWeddingAnimations";

import WeddingHero from "./sections/WeddingHero";
import GettingMarried from "./sections/GettingMarried";
import GettingMarried2 from "./sections/GettingMarried2";
import WeddingLocation from "./sections/WeddingLocation";
import Gallery from "./sections/Gallery";
import BankInfo from "./sections/BankInfo";
import Epilogue from "./sections/Epilogue";

const SECTION_COMPONENTS = {
  GettingMarried,
  GettingMarried2,
  Gallery,
  WeddingLocation,
  BankInfo,
  Epilogue,
} as const;

export default function MainWeddingScreen({}: MainWeddingScreenProps = {}) {
  const [showBGMNotification, setShowBGMNotification] = useState(true);

  // GSAP 애니메이션 훅 사용
  useWeddingAnimations();

  // 3초 후 알림 숨김
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowBGMNotification(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

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
      <div className="relative" style={MOBILE_CONTAINER_STYLES}>
        {/* BGM 알림 */}
        <AnimatePresence>
          {showBGMNotification && (
            <motion.div
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -50 }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50"
            >
              <div className="bg-neutral-600 text-neutral-100 px-2 py-1 rounded-lg text-center text-xs font-medium shadow-lg w-fit">
                배경음악이 준비되었습니다
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <WeddingHero />
        {WEDDING_SECTIONS.map(renderSection)}
      </div>
    </motion.div>
  );
}
