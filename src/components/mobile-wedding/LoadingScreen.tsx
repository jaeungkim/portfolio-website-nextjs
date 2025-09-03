"use client";

import { useRef, useEffect, useState } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";

gsap.registerPlugin(DrawSVGPlugin);

const PATH_CONFIG = { stroke: "#000", strokeWidth: 8, duration: 0.3, ease: "power1.inOut", stagger: 0.1 };
const SVGS = { welcome: "/images/mobile-wedding/loading/welcome.svg", wedding: "/images/mobile-wedding/loading/to-our-wedding.svg" };

type Props = { onLoadingComplete: () => void };

export default function LoadingScreen({ onLoadingComplete }: Props) {
  const welcomeRef = useRef<HTMLDivElement>(null);
  const weddingRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const loadSvg = async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) throw new Error(`Failed to load SVG: ${response.status}`);
      return response.text();
    };

    Promise.all([loadSvg(SVGS.welcome), loadSvg(SVGS.wedding)])
      .then(([welcomeSvg, weddingSvg]) => {
        if (welcomeRef.current && weddingRef.current) {
          welcomeRef.current.innerHTML = welcomeSvg;
          weddingRef.current.innerHTML = weddingSvg;
          setIsReady(true);
        }
      })
      .catch(() => onLoadingComplete());
  }, [onLoadingComplete]);

  useGSAP(() => {
    if (!isReady) return;

    const animatePaths = (svg: SVGSVGElement) => {
      const paths = Array.from(svg.querySelectorAll("path"));
      gsap.set(paths, {
        stroke: PATH_CONFIG.stroke,
        strokeWidth: PATH_CONFIG.strokeWidth,
        fill: "none",
        attr: { "stroke-linecap": "round", "stroke-linejoin": "round" },
        drawSVG: "0% 0%",
      });
      return gsap.to(paths, {
        drawSVG: "0% 100%",
        duration: PATH_CONFIG.duration,
        ease: PATH_CONFIG.ease,
        stagger: PATH_CONFIG.stagger,
      });
    };

    const configureSvg = (svg: SVGSVGElement) => {
      svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
      Object.assign(svg.style, { width: "min(280px,92vw)", height: "auto", overflow: "visible", maxWidth: "280px" });
    };

    const welcome = welcomeRef.current?.querySelector("svg") as SVGSVGElement;
    const wedding = weddingRef.current?.querySelector("svg") as SVGSVGElement;
    if (!welcome || !wedding) return;

    [welcome, wedding].forEach(configureSvg);
    gsap.timeline({ onComplete: onLoadingComplete }).add(animatePaths(welcome)).add(animatePaths(wedding));
  }, { dependencies: [isReady, onLoadingComplete] });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white">
      <div className="text-center select-none max-w-[280px] mx-auto">
        <div ref={welcomeRef} className="mb-8 inline-block" />
        <div ref={weddingRef} className="inline-block" />
      </div>
    </div>
  );
}
