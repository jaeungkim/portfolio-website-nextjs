import { Suspense } from "react";
import { ExternalLink } from "@/src/components/shared/ExternalLink";
import { ResumeSectionItem } from "@/src/app/[lang]/(main)/resume/components/ResumeSectionItem";
import { ResumeTitle } from "@/src/app/[lang]/(main)/resume/components/ResumeTitle";
import { ResumeMeta } from "@/src/app/[lang]/(main)/resume/components/ResumeMeta";
import { ResumePills } from "@/src/app/[lang]/(main)/resume/components/ResumePills";
import { ResumeBullets } from "@/src/app/[lang]/(main)/resume/components/ResumeBullets";
import { ResumeProjectItem } from "@/src/app/[lang]/(main)/resume/components/ResumeProjectItem";
import { ExperienceDurationPill } from "@/src/app/[lang]/(main)/resume/components/ExperienceDurationPill";
import { getDictionary } from "@/src/i18n/dictionaries";

// Tech names and URLs read the same in every locale; only prose lives in the dictionary.
const E8IGHT_PILLS = [
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

const E8IGHT_URL = "https://e8ight.co.kr/ndxpro/";
const HYUNDAI_URL =
  "https://www.notion.so/jaeungkim/R-D-354c3276c40c805a88a9f4469e9189c3";
const DIGITAL_TWIN_URL =
  "https://www.notion.so/jaeungkim/354c3276c40c800eaf1df6aa708079cc";
const NAXIS_URL =
  "https://www.notion.so/jaeungkim/NAXiS-356c3276c40c80b6bd65c6fada81f741";
const PMIS_URL =
  "https://www.notion.so/jaeungkim/NDXPRO-PMIS-1d4c3276c40c809ca6dad49c9ce5f1b4";
const NDX_CLOUD_URL =
  "https://www.notion.so/jaeungkim/NDX-CLOUD-24bc3276c40c80b4afcef5f74478cbb5";

const PAST_ROLES = [
  {
    key: "flashee",
    pills: [
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
    pills: [
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
    pills: ["React", "GraphQL", "AWS", "Figma"],
  },
] as const;

export async function ResumeWork() {
  const dict = await getDictionary();
  const { sections, experience } = dict.resume;
  const e8ight = experience.e8ight;
  const { hyundai, digitalTwin, products } = e8ight.projects;

  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-base font-bold text-primary uppercase tracking-wider">
          {sections.experiences}
        </h2>
        <Suspense fallback={null}>
          <ExperienceDurationPill />
        </Suspense>
      </div>

      <div className="space-y-10 md:space-y-12">
        <ResumeSectionItem period={e8ight.period}>
          <ResumeTitle link={E8IGHT_URL}>{e8ight.company}</ResumeTitle>
          <ResumeMeta location={e8ight.location} role={e8ight.role} />
          <ResumePills items={E8IGHT_PILLS} />

          <div className="space-y-10">
            <section className="space-y-2">
              <h3 className="text-base font-semibold text-foreground">
                {e8ight.platformHeading}
              </h3>
              <ResumeBullets items={e8ight.platformBullets} />
            </section>

            <ResumeProjectItem
              title={hyundai.title}
              link={HYUNDAI_URL}
              description={hyundai.description}
            >
              <section className="space-y-3">
                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    {hyundai.sdkHeading}
                  </h4>
                  <ResumeBullets items={hyundai.sdkBullets} />
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    {hyundai.llmHeading}
                  </h4>
                  <ResumeBullets items={hyundai.llmBullets} />
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    {hyundai.mappingHeading}
                  </h4>
                  <ResumeBullets items={hyundai.mappingBullets} />
                </div>
              </section>
            </ResumeProjectItem>

            <ResumeProjectItem
              title={digitalTwin.title}
              link={DIGITAL_TWIN_URL}
              description={digitalTwin.description}
            >
              <ResumeBullets items={digitalTwin.bullets} />
            </ResumeProjectItem>

            <ResumeProjectItem
              title={products.title}
              description={products.description}
            >
              <section className="space-y-3">
                <div className="space-y-1.5">
                  <h4 className="flex flex-wrap items-baseline gap-x-1 gap-y-1 text-sm font-semibold text-foreground">
                    <ExternalLink
                      link={NAXIS_URL}
                      className="inline-flex items-baseline align-baseline text-sm leading-relaxed"
                    >
                      NAXiS
                    </ExternalLink>
                    <span className="font-normal text-muted-foreground">
                      {products.naxisNote}
                    </span>
                  </h4>
                  <ResumeBullets items={products.naxisBullets} />
                </div>

                <div className="space-y-1.5">
                  <h4 className="flex flex-wrap items-baseline gap-x-1 gap-y-1 text-sm font-semibold text-foreground">
                    <ExternalLink
                      link={PMIS_URL}
                      className="inline-flex items-baseline align-baseline text-sm leading-relaxed"
                    >
                      PMIS
                    </ExternalLink>
                    <span className="font-normal text-muted-foreground">
                      {products.pmisNote}
                    </span>
                  </h4>
                  <ResumeBullets items={products.pmisBullets} />
                </div>

                <div className="space-y-1.5">
                  <h4 className="flex flex-wrap items-baseline gap-x-1 gap-y-1 text-sm font-semibold text-foreground">
                    <ExternalLink
                      link={NDX_CLOUD_URL}
                      className="inline-flex items-baseline align-baseline text-sm leading-relaxed"
                    >
                      NDX Cloud
                    </ExternalLink>
                    <span className="font-normal text-muted-foreground">
                      {products.ndxCloudNote}
                    </span>
                  </h4>
                  <ResumeBullets items={products.ndxCloudBullets} />
                </div>
              </section>
            </ResumeProjectItem>
          </div>
        </ResumeSectionItem>
      </div>

      {PAST_ROLES.map((role) => {
        const entry = experience[role.key];

        return (
          <ResumeSectionItem key={role.key} period={entry.period}>
            <ResumeTitle>{entry.company}</ResumeTitle>
            <ResumeMeta location={entry.location} role={entry.role} />
            <ResumePills items={[...role.pills]} />
            <ResumeBullets items={entry.bullets} />
          </ResumeSectionItem>
        );
      })}
    </>
  );
}
