"use client";

import { usePathname } from "next/navigation";
import { errorMessagesFor } from "@/src/i18n/error-messages";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const messages = errorMessagesFor(usePathname());

  return (
    <section className="mx-auto flex max-w-md flex-col items-start gap-4 py-24">
      <h1 className="text-xl font-semibold text-foreground">
        {messages.title}
      </h1>
      <p className="text-sm text-muted-foreground">{messages.description}</p>
      <button
        type="button"
        onClick={reset}
        className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
      >
        {messages.retry}
      </button>
    </section>
  );
}
