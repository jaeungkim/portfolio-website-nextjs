"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "motion/react";
import { ArrowUp } from "lucide-react";

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      setVisible(window.scrollY > 300);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      onClick={scrollToTop}
      className={`fixed bottom-5 right-5 z-50 size-6 rounded-full bg-black/20 border border-neutral-300 flex items-center justify-center backdrop-blur-sm`}
      aria-label="맨 위로"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: visible ? 1 : 0 }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      <ArrowUp className="w-4 h-4 text-neutral-100" />
    </motion.button>
  );
}
