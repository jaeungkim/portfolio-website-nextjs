import type { Metadata } from "next";
import { IntroTitle } from "@/app/[lang]/(main)/(home)/_components/IntroTitle";
import { ModelIsland } from "@/app/[lang]/(main)/(home)/_components/ModelIsland";
import { PROFILE_LINKS } from "@/components/shared/profile-links";
import { getDictionary } from "@/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: dict.home.metaTitle,
    description: dict.home.metaDescription,
  };
}

export default async function Home() {
  const dict = await getDictionary();

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="relative md:basis-2/6 lg:basis-3/6 h-[350px] md:pr-4">
        <ModelIsland />
      </div>

      <article className="basis-1/2 space-y-4">
        <h1 className="text-3xl font-bold sm:text-2xl">
          <IntroTitle text={dict.home.greeting} />
        </h1>

        {dict.home.paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <div className="flex flex-wrap items-center gap-2 pt-2">
          {PROFILE_LINKS.map(({ href, icon: Icon, label }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-all text-sm"
            >
              <Icon className="size-4" aria-hidden="true" />
              {label}
            </a>
          ))}
        </div>
      </article>
    </div>
  );
}
