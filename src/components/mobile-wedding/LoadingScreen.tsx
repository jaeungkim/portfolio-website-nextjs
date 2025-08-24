"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

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
  const [isReady, setIsReady] = useState(false);

  const loadSvg = useCallback(async (url: string): Promise<string> => {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to load SVG: ${response.status}`);
    }
    return response.text();
  }, []);

  useEffect(() => {
    const initializeSvgs = async () => {
      try {
        const [welcomeSvg, weddingSvg] = await Promise.all([
          loadSvg(SVG_ASSETS.welcome),
          loadSvg(SVG_ASSETS.wedding),
        ]);

        if (welcomeRef.current && weddingRef.current) {
          welcomeRef.current.innerHTML = welcomeSvg;
          weddingRef.current.innerHTML = weddingSvg;
          setIsReady(true);
        }
      } catch (error) {
        console.error("SVG loading failed:", error);
        onLoadingComplete();
      }
    };

    initializeSvgs();
  }, [loadSvg, onLoadingComplete]);

  useGSAP(
    () => {
      if (!isReady) return;

      const animatePaths = (svg: SVGSVGElement) => {
        const paths = Array.from(svg.querySelectorAll("path"));
        
        gsap.set(paths, {
          stroke: ANIMATION_CONFIG.paths.stroke,
          strokeWidth: ANIMATION_CONFIG.paths.strokeWidth,
          fill: "none",
          attr: { "stroke-linecap": "round", "stroke-linejoin": "round" },
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

      gsap.timeline({ onComplete: onLoadingComplete })
        .add(animatePaths(welcome))
        .add(animatePaths(wedding));
    },
    { scope: containerRef, dependencies: [isReady, onLoadingComplete] }
  );

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
    >
      <div className="text-center select-none max-w-[280px] mx-auto">
        <div ref={welcomeRef} className="mb-8 inline-block" />
        <div ref={weddingRef} className="inline-block" />
      </div>
    </div>
  );
}
