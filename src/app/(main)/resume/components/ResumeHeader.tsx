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
            Frontend Engineer
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
            안녕하세요, 5년차 프론트엔드 개발자 김재웅입니다. 최근에는 자동차
            R&D 프로젝트에서 대규모 데이터를 온톨로지로 묶어 시각화하고, 부서마다
            흩어져 있던 수천 장의 엑셀과 PDF를 하나로 모아, 자연어로 묻기만 하면
            원하는 정보를 바로 추적할 수 있는 솔루션을 만들고 있습니다.
          </p>
          <p>
            복잡한 도메인일수록 화면 설계가 결과를 좌우합니다. 그래서 기능을
            나열하기보다, 실제 사용자가 어떻게 반응하는지를 먼저 보고 UI/UX를
            다듬습니다. 별도의 설명 없이도 다음에 할 일이 보이는 화면이 좋은
            화면이라고 봅니다.
          </p>
          <p>
            같은 기준을 동료에게도 적용합니다. 제 코드를 이어받는 개발자가 바로
            이해하고 쓸 수 있도록 일관된 구조로 설계하고, 그 의도를 문서로
            남깁니다. 지금 프로젝트에서는 프론트엔드 아키텍처와 개발을 맡으면서,
            기획 단계부터 디자이너, 백엔드 개발자와 함께 제품의 방향과 프론트엔드
            구조를 잡아 갑니다. 디자인의 의도와 구현을 서로의 언어로 옮기고 역할
            사이의 빈틈을 메우는 일을 가장 잘하고, 또 가장 즐깁니다.
          </p>
          <p>
            AI 같은 새로운 도구는 빠르게 익히되 거기서 멈추지 않습니다. 사람과
            AI가 함께 일하는 방식을 설계하고, 그 기준을 팀이 함께 쓰도록 만드는
            데 더 무게를 둡니다. 혼자 잘 쓰는 개인보다, 팀 전체가 함께 잘 쓰는
            환경을 만드는 쪽이 제가 가려는 방향입니다.
          </p>
        </div>
      </div>
    </section>
  );
}
