interface PillProps {
  name: string;
  variant?: "default" | "skill";
}

const variants = {
  default:
    "border border-border text-foreground px-2 py-0.5 text-xs rounded-full bg-transparent",
  skill:
    "border border-border text-muted-foreground px-3 py-1 text-sm font-medium rounded-full bg-transparent",
};

export default function Pill({ name, variant = "default" }: PillProps) {
  return <span className={variants[variant]}>{name}</span>;
}
