import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import WeddingHero from "./sections/WeddingHero";
import GettingMarried from "./sections/GettingMarried";
import Introduction from "./sections/Introduction";
import WeddingLocation from "./sections/WeddingLocation";
import WeddingCalendar from "./sections/WeddingCalendar";
import Gallery from "./sections/Gallery";
import BankInfo from "./sections/BankInfo";
import Epilogue from "./sections/Epilogue";

gsap.registerPlugin(ScrollTrigger);

const ANIMATION_CONFIG = {
  y: 100,
  opacity: 0,
  duration: 1.2,
  ease: "power2.out",
  scrollTrigger: {
    start: "top 80%",
    end: "bottom 20%",
    toggleActions: "play none none reverse",
    scrub: false,
  },
};

const IMAGES = [
  "/images/mobile-wedding/gallery/main.jpeg",
  "/images/mobile-wedding/gallery/main22.jpeg",
  "/images/mobile-wedding/gallery/main23.jpeg",
  "/images/mobile-wedding/gallery/main24.jpeg",
  "/images/mobile-wedding/gallery/EB44B0AD-92D7-46BF-AC01-C0780C0C7A29_1_102_o.jpeg",
  "/images/mobile-wedding/gallery/main.jpeg",
  "/images/mobile-wedding/gallery/main22.jpeg",
  "/images/mobile-wedding/gallery/main23.jpeg",
  "/images/mobile-wedding/gallery/main24.jpeg",
];

const SECTIONS = [
  { component: GettingMarried, key: "getting-married" },
  { component: Introduction, key: "introduction" },
  { component: WeddingCalendar, key: "wedding-calendar" },
  { component: WeddingLocation, key: "wedding-location" },
  { component: BankInfo, key: "bank-info" },
  { component: Epilogue, key: "epilogue" },
];

export default function MainWeddingScreen() {
  const [showTimeline, setShowTimeline] = useState(false);

  const toggleTimeline = () => {
    setShowTimeline(!showTimeline);
  };

  // Ultra-simple GSAP setup - One config for all sections
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Get all sections and animate each with same config
      const sections = gsap.utils.toArray<HTMLElement>("[data-section]");

      sections.forEach((section) => {
        const sectionKey = section.getAttribute("data-section");

        // Ensure element starts in initial state
        gsap.set(section, {
          y: ANIMATION_CONFIG.y,
          opacity: ANIMATION_CONFIG.opacity,
        });

        gsap.fromTo(
          section,
          { y: ANIMATION_CONFIG.y, opacity: ANIMATION_CONFIG.opacity },
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

    return () => ctx.revert();
  }, [showTimeline]);

  return (
    <motion.div
      className="min-h-screen flex justify-center text-neutral-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div
        className="relative"
        style={{
          width: "100%",
          maxWidth: "28rem",
          margin: "0 auto",
          border: "1px solid #e5e5e5",
          boxShadow:
            "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          backgroundImage: "url('/images/mobile-wedding/bg_img_white.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundAttachment: "local",
        }}
      >
        <WeddingHero />

        {SECTIONS.map((section, index) => {
          const SectionComponent = section.component;

          if (section.key === "wedding-calendar") {
            return (
              <React.Fragment key={`group-${section.key}`}>
                <div data-section={section.key}>
                  <SectionComponent />
                </div>
                <div data-section="gallery">
                  <Gallery
                    images={IMAGES}
                    onToggleTimeline={toggleTimeline}
                    showTimeline={showTimeline}
                  />
                </div>
              </React.Fragment>
            );
          }

          return (
            <div key={section.key} data-section={section.key}>
              <SectionComponent />
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
