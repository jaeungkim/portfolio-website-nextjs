"use client";

import clsx from "clsx";
import { useEffect, useRef } from "react";

interface CrypticTextProps {
  text: string;
  classNames?: string;
  delay?: number; // seconds
}

const CHARS = "ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ";

function getRandomChar(): string {
  return CHARS[(Math.random() * CHARS.length) | 0];
}

export default function CrypticText({
  text,
  classNames,
  delay = 0,
}: CrypticTextProps) {
  const spanRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = spanRef.current;
    if (!el) return;

    let revealIndex = 0;
    let rafId: number;
    let timeoutId: ReturnType<typeof setTimeout>;

    const animate = () => {
      if (revealIndex > text.length) {
        el.textContent = text;
        return;
      }

      let output = "";
      for (let i = 0; i < text.length; i++) {
        output += i < revealIndex ? text[i] : getRandomChar();
      }
      el.textContent = output;

      revealIndex++;
      rafId = requestAnimationFrame(animate);
    };

    // 딜레이 동안 빈 공간 유지
    el.textContent = " ".repeat(text.length);

    if (delay > 0) {
      timeoutId = setTimeout(() => {
        rafId = requestAnimationFrame(animate);
      }, delay * 1000);
    } else {
      rafId = requestAnimationFrame(animate);
    }

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(timeoutId);
    };
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
