"use client";

import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";
import { useEffect } from "react";
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
  // Prevent scroll when modal is open (webview-compatible approach)
  useEffect(() => {
    if (isOpen) {
      // Store original styles
      const originalBodyOverflow = document.body.style.overflow;
      const originalBodyPosition = document.body.style.position;
      const originalHtmlOverflow = document.documentElement.style.overflow;
      const originalBodyTouchAction = document.body.style.touchAction;
      const originalHtmlTouchAction = document.documentElement.style.touchAction;

      // Webview-compatible scroll prevention
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
      document.body.style.top = `-${window.scrollY}px`;

      document.documentElement.style.overflow = "hidden";
      document.documentElement.style.scrollbarGutter = "stable";

      // Prevent touch scrolling (especially for webviews)
      document.body.style.touchAction = "none";
      document.documentElement.style.touchAction = "none";

      return () => {
        // Restore original styles
        document.body.style.overflow = originalBodyOverflow || "";
        document.body.style.position = originalBodyPosition || "";
        document.body.style.width = "";
        document.body.style.top = "";
        document.body.style.touchAction = originalBodyTouchAction || "";

        document.documentElement.style.overflow = originalHtmlOverflow || "";
        document.documentElement.style.scrollbarGutter = "";
        document.documentElement.style.touchAction = originalHtmlTouchAction || "";

        // Restore scroll position
        window.scrollTo(0, parseInt(document.body.style.top || "0") * -1);
      };
    }
  }, [isOpen]);

  return (
    <Portal>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={onClose}
          >
            <motion.div
              className={`bg-white rounded-lg shadow-xl mx-4 p-4 w-full max-w-md relative ${className}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{
                opacity: 0,
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
    </Portal>
  );
}
