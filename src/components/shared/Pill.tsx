import { cn } from "@/src/lib/cn";

interface PillProps {
  name: string;
  variant?: "default" | "skill";
}

export function Pill({ name, variant = "default" }: PillProps) {
  return (
    <span
      className={cn(
        "border border-border rounded-full bg-transparent",
        variant === "skill"
          ? "text-muted-foreground px-3 py-1 text-sm font-medium"
          : "text-foreground px-2 py-0.5 text-xs",
      )}
    >
      {name}
    </span>
  );
}
