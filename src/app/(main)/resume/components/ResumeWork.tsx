import { Suspense } from "react";
import { ResumeSectionItem } from "@/src/app/(main)/resume/components/ResumeSectionItem";
import { ResumeTitle } from "@/src/app/(main)/resume/components/ResumeTitle";
import { ResumeMeta } from "@/src/app/(main)/resume/components/ResumeMeta";
import { ResumePills } from "@/src/app/(main)/resume/components/ResumePills";
import { ResumeBullets } from "@/src/app/(main)/resume/components/ResumeBullets";
import { ResumeProjectItem } from "@/src/app/(main)/resume/components/ResumeProjectItem";
import { ExperienceDurationPill } from "@/src/app/(main)/resume/components/ExperienceDurationPill";
import { ExternalLink } from "@/src/components/shared/ExternalLink";

const E8IGHT_PILLS = [
  "TypeScript",
  "React",
  "Next.js",
  "Nest.js",
  "TanStack-Query",
  "Zustand",
  "Recoil",
  "Tailwind CSS",
  "Shadcn",
  "Motion",
  "D3.js",
  "Canvas API",
  "Socket.io",
  "WebRTC",
  "Storybook",
  "Figma",
  "Docker",
  "Sentry",
  "AWS",
];

const FLASHEE_PILLS = [
  "React",
  "Next.js",
  "Redux",
  "Tailwind CSS",
  "Supabase",
  "Shopify",
  "AWS",
];

const FLASHEE_BULLETS = [
  "통합 의류 쇼핑 마켓플레이스(E-Commerce) 스타트업의 첫 번째 개발자로 입사하여 프론트엔드 서비스 전반 기획/개발/배포/운영 담당",
  "Shopify Marketplaces 통합을 위한 E-Commerce 플랫폼 아키텍처 설계 및 구축",
  "Supabase 및 서드파티(Instagram, TikTok 등) 로그인 키트 통합 아키텍처 설계로 플랫폼 보안 및 사용자 접근성 향상",
  "Shopify Payments 결제 게이트웨이 통합 전략 수립 및 구현으로 카트 포기율 감소 및 거래 성공률 개선",
];

const ICLINIC_PILLS = [
  "Angular",
  "Node.js",
  "Express.js",
  "MongoDB",
  "SASS",
  "Framer Motion",
  "GSAP",
  "WebGL",
  "Three.js",
  "AWS",
];

const ICLINIC_BULLETS = [
  "EMR(Electronic Medical Records) SaaS 스타트업에서 풀스택 개발자로 활동",
  "WebGL 기반 마케팅 프로젝트 아키텍처를 독자적으로 설계 및 구현하여 현대적인 웹 경험 제공",
  "Framer Motion과 GSAP을 활용한 인터랙션 및 애니메이션 전략 설계로 사용자 경험 개선",
  "기술적 지식이 없는 경영진도 사용 가능한 인력 및 근태 관리 어드민 포털 아키텍처 설계 및 운영",
  "백엔드 API 아키텍처, AWS 인프라 설계, MongoDB 데이터베이스 스키마 설계 및 CI/CD 파이프라인 구축",
];

const CATALX_PILLS = ["React", "GraphQL", "AWS", "Figma"];

const CATALX_BULLETS = [
  "암호화폐 거래소 스타트업에서 React 기반 컴포넌트 아키텍처 설계 및 확장 가능한 시스템 구축",
  "신용카드 결제 시스템 통합 아키텍처 설계 및 암호화폐 구매 플로우 구현",
  "AWS Lambda@Edge와 Facebook Open Graph를 활용한 소셜 미디어 URL 미리보기 최적화 전략 수립 및 구현",
  "디자이너와 협업하여 UI/UX 아키텍처 개선 및 사용자 경험 향상",
];

