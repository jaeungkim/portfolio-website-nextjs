import type { Metadata } from "next";
import localFont from "next/font/local";
import { DEFAULT_LOCALE } from "@/src/i18n/config";
import en from "@/src/i18n/dictionaries/en.json";
import "@/src/styles/globals.css";

const pretendard = localFont({
  src: "../../public/fonts/pretendard/Pretendard-Regular.woff2",
  display: "swap",
  variable: "--font-pretendard",
});

export const metadata: Metadata = {
  title: en.notFound.metaTitle,
  description: en.notFound.description,
};

/**
 * Unmatched URLs never reach a locale segment, so this page renders its own
 * document. It is English-only by design — a URL with no valid `[lang]` gives
 * nothing to localise against.
 */
export default function GlobalNotFound() {
  return (
    <html lang={DEFAULT_LOCALE} className="[scrollbar-gutter:stable]">
      <body
        className={`${pretendard.className} antialiased bg-background text-foreground`}
      >
        <main className="mx-auto flex min-h-screen max-w-md flex-col items-start justify-center gap-4 px-4">
          <h1 className="text-xl font-semibold text-foreground">
            {en.notFound.title}
          </h1>
          <p className="text-sm text-muted-foreground">
            {en.notFound.description}
          </p>
          <a
            href={`/${DEFAULT_LOCALE}`}
            className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
          >
            {en.notFound.home}
          </a>
        </main>
      </body>
    </html>
  );
}
