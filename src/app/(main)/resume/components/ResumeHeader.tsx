import Image from "next/image";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

const SOCIAL_LINKS = [
  {
    href: "mailto:jaewoongkim95@gmail.com",
    icon: Mail,
    label: "Email",
    external: false,
  },
  {
    href: "https://github.com/jaeungkim",
    icon: Github,
    label: "GitHub",
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/jaeungkim0526",
    icon: Linkedin,
    label: "LinkedIn",
    external: true,
  },
  {
    href: "https://jaeungkim.notion.site",
    icon: FileText,
    label: "Notion",
    external: true,
  },
] as const;

export function ResumeHeader() {
  return (
    <section className="grid gap-y-6 md:grid-cols-[clamp(180px,24vw,220px)_minmax(0,1fr)] md:gap-x-8 lg:gap-x-10">
      <div className="w-full max-w-[150px] overflow-hidden rounded-xl border border-border bg-muted sm:max-w-[172px] md:w-[clamp(180px,24vw,220px)] md:max-w-none md:self-start">
        <div className="relative aspect-[4/5] w-full">
          <Image
            src="/images/profile.jpeg"
            alt="김재웅 (Jae Kim)"
            fill
            sizes="(min-width: 1024px) 220px, (min-width: 768px) 24vw, (min-width: 640px) 172px, 150px"
            className="object-cover"
            priority
          />
        </div>
      </div>

      <div className="flex max-w-[72ch] flex-col gap-5">
        <header className="space-y-1.5">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            김재웅 (Jae Kim)
          </h1>
          <p className="text-base font-medium text-muted-foreground">
            Frontend Engineer / Full-stack Capable
          </p>
        </header>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 md:gap-x-5">
          {SOCIAL_LINKS.map(({ href, icon: Icon, label, external }) => (
            <a
              key={label}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              href={href}
              {...(external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
            >
              <Icon className="size-3.5" aria-hidden="true" />
              <span>{label}</span>
            </a>
          ))}
        </div>

        <div className="space-y-3 text-sm leading-relaxed text-foreground">
          <p>
            5년차 개발자입니다. 복잡한 도메인의 데이터에 의미를 부여하고, 사람이
            그 의미를 따라 길을 잃지 않도록 환경을 설계하는 일에 가치를 둡니다.
            데이터가 어떻게 도메인 지식으로 정제되는지, 그 위에서 사람과 AI가
            어떻게 협업할 수 있는지에 대한 고민을 주로 합니다. 기술 자체보다 그
            위에서 사람이 어떤 결정을 내리고 어떤 흐름을 따라가는지에 더 관심이
            많습니다.
          </p>
          <p>
            최근에는 이에이트에서 현대자동차 R&amp;D 데이터 통합 플랫폼을 만들고
            있습니다. 부서별로 흩어진 데이터를{" "}
            <strong className="font-semibold">
              온톨로지 기반의 지식 그래프
            </strong>
            로 모으고, <strong className="font-semibold">graphRAG</strong>로
            자연어 탐색과 추적이 한 환경에서 이어지도록 설계하는 일에 집중하고
            있습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
