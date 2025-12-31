"use client";

import dynamic from "next/dynamic";
import DecryptedText from "@/src/components/shared/DecryptedText";
import IconButton from "@/src/components/shared/IconButton";

const Model = dynamic(() => import("./components/Model"), { ssr: false });

export default function Home() {
  return (
    <div className="flex flex-col md:flex-row gap-4 w-full">
      <div className="relative md:basis-2/6 lg:basis-3/6 h-[350px] md:pr-4">
        <Model />
      </div>

      <article className="basis-1/2 space-y-4">
        <h2 className="text-3xl font-bold text-foreground sm:text-2xl">
          <DecryptedText
            text="안녕하세요, 김재웅입니다."
            animateOn="view"
            revealDirection="start"
            speed={50}
            sequential={true}
            characters="ガギグゲゴザジズゼゾダヂヅデドバビブベボパピプペポ"
          />
        </h2>

        <p className="text-muted-foreground">
          사용자가 서비스에 자연스럽게 몰입할 수 있도록 화면 흐름과 경험을
          세심하게 고민하고 다듬는걸 좋아합니다.
        </p>
        <p className="text-muted-foreground">
          단순함 속에서도 정교함을 추구하고, 그 과정에서 발생하는 문제를
          해결하는 것을 좋아합니다.
        </p>
        <p className="text-muted-foreground">
          평소엔 농구를 좋아해서 종종 공도 던지고 자연 속에서 시간을 보내며
          에너지를 얻기도 합니다.
        </p>
        <p className="text-muted-foreground">
          이 공간은 배우고 싶었던 것들을 자유롭게 실험하고, 작은 아이디어들을
          테스트하며, 소소한 일상도 기록하는 저만의 작업실입니다.
        </p>

        <div className="flex flex-wrap items-center gap-2 pt-2">
          <IconButton
            href="https://github.com/jaeungkim"
            icon="/icons/github.svg"
            label="GitHub"
            iconClassName="dark:invert"
          />
          <IconButton
            href="https://www.linkedin.com/in/jaeungkim0526/"
            icon="/icons/linkedin.svg"
            label="LinkedIn"
          />
        </div>
      </article>
    </div>
  );
}
