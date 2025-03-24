import { experiences } from "@/src/app/constants/resume";
import {
  calculateExperience,
  calculateTotalExperience,
} from "@/src/app/utils/resume";
import { Link } from "@/src/i18n/routing";
import SkillPill from "./SkillPill";
import WorkSection from "./WorkSection";

export default function ResumeWork() {
  return (
    <>
      <div className="flex justify-between">
        <div className="mb-4 font-semibold text-cyan-500 text-3xl uppercase">
          Experience
        </div>
        {/* pill of total */}
        <div className="mt-2">
          <p className="text-xs py-1 px-4 bg-cyan-200 rounded-full whitespace-nowrap dark:text-zinc-800">
            총 {calculateTotalExperience(experiences)}
          </p>
        </div>
      </div>

      {/* e8ight */}
      <WorkSection
        period="2024.01 ~"
        experience={calculateExperience("2024-01-01")}
        company="이에이트"
        location="잠실, 대한민국"
        position="플랫폼 개발팀 프론트엔드 개발자 | 주임 연구원"
        link="https://e8ight.co.kr"
        skills={[
          "React",
           "TypeScript",
          "Recoil",
          "Tanstack Query",
          "Tailwind CSS",
          "Storybook",
          "Motion",
          "WebRTC",
          "Socket.io",
        ]}
        details={[
          "사내 프론트엔드 팀을 위해 공통 템플릿 구축으로 초기 개발 환경 세팅 시간 단축",
          "디자인 시스템 및 공통 컴포넌트 개발, Storybook을 통해 디자이너와 소통 및 개발 협업 효율 향상",
          "네트워크 및 렌더링 최적화로 주요 제품의 초기 로딩 속도 약 80% 개선 (10초→2초)",
          "대규모 데이터도 빠르고 가볍게 표시할 수 있도록 Virtualization을 활용하여 성능 향상",
        ]}
        projects={[
          {
            title: "NDXPRO PMIS",
            tasks: [
              {
                title: "간트 차트 (WBS 기반) 개발 및 성능 최적화",
                subtasks: [
                  "외부 라이브러리의 한계를 극복하고, 복잡한 프로젝트 관리 데이터를 직관적으로 시각화하기 위해 커스텀 간트 차트 아키텍처를 설계 및 구현",
                  "Task 의존관계(FS, SS, SF, FF)를 SVG Path 기반 로직으로 구현 → 좌표 계산 및 경로 최적화로 복잡한 프로젝트 환경에서도 높은 가독성과 성능 유지",
                  "BOM 트리 및 간트 바 차트의 드래그앤드롭 인터랙션을 통해 Task 순서, 계층 및 일정을 수정할 수 있는 기능 제공",
                  "Task 일정 및 구조 변경 기능에 Tanstac Query 기반 Optimistic UI 패턴 적용 → 드래그앤드롭 인터랙션 시 서버 응답 전 상태 선반영 및 실패 시 롤백 처리로 데이터 무결성과 UX 일관성 확보",
                  "가상 스크롤링(Virtualization) 및 Lazy Loading을 적용하여 수천 개 Task 데이터의 렌더링 성능을 최적화하고, DOM 렌더링 성능 40% 개선"
                ],
              },
              {
                title: "도면 관리 시스템 개발",
                subtasks: [
                  "폴더 및 파일을 트리 구조로 시각화하는 재귀 컴포넌트 아키텍처 설계 및 구현, 대용량 데이터 렌더링 최적화",
                  "웹 기반 File Explorer 인터페이스 구현, 운영체제 수준의 다중 선택 및 단축키 지원",
                  "webkitdirectory와 비동기 업로드 처리로 폴더 단위 대량 문서 업로드 지원, 업로드 중 UI 반응성 유지 및 에러 핸들링 최적화",
                  "도면 문서의 버전 관리 및 변경 이력 추적 시스템 설계, 파일 변경 내역과 리비전 관리로 프로젝트 변경 사항 관리",
                  "다양한 확장자로 업로드된 파일의 미리보기 기능 개발",
                ],
              },
            ],
          },
          {
            title: "NDXPRO EPC",
            link: "https://www.youtube.com/watch?v=ZjW2mqULi_k&ab_channel=E8%7C%EC%9D%B4%EC%97%90%EC%9D%B4%ED%8A%B8",
            tasks: [
              {
                title: "2D 도면 뷰어 및 마크업 기능 설계 및 구현",
                subtasks: [
                  "SVG 기반 2D Viewer에 줌인/아웃 및 클릭 이벤트를 연동하여, 복잡한 도면 내 세부 영역을 탐색 가능하도록 기능 구현",
                  "텍스트, 직선, 곡선 등의 마크업 도구 제공, 도면 편집 인터랙션 설계",
                  "확대·축소 시에도 마크업 요소의 위치와 비율이 정확하게 유지되도록 SVG 좌표 변환 및 스케일 처리 로직 적용",
                  "마크업 요소 생성,삭제 기능을 통해 도면 편집 프로세스를 최적화",
                ],
              },
              {
                title: "사용자화 가능한 그리드 레이아웃 대시보드 설계 및 구현",
                subtasks: [
                  "React Grid Layout 라이브러리를 커스터마이징하여 동적 대시보드 아키텍처를 주도적으로 설계 및 도입",
                  "iframe의 postMessage API를 활용하여 협력 업체와의 3D Viewer를 연동하고 원활한 데이터 통신 기능 구현",
                ],
              },
            ],
          },
        ]}
      />
      <hr className="my-11 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr>

      <WorkSection
        period="2023.07 ~ 2023.10"
        experience={calculateExperience("2023-07-01", "2023-10-01")}
        company="Flashee"
        location="밴쿠버, 캐나다"
        position="프론트엔드 개발자"
        link="https://flashee.app"
        skills={[
          "React",
          "Redux",
          "Tailwind CSS",
          "Supabase",
          "Shopify Marketplaces",
          "Shopify Payments",
          "AWS",
          "Fly.io",
        ]}
        details={[
          "통합 의류 쇼핑 마켓플레이스(E-Commerce) 스타트업",
          "첫 번째 개발자로 입사하여 사내에 필요한 모든 프론트엔드 서비스 기획/개발/배포/운영",
          "Shopify Marketplaces가 원활하게 통합된 정교한 E-Commerce 플랫폼 개발",
          "Supabase 및 서드파티(Instagram, TikTok 등) 로그인 키트를 통해 플랫폼 보안 및 사용자 접근성 향상",
          "Redux를 활용하여 효율적인 상태 관리 및 데이터 흐름 최적화로 애플리케이션의 반응 속도 및 성능 향상",
          "Shopify Payments를 사용한 결제 게이트웨이 통합, 카트 포기 감소 및 성공적인 거래 증가",
          "AWS 및 Fly.io 을 이용한 클라우드 환경 구축",
          "신속한 온보딩 과정을 촉진하여 소프트 런칭 당일 초기 수익 창출에 기여",
        ]}
      />
      <hr className="my-11 h-px bg-gray-200 border-0 dark:bg-gray-700" />

      {/* iClinic Systems */}
      <WorkSection
        period="2022.07 ~ 2023.06"
        experience={calculateExperience("2022-07-01", "2023-06-01")}
        company="iClinic Systems Inc."
        location="밴쿠버, 캐나다"
        position="풀스택 개발자"
        link="https://www.aiclinic.ca"
        skills={[
          "Angular",
          "Three.js",
          "WebGL",
          "GSAP",
          "Motion",
          "RESTful API",
          "Node.js",
          "Express.js",
          "AWS",
          "NoSQL",
          "NGINX",
          "GitHub Actions",
          "Google Analytics",
        ]}
        details={[
          "병원 및 클리닉 네트워크를 대상으로 하는 EMR(Electronic Medical Records) SaaS 스타트업",
          "WebGL 기술을 적극 활용하여 사내 마케팅 프로젝트 전체를 독자적으로 설계 및 구현, 현대적인 웹 경험 제공",
          "Framer Motion과 GSAP 기반의 인터랙션 및 애니메이션 구현으로 직관적이고 몰입감 있는 사용자 경험 제공",
          "기술적 지식이 없는 경영진도 사용 가능한 사내 인력 및 근태 관리 어드민 포털 개발 및 운영, 효과적인 직원 관리 지원",
          "AWS 인프라 및 NoSQL 데이터베이스 모델링, 서버 구축 및 관리",
          "전반적인 백엔드 구현, 인프라 구축, 이벤트 설계 및 RESTful API 개발",
          "클라이언트 사용 가능한 CRUD API 구현",
          "이벤트 구독 시 자동 이메일 발송 기능을 포함한 어드민 시스템 구축 (AWS SES, Node.js, Angular)",
          "NGINX를 이용한 인프라 구축 및 무중단 배포로 운영",
          "Google Analytics을 적용하여 서비스 사용자 데이터 분석",
          "GitHub Action을 기반으로 CI/CD 구성",
        ]}
      />
      <hr className="my-11 h-px bg-gray-200 border-0 dark:bg-gray-700" />

      {/* Catalyx */}
      <WorkSection
        period="2021.01 ~ 2022.05"
        experience={calculateExperience("2021-01-01", "2022-05-01")}
        company="Catalx Management Ltd."
        location="밴쿠버, 캐나다"
        position="프론트엔드 개발자"
        link="https://www.catalyx.io"
        skills={["React", "GraphQL", "AWS"]}
        details={[
          "캐나다에 위치한 암호화폐 거래소 스타트업",
          "React 기반의 컴포넌트 아키텍처 설계 및 프론트엔드 생태계 구축으로 기업의 기술 기반 강화",
          "다양한 외부 시스템을 성공적으로 통합, 고객이 신용카드를 이용해 암호화폐를 구입할수 있는 기능 구현",
          "Apollo로 REST API를 GraphQL로 마이그레이션, 앱 성능 개선",
          "프론트엔드 최적화로 웹사이트 성능, 접근성, SEO 등 기존에 부족했던 부분들을 전반적으로 개선",
          "AWS Lambda@Edge와 Facebook Open Graph를 사용해 소셜 미디어용 URL 미리보기 기능 구현",
          "디자이너 팀원들과 협력하여 전체적인 UI/UX 개선",
        ]}
      />
    </>
  );
}
