import type { Metadata } from "next";
import { LocaleLink } from "@/components/shared/LocaleLink";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: dict.notFound.title,
  };
}

export default async function NotFound() {
  const dict = await getDictionary();

  return (
    <section className="mx-auto flex max-w-md flex-col items-start gap-4 py-24">
      <h1 className="text-xl font-semibold">{dict.notFound.title}</h1>
      <p className="text-sm text-muted-foreground">
        {dict.notFound.description}
      </p>
      <LocaleLink
        href="/"
        className="text-sm font-medium underline-offset-4 hover:underline"
      >
        {dict.notFound.home}
      </LocaleLink>
    </section>
  );
}
