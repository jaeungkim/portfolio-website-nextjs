import { cn } from "@/src/utils/cn";
import { ComponentType } from "react";

interface IconProps {
  icon: ComponentType<{ className?: string }>;
  className?: string;
}

export default function Icon({ icon: IconComp, className }: IconProps) {
  return (
    <IconComp
      className={cn(
        "ease-in-out duration-300 size-4 shrink-0 fill-neutral-700 dark:fill-neutral-300 transition-colors group-hover:fill-neutral-500 dark:group-hover:fill-neutral-200",
        className
      )}
    />
  );
}
