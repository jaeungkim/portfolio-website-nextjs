import ResumeProject from "./resumeProject";
import ResumeIntroduce from "./resumeIntroduce";
import ResumeWork from "./resumeWork";
import ResumeSkill from "./resumeSkill";
import ResumeHeader from "./resumeHeader";
import { useTranslations } from "next-intl";
import Spacing from "@/src/components/common/Spacing";
import ResumeEducation from "./resumeEducation";
import { getTranslations } from "next-intl/server";

export default function ResumeContent({ lastUpdated }) {
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
        <div className="my-[50px] text-sm text-[#808080] text-center">
          <p>Last updated: {lastUpdated}</p>
          <a className="hover:text-cyan-500" href="https://www.jaeungkim.com">
            @jaeungkim
          </a>
        </div>
      </footer>
    </div>
  );
}
