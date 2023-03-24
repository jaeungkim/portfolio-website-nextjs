import { useState, useEffect } from "react";
import { ChevronUpIcon } from "@heroicons/react/24/outline";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 300) {
        setShowButton(true);
      } else {
        setShowButton(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleButtonClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`fixed bottom-5 right-5 p-3 rounded-full shadow-lg transition-opacity duration-300 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-white ${
        showButton ? "opacity-100" : "opacity-0"
      }`}
    >
      <ChevronUpIcon className="w-5 h-5" />
    </button>
  );
};

export default ScrollToTopButton;
