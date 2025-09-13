"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect, useRef } from "react";
import { RemoveScroll } from "react-remove-scroll";
import Portal from "./Portal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className = "",
}: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  return (
    <Portal>
      <RemoveScroll enabled={isOpen}>
        <AnimatePresence mode="wait">
          {isOpen && (
            <motion.div
              className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              onClick={onClose}
            >
              <motion.div
                ref={modalRef}
                className={`bg-white rounded-lg shadow-xl mx-4 p-4 w-full max-w-md relative
                            max-h-[min(90vh,100dvh-2rem)] overflow-y-auto ${className}`}
                initial={false}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: 20,
                  scale: 0.95,
                  transition: { duration: 0.2, ease: "easeIn" },
                }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
                onClick={(event) => event.stopPropagation()}
              >
                <button
                  onClick={onClose}
                  className="absolute top-3 right-3 z-50 p-1 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-700 transition-colors"
                  aria-label="Close modal"
                >
                  <X className="w-5 h-5" />
                </button>
                {children}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </RemoveScroll>
    </Portal>
  );
}
