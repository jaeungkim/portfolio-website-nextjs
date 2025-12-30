import ResumeHeader from "./components/resumeHeader";
import ResumeWork from "./components/resumeWork";
import ResumeProject from "./components/resumeProject";
import ResumeSkill from "./components/resumeSkill";
import ResumeEducation from "./components/resumeEducation";
import Spacing from "@/src/components/shared/Spacing";

export const dynamic = "force-static";

export default function ResumePage() {
  return (
    <>
      <ResumeHeader />
      <Spacing />
      <ResumeWork />
      <Spacing />
      <ResumeProject />
      <Spacing />
      <ResumeSkill />
      <Spacing />
      <ResumeEducation />
      <footer className="pt-36 text-center">
        <p>감사합니다.</p>
        <div className="mt-12 space-y-1 text-sm text-muted-foreground">
          <p>Last updated: 2025.05.31</p>
          <p>@jaeungkim</p>
        </div>
      </footer>
    </>
  );
}
