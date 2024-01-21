import clsx from "clsx";
import { useEffect, useState, useCallback, useRef } from "react";

type CrypticTextDynamicProps = {
  text: string;
  classNames?: string;
  delay?: number;
};

export default function CrypticText({
  text,
  classNames,
  delay,
}: CrypticTextDynamicProps) {
  const [cryptic, setCryptic] = useState("");
  const animationRef = useRef<number>();

  const animate = useCallback(() => {
    const letters = "ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ";
    const repeatDivider = 4;
    const timeoutValue = 0.1 + (delay ? delay : 0) * 60;

    let iteration = 0;
    let elapsed = 0;

    function animateCallback() {
      elapsed++;

      if (elapsed > timeoutValue && elapsed % repeatDivider === 0) {
        const encryption = text
          .split("")
          .map((_, index) => {
            if (index < iteration) {
              return text[index];
            }
            return letters[Math.floor(Math.random() * letters.length)];
          })
          .join("");

        if (iteration >= text.length) {
          cancelAnimationFrame(animationRef.current);
        }
        iteration += text.length * 0.04;

        setCryptic(encryption);

        iteration++;
      }

      animationRef.current = requestAnimationFrame(animateCallback);
    }

    animateCallback();
  }, [delay, text]);

  useEffect(() => {
    animate();

    // Cleanup function
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [animate, text]); // Added 'text' to dependency array

  return (
    <span
      className={clsx(
        "text-inherit whitespace-normal truncate block relative overflow-visible",
        classNames
      )}
      style={{
        animationDelay: `${delay + 0.1}s)`,
      }}
    >
      <span className="absolute inset-0">{cryptic}</span>
      <span className="opacity-0">{text}</span>
    </span>
  );
}
