import { useEffect, useState } from "react";

const ScrollIndicator = () => {
  const [scrollPercent, setScrollPercent] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const pageHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercent = (scrollY / pageHeight) * 100;
      setScrollPercent(scrollPercent);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-300">
      <div
        className="h-full bg-pink-600 dark:bg-pink-300"
        style={{ width: `${scrollPercent}%` }}
      />
    </div>
  );
};

export default ScrollIndicator;
