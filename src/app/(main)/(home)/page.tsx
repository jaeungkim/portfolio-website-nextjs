import type { Metadata } from "next";
import { Github, Linkedin } from "lucide-react";
import { IconButton } from "@/src/components/shared/IconButton";
import { IntroTitle } from "@/src/app/(main)/(home)/components/IntroTitle";
import { ModelIsland } from "@/src/app/(main)/(home)/components/ModelIsland";

export const metadata: Metadata = {
  title: "Home",
  description:
    "Jaeung Kim — product engineer in Seoul, designing interfaces where people and AI navigate complex domain knowledge through knowledge graphs and GraphRAG.",
};

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="relative md:basis-2/6 lg:basis-3/6 h-[350px] md:pr-4">
        <ModelIsland />
      </div>

      <article className="basis-1/2 space-y-4">
        <h2 className="text-3xl font-bold text-foreground sm:text-2xl">
          <IntroTitle text="안녕하세요, 김재웅입니다." />
        </h2>

        <p className="text-foreground">
          5년차 엔지니어입니다. 복잡한 도메인의 데이터에 의미를 부여하고, 사람이
          그 의미를 따라 길을 잃지 않도록 환경을 설계하는 일에 가치를 둡니다.
          좋은 설계는 복잡함을 줄이는 일이 아니라, 사람이 그 안에서도 길을 잡을
          수 있게 만드는 일이라고 봅니다.
        </p>
        <p className="text-foreground">
          데이터가 도메인 지식으로 정제되는 과정과, 그 위에서 사람과 AI가 어떻게
          협업할 수 있는지를 주로 고민합니다. 사소한 어긋남을 그냥 두지 않으려
          하고, 좋은 결과물은 좋은 협업에서 나온다고 믿는 편입니다.
        </p>
        <p className="text-foreground">
          최근에는 이에이트에서 현대자동차 R&D 데이터 통합 플랫폼을 만들고
          있습니다. 부서별로 흩어진 데이터를 온톨로지 기반 지식 그래프로 모으고,
          그 위에서 자연어 탐색과 추적이 한 환경에서 이어지도록 GraphRAG로
          설계하는 일에 집중하고 있습니다.
        </p>
        <p className="text-foreground">
          개발자 경험이나 사용자 경험처럼 기술과 사람이 맞닿는 표면을 다듬는
          일에 특히 공을 들입니다. 이런 가치를 함께 진지하게 다루는 팀에서
          일하고 싶습니다.
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <IconButton
            href="https://github.com/jaeungkim"
            icon={Github}
            label="GitHub"
          />
          <IconButton
            href="https://www.linkedin.com/in/jaeungkim0526/"
            icon={Linkedin}
            label="LinkedIn"
          />
        </div>
      </article>
    </div>
  );
}
