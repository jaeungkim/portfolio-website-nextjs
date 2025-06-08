import { experiences } from "@/src/constants/resume";
import { getTranslations } from "next-intl/server";
import { getExperienceUtils } from "@/src/utils/resume";
import ResumeTitle from "@/src/components/resume/ResumeTitle";

export default async function resumeIntroduce() {
  const t = await getTranslations("resume.introduce");
  const { calculateTotalExperienceInYears } = await getExperienceUtils();
  const years = calculateTotalExperienceInYears(experiences);

  return (
    <>
      {/* Introduce */}
      <div className="md:grid md:grid-cols-4 md:gap-4">
        <ResumeTitle title="Introduce" />
        <div className="col-span-3 flex flex-col gap-2 dark:text-neutral-300 text-neutral-700 mt-6 md:mt-0">
          <p className="">{t("paragraph1")}</p>
          <p className="">{t("paragraph2")}</p>
          <p className="">{t("paragraph3")}</p>
        </div>
      </div>
    </>
  );
}
