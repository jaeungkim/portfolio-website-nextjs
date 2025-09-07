import Image from "next/image";
import { useState, useCallback } from "react";
import Modal from "@/src/components/common/Modal/Modal";
import Lightbox from "../components/Lightbox";

interface GalleryProps {
  images: string[];
  onToggleTimeline: () => void;
  showTimeline: boolean;
}

export default function Gallery({
  images,
  onToggleTimeline,
  showTimeline,
}: GalleryProps) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // Optimized event handlers
  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  return (
    <>
      <div className="py-[84px] px-6">
        <div className="flex flex-col items-center space-y-12">
          {/* Header Section */}
          <div className="text-center space-y-6">
            <h1 className="text-2xl font-medium text-neutral-900 tracking-wide">
              갤러리
            </h1>
            <div className="w-12 h-px bg-neutral-300 mx-auto"></div>
          </div>

          {/* Gallery Grid */}
          <div className="w-full max-w-md">
            <div className="grid grid-cols-3 gap-2">
              {images.map((src, index) => (
                <div
                  key={`${src}-${index}`}
                  className="relative aspect-[3/4] rounded-md overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300 cursor-pointer"
                  onClick={() => openLightbox(index)}
                >
                  <Image
                    src={src}
                    alt={`Photo ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
                    className="object-cover hover:scale-105 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        overlayClassName="bg-black/60 backdrop-blur-md"
        className="max-w-none w-full h-[75vh] bg-white rounded-lg shadow-xl"
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
