"use client";

import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { Toast } from "../../hooks/useToast";
import Portal from "./Modal/Portal";

export default function Toaster({ toast, isVisible }: { toast: Toast | null; isVisible: boolean }) {
  if (!toast) return null;

  return (
    <Portal selector="body">
      <div className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
        <AnimatePresence>
          {isVisible && (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, y: -20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ 
                duration: 0.4,
                ease: [0.16, 1, 0.3, 1],
                scale: { 
                  duration: 0.3,
                  ease: [0.16, 1, 0.3, 1]
                }
              }}
              className="bg-white text-gray-900 border border-gray-200 px-4 py-3 rounded-lg text-sm font-medium shadow-lg flex items-center gap-3 whitespace-nowrap"
            >
              <Check size={16} className="text-gray-600 flex-shrink-0" />
              <span className="flex-1">{toast.message}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Portal>
  );
}
