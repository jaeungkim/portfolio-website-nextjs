import { useEffect, useState } from "react";

const STEP_MS = 50;
const SCRAMBLE_CHARACTERS = "ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ";

function buildScrambledText(text: string, revealedCount: number): string {
  return text
    .split("")
    .map((character, index) => {
      if (character === " " || index < revealedCount) return character;
      return SCRAMBLE_CHARACTERS[
        Math.floor(Math.random() * SCRAMBLE_CHARACTERS.length)
      ];
    })
    .join("");
}

interface ScrambleReveal {
  displayText: string;
  revealedCount: number;
  isComplete: boolean;
}

export function useScrambleReveal(text: string, active: boolean): ScrambleReveal {
  const [revealedCount, setRevealedCount] = useState(0);
  const isComplete = revealedCount >= text.length;

  useEffect(() => {
    if (!active || isComplete) return;
    const intervalId = window.setInterval(() => {
      setRevealedCount((count) => count + 1);
    }, STEP_MS);
    return () => window.clearInterval(intervalId);
  }, [active, isComplete]);

  const displayText =
    active && !isComplete ? buildScrambledText(text, revealedCount) : text;

  return { displayText, revealedCount, isComplete };
}
