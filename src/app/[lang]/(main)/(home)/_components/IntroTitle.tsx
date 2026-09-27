"use client";

import { useEffect, useRef, useState } from "react";

const STEP_MS = 50;
const SCRAMBLE_CHARACTERS =
  "ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ";

function randomCharacter() {
  return SCRAMBLE_CHARACTERS[
    Math.floor(Math.random() * SCRAMBLE_CHARACTERS.length)
  ];
}

interface IntroTitleProps {
  text: string;
}

export function IntroTitle({ text }: IntroTitleProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const scrambling = hasStarted && revealedCount < text.length;

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!scrambling) return;
    const intervalId = setInterval(
      () => setRevealedCount((count) => count + 1),
      STEP_MS,
    );
    return () => clearInterval(intervalId);
  }, [scrambling]);

  return (
    <span ref={containerRef} className="inline-block whitespace-pre-wrap">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {text.split("").map((character, index) => {
          const isEncrypted =
            scrambling && index >= revealedCount && character !== " ";

          return (
            <span
              key={index}
              className={isEncrypted ? "text-muted-foreground/70" : undefined}
            >
              {isEncrypted ? randomCharacter() : character}
            </span>
          );
        })}
      </span>
    </span>
  );
}
