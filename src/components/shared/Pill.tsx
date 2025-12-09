interface PillProps {
  name: string;
  variant?: "default" | "skill";
}

export default function Pill({ name, variant = "default" }: PillProps) {
  if (variant === "skill") {
    return (
      <span className="border border-zinc-500 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 px-3 py-1 text-sm font-medium rounded-full bg-transparent">
        {name}
      </span>
    );
  }

  return (
    <span className="border border-neutral-300 text-neutral-700 dark:border-neutral-700 dark:text-neutral-300 px-2 py-0.5 text-xs rounded-full bg-transparent">
      {name}
    </span>
  );
}

