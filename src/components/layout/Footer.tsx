import { LocaleLink } from "@/src/components/shared/LocaleLink";
import { getDictionary } from "@/src/i18n/dictionaries";

const MENU_ITEMS = [
  { key: "home", url: "/" },
  { key: "about", url: "/resume" },
  { key: "blog", url: "/blog" },
] as const;

export async function Footer() {
  const dict = await getDictionary();

  return (
    <footer className="mt-32 backdrop-blur w-full border-t border-border py-8">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <nav className="flex gap-6 text-sm font-medium text-foreground">
            {MENU_ITEMS.map((item) => (
              <LocaleLink
                key={item.url}
                className="transition hover:text-primary"
                href={item.url}
              >
                {dict.nav[item.key]}
              </LocaleLink>
            ))}
          </nav>
          <p className="text-sm text-muted-foreground">{dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
