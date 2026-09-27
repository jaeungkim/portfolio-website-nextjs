interface ResumeBulletsProps {
  items: readonly string[];
}

export function ResumeBullets({ items }: ResumeBulletsProps) {
  return (
    <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed marker:text-muted-foreground">
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
