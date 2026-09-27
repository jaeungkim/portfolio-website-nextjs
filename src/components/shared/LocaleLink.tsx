import Link from "next/link";
import type { ComponentProps } from "react";
import { getLocale } from "@/i18n/dictionaries";

interface LocaleLinkProps extends Omit<ComponentProps<typeof Link>, "href"> {
  href: string;
}

export async function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const locale = await getLocale();

  return <Link href={`/${locale}${href === "/" ? "" : href}`} {...props} />;
}
