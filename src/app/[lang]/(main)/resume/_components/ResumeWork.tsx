import type { ReactNode } from "react";
import { ExternalLink } from "@/components/shared/ExternalLink";
import { ResumeSection } from "@/app/[lang]/(main)/resume/_components/ResumeSection";
import { ResumeSectionItem } from "@/app/[lang]/(main)/resume/_components/ResumeSectionItem";
import { ResumeStack } from "@/app/[lang]/(main)/resume/_components/ResumeStack";
import { ResumeBullets } from "@/app/[lang]/(main)/resume/_components/ResumeBullets";
import { ExperienceDurationPill } from "@/app/[lang]/(main)/resume/_components/ExperienceDurationPill";
import { getDictionary } from "@/i18n/dictionaries";

const E8IGHT_STACK = [
  "TypeScript",
  "React",
  "Next.js",
  "Nest.js",
  "TanStack-Query",
  "Zustand",
  "Recoil",
  "Tailwind CSS",
  "Shadcn",
  "Motion",
  "D3.js",
  "Canvas API",
  "Socket.io",
  "WebRTC",
  "Storybook",
  "Figma",
  "Docker",
  "Sentry",
  "AWS",
];

const E8IGHT_URL = "https://e8ight.co.kr/ndx-pro/";
const HYUNDAI_URL =
  "https://jaeungkim.notion.site/R-D-35fc3276c40c81d7920bc177b5130845";
const DIGITAL_TWIN_URL =
  "https://jaeungkim.notion.site/354c3276c40c800eaf1df6aa708079cc";
const NAXIS_URL =
  "https://jaeungkim.notion.site/NAXiS-356c3276c40c80b6bd65c6fada81f741";
const PMIS_URL =
  "https://jaeungkim.notion.site/NDXPRO-PMIS-1d4c3276c40c809ca6dad49c9ce5f1b4";
const NDX_CLOUD_URL =
  "https://jaeungkim.notion.site/NDX-CLOUD-24bc3276c40c80b4afcef5f74478cbb5";

const PAST_ROLES = [
  {
    key: "flashee",
    stack: [
      "React",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "Supabase",
      "Shopify",
      "AWS",
    ],
  },
  {
    key: "iclinic",
    stack: [
      "Angular",
      "Node.js",
      "Express.js",
      "MongoDB",
      "SASS",
      "Framer Motion",
      "GSAP",
      "WebGL",
      "Three.js",
      "AWS",
    ],
  },
  {
    key: "catalx",
    stack: ["React", "GraphQL", "AWS", "Figma"],
  },
] as const;

export async function ResumeWork() {
  const dict = await getDictionary();
  const { sections, experience } = dict.resume;
  const e8ight = experience.e8ight;
  const { hyundai, digitalTwin, products } = e8ight.projects;

  return (
    <ResumeSection
      id="experience"
      title={sections.experience}
      aside={<ExperienceDurationPill />}
    >
      <ResumeSectionItem
        title={e8ight.company}
        href={E8IGHT_URL}
        period={e8ight.period}
        role={e8ight.role}
        location={e8ight.location}
      >
        <ResumeStack items={E8IGHT_STACK} />

        <div className="space-y-6">
          <WorkProject title={e8ight.platformHeading}>
            <ResumeBullets items={e8ight.platformBullets} />
          </WorkProject>

          <WorkProject
            title={hyundai.title}
            href={HYUNDAI_URL}
            description={hyundai.description}
          >
            <WorkProjectPart
              title={hyundai.sdkHeading}
              bullets={hyundai.sdkBullets}
            />
            <WorkProjectPart
              title={hyundai.llmHeading}
              bullets={hyundai.llmBullets}
            />
          </WorkProject>

          <WorkProject
            title={digitalTwin.title}
            href={DIGITAL_TWIN_URL}
            description={digitalTwin.description}
          >
            <ResumeBullets items={digitalTwin.bullets} />
          </WorkProject>

          <WorkProject
            title={products.title}
            description={products.description}
          >
            <WorkProjectPart
              title="NAXiS"
              href={NAXIS_URL}
              note={products.naxisNote}
              bullets={products.naxisBullets}
            />
            <WorkProjectPart
              title="PMIS"
              href={PMIS_URL}
              note={products.pmisNote}
              bullets={products.pmisBullets}
            />
            <WorkProjectPart
              title="NDX Cloud"
              href={NDX_CLOUD_URL}
              note={products.ndxCloudNote}
              bullets={products.ndxCloudBullets}
            />
          </WorkProject>
        </div>
      </ResumeSectionItem>

      {PAST_ROLES.map((role) => {
        const entry = experience[role.key];

        return (
          <ResumeSectionItem
            key={role.key}
            title={entry.company}
            period={entry.period}
            role={entry.role}
            location={entry.location}
          >
            <ResumeStack items={role.stack} />
            <ResumeBullets items={entry.bullets} />
          </ResumeSectionItem>
        );
      })}
    </ResumeSection>
  );
}

interface WorkProjectProps {
  title: string;
  href?: string;
  description?: string;
  children: ReactNode;
}

function WorkProject({ title, href, description, children }: WorkProjectProps) {
  return (
    <div className="space-y-3">
      <h4 className="text-base font-semibold">
        {href ? <ExternalLink href={href}>{title}</ExternalLink> : title}
      </h4>
      {description && <p className="text-sm leading-relaxed">{description}</p>}
      {children}
    </div>
  );
}

interface WorkProjectPartProps {
  title: string;
  href?: string;
  note?: string;
  bullets: readonly string[];
}

function WorkProjectPart({ title, href, note, bullets }: WorkProjectPartProps) {
  return (
    <div className="space-y-1.5">
      <h5 className="flex flex-wrap items-baseline gap-x-1.5 text-sm font-semibold">
        {href ? <ExternalLink href={href}>{title}</ExternalLink> : title}
        {note && (
          <span className="font-normal text-muted-foreground">{note}</span>
        )}
      </h5>
      <ResumeBullets items={bullets} />
    </div>
  );
}
