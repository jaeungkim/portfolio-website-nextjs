import ResumeProject from "@/src/components/resume/resumeProject";
import ResumeIntroduce from "@/src/components/resume/resumeIntroduce";
import ResumeWork from "@/src/components/resume/resumeWork";
import ResumeSkill from "@/src/components/resume/resumeSkill";
import ResumeHeader from "@/src/components/resume/resumeHeader";
import Spacing from "@/src/components/common/Spacing";
import ResumeEducation from "@/src/components/resume/resumeEducation";
import { getTranslations } from "next-intl/server";
import { routing } from "@/src/i18n/routing";

export async function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const dynamic = "force-static";
export const dynamicParams = false;

export default async function Resume({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "resume" });

  return (
    <div className="py-4">
      <ResumeHeader />
      <Spacing />
      <ResumeIntroduce />
      <Spacing />
      <ResumeWork />
      <Spacing />
      <ResumeProject />
      <Spacing />
      <ResumeSkill />
      <Spacing />
      <ResumeEducation />
      <footer className="pt-[150px] flex flex-col items-center justify-center">
        <p className="text-base">{t("footer")}</p>
        <div className="flex flex-col items-center gap-4 my-12 text-sm text-[#808080] text-center">
          <p>Last updated: 2025.05.31</p>
          <p>@jaeungkim</p>
        </div>
      </footer>
    </div>
  );
}
