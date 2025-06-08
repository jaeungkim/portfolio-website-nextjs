"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";

type CrypticTextProps = {
  text: string;
  classNames?: string;
  delay?: number; // seconds
};

const letters = "ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ";

export default function CrypticText({
  text,
  classNames,
  delay = 0,
}: CrypticTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    const delayFrames = Math.round(delay * 60);
    let frame = 0;
    let reveal = 0;
    let rafId: number;

    const animate = () => {
      if (frame >= delayFrames) {
        const output = text
          .split("")
          .map((ch, idx) =>
            idx < reveal
              ? ch
              : letters[Math.floor(Math.random() * letters.length)]
          )
          .join("");

        el.textContent = output;

        reveal += 1;
        if (reveal > text.length) {
          el.textContent = text; // ensure final state is the true text
          return;
        }
      }
      frame += 1;
      rafId = requestAnimationFrame(animate);
    };

    el.textContent = " ".repeat(text.length);
    rafId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(rafId);
  }, [text, delay]);

  return (
    <span
      className={clsx(
        "leading-normal relative block overflow-hidden",
        classNames
      )}
    >
      <span ref={spanRef} className="absolute inset-0" />
      <span className="opacity-0">{text}</span>
    </span>
  );
}
