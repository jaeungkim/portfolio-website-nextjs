import { useRef, useEffect, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion } from "motion/react";
import WeddingHero from "./sections/WeddingHero";
import GettingMarried from "./sections/GettingMarried";
import Introduction from "./sections/Introduction";
import WeddingLocation from "./sections/WeddingLocation";
import Gallery from "./sections/Gallery";
import HowWeMet from "./sections/HowWeMet";
import BankInfo from "./sections/BankInfo";
import Epilogue from "./sections/Epilogue";

gsap.registerPlugin(ScrollTrigger);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.2,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

// 섹션 컴포넌트들을 배열로 정의
const sections = [
  { component: GettingMarried, key: "getting-married" },
  { component: Introduction, key: "introduction" },
  { component: WeddingLocation, key: "wedding-location" },
  { component: Gallery, key: "gallery" },
  { component: HowWeMet, key: "how-we-met" },
  { component: BankInfo, key: "bank-info" },
  { component: Epilogue, key: "epilogue" },
];

export default function MainWeddingScreen() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);

  const setupScrollAnimations = useCallback(() => {
    sectionRefs.current.forEach((section) => {
      if (!section) return;

      gsap.fromTo(
        section,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });
  }, []);

  useEffect(() => {
    setupScrollAnimations();
    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, [setupScrollAnimations]);

  return (
    <motion.div
      className="min-h-screen flex justify-center"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="w-full max-w-md mx-auto">
        {/* 메인 히어로 섹션 */}
        <WeddingHero />

        {/* 각 섹션들 */}
        {sections.map((section, index) => {
          const SectionComponent = section.component;
          return (
            <div
              key={section.key}
              ref={(el) => {
                sectionRefs.current[index] = el;
              }}
            >
              <SectionComponent />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
