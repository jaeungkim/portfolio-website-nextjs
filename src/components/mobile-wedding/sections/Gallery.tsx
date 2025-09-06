import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Modal from "@/src/components/common/Modal/Modal";
import Lightbox from "../components/Lightbox";

gsap.registerPlugin(ScrollTrigger);

interface GalleryProps {
  images: string[];
}

export default function Gallery({ images }: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  useEffect(() => {
    const section = sectionRef.current;

    // Animation for the gallery section
    if (section) {
      gsap.fromTo(
        section,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            scrub: false,
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <>
      <div
        ref={sectionRef}
        className="h-[90svh] w-full flex flex-col items-center justify-center px-6 text-center py-[84px]"
      >
        <h1 className="h-8 text-xl font-medium text-center mb-[64px]">갤러리</h1>

        <div className="w-full grid grid-cols-3 gap-1">
          {images.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className="relative aspect-[3/4]"
              onClick={() => openLightbox(index)}
            >
              <Image
                src={src}
                alt={`Photo ${index + 1}`}
                fill
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>

      <Modal
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        overlayClassName="bg-black/60 backdrop-blur-md"
        className="max-w-none mx-[48px] w-full h-[75vh] bg-white rounded-lg shadow-xl"
        closeOnOverlayClick={true}
        closeOnEscape={true}
      >
        {lightboxIndex !== null && (
          <Lightbox
            images={images}
            initialIndex={lightboxIndex}
            onClose={closeLightbox}
          />
        )}
      </Modal>
    </>
  );
}
