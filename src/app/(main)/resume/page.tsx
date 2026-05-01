import type { Metadata } from "next";
import { ResumeHeader } from "@/src/app/(main)/resume/components/ResumeHeader";
import { ResumeWork } from "@/src/app/(main)/resume/components/ResumeWork";
import { ResumeProject } from "@/src/app/(main)/resume/components/ResumeProject";
import { ResumeSkill } from "@/src/app/(main)/resume/components/ResumeSkill";
import { ResumeEducation } from "@/src/app/(main)/resume/components/ResumeEducation";

export const metadata: Metadata = {
  title: "Resume",
  description:
    "Jaeung Kim — frontend developer resume covering experience, projects, skills, and education.",
};

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
