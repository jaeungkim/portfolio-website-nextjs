import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { DrawSVGPlugin } from "gsap/DrawSVGPlugin";
import { SVG_PATHS, SVG_ANIMATION_CONFIG, SVG_STYLES } from "../constants";
import type { LoadingScreenProps, SvgLoaderReturn } from "../types";

gsap.registerPlugin(DrawSVGPlugin);

/**
 * SVG 로딩 애니메이션 훅
 * SVG 파일을 로드하고 애니메이션을 실행합니다.
 */
export function useSvgLoader(
  onLoadingComplete: LoadingScreenProps["onLoadingComplete"]
): SvgLoaderReturn {
  const welcomeRef = useRef<HTMLDivElement>(null);
  const weddingRef = useRef<HTMLDivElement>(null);
  const [isReady, setIsReady] = useState(false);

  // SVG 파일 로드
  useEffect(() => {
    const loadSvg = async (url: string) => {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Failed to load SVG: ${response.status}`);
      }
      return response.text();
    };

    Promise.all([loadSvg(SVG_PATHS.welcome), loadSvg(SVG_PATHS.wedding)])
      .then(([welcomeSvg, weddingSvg]) => {
        if (welcomeRef.current && weddingRef.current) {
          welcomeRef.current.innerHTML = welcomeSvg;
          weddingRef.current.innerHTML = weddingSvg;
          setIsReady(true);
        }
      })
      .catch(() => {
        onLoadingComplete();
      });
  }, [onLoadingComplete]);

  // SVG 애니메이션 설정
  useGSAP(
    () => {
      if (!isReady) return;

      const animatePaths = (svg: SVGSVGElement) => {
        const paths = Array.from(svg.querySelectorAll("path"));
        gsap.set(paths, {
          stroke: SVG_ANIMATION_CONFIG.stroke,
          strokeWidth: SVG_ANIMATION_CONFIG.strokeWidth,
          fill: "none",
          attr: { "stroke-linecap": "round", "stroke-linejoin": "round" },
          drawSVG: "0% 0%",
        });
        return gsap.to(paths, {
          drawSVG: "0% 100%",
          duration: SVG_ANIMATION_CONFIG.duration,
          ease: SVG_ANIMATION_CONFIG.ease,
          stagger: SVG_ANIMATION_CONFIG.stagger,
        });
      };

      const configureSvg = (svg: SVGSVGElement) => {
        svg.setAttribute("preserveAspectRatio", "xMidYMid meet");
        Object.assign(svg.style, SVG_STYLES);
      };

      const welcome = welcomeRef.current?.querySelector("svg") as SVGSVGElement;
      const wedding = weddingRef.current?.querySelector("svg") as SVGSVGElement;

      if (!welcome || !wedding) return;

      [welcome, wedding].forEach(configureSvg);

      gsap
        .timeline({ onComplete: onLoadingComplete })
        .add(animatePaths(welcome))
        .add(animatePaths(wedding));
    },
    { dependencies: [isReady, onLoadingComplete] }
  );

  return {
    welcomeRef,
    weddingRef,
  };
}
