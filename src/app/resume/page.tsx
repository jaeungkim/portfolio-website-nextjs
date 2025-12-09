import ResumeHeader from "./components/ResumeHeader";
import ResumeIntroduce from "./components/ResumeIntroduce";
import ResumeWork from "./components/ResumeWork";
import ResumeProject from "./components/ResumeProject";
import ResumeSkill from "./components/ResumeSkill";
import ResumeEducation from "./components/ResumeEducation";
import Spacing from "@/src/components/shared/Spacing";

export default async function ResumePage() {
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
