import ResumeHeader from "./components/resumeHeader";
import ResumeIntroduce from "./components/resumeIntroduce";
import ResumeWork from "./components/resumeWork";
import ResumeProject from "./components/resumeProject";
import ResumeSkill from "./components/resumeSkill";
import ResumeEducation from "./components/resumeEducation";
import Spacing from "@/src/components/shared/Spacing";

export const dynamic = "force-static";

export default function ResumePage() {
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
