import CrypticText from "@/src/components/common/CrypticText";
import { getTranslations } from "next-intl/server";
import dynamic from "next/dynamic";
import { Suspense } from "react";
import GithubIcon from "@/src/components/common/icons/iconComponents/GithubIcon";
import LinkedInIcon from "@/src/components/common/icons/iconComponents/LinkedInIcon";
import SocialIcon from "@/src/components/common/icons/SocialIcon";

const Model3D = dynamic(() => import("@/src/components/model/ModelContainer"));

export default async function Page() {
  const t = await getTranslations("home");

  return (
    <div className="flex flex-col md:flex-row gap-4 w-full md:pt-24">
      <div className="w-full relative md:basis-2/6 lg:basis-3/6 h-96 md:h-auto md:pr-4 max-h-[350px]">
        <Suspense fallback={<span className="text-sm">Loading…</span>}>
          <Model3D />
        </Suspense>
      </div>

      <article className="basis-1/2">
        <h2 className="text-3xl font-bold  text-zinc-800 dark:text-zinc-100 sm:text-2xl">
          <CrypticText
            text={t("about.greeting")}
            delay={0.1}
            classNames="fadein"
          />
        </h2>

        <p className="mt-4 mb-4 text-base text-zinc-600 dark:text-zinc-400">
          {t("about.intro")}
        </p>

        <p className="text-base text-zinc-600 dark:text-zinc-400 mb-4">
          {t("about.description1")}
        </p>

        <p className="text-base text-zinc-600 dark:text-zinc-400 mb-4">
          {t("about.description2")}
        </p>

        <p className="text-base text-zinc-600 dark:text-zinc-400 mb-4">
          {t("about.description3")}
        </p>

        <div className="mt-6 flex gap-6">
          <SocialIcon
            href="https://github.com/jaeungkim"
            IconComponent={GithubIcon}
          />
          <SocialIcon
            href="https://www.linkedin.com/in/jaeungkim0526/"
            IconComponent={LinkedInIcon}
          />
        </div>
      </article>
    </div>
  );
}
