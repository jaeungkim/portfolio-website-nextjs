"use client";

import { useState } from "react";
import ContactModal from "../components/ContactModal";
import SectionContainer from "../components/SectionContainer";
import Image from "next/image";

export default function GettingMarried() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"groom" | "bride">("groom");

  return (
    <SectionContainer sectionKey="getting-married">
      <div className="flex flex-col items-center justify-center py-[82px] pb-[166px] text-[#5F89B8] font-bold text-lg text-center space-y-8">
        <p>결혼식은 생략하며, 일가친척이 모여</p>
        <p>식사하는 자리로 결혼을 대신하고자 합니다.</p>
      </div>
      <Image
        src="/images/mobile-wedding/gallery/wedding12.jpeg"
        alt="저희 결혼 사진"
        width={448}
        height={1000}
        className="shadow-md rounded mb-[64px] w-full"
      />
      <div className="flex flex-col items-center justify-center space-y-4">
        <p>미래는 누구도 알 수 없고,</p>
        <p>가끔은 막연한 두려움이 밀려오기도 하지만,</p>
        <p>그럼에도 불구하고</p>
        <p>저희는 저희만의 결혼식과</p>
        <p>저희만의 삶을</p>
        <p>사랑하며 살아가려고 합니다.</p>
      </div>
      <div className="mt-[32px] flex items-center justify-center">
        <button
          onClick={() => setIsContactModalOpen(true)}
          className="cursor-pointer shadow-md bg-white rounded-full px-16 py-2 text-sm text-center w-fit border-solid border border-neutral-300 hover:border-neutral-400 transition-all duration-300 ease-in-out font-bold"
        >
          축하 연락하기
        </button>
      </div>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
    </SectionContainer>
  );
}
