interface ModelLoaderProps {
  progress?: number;
}

export function ModelLoader({ progress = 0 }: ModelLoaderProps) {
  return (
    <div
      aria-hidden="true"
      className="flex flex-col items-center gap-2 text-xs tabular-nums text-muted-foreground"
    >
      <span className="size-5 rounded-full border-2 border-current border-t-transparent motion-safe:animate-spin" />
      {Math.round(progress)}%
    </div>
  );
}
