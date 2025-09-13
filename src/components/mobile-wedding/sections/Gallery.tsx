"use client";

import Image from "next/image";
import { useState } from "react";
import Modal from "@/src/components/common/Modal/Modal";
import Lightbox from "../components/Lightbox";
import { GALLERY_IMAGES } from "../constants";
import SectionContainer from "../components/SectionContainer";
import RadixModal from "../../common/Modal/RadixModal";

export default function Gallery() {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  // 갤러리 그리드에는 최대 9개 이미지만 표시
  const GALLERY_DISPLAY_LIMIT = 9;
  const displayImages = GALLERY_IMAGES.slice(0, GALLERY_DISPLAY_LIMIT);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
  };

  return (
    <SectionContainer sectionKey="gallery" aria-labelledby="gallery-heading">
      {/* Header Section */}
      <header className="text-center space-y-6">
        <h1
          id="gallery-heading"
          className="text-2xl font-medium text-neutral-900 tracking-wide"
        >
          갤러리
        </h1>
        <div
          className="w-12 h-px bg-neutral-300 mx-auto"
          aria-hidden="true"
        ></div>
      </header>

      {/* Gallery Grid */}
      <div className="w-full">
        <div
          className="grid grid-cols-3 gap-2"
          role="grid"
          aria-label="웨딩 사진 갤러리"
        >
          {displayImages.map((src, index) => (
            <button
              key={`${src}-${index}`}
              className="relative aspect-[3/4] rounded-md overflow-hidden shadow-sm  transition-shadow duration-300 cursor-pointer "
              onClick={() => openLightbox(index)}
              aria-label={`웨딩 사진 ${index + 1} 확대 보기`}
            >
              <Image
                src={src}
                alt={`웨딩 사진 ${index + 1}`}
                fill
                sizes="(max-width: 768px) 33vw, (max-width: 1200px) 25vw, 20vw"
                className="object-cover transition-transform duration-300"
              />
            </button>
          ))}
        </div>
      </div>

      <RadixModal
        isOpen={lightboxIndex !== null}
        onClose={closeLightbox}
        className="mx-0"
      >
        {lightboxIndex !== null && (
          <Lightbox
            images={GALLERY_IMAGES}
            initialIndex={lightboxIndex}
            onClose={closeLightbox}
          />
        )}
      </RadixModal>
    </SectionContainer>
  );
}
