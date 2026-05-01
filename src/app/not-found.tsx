import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-md flex-col items-start gap-4 py-24">
      <h1 className="text-xl font-semibold text-foreground">Page not found</h1>
      <p className="text-sm text-muted-foreground">
        The page you were looking for doesn’t exist.
      </p>
      <Link
        href="/"
        className="text-sm font-medium text-foreground underline-offset-4 hover:underline"
      >
        Return home
      </Link>
    </section>
  );
}
