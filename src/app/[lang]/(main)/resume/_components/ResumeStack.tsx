import { Pill } from "@/app/[lang]/(main)/resume/_components/Pill";

interface ResumeStackProps {
  items: readonly string[];
}

export function ResumeStack({ items }: ResumeStackProps) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {items.map((item) => (
        <Pill key={item} name={item} />
      ))}
    </div>
  );
}
