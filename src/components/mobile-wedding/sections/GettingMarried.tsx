import SectionContainer from "../components/SectionContainer";
import Image from "next/image";

export default function GettingMarried() {
  return (
    <SectionContainer sectionKey="getting-married">
      <p className="text-[#5F89B8] mb-[112px] font-bold text-lg text-center leading-6">
        결혼식은 생략하며, 일가친척이 모여
        <br />
        식사하는 자리로 결혼을 대신하고자 합니다.
      </p>
      <Image
        src="/images/mobile-wedding/gallery/wedding12.jpeg"
        alt="저희 결혼 사진"
        width={448}
        height={1000}
        className="shadow-md rounded mb-[64px] w-full"
      />
      <p className="leading-6 text-center">
        미래는 누구도 알 수 없고,
        <br />
        가끔은 막연한 두려움이 밀려오기도 하지만,
        <br />
        그럼에도 불구하고,
        <br />
        저희는 저희만의 결혼식과
        <br />
        저희만의 삶을
        <br />
        사랑하며 살아가려고 합니다.
      </p>
    </SectionContainer>
  );
}
