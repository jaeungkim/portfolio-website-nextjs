"use client";

import { useParams } from "next/navigation";
import type { Locale } from "@/i18n/config";
import { ERROR_MESSAGES } from "@/i18n/error-messages";

export default function Error({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const { lang } = useParams<{ lang: Locale }>();
  const messages = ERROR_MESSAGES[lang];

  return (
    <section className="mx-auto flex max-w-md flex-col items-start gap-4 py-24">
      <h1 className="text-xl font-semibold">{messages.title}</h1>
      <p className="text-sm text-muted-foreground">{messages.description}</p>
      <button
        type="button"
        onClick={retry}
        className="text-sm font-medium underline-offset-4 hover:underline"
      >
        {messages.retry}
      </button>
    </section>
  );
}
