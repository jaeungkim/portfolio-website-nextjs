"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { X } from "lucide-react";

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
  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <AnimatePresence mode="wait">
          {isOpen && (
            <Dialog.Overlay asChild>
              <motion.div
                className="fixed inset-0 z-[9999] bg-black/50"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              />
            </Dialog.Overlay>
          )}
        </AnimatePresence>

        <AnimatePresence mode="wait">
          {isOpen && (
            <Dialog.Content asChild>
              <motion.div
                className={`fixed left-1/2 top-1/2 z-[9999] w-[calc(100vw-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2
                          bg-white rounded-lg shadow-xl p-4
                          max-h-[min(90vh,100dvh-2rem)] overflow-y-auto ${className}`}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{
                  opacity: 0,
                  y: 20,
                  scale: 0.95,
                  transition: { duration: 0.2, ease: "easeIn" },
                }}
                transition={{ duration: 1, ease: [0.34, 1.56, 0.64, 1] }}
              >
                <Dialog.Title className="sr-only">Modal Dialog</Dialog.Title>
                <Dialog.Description className="sr-only">
                  Modal content dialog
                </Dialog.Description>

                <Dialog.Close asChild>
                  <button
                    className="absolute top-3 right-3 z-50 p-1 hover:bg-gray-100 rounded-full text-gray-500 hover:text-gray-700 transition-colors"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </Dialog.Close>
                {children}
              </motion.div>
            </Dialog.Content>
          )}
        </AnimatePresence>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
