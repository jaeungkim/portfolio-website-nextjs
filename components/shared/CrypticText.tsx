import clsx from "clsx";
import { useEffect, useState, useCallback } from "react";

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

  const animate = useCallback(() => {
    const letters = "ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ";
    // const letters = "ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ";
    const repeatDivider = 4;

    const timeoutValue =
      (parseInt(
        getComputedStyle(document.documentElement)
          .getPropertyValue("--animation-delay-writing")
          .replace("s", "")
      ) +
        (delay ? delay : 0)) *
      30 *
      2;

    let iteration = 0;
    let elapsed = 0;
    let animation: number;

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
          cancelAnimationFrame(animation);
        }
        iteration += text.length * 0.04;

        setCryptic(encryption);

        iteration++;
      }

      animation = requestAnimationFrame(animateCallback);
    }

    animateCallback();

    return () => cancelAnimationFrame(animation);
  }, [delay, text]);

  useEffect(() => {
    animate();
  }, [animate]);

  return (
    <span
      className={clsx("text-inherit truncate block relative", classNames)}
      style={{
        animationDelay: `calc(var(--animation-delay-writing) + ${delay}s)`,
      }}
    >
      <span className="absolute inset-0">{cryptic}</span>
      <span className="opacity-0">{text}</span>
    </span>
  );
}
