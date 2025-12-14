import ResumeTitle from "./ResumeTitle";

export default async function ResumeIntroduce() {
  return (
    <div className="md:grid md:grid-cols-4 md:gap-4">
      <ResumeTitle title="Introduce" />
      <div className="col-span-3 flex flex-col gap-2 text-foreground mt-6 md:mt-0">
        <p>
          React, TypeScript 기반의 5년차 프론트엔드 개발자로, 대규모 데이터 시각화와 성능 최적화에 특화되어 있습니다. 아키텍처 설계 관점에서 모노레포 구조와 디자인 시스템을 설계하고, 빌드 시간 80% 단축, 메모리 96% 절약 등 정량적 성과를 달성했습니다.
        </p>
        <p>
          팀의 개발 생산성 향상을 위한 인프라 구축과 기술 문화 개선에도 기여하며, 복잡한 비즈니스 요구사항을 기술적으로 해결하는 것을 즐깁니다. 코드 리뷰와 기술 세션을 통해 팀 내 지식 공유 문화를 확산하고, 확장 가능한 아키텍처 설계와 성능 최적화를 통해 장기적으로 유지보수 가능한 시스템을 구축하는 데 중점을 둡니다.
        </p>
      </div>
    </div>
  );
}
