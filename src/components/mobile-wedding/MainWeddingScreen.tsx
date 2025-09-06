import React, { useState } from "react";
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
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
  };

  const closeLightbox = () => setLightboxOpen(false);

  // GSAP animations are now handled individually in each section component

  return (
    <motion.div
      className="min-h-screen flex justify-center text-neutral-700"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      <div 
        style={{
          width: "100%",
          maxWidth: "28rem",
          margin: "0 auto",
          border: "1px solid #e5e5e5",
          boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
          backgroundImage: "url('/images/mobile-wedding/bg_img_white.jpg')",
          backgroundRepeat: "repeat",
          backgroundSize: "auto",
          backgroundAttachment: "local",
          willChange: "auto",
          transform: "translateZ(0)",
          backfaceVisibility: "hidden"
        }}
      >
        <WeddingHero />

        {SECTIONS.map((section, index) => {
          const SectionComponent = section.component;

          if (section.key === "wedding-location") {
            return (
              <React.Fragment key={`group-${section.key}`}>
                <SectionComponent />
                <Gallery onOpenLightbox={openLightbox} images={IMAGES} />
              </React.Fragment>
            );
          }

          return (
            <div key={section.key}>
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
