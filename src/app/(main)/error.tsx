"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <section className="mx-auto flex max-w-md flex-col items-start gap-4 py-24">
      <h1 className="text-xl font-semibold text-foreground">
        Something went wrong
      </h1>
      <p className="text-sm text-muted-foreground">
        An unexpected error occurred while loading this page.
      </p>
      <button
        type="button"
        onClick={reset}
        className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
      >
        다시 시도
      </button>
    </section>
  );
}
