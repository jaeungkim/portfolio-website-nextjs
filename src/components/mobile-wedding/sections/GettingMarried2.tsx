import SectionContainer from "../components/SectionContainer";
import Image from "next/image";

export default function GettingMarried2() {
  return (
    <SectionContainer sectionKey="getting-married2">
      <p className="leading-relaxed">
        <span className="font-bold">저희 결혼합니다 🤍</span>
        <br />
        <br />
        귀한 마음으로 결혼식에 찾아오셔서
        <br />
        축복의 말씀과 따뜻함을 나눠주세요. <br />더 없는 격려와 기쁨으로
        간직하겠습니다.
      </p>
      <Image
        alt="저희 결혼 사진"
        src="/images/mobile-wedding/gallery/image1.jpeg"
        width={448}
        height={1000}
        className="shadow-sm rounded pt-[48px]"
      />
    </SectionContainer>
  );
}
