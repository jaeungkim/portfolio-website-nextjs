"use client";

import { motion } from "motion/react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { LightboxProps } from "../types";

export default function Lightbox({
  images,
  initialIndex,
  onClose,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const imagesLength = images.length;

  // 네비게이션 함수들
  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? imagesLength - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === imagesLength - 1 ? 0 : prev + 1));
  };

  // 터치 이벤트 핸들러
  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.targetTouches[0];
    touchStartRef.current = { x: touch.clientX, y: touch.clientY };
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartRef.current) return;

    const touchEnd = e.changedTouches[0];
    const diffX = touchStartRef.current.x - touchEnd.clientX;
    const diffY = Math.abs(touchStartRef.current.y - touchEnd.clientY);

    // 스와이프 감지
    if (Math.abs(diffX) > 50 && diffY < 100) {
      if (diffX > 0) {
        goToNext();
      } else {
        goToPrevious();
      }
    }

    touchStartRef.current = null;
  };

  // 키보드 이벤트 핸들러
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
  }, [onClose]);

  // 초기 인덱스 변경 감지
  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  // 클릭 이벤트 핸들러
  const handlePreviousClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    goToPrevious();
  };

  const handleNextClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    goToNext();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="relative h-full w-full bg-white overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* Close Button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-10 h-10 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
        aria-label="Close lightbox"
      >
        <X size={20} />
      </button>

      {/* Navigation Arrows - Only show if multiple images */}
      {imagesLength > 1 && (
        <>
          <button
            type="button"
            onClick={handlePreviousClick}
            className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={24} />
          </button>

          <button
            type="button"
            onClick={handleNextClick}
            className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-12 h-12 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Image Container */}
      <motion.div
        key={currentIndex}
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        exit={{ x: -100, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="relative w-full h-full flex items-center justify-center"
      >
        <Image
          src={images[currentIndex]}
          alt={`Wedding photo ${currentIndex + 1}`}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 90vw, 800px"
          priority
        />
      </motion.div>

      {/* Page Indicator - Only show if multiple images */}
      {imagesLength > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 px-4 py-2 text-neutral-400 text-sm font-medium">
          {currentIndex + 1} / {imagesLength}
        </div>
      )}
    </motion.div>
  );
}
