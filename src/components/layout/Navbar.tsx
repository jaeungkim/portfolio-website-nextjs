import Image from "next/image";
import { NAVIGATION } from "@/components/layout/navigation";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { LocaleLink } from "@/components/shared/LocaleLink";
import { LocaleSwitch } from "@/components/shared/LocaleSwitch";
import { getDictionary } from "@/i18n/dictionaries";

export async function Navbar() {
  const dict = await getDictionary();

  return (
    <header className="sticky top-0 z-40 backdrop-blur py-4 h-16">
      <div className="page-container flex size-full items-center justify-between">
        <div className="flex flex-1">
          <LocaleLink href="/" className="animate-in fade-in duration-1000">
            <Image
              src="/icons/jaekim.svg"
              alt={dict.site.name}
              width={100}
              height={30}
              className="block dark:invert"
            />
          </LocaleLink>
        </div>

        <div className="md:flex-1">
          <nav>
            <ul className="justify-center items-center flex rounded-full px-3 text-sm font-medium backdrop-blur">
              {NAVIGATION.map((item) => (
                <li key={item.key}>
                  <LocaleLink
                    href={item.href}
                    className="block px-3 py-2 transition hover:text-muted-foreground"
                  >
                    {dict.nav[item.key]}
                  </LocaleLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex gap-2 justify-end flex-1">
          <LocaleSwitch label={dict.nav.switchLanguage} />
          <ThemeToggle label={dict.nav.toggleTheme} />
        </div>
      </div>
    </header>
  );
}
