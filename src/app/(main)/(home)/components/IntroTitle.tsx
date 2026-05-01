"use client";

import { useRef } from "react";
import { useInViewOnce } from "@/src/app/(main)/(home)/hooks/useInViewOnce";
import { useScrambleReveal } from "@/src/app/(main)/(home)/hooks/useScrambleReveal";

interface IntroTitleProps {
  text: string;
}

export function IntroTitle({ text }: IntroTitleProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const hasStarted = useInViewOnce(containerRef);
  const { displayText, revealedCount, isComplete } = useScrambleReveal(
    text,
    hasStarted,
  );

  return (
    <span ref={containerRef} className="inline-block whitespace-pre-wrap">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayText.split("").map((character, index) => {
          const isEncrypted =
            hasStarted &&
            !isComplete &&
            index >= revealedCount &&
            character !== " ";

          return (
            <span
              key={index}
              className={isEncrypted ? "text-muted-foreground/70" : undefined}
            >
              {character}
            </span>
          );
        })}
      </span>
    </span>
  );
}
