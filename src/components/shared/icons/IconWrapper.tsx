import { cn } from "@/src/lib/cn";
import { ComponentType } from "react";

interface IconWrapperProps {
  icon: ComponentType<{ className?: string }>;
  className?: string;
}

export default function IconWrapper({ icon: IconComp, className }: IconWrapperProps) {
  return (
    <IconComp
      className={cn(
        "ease-in-out duration-300 size-4 shrink-0 stroke-neutral-700 dark:stroke-neutral-300 transition-colors group-hover:stroke-neutral-500 dark:group-hover:stroke-neutral-200",
        className
      )}
    />
  );
}

