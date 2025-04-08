import { experiences } from "@/src/app/constants/resume";
import { useTranslations } from "next-intl";
import { useExperienceUtils } from "@/src/app/utils/resume";
import ResumeTitle from "@/src/app/[locale]/resume/components/ResumeTitle";

export default function resumeIntroduce() {
  const t = useTranslations("resume.introduce");
  const { calculateTotalExperienceInYears } = useExperienceUtils();
  const years = calculateTotalExperienceInYears(experiences);

  return (
    <>
      {/* Introduce */}
      <div className="md:grid md:grid-cols-4 md:gap-4">
        <ResumeTitle title="Introduce" />
        <div className="col-span-3 flex flex-col gap-2 dark:text-neutral-300 text-neutral-700">
          <p className="">{t("paragraph1")}</p>
          <p className="">{t("paragraph2")}</p>
          <p className="">{t("paragraph3")}</p>
        </div>
      </div>
    </>
  );
}
