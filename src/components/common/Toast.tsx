"use client";

import { motion, AnimatePresence } from "motion/react";
import { Check } from "lucide-react";
import { Toast } from "../../hooks/useToast";
import Portal from "./Modal/Portal";

export default function Toaster({ toasts }: { toasts: Toast[] }) {
  if (toasts.length === 0) return null;

  return (
    <Portal selector="body">
      <div className="fixed top-3 left-1/2 transform -translate-x-1/2 z-50 pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={toasts[0].id}
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="bg-white text-gray-900 border border-gray-200 px-4 py-3 rounded-lg text-sm font-medium shadow-lg flex items-center gap-3 whitespace-nowrap"
          >
            <Check size={16} className="text-gray-600 flex-shrink-0" />
            <span className="flex-1">{toasts[0].message}</span>
          </motion.div>
        </AnimatePresence>
      </div>
    </Portal>
  );
}
