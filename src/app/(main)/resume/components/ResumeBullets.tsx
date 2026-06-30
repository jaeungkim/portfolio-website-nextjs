type ResumeBullet = string | { label: string; text: string };

interface ResumeBulletsProps {
  items: ResumeBullet[];
}

export function ResumeBullets({ items }: ResumeBulletsProps) {
  if (items.length === 0) return null;
  return (
    <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
      {items.map((item) =>
        typeof item === "string" ? (
          <li key={item}>{item}</li>
        ) : (
          <li key={item.label}>
            <span className="font-medium text-foreground">{item.label}</span>
            {": "}
            {item.text}
          </li>
        ),
      )}
    </ul>
  );
}
