import ResumeProject from "./resumeProject";
import ResumeIntroduce from "./resumeIntroduce";
import ResumeWork from "./resumeWork";
import ResumeSkill from "./resumeSkill";
import ResumeHeader from "./resumeHeader";
import { useTranslations } from "next-intl";
import Spacing from "@/src/components/common/Spacing";
import ResumeEducation from "./resumeEducation";
import ExternalLink from "@/src/components/common/ExternalLink";

export default function Resume() {
  const t = useTranslations("resume");

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
