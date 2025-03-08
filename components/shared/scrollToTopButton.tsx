import { useState, useEffect, useCallback } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";
import clsx from "clsx";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  const handleScroll = useCallback(() => {
    requestAnimationFrame(() => {
      setShowButton(window.scrollY > 300);
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className={clsx(
        "fixed bottom-5 right-5 p-3 rounded-full shadow-lg transition-opacity duration-300 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white",
        { "opacity-100": showButton, "opacity-0": !showButton }
      )}
      aria-label="Scroll to top"
    >
      <ChevronUpIcon className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTopButton;
