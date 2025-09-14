"use client";

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";

import SectionContainer from "../components/SectionContainer";

export default function GettingMarried() {
  const ribbonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ribbonRef.current) return;

    const paths = ribbonRef.current.querySelectorAll("path");

    paths.forEach((path, index) => {
      const pathLength = (path as SVGPathElement).getTotalLength();

      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        opacity: 0,
      });

      gsap.to(path, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 3,
        ease: "power2.inOut",
        delay: 0.3 + index * 0.3, // 0.5s initial delay + stagger
      });
    });
  }, []);

  return (
    <SectionContainer sectionKey="getting-married" className="pt-[160px]">
      <div className="relative flex flex-col items-center justify-center pt-[64px] text-[#5F89B8] font-bold text-lg text-center space-y-4 mx-2 overflow-hidden">
        <div
          ref={ribbonRef}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 w-40 h-12 opacity-60"
          dangerouslySetInnerHTML={{
            __html: `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 160 52" width="160" height="52" preserveAspectRatio="xMidYMid meet" style="width: 100%; height: 100%; transform: translate3d(0px, 0px, 0px); content-visibility: visible;"><defs><clipPath id="__lottie_element_160"><rect width="160" height="52" x="0" y="0"></rect></clipPath></defs><g clip-path="url(#__lottie_element_160)"><g transform="matrix(-1.3799999952316284,0,0,1.3799999952316284,77.25472259521484,25.537220001220703)" opacity="1" style="display: block;"><path stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(107,153,175)" stroke-opacity="1" stroke-width="2" d=" M-1.7410000562667847,-6.458000183105469 C-1.7410000562667847,-6.458000183105469 8.251999855041504,-14.954000473022461 16.194000244140625,-9.310999870300293 C18.09600067138672,-7.960000038146973 17.510000228881836,-6.383999824523926 17.198999404907227,-5.51200008392334 C16.382999420166016,-3.2269999980926514 12.392000198364258,-2.7109999656677246 8.720999717712402,-4.283999919891357 C3.8940000534057617,-6.353000164031982 -0.2460000067949295,-6.547999858856201 -1.6050000190734863,-6.185999870300293 C-2.9639999866485596,-5.823999881744385 -6.99399995803833,-5.098999977111816 -9.982999801635742,-2.2909998893737793 C-12.972000122070312,0.5170000195503235 -20.98900032043457,3.5969998836517334 -26.785999298095703,1.6039999723434448"></path></g><g transform="matrix(1.3799999952316284,0,0,1.3799999952316284,82.62027740478516,25.537220001220703)" opacity="1" style="display: block;"><path stroke-linecap="round" stroke-linejoin="round" fill-opacity="0" stroke="rgb(107,153,175)" stroke-opacity="1" stroke-width="2" d=" M-1.7410000562667847,-6.458000183105469 C-1.7410000562667847,-6.458000183105469 8.251999855041504,-14.954000473022461 16.194000244140625,-9.310999870300293 C18.09600067138672,-7.960000038146973 17.510000228881836,-6.383999824523926 17.198999404907227,-5.51200008392334 C16.382999420166016,-3.2269999980926514 12.392000198364258,-2.7109999656677246 8.720999717712402,-4.283999919891357 C3.8940000534057617,-6.353000164031982 -0.2460000067949295,-6.547999858856201 -1.6050000190734863,-6.185999870300293 C-2.9639999866485596,-5.823999881744385 -6.99399995803833,-5.098999977111816 -9.982999801635742,-2.2909998893737793 C-12.972000122070312,0.5170000195503235 -20.98900032043457,3.5969998836517334 -26.785999298095703,1.6039999723434448"></path></g></g></svg>`,
          }}
        />
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
        <p>화려한 예식 대신,</p>
        <p>소박하고 따듯한 만남을 선택했습니다.</p>
        <p>작은 모임이지만</p>
        <p>큰 행복이 깃든 소중한 날이 되기를 바라며</p>
        <p>가족과 친척들이 한자리에 모여</p>
        <p>함께하는 식사 자리를 통해</p>
        <p>새로운 시작을 축하하고자 합니다.</p>

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
