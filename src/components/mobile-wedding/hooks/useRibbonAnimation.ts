import { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function useRibbonAnimation() {
  const ribbonRef = useRef<HTMLDivElement>(null);

  const startRibbonAnimation = () => {
    if (!ribbonRef.current) return;

    const paths = ribbonRef.current.querySelectorAll("path");

    // Kill any existing animations first
    gsap.killTweensOf(paths);

    // Set initial state
    paths.forEach((path) => {
      const pathLength = (path as SVGPathElement).getTotalLength();
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        opacity: 0,
      });
    });

    // Animate each path simultaneously
    paths.forEach((path) => {
      gsap.to(path, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 3,
        ease: "power2.inOut",
      });
    });
  };

  const resetRibbonAnimation = () => {
    if (!ribbonRef.current) return;

    const paths = ribbonRef.current.querySelectorAll("path");

    // Kill any existing animations
    gsap.killTweensOf(paths);

    // Reset to initial state
    paths.forEach((path) => {
      const pathLength = (path as SVGPathElement).getTotalLength();
      gsap.set(path, {
        strokeDashoffset: pathLength,
        opacity: 0,
      });
    });
  };

  return {
    ribbonRef,
    startRibbonAnimation,
    resetRibbonAnimation,
  };
}
