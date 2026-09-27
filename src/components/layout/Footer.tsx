import { NAVIGATION } from "@/components/layout/navigation";
import { LocaleLink } from "@/components/shared/LocaleLink";
import { getDictionary } from "@/i18n/dictionaries";

export async function Footer() {
  const dict = await getDictionary();

  return (
    <footer className="mt-32 w-full border-t py-8">
      <div className="page-container">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <div className="flex gap-6 text-sm font-medium">
            {NAVIGATION.map((item) => (
              <LocaleLink key={item.href} href={item.href}>
                {dict.nav[item.key]}
              </LocaleLink>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">{dict.footer.rights}</p>
        </div>
      </div>
    </footer>
  );
}
