import { ExternalLink } from "@/src/components/shared/ExternalLink";
import { ResumeSection } from "@/src/app/[lang]/(main)/resume/components/ResumeSection";
import { ResumeSectionItem } from "@/src/app/[lang]/(main)/resume/components/ResumeSectionItem";
import { ResumeStack } from "@/src/app/[lang]/(main)/resume/components/ResumeStack";
import { ResumeBullets } from "@/src/app/[lang]/(main)/resume/components/ResumeBullets";
import { ExperienceDurationPill } from "@/src/app/[lang]/(main)/resume/components/ExperienceDurationPill";
import { getDictionary } from "@/src/i18n/dictionaries";

// Tech names and URLs read the same in every locale; only prose lives in the dictionary.
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

// Inside the E8IGHT entry: h4 for the platform work and each project, h5 for a project's parts.
const HEADING = "text-base font-semibold text-foreground";
const SUBHEADING = "text-sm font-semibold text-foreground";
const BODY = "text-sm leading-relaxed text-foreground";

export async function ResumeWork() {
  const dict = await getDictionary();
  const { sections, experience } = dict.resume;
  const e8ight = experience.e8ight;
  const { hyundai, digitalTwin, products } = e8ight.projects;
  const suite = [
    {
      name: "NAXiS",
      url: NAXIS_URL,
      note: products.naxisNote,
      bullets: products.naxisBullets,
    },
    {
      name: "PMIS",
      url: PMIS_URL,
      note: products.pmisNote,
      bullets: products.pmisBullets,
    },
    {
      name: "NDX Cloud",
      url: NDX_CLOUD_URL,
      note: products.ndxCloudNote,
      bullets: products.ndxCloudBullets,
    },
  ];

  return (
    <ResumeSection
      id="experience"
      title={sections.experiences}
      aside={<ExperienceDurationPill />}
    >
      <ResumeSectionItem
        title={e8ight.company}
        link={E8IGHT_URL}
        meta={e8ight.period}
        role={e8ight.role}
        location={e8ight.location}
      >
        <ResumeStack items={E8IGHT_STACK} />

        <div className="space-y-6">
          <div className="space-y-3">
            <h4 className={HEADING}>{e8ight.platformHeading}</h4>
            <ResumeBullets items={e8ight.platformBullets} />
          </div>

          <div className="space-y-3">
            <h4 className={HEADING}>
              <ExternalLink link={HYUNDAI_URL}>{hyundai.title}</ExternalLink>
            </h4>
            <p className={BODY}>{hyundai.description}</p>
            <div className="space-y-1.5">
              <h5 className={SUBHEADING}>{hyundai.sdkHeading}</h5>
              <ResumeBullets items={hyundai.sdkBullets} />
            </div>
            <div className="space-y-1.5">
              <h5 className={SUBHEADING}>{hyundai.llmHeading}</h5>
              <ResumeBullets items={hyundai.llmBullets} />
            </div>
          </div>

          <div className="space-y-3">
            <h4 className={HEADING}>
              <ExternalLink link={DIGITAL_TWIN_URL}>
                {digitalTwin.title}
              </ExternalLink>
            </h4>
            <p className={BODY}>{digitalTwin.description}</p>
            <ResumeBullets items={digitalTwin.bullets} />
          </div>

          <div className="space-y-3">
            <h4 className={HEADING}>{products.title}</h4>
            <p className={BODY}>{products.description}</p>
            {suite.map((product) => (
              <div key={product.name} className="space-y-1.5">
                <h5
                  className={`flex flex-wrap items-baseline gap-x-1.5 ${SUBHEADING}`}
                >
                  <ExternalLink link={product.url}>{product.name}</ExternalLink>
                  <span className="font-normal text-muted-foreground">
                    {product.note}
                  </span>
                </h5>
                <ResumeBullets items={product.bullets} />
              </div>
            ))}
          </div>
        </div>
      </ResumeSectionItem>

      {PAST_ROLES.map((role) => {
        const entry = experience[role.key];

        return (
          <ResumeSectionItem
            key={role.key}
            title={entry.company}
            meta={entry.period}
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
