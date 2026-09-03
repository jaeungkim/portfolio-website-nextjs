import type { Metadata } from "next";
import { GithubIcon } from "@/src/components/shared/GithubIcon";
import { LinkedinIcon } from "@/src/components/shared/LinkedinIcon";
import { IconButton } from "@/src/components/shared/IconButton";
import { IntroTitle } from "@/src/app/[lang]/(main)/(home)/components/IntroTitle";
import { ModelIsland } from "@/src/app/[lang]/(main)/(home)/components/ModelIsland";
import { getDictionary, localeAlternates } from "@/src/i18n/dictionaries";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();

  return {
    title: dict.home.metaTitle,
    description: dict.home.metaDescription,
    alternates: await localeAlternates(),
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
        <h2 className="text-3xl font-bold text-foreground sm:text-2xl">
          <IntroTitle text={dict.home.greeting} />
        </h2>

        {dict.home.paragraphs.map((paragraph) => (
          <p key={paragraph} className="text-foreground">
            {paragraph}
          </p>
        ))}

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <IconButton
            href="https://github.com/jaeungkim"
            icon={GithubIcon}
            label="GitHub"
          />
          <IconButton
            href="https://www.linkedin.com/in/jaeungkim0526/"
            icon={LinkedinIcon}
            label="LinkedIn"
          />
        </div>
      </article>
    </div>
  );
}
