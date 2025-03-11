"use client";

import { useEffect, useState } from "react";

const ScrollIndicator = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateScrollProgress = () => {
      const scrollY = window.scrollY;
      const pageHeight =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = (scrollY / pageHeight) * 100;
      setScrollProgress(progress);
    };

    window.addEventListener("scroll", updateScrollProgress);
    updateScrollProgress(); // Initialize on mount

    return () => window.removeEventListener("scroll", updateScrollProgress);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-300 z-50">
      <div
        className="h-full bg-pink-600 dark:bg-pink-300 transition-[width] duration-75 ease-linear"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
};

export default ScrollIndicator;
