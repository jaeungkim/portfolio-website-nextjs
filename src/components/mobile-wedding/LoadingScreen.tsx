"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { motion } from "motion/react";

gsap.registerPlugin(DrawSVGPlugin);

const ANIMATION_CONFIG = {
  paths: {
    stroke: "#000",
    strokeWidth: 8,
    duration: 0.3,
    ease: "power1.inOut" as const,
    stagger: 0.1,
  },
} as const;

const SVG_ASSETS = {
  welcome: "/images/mobile-wedding/loading/welcome.svg",
  wedding: "/images/mobile-wedding/loading/to-our-wedding.svg",
} as const;

type Props = { onLoadingComplete: () => void };

export default function LoadingScreen({ onLoadingComplete }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const weddingRef = useRef<HTMLDivElement>(null);
  const [svgsLoaded, setSvgsLoaded] = useState(false);
  const [loadingError, setLoadingError] = useState<string | null>(null);

  useEffect(() => {
    const preloadSvgs = async () => {
      try {
        const [welcomeSvg, weddingSvg] = await Promise.all([
          fetch(SVG_ASSETS.welcome).then((r) => {
            if (!r.ok)
              throw new Error(`Failed to load welcome SVG: ${r.status}`);
            return r.text();
          }),
          fetch(SVG_ASSETS.wedding).then((r) => {
            if (!r.ok)
              throw new Error(`Failed to load wedding SVG: ${r.status}`);
            return r.text();
          }),
        ]);

        if (welcomeRef.current && weddingRef.current) {
          welcomeRef.current.innerHTML = welcomeSvg;
          weddingRef.current.innerHTML = weddingSvg;
          setSvgsLoaded(true);
        }
      } catch (error) {
        console.error("Failed to preload SVG assets:", error);
        setLoadingError(
          error instanceof Error ? error.message : "Unknown error"
        );
        onLoadingComplete();
      }
    };

    preloadSvgs();
  }, [onLoadingComplete]);

  useGSAP(
    () => {
      if (!svgsLoaded || loadingError) return;

      const animatePaths = (svg: SVGSVGElement) => {
        const paths = Array.from(svg.querySelectorAll("path"));

        gsap.set(paths, {
          stroke: ANIMATION_CONFIG.paths.stroke,
          strokeWidth: ANIMATION_CONFIG.paths.strokeWidth,
          fill: "none",
          attr: {
            "stroke-linecap": "round",
            "stroke-linejoin": "round",
          },
          drawSVG: "0% 0%",
        });

        return gsap.to(paths, {
          drawSVG: "0% 100%",
          duration: ANIMATION_CONFIG.paths.duration,
          ease: ANIMATION_CONFIG.paths.ease,
          stagger: ANIMATION_CONFIG.paths.stagger,
        });
      };

      const configureSvg = (svg: SVGSVGElement) => {
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        Object.assign(svg.style, {
          width: "min(280px,92vw)",
          height: "auto",
          overflow: "visible",
          maxWidth: "280px",
        });
      };

      const welcome = welcomeRef.current?.querySelector("svg") as SVGSVGElement;
      const wedding = weddingRef.current?.querySelector("svg") as SVGSVGElement;

      if (!welcome || !wedding) return;

      [welcome, wedding].forEach(configureSvg);

      const tl = gsap.timeline({ onComplete: onLoadingComplete });
      tl.add(animatePaths(welcome)).add(animatePaths(wedding));
    },
    {
      scope: containerRef,
      dependencies: [svgsLoaded, loadingError, onLoadingComplete],
      revertOnUpdate: true,
    }
  );

  if (loadingError) {
    return (
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-red-50"
      >
        <div className="text-center text-red-800">
          <p className="text-lg font-semibold mb-2">Loading Error</p>
          <p className="text-sm opacity-75">{loadingError}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Retry
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div className="text-center select-none max-w-[280px] mx-auto">
        <div ref={welcomeRef} className="mb-8 inline-block" />
        <div ref={weddingRef} className="inline-block" />
      </div>
    </motion.div>
  );
}
