"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/src/lib/cn";

interface ResumeNavProps {
  label: string;
  items: { id: string; label: string }[];
}

const ROW_PX = 28; // keep in sync with h-7 below
const TOP_OFFSET_PX = 128; // a section counts as reached once its top clears the sticky navbar

// The active item follows the scroll position and a 1px marker slides along the rail to it.
// A click pins the target until the smooth scroll settles so the marker does not hop through
// the sections in between.
export function ResumeNav({ label, items }: ResumeNavProps) {
  const [activeId, setActiveId] = useState(items[0]?.id);
  const pinnedId = useRef<string | null>(null);

  useEffect(() => {
    const sections = items
      .map((item) => document.getElementById(item.id))
      .filter((node): node is HTMLElement => node !== null);
    let frame = 0;

    const update = () => {
      frame = 0;
      if (pinnedId.current) return;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 1;
      let current = sections[0]?.id;
      if (atBottom) {
        current = sections[sections.length - 1]?.id;
      } else {
        for (const section of sections) {
          if (section.getBoundingClientRect().top <= TOP_OFFSET_PX) {
            current = section.id;
          }
        }
      }
      setActiveId(current);
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

  function pin(id: string) {
    pinnedId.current = id;
    setActiveId(id);
    const release = () => {
      pinnedId.current = null;
      window.removeEventListener("scrollend", release);
    };
    window.addEventListener("scrollend", release);
    window.setTimeout(release, 1000); // browsers without scrollend
  }

  const activeIndex = Math.max(
    0,
    items.findIndex((item) => item.id === activeId),
  );

  return (
    <nav aria-label={label} className="relative hidden lg:block">
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-full w-px bg-border"
      />
      <span
        aria-hidden="true"
        className="absolute top-0 left-0 h-7 w-px bg-foreground transition-transform duration-300 ease-out motion-reduce:transition-none"
        style={{ transform: `translateY(${activeIndex * ROW_PX}px)` }}
      />
      <ul>
        {items.map((item) => {
          const isActive = item.id === activeId;
          return (
            <li key={item.id} className="h-7">
              <a
                href={`#${item.id}`}
                onClick={() => pin(item.id)}
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
