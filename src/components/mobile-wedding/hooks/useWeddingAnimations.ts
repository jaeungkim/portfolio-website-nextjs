import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ANIMATION_CONFIG } from "../constants";
import type { WeddingAnimationsHook } from "../types";

gsap.registerPlugin(ScrollTrigger);

/**
 * 웨딩 섹션 애니메이션 훅
 * 스크롤 트리거 기반의 GSAP 애니메이션을 설정합니다.
 */
export const useWeddingAnimations: WeddingAnimationsHook = (
  dependencies = []
) => {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const sections = gsap.utils.toArray<HTMLElement>("[data-section]");

      sections.forEach((section) => {
        // 초기 상태 설정
        gsap.set(section, {
          y: ANIMATION_CONFIG.y,
          opacity: ANIMATION_CONFIG.opacity,
        });

        // 애니메이션 설정
        gsap.fromTo(
          section,
          {
            y: ANIMATION_CONFIG.y,
            opacity: ANIMATION_CONFIG.opacity,
          },
          {
            y: 0,
            opacity: 1,
            duration: ANIMATION_CONFIG.duration,
            ease: ANIMATION_CONFIG.ease,
            scrollTrigger: {
              trigger: section,
              ...ANIMATION_CONFIG.scrollTrigger,
            },
          }
        );
      });
    });

    // 클린업
    return () => ctx.revert();
  }, dependencies);
};