export function ResumeWork() {
  return (
    <>
      <div className="flex justify-between items-center">
        <h2 className="text-base font-bold text-primary uppercase tracking-wider">
          Experiences
        </h2>
        <Suspense fallback={null}>
          <ExperienceDurationPill />
        </Suspense>
      </div>

      <div className="space-y-10 md:space-y-12">
        <ResumeSectionItem period="2024.01 ~ 현재">
          <ResumeTitle link="https://e8ight.co.kr/ndxpro/">
            이에이트
          </ResumeTitle>
          <ResumeMeta
            location="잠실, 대한민국"
            role="플랫폼 개발팀 | 선임 연구원"
          />
          <ResumePills items={E8IGHT_PILLS} />

          <div className="space-y-10">
            <section className="space-y-2">
              <h3 className="text-base font-semibold text-foreground">
                프론트엔드 플랫폼과 개발 환경
              </h3>
              <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                <li>
                  모노레포, 디자인 시스템, 공용 UI 패키지, CI/CD, MSW와
                  Storybook 기반 격리 개발 환경, Sentry 운영 모니터링까지 팀의
                  기본기를 구축. 빌드 환경 재구성으로 CI 시간 약 80% 단축.
                </li>
                <li>
                  AI 코딩 에이전트와의 협업까지 표준화. Claude Code와 Cursor
                  기반 협업 시스템(
                  <code className="rounded bg-muted px-1 py-0.5 text-sm">
                    .agent/workflows/
                  </code>
                  )을 설계, 공개된 엔지니어링 원칙들을 agent-readable 룰로
                  재구성해 AI 생성 코드가 처음부터 합의된 기준을 만족하도록
                  구조화.
                </li>
                <li>
                  NIPA 주관 GSMP 프로그램에 팀 대표로 선정, 워싱턴 D.C. 현지
                  행사에서 글로벌 파트너 대상 발표.
                </li>
              </ul>
            </section>

            <ResumeProjectItem
              title="현대자동차 R&D 데이터 통합 플랫폼"
              link="https://www.notion.so/jaeungkim/R-D-354c3276c40c805a88a9f4469e9189c3?source=copy_link"
              description="부서별로 분산되어 있던 현대자동차 R&D 데이터를 단일 온톨로지 지식 그래프로 통합하는 사내 플랫폼. PoC 검증을 거쳐 본사업 단계로 진입, 차량 7대 성능 영역 전 부서 적용을 목표로 샤시해석팀부터 단계적 도입 진행. 수천만 노드 규모 지식 그래프 위에서 동작하는 프론트엔드 아키텍처, 단일 데이터 스키마, 시각화 SDK 담당."
            >
              <section className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">
                  <ExternalLink
                    link="https://www.notion.so/jaeungkim/R-D-GraphRAG-SDK-PoC-24bc3276c40c80b7bfb4f7d392b2c823?source=copy_link"
                    className="text-sm font-semibold leading-5"
                  >
                    지식 그래프 시각화 SDK
                  </ExternalLink>
                </h4>
                <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                  <li>
                    검색과 필터로 그래프를 점진적으로 탐색하는 사용 패턴을
                    전제로, 시각화의 핵심 가치를 노드 수가 아닌 인터랙션 성능과
                    UX로 재정의.
                  </li>
                  <li>
                    sigma.js 등 WebGL 기반 통합 라이브러리 검토 후 한정된 노드
                    환경의 인터랙션 정밀도와 맞지 않다고 판단, 자체 SDK 구축으로
                    방향 전환.
                  </li>
                  <li>
                    한 화면 노드 수를 25개로 한정, 물리 시뮬레이션은 D3-Force에
                    위임하고 차별화가 필요한 렌더링과 상호작용 레이어만 직접
                    설계해 구현 자원을 정밀도에 집중.
                  </li>
                </ul>
              </section>
              <section className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">
                  데이터 스키마와 매핑 에디터
                </h4>
                <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                  <li>
                    AI가 정형/비정형 파일을 단일 JSON으로 구조화하도록 출력
                    스키마인 Entity 모델을 정의. Entity를 그래프 노드 그 자체로
                    등치시켜 매핑이 곧 그래프 빌딩이 되는 구조로 설계, 별도 변환
                    레이어 없이 파일 업로드부터 GraphRAG 질의응답까지 단일
                    경로로 통합.
                  </li>
                  <li>
                    도메인 사용자에게 익숙한 엑셀 인터랙션을 그대로 두고 그 위에
                    매핑만 별도 시각 언어로 얹어, 새 도구 학습 없이 매핑
                    작업으로 진입 가능한 에디터 설계.
                  </li>
                </ul>
              </section>
              <section className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">
                  다중 패널 추적성 다이어그램
                </h4>
                <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                  <li>
                    부서별로 분산된 R&D 과정 전체를 단일 화면에서 추적하도록
                    가로 다중 패널 뷰 설계, 분석 대상 선택 시 관련 패널이 좌에서
                    우로 동시에 열리는 구조. 패널 간 노드 소유권을 사전에 분배해
                    동일 노드는 한 번만 렌더링하고 관계는 엣지로 표현.
                  </li>
                  <li>
                    행 추가 시 발생하는 노드 점프를 위치 보간 애니메이션으로
                    흡수해 시선 흐름 유지.
                  </li>
                </ul>
              </section>
            </ResumeProjectItem>

            <ResumeProjectItem
              title="디지털 트윈 연합 통합 포털"
              link="https://www.notion.so/jaeungkim/354c3276c40c800eaf1df6aa708079cc"
              description="과학기술정보통신부 「디지털 트윈 연합 핵심 기술 개발 사업」 3세부 통합 포털. 인증이 제각각이거나 부재한 외부 도구 11개와 연구기관 산출물을 단일 인증/권한/조직 레이어 위로 묶음. NestJS 백엔드, Next.js 15 프론트엔드, DB 스키마까지 단독 풀스택."
            >
              <section className="space-y-2">
                <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                  <li>
                    도메인 모듈 6개로 책임 격리, CRUD가 동일한 콘텐츠는 enum
                    기반 단일 엔티티로 통합 후 쓰기 권한만 타입별 분기.
                  </li>
                  <li>
                    JWT + RBAC 기반 인증을 NestJS 가드로 단일화하고, 토큰 모델은
                    DB 기반 Refresh Token Rotation으로 구성해 재사용 거부와
                    사용자 단위 일괄 무효화 지원.
                  </li>
                  <li>
                    인증 책임을 클라이언트 바깥으로 일관되게 분리: 토큰은
                    httpOnly 쿠키 전용으로 클라이언트 코드에서 다루지 않고 BFF
                    Route Handler가 서버 사이드에서만 NestJS로 프록시, 무인증
                    진입은 미들웨어에서 사전 차단해 보호 페이지 깜빡임 제거.
                  </li>
                  <li>
                    페이지별 렌더링 모드(SSR/SSG/ISR)를 표 기반으로 사전
                    결정하고, 서버 prefetch와 클라이언트 쿼리가 동일 키를
                    공유하도록 단일 키 팩토리로 진입점 강제. 캐시 무효화는
                    태그를 주 경로로, 시간 만료를 호출 누락 안전망으로 이중화.
                  </li>
                  <li>
                    외부 도구 11개를 iframe + 공통 EmbeddedApp으로 격리,
                    sandbox/allow/referrer를 registry에 선언화, 재시도는 강제
                    재마운트로 처리.
                  </li>
                </ul>
              </section>
            </ResumeProjectItem>

            <ResumeProjectItem
              title="이에이트 자사 디지털 트윈 제품군 (NAXiS, PMIS, EPC, NDX Cloud)"
              description="디지털 트윈 데이터 모델링, 시각화, 운영 도메인 5개 제품에 참여"
            >
              <section className="space-y-2">
                <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                  <li>
                    대규모 그래프 렌더링에서 노드 간 N:M 관계가 만드는 시각적
                    노이즈를 동일 관계의 그룹 노드 추상화로 해결, 화면당 엣지
                    수를 노드 수 증가에 무관하게 유지.
                  </li>
                  <li>
                    수천 행 규모 트리 뷰의 초기 진입 비용을 가시 영역 크기에
                    비례하도록 재구성, 지연 로딩과 가상 스크롤로 진입점을 분리해
                    초기 로딩 12초→2초.
                  </li>
                  <li>
                    RBAC 권한 모델을 단일 매트릭스로 추상화, 비개발자가 직접
                    운영 가능한 백오피스를 동반 설계해 운영 작업의 개발 의존
                    제거.
                  </li>
                  <li>
                    4천 장 단위 이미지 업로드의 병목을 메타데이터 파싱과 서버
                    경유 업로드로 분리 진단. APP1 마커만 부분 파싱하여 EXIF 추출
                    메모리 20GB→800MB, Presigned URL 기반 직접 업로드로 백엔드를
                    트래픽 경로에서 제거해 4천 장 처리 20분→10분.
                  </li>
                </ul>
              </section>
            </ResumeProjectItem>
          </div>
        </ResumeSectionItem>
      </div>

      <ResumeSectionItem period="2023.06 ~ 2023.10">
        <ResumeTitle>Flashee</ResumeTitle>
        <ResumeMeta location="밴쿠버, 캐나다" role="프론트엔드 개발자" />
        <ResumePills items={FLASHEE_PILLS} />
        <ResumeBullets items={FLASHEE_BULLETS} />
      </ResumeSectionItem>

      <ResumeSectionItem period="2022.07 ~ 2023.06">
        <ResumeTitle>iClinic Systems Inc.</ResumeTitle>
        <ResumeMeta location="밴쿠버, 캐나다" role="풀스택 개발자" />
        <ResumePills items={ICLINIC_PILLS} />
        <ResumeBullets items={ICLINIC_BULLETS} />
      </ResumeSectionItem>

      <ResumeSectionItem period="2021.01 ~ 2022.05">
        <ResumeTitle>Catalx Management Ltd.</ResumeTitle>
        <ResumeMeta location="밴쿠버, 캐나다" role="프론트엔드 개발자" />
        <ResumePills items={CATALX_PILLS} />
        <ResumeBullets items={CATALX_BULLETS} />
      </ResumeSectionItem>
    </>
  );
}
