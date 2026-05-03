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
                  개발자 경험 전반에 깊은 관심을 두고, 팀의 프론트엔드 개발
                  환경과 표준을 직접 설계하고 운영해옴.
                </li>
                <li>
                  모노레포, 디자인 시스템, 공용 UI 패키지, CI/CD 파이프라인,
                  Sentry 기반 운영 모니터링 같은 기본기를 구축해 팀이 같은
                  방식으로 일할 수 있는 토대를 마련 (빌드 환경 재구성으로 CI
                  시간 약 80% 단축).
                </li>
                <li>
                  AI 코딩 에이전트와의 협업까지 표준화. Claude Code와 Cursor
                  기반 협업 시스템(
                  <code className="rounded bg-muted px-1 py-0.5 text-sm">
                    .agent/workflows/
                  </code>
                  )을 직접 설계하고, 공개된 엔지니어링 원칙들을 agent-readable
                  룰로 재구성해 룰셋에 통합. AI가 생성한 코드가 처음부터 합의된
                  기준을 만족하도록 구조화.
                </li>
                <li>
                  사내 기술 세션과 외부 발표를 통해 표준과 도구를 팀 안팎으로
                  공유. NIPA 주관 GSMP 프로그램에 팀 대표로 선정되어 워싱턴 D.C.
                  현지 행사에서 글로벌 파트너 대상으로 발표.
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
                    사용자가 검색과 필터로 그래프를 점진적으로 탐색한다는 사용
                    패턴을 전제로, 시각화의 핵심 가치를 노드 수가 아니라
                    인터랙션 성능과 UX로 재정의.
                  </li>
                  <li>
                    sigma.js 등 WebGL 기반 대량 렌더링도 검토했으나, 통합형
                    그래프 라이브러리는 한정된 노드 수에서 인터랙션 품질을
                    정밀하게 다듬는 방향과 맞지 않다고 판단해 자체 SDK로 결정.
                  </li>
                  <li>
                    Neo4j Browser처럼 한 화면 노드 수를 약 25개로 한정. 물리
                    시뮬레이션은 D3-Force를 기반으로 두고 렌더링과 상호작용
                    레이어만 직접 설계해, 차별화가 필요한 영역에만 자체 구현을
                    집중.
                  </li>
                  <li>
                    사내 라이브러리로 분리되어 온톨로지 매핑 툴 NAXiS의 핵심
                    시각화 모듈로 채택, 팀 내 시각화 작업의 공통 기반으로 활용.
                  </li>
                </ul>
              </section>
              <section className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">
                  데이터 스키마와 매핑 에디터
                </h4>
                <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                  <li>
                    사용자가 올린 정형/비정형 파일(엑셀, PDF, PPT 등)을 AI가
                    단일 JSON 스키마로 구조화하도록 Entity 모델을 직접 정의.
                    Entity를 그래프 노드 그 자체로 등치해, 데이터를 온톨로지에
                    연결하는 매핑이 곧 그래프 빌딩이 되는 구조. 변환 레이어
                    없이 파일 업로드부터 GraphRAG 질의응답까지 단일 경로로
                    이어짐.
                  </li>
                  <li>
                    도메인 사용자에게 익숙한 엑셀 인터랙션은 그대로 두고 그
                    위에 매핑만 별도 시각 언어로 얹어, 새 도구 학습 없이 매핑
                    작업으로 진입할 수 있는 에디터를 직접 설계.
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
                    설계한 다이어그램. 흩어진 자료를 사용자가 직접 이어 흐름을
                    재구성하던 기존 작업을 시각화 모델로 대체, 현대차 R&D 사내
                    인증 도구로 채택.
                  </li>
                  <li>
                    6열 가로 레이아웃 기반 다중 패널 뷰 직접 설계. 분석 대상을
                    선택하면 관련 패널이 동시에 열리며 좌→우 흐름으로 비교
                    가능.
                  </li>
                  <li>
                    여러 패널이 동일 노드를 공유할 때 패널 간 노드 소유권을
                    사전에 분배해 한 노드를 한 번만 렌더링하고 관계는 엣지로
                    표현. 행 추가 시 발생하는 노드 점프는 위치 보간
                    애니메이션으로 흐름 유지.
                  </li>
                </ul>
              </section>
            </ResumeProjectItem>

            <ResumeProjectItem
              title="디지털 트윈 연합 통합 포털"
              description="과학기술정보통신부 「디지털 트윈 연합 핵심 기술 개발 사업」 3세부 통합 포털. 외부 디지털 트윈 도구 11개와 정부 연구기관(1세부 ETRI, 2세부 KETI) 산출물을 단일 환경에 묶음. NestJS 백엔드 6개 모듈과 Next.js 15 프론트엔드, DB 스키마까지 단독 풀스택."
            >
              <section className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">
                  NestJS 백엔드 6개 모듈
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  인증, 사용자, 권한, 조직, 게시판, 공지 6개 도메인 모듈로
                  책임을 분리하여 구성하였습니다. Refresh Token Rotation을 DB
                  기반으로 설계해 갱신 시 기존 토큰을 즉시 무효화하고, 같은
                  토큰으로 두 번째 갱신 시도가 들어오면 거부(replay 차단)하도록
                  하였으며, 로그아웃 시에는 사용자의 모든 refresh token을 일괄
                  무효화합니다. 가드 체인(ThrottlerGuard, JwtAuthGuard,
                  RolesGuard)을 글로벌로 적용하여 미인증 무차별 대입을
                  차단하였고, Role × Permission 기반 RBAC과 bcrypt cost 12,
                  응답에서 password 컬럼 제외 같은 기본기를 처음부터 일관되게
                  적용하였습니다.
                </p>
              </section>
              <section className="space-y-2">
                <h4 className="text-sm font-semibold text-foreground">
                  Next.js 15 렌더링 패턴
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Route Handler 17개를 NestJS 앞단의 BFF로 두고 쿠키 인증을
                  처리하여 클라이언트가 토큰을 직접 다루지 않도록 하였고, Server
                  Action은 로그인 한 군데(쿠키 설정과 redirect)로 한정하여 책임
                  경계를 단순화하였습니다.{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-sm">
                    middleware.ts
                  </code>
                  에서 미인증 사용자를 edge 단계에서{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-sm">
                    /signin
                  </code>
                  으로 리다이렉트하여 보호 페이지의 HTML이 도달하지 않도록
                  처리하였습니다. 공지 목록은{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-sm">
                    revalidate: 60
                  </code>
                  과{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-sm">
                    revalidateTag('notices')
                  </code>{" "}
                  하이브리드 ISR로 구성하고,{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-sm">
                    prefetchQuery
                  </code>
                  와{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-sm">
                    &lt;HydrationBoundary&gt;
                  </code>
                  로 서버에서 채워 보낸 뒤 같은 query key로 TanStack Query가
                  이어받아 서버와 클라이언트 캐시를 한 흐름으로 묶었습니다. 외부
                  도구 11개는 iframe으로 격리하고 공통 IframeContainer로 로딩,
                  타임아웃, 에러 UX를 통일하였으며, iframeKey 증가 기반의 강제
                  재마운트로 "재시도" UX를 제공합니다.
                </p>
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
