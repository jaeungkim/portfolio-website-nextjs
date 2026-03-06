import ExternalLink from "@/src/components/shared/ExternalLink";
import Pill from "@/src/components/shared/Pill";
import ResumeSectionItem from "./ResumeSectionItem";
import { resumeExperiences, type ResumeSubproject } from "./resume.data";

function ResumeProjectDetails({ project }: { project: ResumeSubproject }) {
  return (
    <article className="space-y-3">
      <ExternalLink
        additionalClassName="text-base font-medium"
        link={project.link}
      >
        {project.title}
      </ExternalLink>
      <p className="pl-4 text-base font-bold text-muted-foreground">
        {project.summary}
      </p>
      <div className="space-y-4 pl-4">
        {project.sections.map((section) => (
          <section key={section.title} className="space-y-2">
            <h4 className="text-base font-semibold text-foreground">
              {section.title}
            </h4>
            <ul className="list-[circle] space-y-1 pl-5 text-base text-muted-foreground">
              {section.items.map((item, index) => (
                <li key={`${section.title}-${index}`}>{item}</li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </article>
  );
}

export default function ResumeWork() {
  return (
    <>
      <div className="flex justify-between items-center">
        <div className="font-semibold text-foreground text-3xl uppercase">
          Experiences
        </div>
        <Pill name="4년+" />
      </div>

      {resumeExperiences.map((work) => (
        <div key={`${work.period}-${work.title}`}>
          <ResumeSectionItem
            period={work.period}
            title={work.title}
            link={work.link}
            location={work.location}
            role={work.role}
            bullets={work.bullets}
          />

          {work.projects && (
            <div className="md:grid md:grid-cols-4 md:gap-x-6">
              <div className="hidden md:block" />
              <div className="col-span-3 space-y-6 pt-4">
                {work.projects.map((project) => (
                  <ResumeProjectDetails key={project.title} project={project} />
                ))}
              </div>
            </div>
          )}
        </div>
      ))}
    </>
  );
}
