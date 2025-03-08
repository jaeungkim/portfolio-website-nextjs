import clsx from "clsx";
import { useEffect, useState, useRef, useCallback } from "react";

type CrypticTextDynamicProps = {
  text: string;
  classNames?: string;
  delay?: number;
};

export default function CrypticText({
  text,
  classNames,
  delay = 0,
}: CrypticTextDynamicProps) {
  const [cryptic, setCryptic] = useState("");
  const animationRef = useRef<number>(0);

  const animate = useCallback(() => {
    const letters = "ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ";
    const timeoutValue = 0.1 + delay * 60;
    let iteration = 0,
      elapsed = 0;

    const animateCallback = () => {
      if (++elapsed > timeoutValue && elapsed % 4 === 0) {
        setCryptic(
          text
            .split("")
            .map((char, index) =>
              index < iteration
                ? char
                : letters[Math.floor(Math.random() * letters.length)]
            )
            .join("")
        );
        if (iteration >= text.length)
          return cancelAnimationFrame(animationRef.current!);
        iteration += text.length * 0.04 + 1;
      }
      animationRef.current = requestAnimationFrame(animateCallback);
    };

    animateCallback();
  }, [text, delay]);

  useEffect(() => {
    animate();
    return () =>
      animationRef.current && cancelAnimationFrame(animationRef.current);
  }, [animate]);

  return (
    <span
      className={clsx(
        "leading-normal whitespace-normal truncate block relative overflow-visible",
        classNames
      )}
      style={{ animationDelay: `${delay + 0.1}s` }}
    >
      <span className="absolute inset-0">{cryptic}</span>
      <span className="opacity-0">{text}</span>
    </span>
  );
}
