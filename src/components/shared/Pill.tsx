interface PillProps {
  name: string;
}

export function Pill({ name }: PillProps) {
  return (
    <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
      {name}
    </span>
  );
}
