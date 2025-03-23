import {
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaRegFilePdf,
} from "react-icons/fa";

import SocialIcon from "@/src/components/shared/SocialIcon";
import ModelContainer from "@/src/components/model/ModelContainer";
import CrypticText from "@/src/components/CrypticText";
import { useTranslations } from "next-intl";

export default function Page() {
  const t = useTranslations();

  return (
    <div className="md:flex w-full">
      <div className="w-full relative md:basis-2/6 lg:basis-3/6 py-4 h-96 md:h-auto md:py-1 md:pr-4 max-h-[350px] md:mt-12">
        <ModelContainer />
      </div>

      <article className="md:basis-4/6 lg:basis-3/6">
        <h2 className="text-4xl font-bold tracking-tight text-zinc-800 dark:text-zinc-100 sm:text-5xl">
          <CrypticText text={t("greeting")} delay={0.1} classNames="fadein" />
        </h2>

        <p className="mt-4 mb-4 text-base text-zinc-600 dark:text-zinc-400">
          {t("intro")}
        </p>

        <p className="text-base text-zinc-600 dark:text-zinc-400 mb-4">
          {t("description1")}
        </p>

        <p className="text-base text-zinc-600 dark:text-zinc-400 mb-4">
          {t("description2")}
        </p>

        {/* Social Links */}
        <div className="mt-6 flex gap-6">
          <SocialIcon
            href="https://github.com/jaeungkim"
            IconComponent={FaGithub}
          />
          <SocialIcon
            href="https://www.linkedin.com/in/jaeungkim0526/"
            IconComponent={FaLinkedin}
          />
          {/* <SocialIcon
            href="https://www.instagram.com/jaekiim/"
            IconComponent={FaInstagram}
          /> */}
          <SocialIcon href="/resume" IconComponent={FaRegFilePdf} />
        </div>
      </article>
    </div>
  );
}
