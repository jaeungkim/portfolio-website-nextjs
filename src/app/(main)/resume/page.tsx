import ResumeHeader from "./components/ResumeHeader";
import ResumeWork from "./components/ResumeWork";
import ResumeProject from "./components/ResumeProject";
import ResumeSkill from "./components/ResumeSkill";
import ResumeEducation from "./components/ResumeEducation";

export default function ResumePage() {
  return (
    <>
      <ResumeHeader />
      <hr className="my-6 h-px bg-border border-0" />
      <ResumeWork />
      <hr className="my-6 h-px bg-border border-0" />
      <ResumeProject />
      <hr className="my-6 h-px bg-border border-0" />
      <ResumeSkill />
      <hr className="my-6 h-px bg-border border-0" />
      <ResumeEducation />
      <footer className="pt-36 text-center">
        <p>감사합니다.</p>
        <div className="mt-12 space-y-1 text-sm text-muted-foreground">
          <p>Last updated: 2026.03.08</p>
          <p>@jaeungkim</p>
        </div>
      </footer>
    </>
  );
}
