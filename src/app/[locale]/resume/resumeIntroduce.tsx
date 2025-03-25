import { experiences } from "@/src/app/constants/resume";
import { useTranslations } from "next-intl";
import { useExperienceUtils } from "@/src/app/utils/resume";

export default function resumeIntroduce() {
  const t = useTranslations("resume.introduce");
  const { calculateTotalExperienceInYears } = useExperienceUtils();
  const years = calculateTotalExperienceInYears(experiences);

  return (
    <>
      {/* Introduce */}
      <div className="md:grid md:grid-cols-4 md:gap-4">
        <div className="font-semibold text-cyan-500 text-3xl uppercase mb-4">
          Introduce
        </div>
        <div className="col-span-3">
          <p className="text-base mb-4 font-normal">
            {t("paragraph1", { years })}
          </p>
          <p className="text-base mb-4">{t("paragraph2")}</p>
          <p className="text-base ">{t("paragraph3")}</p>
        </div>
      </div>
    </>
  );
}
