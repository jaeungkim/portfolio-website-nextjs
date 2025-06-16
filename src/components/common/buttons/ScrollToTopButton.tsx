"use client";

import { useState, useEffect, useCallback } from "react";
import clsx from "clsx";

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
    <button
      onClick={scrollToTop}
      className={clsx(
        "fixed bottom-5 right-5 p-3 rounded-full shadow-lg transition-opacity duration-300",
        "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      aria-label="Scroll to top"
    >
      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
        <path
          fillRule="evenodd"
          d="M10 5.293l4.646 4.647a1 1 0 01-1.414 1.414L10 8.414l-3.232 2.94a1 1 0 01-1.31-1.518l4-3.75a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
    </button>
  );
}
