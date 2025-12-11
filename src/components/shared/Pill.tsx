interface PillProps {
  name: string;
  variant?: "default" | "skill";
}

export default function Pill({ name, variant = "default" }: PillProps) {
  if (variant === "skill") {
    return (
      <span className="border border-border text-muted-foreground px-3 py-1 text-sm font-medium rounded-full bg-transparent">
        {name}
      </span>
    );
  }

  return (
    <span className="border border-border text-foreground px-2 py-0.5 text-xs rounded-full bg-transparent">
      {name}
    </span>
  );
}
