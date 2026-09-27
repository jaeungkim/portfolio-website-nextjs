"use client";

import { useParams } from "next/navigation";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { DEFAULT_LOCALE, hasLocale } from "@/i18n/config";
import { ERROR_MESSAGES } from "@/i18n/error-messages";
import { pretendard } from "@/styles/fonts";
import "@/styles/globals.css";

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const { lang } = useParams<{ lang: string }>();
  const locale = hasLocale(lang) ? lang : DEFAULT_LOCALE;
  const messages = ERROR_MESSAGES[locale];

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={pretendard.className}>
        <ThemeProvider>
          <main className="mx-auto flex min-h-screen max-w-md flex-col items-start justify-center gap-4 px-4">
            <h1 className="text-xl font-semibold">{messages.title}</h1>
            <p className="text-sm text-muted-foreground">
              {messages.description}
            </p>
            <button
              type="button"
              onClick={retry}
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              {messages.retry}
            </button>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
