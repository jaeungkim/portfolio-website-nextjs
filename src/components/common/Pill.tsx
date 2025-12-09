interface PillProps {
  name: string;
}

export default function Pill({ name }: PillProps) {
  return (
    <span className="border border-neutral-300 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300 px-2 py-0.5 text-xs rounded-full bg-transparent">
      {name}
    </span>
  );
}
