import Link from "next/link";
import type { ComponentProps } from "react";
import { getLocale } from "@/src/i18n/dictionaries";

interface LocaleLinkProps extends Omit<ComponentProps<typeof Link>, "href"> {
  /** Route below the locale segment, e.g. `/` or `/blog/tokyo`. */
  href: string;
}

/**
 * `next/link` with the active locale prefixed, so no call site can forget it.
 */
export async function LocaleLink({ href, ...props }: LocaleLinkProps) {
  const locale = await getLocale();

  return <Link href={`/${locale}${href === "/" ? "" : href}`} {...props} />;
}
