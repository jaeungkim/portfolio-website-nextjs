import Image from "next/image";
import { Github, Linkedin, Mail, FileText } from "lucide-react";

export default function ResumeHeader() {
  return (
    <section className="grid gap-y-5 sm:gap-y-6 md:grid-cols-[clamp(180px,24vw,220px)_minmax(0,1fr)] md:gap-x-8 lg:gap-x-10">
      <div className="w-full max-w-[150px] overflow-hidden rounded-xl border border-border bg-muted sm:max-w-[172px] md:row-span-2 md:w-[clamp(180px,24vw,220px)] md:max-w-none md:self-start">
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

      <header className="flex max-w-[72ch] flex-col items-start justify-center gap-4 md:min-h-full md:pt-2">
        <div className="text-left">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            김재웅 (Jae Kim)
          </h1>
          <p className="mt-2 text-lg font-medium text-muted-foreground md:text-xl">
            Frontend Developer
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-2 md:gap-x-5">
          <a
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            href="mailto:jaewoongkim95@gmail.com"
          >
            <Mail className="size-3" aria-hidden="true" />
            <span>Email</span>
          </a>
          <a
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            href="https://github.com/jaeungkim"
            target="_blank"
            rel="noreferrer"
          >
            <Github className="size-3" aria-hidden="true" />
            <span>GitHub</span>
          </a>
          <a
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            href="https://www.linkedin.com/in/jaeungkim0526"
            target="_blank"
            rel="noreferrer"
          >
            <Linkedin className="size-3" aria-hidden="true" />
            <span>LinkedIn</span>
          </a>
          <a
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            href="https://jaeungkim.notion.site"
            target="_blank"
            rel="noreferrer"
          >
            <FileText className="size-3" aria-hidden="true" />
            <span>Notion</span>
          </a>
        </div>
      </header>

      <div className="max-w-[72ch] space-y-3 text-left text-[15.5px] leading-7 text-muted-foreground">
        <p>
          안녕하세요. 캐나다 밴쿠버에서 나고 자라 다양한 문화 속에서 성장한
          프론트엔드 개발자입니다. 웹 서비스의 기획과 설계부터 개발, 배포,
          운영까지 전반적인 과정을 경험하며 폭넓은 시야를 쌓아왔습니다.
        </p>
        <p>
          단순히 화면을 구현하는 데 그치지 않고, 코드의 구조와 흐름을 이해하며
          서비스의 완성도를 높이는 데 집중해 왔습니다. 누구나 쉽게 이해하고 유지
          보수할 수 있는 명확한 코드를 작성하는 것을 중요하게 생각하며, 견고하고
          효율적인 구조를 만들기 위해 늘 고민합니다.
        </p>
        <p>
          완성도 높은 결과물을 만들기 위해 끝까지 파고드는 집요함 또한 저의 강점
          이라 생각합니다. 다만 빠르게 변화하는 개발 환경에서는 완벽함만을
          고집하기보다, 우선순위를 분명히 정해 핵심 기능을 안정적으로 구현한 뒤
          구조적 개선을 꾸준히 이어가는 방식으로 균형을 맞추기도 합니다.
        </p>
        <p>
          개발은 혼자 완성하는 일이 아니라 함께 만들어가는 과정이라고
          생각합니다. 프로젝트의 방향성과 문제 상황을 투명하게 공유하고,
          동료들과의 기술적 논의와 협업을 통해 더 나은 해결책을 만들어가는 것을
          중요하게 여깁니다.
        </p>
        <p>
          앞으로도 꾸준한 학습과 경험을 바탕으로, 기술적 완성도와 협업 역량을
          함께 갖춘 프론트엔드 개발자로 성장해 나가겠습니다.
        </p>
      </div>
    </section>
  );
}
