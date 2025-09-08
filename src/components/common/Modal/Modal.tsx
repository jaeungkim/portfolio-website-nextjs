import { motion, AnimatePresence } from "motion/react";
import { usePortal } from "@/src/hooks/usePortal";
import { useEffect } from "react";
import { twMerge } from "tailwind-merge";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  overlayClassName?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
}

export default function Modal({
  isOpen,
  onClose,
  children,
  className = "",
  overlayClassName = "",
  closeOnOverlayClick = true,
  closeOnEscape = true,
}: ModalProps) {
  const Portal = usePortal("modal-root");

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  useEffect(() => {
    if (!closeOnEscape || !isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose, closeOnEscape]);

  if (!isOpen) return null;

  return (
    <Portal>
      <motion.div
        className={twMerge(
          "fixed inset-0 z-[9999] flex items-center justify-center bg-white/20 backdrop-blur-sm",
          overlayClassName
        )}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        onClick={(e) => {
          if (closeOnOverlayClick && e.target === e.currentTarget) {
            onClose();
          }
        }}
      >
        <motion.div
          className={twMerge(
            "bg-white rounded-lg shadow-xl mx-4 w-full max-w-md",
            className
          )}
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </motion.div>
      </motion.div>
    </Portal>
  );
}
