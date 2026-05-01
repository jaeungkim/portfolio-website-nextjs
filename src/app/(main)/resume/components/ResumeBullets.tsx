interface ResumeBulletsProps {
  items: string[];
}

export function ResumeBullets({ items }: ResumeBulletsProps) {
  if (items.length === 0) return null;
  return (
    <ul className="list-disc space-y-2 pl-5 text-base text-muted-foreground">
      {items.map((bullet) => (
        <li key={bullet}>{bullet}</li>
      ))}
    </ul>
  );
}
