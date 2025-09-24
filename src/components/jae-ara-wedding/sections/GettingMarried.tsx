"use client";

import { useEffect } from "react";
import { useInView } from "react-intersection-observer";

import SectionContainer from "../components/SectionContainer";
import Ribbon from "../components/Ribbon";
import FloatingHeart from "../components/FloatingHeart";
import { useRibbonAnimation } from "../hooks/useRibbonAnimation";

export default function GettingMarried() {
  const { ribbonRef, startRibbonAnimation, resetRibbonAnimation } =
    useRibbonAnimation();

  const { ref: sectionRef, inView } = useInView({
    threshold: 0.1, // Trigger when 10% of the element is visible
    triggerOnce: false,
    rootMargin: "0px 0px -3% 0px", // Trigger slightly earlier
  });

  useEffect(() => {
    if (inView) {
      startRibbonAnimation();
    } else {
      resetRibbonAnimation();
    }
  }, [inView, startRibbonAnimation, resetRibbonAnimation]);

  return (
    <SectionContainer sectionKey="getting-married" className="pt-[160px]">
      <div
        ref={sectionRef}
        className="size-full relative flex flex-col items-center justify-center pt-[64px] text-[#5F89B8] font-bold text-lg text-center"
      >
        <Ribbon ref={ribbonRef} />

        <FloatingHeart
          size={20}
          color="#5F89B8"
          opacity={0.2}
          position={{ top: "3", left: "1" }}
          animation={{
            y: [-15, 5, -15],
            rotate: [0, 15, 0, -15, 0],
            duration: 6,
          }}
        />

        <FloatingHeart
          size={24}
          color="#FFB6C1"
          opacity={0.18}
          position={{ top: "0", right: "1" }}
          animation={{
            y: [15, -15, 15],
            x: [-2, 2, -2],
            duration: 8,
          }}
        />

        {/* Main text content */}
        <div className="space-y-8">
          <div className="space-y-2">
            <p>화려한 예식 대신,</p>
            <p>소박하고 따듯한 만남을 선택했습니다.</p>
          </div>
          <div className="space-y-2">
            <p>작은 모임이지만</p>
            <p>큰 행복이 깃든 소중한 날이 되기를 바라며</p>
          </div>
          <div className="space-y-2">
            <p>가족과 친척들이 한자리에 모여</p>
            <p>함께하는 식사 자리를 통해</p>
            <p>새로운 시작을 축하하고자 합니다.</p>
          </div>
        </div>

        {/* Gentle floating hearts in mixed colors */}
        <FloatingHeart
          size={20}
          color="#FFB6C1"
          opacity={0.25}
          position={{ bottom: "3", left: "1" }}
          animation={{
            y: [-13, 13, -13],
            rotate: [0, 18, 0, -18, 0],
            duration: 7,
          }}
        />

        <FloatingHeart
          size={16}
          color="#5F89B8"
          opacity={0.22}
          position={{ bottom: "0", right: "1" }}
          animation={{
            y: [13, -13, 13],
            duration: 9,
          }}
        />
      </div>
    </SectionContainer>
  );
}
