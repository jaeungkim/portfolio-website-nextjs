import type { ReactNode } from "react";
import { cn } from "@/src/lib/cn";

interface ExternalButtonProps {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
}

export function ExternalButton({
  href,
  children,
  variant = "primary",
}: ExternalButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium",
        variant === "primary"
          ? "bg-foreground text-background transition-opacity hover:opacity-90"
          : "border border-border text-foreground transition-colors hover:bg-secondary",
      )}
    >
      {children}
    </a>
  );
}
