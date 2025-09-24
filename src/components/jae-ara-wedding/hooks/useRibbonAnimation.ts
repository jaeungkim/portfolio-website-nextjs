import { useEffect, useRef, useCallback } from "react";
import { gsap } from "gsap";

export function useRibbonAnimation() {
  const ribbonRef = useRef<HTMLDivElement>(null);
  const pathLengthsRef = useRef<number[]>([]);
  const isInitializedRef = useRef(false);

  // Pre-calculate path lengths when component mounts
  const initializePaths = useCallback(() => {
    if (!ribbonRef.current || isInitializedRef.current) return;

    const paths = ribbonRef.current.querySelectorAll("path");
    pathLengthsRef.current = Array.from(paths).map((path) =>
      (path as SVGPathElement).getTotalLength()
    );

    // Set initial state immediately
    paths.forEach((path, index) => {
      const pathLength = pathLengthsRef.current[index];
      gsap.set(path, {
        strokeDasharray: pathLength,
        strokeDashoffset: pathLength,
        opacity: 0,
      });
    });

    isInitializedRef.current = true;
  }, []);

  // Initialize paths when ref is available
  useEffect(() => {
    if (ribbonRef.current) {
      initializePaths();
    }
  }, [initializePaths]);

  const startRibbonAnimation = useCallback(() => {
    if (!ribbonRef.current || !isInitializedRef.current) return;

    const paths = ribbonRef.current.querySelectorAll("path");

    // Kill any existing animations first
    gsap.killTweensOf(paths);

    // Use a timeline for synchronized animation
    const tl = gsap.timeline();

    paths.forEach((path, index) => {
      tl.to(path, {
        strokeDashoffset: 0,
        opacity: 1,
        duration: 2.5,
        ease: "power2.inOut",
      }, 0); // Start all at the same time (offset: 0)
    });
  }, []);

  const resetRibbonAnimation = useCallback(() => {
    if (!ribbonRef.current || !isInitializedRef.current) return;

    const paths = ribbonRef.current.querySelectorAll("path");

    // Kill any existing animations
    gsap.killTweensOf(paths);

    // Reset to initial state using pre-calculated lengths
    paths.forEach((path, index) => {
      const pathLength = pathLengthsRef.current[index];
      gsap.set(path, {
        strokeDashoffset: pathLength,
        opacity: 0,
      });
    });
  }, []);

  return {
    ribbonRef,
    startRibbonAnimation,
    resetRibbonAnimation,
  };
}
