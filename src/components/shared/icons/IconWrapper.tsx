import { cn } from "@/src/lib/cn";
import { ComponentType } from "react";

interface IconWrapperProps {
  icon: ComponentType<{ className?: string }>;
  className?: string;
}

export default function IconWrapper({
  icon: IconComp,
  className,
}: IconWrapperProps) {
  return (
    <IconComp
      className={cn(
        "ease-in-out duration-300 size-4 shrink-0 stroke-foreground transition-colors group-hover:stroke-muted-foreground",
        className
      )}
    />
  );
}
