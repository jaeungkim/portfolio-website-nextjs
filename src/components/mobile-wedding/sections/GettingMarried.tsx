"use client";

import { motion } from "motion/react";
import SectionContainer from "../components/SectionContainer";

export default function GettingMarried() {
  return (
    <SectionContainer sectionKey="getting-married">
      <div className="relative flex flex-col items-center justify-center py-[128px] text-[#5F89B8] font-bold text-lg text-center space-y-4 mx-8 overflow-hidden">
        <motion.div
          className="absolute top-8 left-8 opacity-20"
          animate={{
            y: [-15, 5, -15],
            rotate: [0, 15, 0, -15, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#5F89B8">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute top-16 right-12 opacity-18"
          animate={{
            y: [15, -15, 15],
            x: [-2, 2, -2],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="#FFB6C1">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>

        {/* Main text content */}
        <p>화려한 예식 대신 소박하고,</p>
        <p>따뜻한 만남을 선택했습니다.</p>
        <p>가족과 친척들이 한자리에 모여</p>
        <p>정을 나누고, 함께하는 식사 자리를 통해</p>
        <p>새로운 시작을 축하하고자 합니다.</p>
        <p>작은 모임이지만 큰 행복이 깃든</p>
        <p>소중한 날이 되기를 바랍니다.</p>

        {/* Gentle floating hearts in mixed colors */}
        <motion.div
          className="absolute bottom-8 left-6 opacity-25"
          animate={{
            y: [-13, 13, -13],
            rotate: [0, 18, 0, -18, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="#FFB6C1">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-12 right-8 opacity-22"
          animate={{
            y: [13, -13, 13],
            x: [1, -1, 1],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="#5F89B8">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      </div>
    </SectionContainer>
  );
}
