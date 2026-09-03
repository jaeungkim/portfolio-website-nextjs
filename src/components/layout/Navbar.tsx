import { ThemeToggle } from "@/src/components/shared/ThemeToggle";
import { AnimatedProfileLogo } from "@/src/components/shared/AnimatedProfileLogo";
import { LocaleLink } from "@/src/components/shared/LocaleLink";
import { LocaleSwitch } from "@/src/components/shared/LocaleSwitch";
import { otherLocale } from "@/src/i18n/config";
import { getDictionary, getLocale } from "@/src/i18n/dictionaries";

const NAVIGATION = [
  { key: "home", href: "/" },
  { key: "about", href: "/resume" },
  { key: "blog", href: "/blog" },
] as const;

export async function Navbar() {
  const [dict, locale] = await Promise.all([getDictionary(), getLocale()]);

  return (
    <header className="sticky top-0 z-40 backdrop-blur py-4 h-16">
      <div className="size-full mx-auto max-w-5xl relative px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        <div className="flex flex-1">
          <LocaleLink href="/" className="pointer-events-auto">
            <AnimatedProfileLogo className="h-6 w-auto text-foreground" />
          </LocaleLink>
        </div>

        <div className="md:flex-1 md:justify-center">
          <nav className="pointer-events-auto">
            <ul className="justify-center items-center flex rounded-full px-3 text-sm font-medium text-foreground backdrop-blur">
              {NAVIGATION.map((item) => (
                <li key={item.key}>
                  <LocaleLink
                    href={item.href}
                    className="relative block px-3 py-2 transition hover:text-muted-foreground"
                  >
                    {dict.nav[item.key]}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex gap-2 justify-end flex-1">
          <LocaleSwitch
            target={otherLocale(locale)}
            label={dict.nav.switchLanguage}
          />
          <ThemeToggle label={dict.nav.toggleTheme} />
        </div>
      </div>
    </header>
  );
}
