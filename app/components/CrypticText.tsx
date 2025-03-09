"use client";

import clsx from "clsx";
import { useEffect, useState, useRef, useCallback } from "react";

type CrypticTextProps = {
  text: string;
  classNames?: string;
  delay?: number;
};

export default function CrypticText({
  text,
  classNames,
  delay = 0,
}: CrypticTextProps) {
  const [cryptic, setCryptic] = useState(text);
  const animationRef = useRef<number | null>(null);

  const animate = useCallback(() => {
    const letters = "ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ";
    const timeoutValue = delay * 60;
    let iteration = 0;
    let elapsed = 0;

    const updateText = () => {
      if (elapsed > timeoutValue) {
        setCryptic(() =>
          text
            .split("")
            .map((char, index) =>
              index < iteration
                ? char
                : letters[Math.floor(Math.random() * letters.length)]
            )
            .join("")
        );

        iteration = Math.min(iteration + 1, text.length);
        if (iteration >= text.length) {
          cancelAnimationFrame(animationRef.current!);
          return;
        }
      }

      elapsed++;
      animationRef.current = requestAnimationFrame(updateText);
    };

    animationRef.current = requestAnimationFrame(updateText);
  }, [text, delay]);

  useEffect(() => {
    setCryptic(text.replace(/./g, " "));
    animate();
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  return (
    <span
      className={clsx(
        "leading-normal relative block overflow-hidden",
        classNames
      )}
    >
      <span className="absolute inset-0">{cryptic}</span>
      <span className="opacity-0 ">{text}</span>
    </span>
  );
}
