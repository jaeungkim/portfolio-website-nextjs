import type { Metadata } from "next";
import { ThemeProvider } from "@/components/shared/ThemeProvider";
import { DEFAULT_LOCALE } from "@/i18n/config";
import ko from "@/i18n/dictionaries/ko.json";
import { pretendard } from "@/styles/fonts";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: ko.notFound.title,
  description: ko.notFound.description,
};

export default function GlobalNotFound() {
  return (
    <html lang={DEFAULT_LOCALE} suppressHydrationWarning>
      <body className={pretendard.className}>
        <ThemeProvider>
          <main className="mx-auto flex min-h-screen max-w-md flex-col items-start justify-center gap-4 px-4">
            <h1 className="text-xl font-semibold">{ko.notFound.title}</h1>
            <p className="text-sm text-muted-foreground">
              {ko.notFound.description}
            </p>
            <a
              href={`/${DEFAULT_LOCALE}`}
              className="text-sm font-medium underline-offset-4 hover:underline"
            >
              {ko.notFound.home}
            </a>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
