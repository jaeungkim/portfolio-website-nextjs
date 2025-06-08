export const dynamic = "force-static";

import ResumeProject from "@/src/components/resume/resumeProject";
import ResumeIntroduce from "@/src/components/resume/resumeIntroduce";
import ResumeWork from "@/src/components/resume/resumeWork";
import ResumeSkill from "@/src/components/resume/resumeSkill";
import ResumeHeader from "@/src/components/resume/resumeHeader";
import Spacing from "@/src/components/common/Spacing";
import ResumeEducation from "@/src/components/resume/resumeEducation";
import { getTranslations } from "next-intl/server";

export default async function Resume() {
  const t = await getTranslations("resume");

  return (
    <div className="py-4">
      {/* HEADER  */}
      <ResumeHeader />
      <Spacing />
      {/* Introduce  */}
      <ResumeIntroduce />
      <Spacing />
      {/* Work Experience */}
      <ResumeWork />
      <Spacing />
      {/* Projects  */}
      <ResumeProject />
      <Spacing />
      {/* Skills */}
      <ResumeSkill />
      <Spacing />
      {/* Education */}
      <ResumeEducation />
      <footer className="pt-[150px] flex flex-col items-center justify-center">
        <p className="text-base">{t("footer")}</p>
        <div className="flex flex-col items-center justify-center gap-[16px] my-[50px] text-sm text-[#808080] text-center">
          <p>Last updated: 2025.05.31</p>
          <p className="text-sm">@jaeungkim</p>
        </div>
      </footer>
    </div>
  );
}
