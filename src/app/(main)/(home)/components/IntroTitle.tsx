"use client";

import { useEffect, useRef, useState } from "react";

const STEP_MS = 50;
const SCRAMBLE_CHARACTERS =
  "ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ";

function buildDisplayText(text: string, revealedCount: number) {
  return text
    .split("")
    .map((character, index) => {
      if (character === " " || index < revealedCount) {
        return character;
      }

      return SCRAMBLE_CHARACTERS[
        Math.floor(Math.random() * SCRAMBLE_CHARACTERS.length)
      ];
    })
    .join("");
}

export default function IntroTitle({ text }: { text: string }) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const [hasStarted, setHasStarted] = useState(false);
  const [revealedCount, setRevealedCount] = useState(0);
  const hasTextBeenFullyRevealed = revealedCount >= text.length;

  useEffect(() => {
    const currentRef = containerRef.current;

    if (!currentRef) {
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) {
          return;
        }

        setHasStarted(true);
        observer.disconnect();
      },
      { threshold: 0.2 },
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!hasStarted || hasTextBeenFullyRevealed) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setRevealedCount((count) => count + 1);
    }, STEP_MS);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [hasStarted, hasTextBeenFullyRevealed, revealedCount]);

  const displayText = hasStarted && !hasTextBeenFullyRevealed
    ? buildDisplayText(text, revealedCount)
    : text;

  return (
    <span ref={containerRef} className="inline-block whitespace-pre-wrap">
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {displayText.split("").map((character, index) => {
          const isEncrypted =
            hasStarted &&
            !hasTextBeenFullyRevealed &&
            index >= revealedCount &&
            character !== " ";

          return (
            <span
              key={`${character}-${index}`}
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
