"use client";

import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { LightboxProps } from "../types";

export default function Lightbox({
  images,
  initialIndex,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const imagesLength = images.length;

  // Navigation functions
  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? imagesLength - 1 : prev - 1));
  }, [imagesLength]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === imagesLength - 1 ? 0 : prev + 1));
  }, [imagesLength]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          goToPrevious();
          break;
        case "ArrowRight":
          goToNext();
          break;
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goToPrevious, goToNext]);

  return (
    <div className="relative h-[80vh] w-full overflow-hidden">
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-3 right-3 z-30 w-10 h-10 flex items-center justify-center text-neutral-400"
        aria-label="Close lightbox"
      >
        <X size={20} />
      </button>

      {/* Navigation Arrows - Only show if multiple images */}
      {imagesLength > 1 && (
        <>
          <button
            type="button"
            onClick={goToPrevious}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center text-neutral-400 "
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            type="button"
            onClick={goToNext}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center text-neutral-400"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Simple CSS Carousel - Almost Full Viewport */}
      <div className="relative w-full h-full px-0">
        <div className="relative w-full h-full overflow-hidden">
          {images.map((src, index) => (
            <div
              key={`${src}-${index}`}
              className={`absolute inset-0 transition-opacity duration-700 ease-in-out flex items-center justify-center ${
                index === currentIndex ? "opacity-100" : "opacity-0"
              }`}
            >
              <Image
                src={src}
                alt={`Wedding photo ${index + 1}`}
                fill
                className="object-contain"
                sizes="(max-width: 768px) 90vw, 800px"
                priority={index === currentIndex}
              />
            </div>
          ))}
        </div>

        {/* Page Indicator - Only show if multiple images */}
        {imagesLength > 1 && (
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 px-4 py-2 text-neutral-400 text-sm font-medium">
            {currentIndex + 1} / {imagesLength}
          </div>
        )}
      </div>
    </div>
  );
}
