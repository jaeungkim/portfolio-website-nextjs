import SectionContainer from "../components/SectionContainer";

export default function GettingMarried() {
  return (
    <SectionContainer sectionKey="getting-married">
      <blockquote>
        <p className="text-[#5F89B8] mb-[64px] font-bold">
          소중한 분들을 초대합니다.
        </p>
        <p className="leading-relaxed ">
          서로의 이름을 부르는 것만으로도
          <br />
          사랑의 깊이를 확인할 수 있는 두 사람이
          <br />
          꽃과 나무처럼 걸어와서
          <br />
          서로의 모든 것이 되기 위해
          <br />
          오랜 기다림 끝에 혼례식을 치르는 날<br />
          세상은 더욱 아름다워라
        </p>

        <footer className="pt-[12px]">
          <cite className="text-sm opacity-75">
            &lt;사랑의 사람들이여&gt;, 이해인
          </cite>
        </footer>
      </blockquote>
    </SectionContainer>
  );
}
