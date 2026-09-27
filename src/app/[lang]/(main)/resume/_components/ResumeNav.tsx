"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "cn";

interface ResumeNavProps {
  label: string;
  items: { id: string; label: string }[];
}

const TOP_OFFSET_PX = 128;

export function ResumeNav({ label, items }: ResumeNavProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const pinned = useRef(false);

  useEffect(() => {
    const sections = items.map((item) => document.getElementById(item.id));
    let frame = 0;

    const update = () => {
      frame = 0;
      if (pinned.current) return;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1;
      setActiveIndex(
        atBottom
          ? sections.length - 1
          : Math.max(
              0,
              sections.findLastIndex(
                (section) =>
                  section &&
                  section.getBoundingClientRect().top <= TOP_OFFSET_PX,
              ),
            ),
      );
    };
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.cancelAnimationFrame(frame);
    };
  }, [items]);

  function pin(index: number) {
    pinned.current = true;
    setActiveIndex(index);
    const release = () => {
      pinned.current = false;
      window.removeEventListener("scrollend", release);
    };
    window.addEventListener("scrollend", release);
    window.setTimeout(release, 1000);
  }

  return (
    <nav aria-label={label} className="relative hidden lg:block">
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-full w-px bg-border"
      />
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-7 w-px bg-foreground transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{ transform: `translateY(${activeIndex * 100}%)` }}
      />
      <ul>
        {items.map((item, index) => {
          const isActive = index === activeIndex;
          return (
            <li key={item.id} className="h-7">
              <a
                href={`#${item.id}`}
                onClick={() => pin(index)}
                aria-current={isActive ? "location" : undefined}
                className={cn(
                  "flex h-full items-center pl-4 text-sm transition-colors hover:text-foreground",
                  isActive ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {item.label}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
