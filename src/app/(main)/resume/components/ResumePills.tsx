import { Pill } from "@/src/components/shared/Pill";

interface ResumePillsProps {
  items: string[];
}

export function ResumePills({ items }: ResumePillsProps) {
  if (items.length === 0) return null;
  return (
    <div className="flex flex-wrap gap-1">
      {items.map((item) => (
        <Pill key={item} name={item} />
      ))}
    </div>
  );
}
