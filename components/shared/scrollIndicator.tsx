import { useEffect, useRef } from "react";

const ScrollIndicator = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const pageHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrollPercent = (scrollY / pageHeight) * 100;
      scrollRef.current.style.width = `${scrollPercent}%`;
    };

    let rafId;
    const handleAnimationFrame = () => {
      handleScroll();
      rafId = requestAnimationFrame(handleAnimationFrame);
    };

    handleAnimationFrame();

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-1 bg-gray-300">
      <div className="h-full bg-pink-600 dark:bg-pink-300" ref={scrollRef} />
    </div>
  );
};

export default ScrollIndicator;
