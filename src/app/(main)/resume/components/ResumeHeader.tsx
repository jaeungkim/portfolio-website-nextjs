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
            안녕하세요. 5년차 엔지니어 김재웅입니다. 이에이트에서 프론트엔드
            개발자로 일하고 있고, 요즘은 대규모 데이터 시각화와 온톨로지 기반
            데이터 정제, 그 위에서 사람과 AI가 함께 일하는 워크플로우를
            설계하는 일에 시간을 많이 쓰고 있습니다. 그 결과가 사용자에게
            자연스럽게 닿도록 화면과 인터랙션을 다듬는 일도 같이 챙기는
            편입니다.
          </p>
          <p>
            지금은 현대자동차 R&D 데이터 통합 플랫폼을 만들고 있습니다.
            부서마다 흩어져 있던 데이터를 온톨로지 기반 지식 그래프로 모으고,
            그 위에서 자연어 탐색과 추적이 한 환경에서 이어지도록 설계하는
            일에 집중하고 있습니다.
          </p>
          <p>
            복잡한 도메인을 오래 다루다 보면 자연스레 드는 생각이 있습니다.
            복잡함을 없애는 것보다, 그 안에서도 사람이 방향을 잡을 수 있게
            만드는 일이 더 중요할 때가 많다는 것입니다. 그래서 데이터 모델이나
            알고리즘만큼, 그 위에 올라가는 사용자 경험과 협업 환경을 다듬는
            일에도 공을 들이는 편입니다. AI가 결과를 빠르게 만들어주는
            시기일수록, 사람이 그 위에서 어떻게 일할 수 있는지가 더
            중요해진다고 느낍니다.
          </p>
          <p>
            사소한 어긋남을 그냥 두지 않고, 좋은 결과물은 좋은 협업에서
            나온다고 믿습니다.
          </p>
        </div>
      </div>
    </section>
  );
}
