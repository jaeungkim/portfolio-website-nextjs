export default function SkillPill({ name }) {
  return (
    <span className="border border-zinc-500 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 px-3 py-1 text-sm font-medium rounded-full bg-transparent">
      {name}
    </span>
  );
}
