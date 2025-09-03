import { motion, AnimatePresence } from "motion/react";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

interface LightboxProps {
  isOpen: boolean;
  onClose: () => void;
  images: string[];
  initialIndex: number;
}

export default function Lightbox({
  isOpen,
  onClose,
  images,
  initialIndex,
}: LightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const touchStartX = useRef<number>(0);
  const touchStartY = useRef<number>(0);

  useEffect(() => {
    setCurrentIndex(initialIndex);
  }, [initialIndex]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const goToPrevious = () => setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  const goToNext = () => setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.targetTouches[0].clientX;
    touchStartY.current = e.targetTouches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX.current || !touchStartY.current) return;

    const touchEndX = e.changedTouches[0].clientX;
    const touchEndY = e.changedTouches[0].clientY;
    const diffX = touchStartX.current - touchEndX;
    const diffY = Math.abs(touchStartY.current - touchEndY);

    if (Math.abs(diffX) > 50 && diffY < 100) {
      diffX > 0 ? goToNext() : goToPrevious();
    }

    touchStartX.current = 0;
    touchStartY.current = 0;
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="lightbox-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }}
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md"
          onClick={onClose}
        >
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20, transition: { duration: 0.3, ease: "easeIn" } }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="relative h-full w-full bg-white overflow-hidden"
          onClick={(e) => e.stopPropagation()}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Close Button */}
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2, ease: "easeIn" } }}
            transition={{ delay: 0.2, duration: 0.2 }}
            onClick={onClose}
            className="absolute top-2 right-2 z-20 w-10 h-10 flex items-center justify-center text-gray-300"
          >
            <X size={20} />
          </motion.button>

          {/* Navigation Arrows */}
          <motion.button
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20, transition: { duration: 0.3, ease: "easeIn" } }}
            transition={{ delay: 0.3, duration: 0.3 }}
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            className="flex absolute left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center text-gray-300"
          >
            <ChevronLeft size={24} />
          </motion.button>

          <motion.button
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20, transition: { duration: 0.3, ease: "easeIn" } }}
            transition={{ delay: 0.4, duration: 0.3 }}
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            className="flex absolute right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center text-gray-300"
          >
            <ChevronRight size={24} />
          </motion.button>

          {/* Image Container */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3, ease: "easeIn" } }}
            transition={{ duration: 0.3, ease: "easeOut" }}
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

          {/* Page Indicator */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10, transition: { duration: 0.3, ease: "easeIn" } }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-black/20 text-white text-sm rounded-full backdrop-blur-sm"
          >
            {currentIndex + 1} / {images.length}
          </motion.div>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
