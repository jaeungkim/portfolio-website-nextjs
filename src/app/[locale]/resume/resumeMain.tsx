import { Link } from "@/src/i18n/routing";

import ResumeProject from "./resumeProject";
import ResumeIntroduce from "./resumeIntroduce";
import ResumeWork from "./resumeWork";
import ResumeSkill from "./resumeSkill";
import ResumeHeader from "./resumeHeader";

export default function ResumeContent({ lastUpdated }) {
  return (
    <div className="text-[#37352F] dark:text-zinc-400">
      {/* HEADER  */}
      <ResumeHeader />
      <hr className="my-11 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
      <ResumeIntroduce />
      <hr className="my-11 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
      {/* Work Experience */}
      <ResumeWork />
      <hr className="my-11 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>
      {/* Projects  */}
      <ResumeProject />
      {/* Skills */}
      <ResumeSkill />

      {/* Education */}
      <div className="mb-11 font-semibold text-cyan-500 text-3xl uppercase">
        Education
      </div>

      {/* UBC */}
      <div className="md:grid md:grid-cols-4 md:gap-4">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          2020.04
        </div>
        <div className="col-span-3">
          <Link
            className="text-2xl font-medium hover:text-cyan-500"
            href="https://www.ubc.ca/"
            target="_blank"
          >
            <p className="mb-2">University of British Columbia</p>
          </Link>
          <p className="text-base font-normal text-[#808080] italic">
            Bachelor of Science - Major in Computer Science
          </p>
        </div>
      </div>

      <footer className="pt-[150px] flex flex-col items-center justify-center">
        <p className="text-base">감사합니다.</p>
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
