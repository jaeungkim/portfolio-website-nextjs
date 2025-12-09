import ResumeProject from "./components/resumeProject";
import ResumeIntroduce from "./components/resumeIntroduce";
import ResumeWork from "./components/resumeWork";
import ResumeSkill from "./components/resumeSkill";
import ResumeHeader from "./components/resumeHeader";
import Spacing from "@/src/components/shared/Spacing";
import ResumeEducation from "./components/resumeEducation";

export default async function Resume() {
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
        <p className="text-base">감사합니다.</p>
        <div className="flex flex-col items-center gap-4 my-12 text-sm text-[#808080] text-center">
          <p>Last updated: 2025.05.31</p>
          <p>@jaeungkim</p>
        </div>
      </footer>
    </div>
  );
}

