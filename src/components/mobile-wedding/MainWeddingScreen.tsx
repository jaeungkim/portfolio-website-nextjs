import { motion, AnimatePresence } from "motion/react";

export default function MainWeddingScreen() {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key="main-content"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="min-h-screen"
      >
        <div className="text-center py-12 px-4">
          <motion.h1
            className="text-3xl font-bold text-gray-800 mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            안녕하세요
          </motion.h1>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
