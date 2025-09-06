import React, { useRef, useEffect, useState } from "react";
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
import Lightbox from "./components/Lightbox";

gsap.registerPlugin(ScrollTrigger);

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
  { component: WeddingLocation, key: "wedding-location" },
  { component: HowWeMet, key: "how-we-met" },
  { component: BankInfo, key: "bank-info" },
  { component: Epilogue, key: "epilogue" },
];

export default function MainWeddingScreen() {
  const sectionRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  useEffect(() => {
    const refs = sectionRefs.current;
    refs.forEach((section) => {
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

    return () => ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }, []);

  return (
    <motion.div
      className="min-h-screen flex justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div className="w-full max-w-md mx-auto border border-solid shadow-md border-neutral-200">
        <WeddingHero />

        {SECTIONS.map((section, index) => {
          const SectionComponent = section.component;

          if (section.key === "wedding-location") {
            return (
              <React.Fragment key={`group-${section.key}`}>
                <div
                  ref={(el) => {
                    if (el) sectionRefs.current[index] = el;
                  }}
                >
                  <SectionComponent />
                </div>
                <div
                  ref={(el) => {
                    if (el) sectionRefs.current[index + 1] = el;
                  }}
                >
                  <Gallery onOpenLightbox={openLightbox} images={IMAGES} />
                </div>
              </React.Fragment>
            );
          }

          return (
            <div
              key={section.key}
              ref={(el) => {
                if (el) sectionRefs.current[index + (index >= 3 ? 1 : 0)] = el;
              }}
            >
              <SectionComponent />
            </div>
          );
        })}

        <Lightbox
          isOpen={lightboxOpen}
          onClose={closeLightbox}
          images={IMAGES}
          initialIndex={selectedImageIndex}
        />
      </div>
    </motion.div>
  );
}
