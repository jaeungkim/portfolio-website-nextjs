import ExternalLink from "@/src/components/shared/buttons/ExternalLink";
import SkillsList from "./SkillsList";
import type { ProjectSectionProps } from "./types";

function ProjectTitle({ title, link }: { title: string; link?: string }) {
  return (
    <div className="flex items-start mb-2 md:mb-0">
      <ExternalLink
        additionalClassName="text-xl text-muted-foreground"
        link={link || ""}
      >
        {title}
      </ExternalLink>
    </div>
  );
}

function DescriptionList({ descriptions }: { descriptions: string[] }) {
  return (
    <ul className="text-base font-normal pl-4 list-disc space-y-2">
      {descriptions.map((desc, idx) => (
        <li key={idx}>{desc}</li>
      ))}
    </ul>
  );
}

export default function ProjectSection({
  title,
  description,
  link,
  skills,
}: ProjectSectionProps) {
  return (
    <div className="mt-8 md:grid md:grid-cols-4 md:gap-4 text-foreground">
      <ProjectTitle title={title} link={link?.url} />
      <div className="space-y-2 col-span-3">
        <DescriptionList descriptions={description} />
        <SkillsList skills={skills} className="flex flex-wrap gap-1 pl-4" />
      </div>
    </div>
  );
}
