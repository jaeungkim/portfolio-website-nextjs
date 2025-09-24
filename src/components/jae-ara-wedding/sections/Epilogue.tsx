import { useState, useEffect } from "react";
import Image from "next/image";
import SectionContainer from "../components/SectionContainer";

export default function Epilogue() {
  const [timeTogether, setTimeTogether] = useState("");

  useEffect(() => {
    const startDate = new Date("2016-12-21T14:00:00");

    const updateTime = () => {
      const now = new Date();
      const diffMs = now.getTime() - startDate.getTime();

      const years = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 365.25));
      const months = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24 * 365.25)) /
          (1000 * 60 * 60 * 24 * 30.44)
      );
      const days = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24 * 30.44)) / (1000 * 60 * 60 * 24)
      );
      const hours = Math.floor(
        (diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diffMs % (1000 * 60)) / 1000);

      setTimeTogether(
        `${years}년 ${months}개월 ${days}일 ${hours}시간 ${minutes}분 ${seconds}초`
      );
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <SectionContainer className="text-neutral-700" sectionKey="epilogue">
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-medium text-neutral-900 tracking-wide">
          함께한 시간
        </h1>
        <div className="w-12 h-px bg-neutral-300 mx-auto"></div>
      </div>

      <div className="text-center">
        <p className="text-lg text-neutral-700">"{timeTogether}"</p>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4">
        <p>그리고 우리는 서로의 손을 잡고 걸어가며</p>
        <p>오늘의 약속을 기억하겠습니다.</p>
        <p>웃음과 눈물이 섞인 이 길에서 항상 서로를 아끼며</p>
        <p className="font-semibold">행복하게 잘살겠습니다.</p>
      </div>

      <div className="px-6 py-4">
        <div className="text-center space-y-1">
          <p className="text-sm italic text-neutral-700 leading-relaxed">
            "인생은 모두가 함께하는 여행이다.
          </p>
          <p className="text-sm italic text-neutral-700 leading-relaxed">
            매일매일 사는 동안 우리가 할 수 있는 건
          </p>
          <p className="text-sm italic text-neutral-700 leading-relaxed">
            최선을 다해 이 멋진 여행을 만끽하는 것이다."
          </p>
        </div>
        <p className="mt-6 text-xs text-center text-neutral-500 font-medium">
          - 영화 '어바웃타임' 중
        </p>
      </div>

      <div className="w-full">
        <Image
          src="https://images.jaeungkim.com/mobile-wedding/gallery/wedding10.jpeg"
          alt="Epilogue"
          width={448}
          height={1000}
        />
      </div>

      <footer className="text-center space-y-4 py-8">
        <div className="space-y-2">
          <p className="text-lg font-medium text-neutral-800 tracking-wide">
            김재웅 & 고아라
          </p>
          <div className="w-8 h-px bg-neutral-300 mx-auto"></div>
        </div>
        <p className="text-xs text-neutral-400 leading-relaxed">
          COPYRIGHT © jaeungkim. All rights reserved.
        </p>
      </footer>
    </SectionContainer>
  );
}
