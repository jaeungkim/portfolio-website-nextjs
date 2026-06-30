import { Suspense } from "react";
import { ExternalLink } from "@/src/components/shared/ExternalLink";
import { ResumeSectionItem } from "@/src/app/(main)/resume/components/ResumeSectionItem";
import { ResumeTitle } from "@/src/app/(main)/resume/components/ResumeTitle";
import { ResumeMeta } from "@/src/app/(main)/resume/components/ResumeMeta";
import { ResumePills } from "@/src/app/(main)/resume/components/ResumePills";
import { ResumeBullets } from "@/src/app/(main)/resume/components/ResumeBullets";
import { ResumeProjectItem } from "@/src/app/(main)/resume/components/ResumeProjectItem";
import { ExperienceDurationPill } from "@/src/app/(main)/resume/components/ExperienceDurationPill";

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

const E8IGHT_PLATFORM_BULLETS = [
  {
    label: "공용 인프라 표준화",
    text: "모노레포, 공용 UI 패키지, Storybook 디자인 시스템, 공통 린트/i18n 템플릿, 앱별 브랜치 전략을 단일 표준으로 정립해 신규 프로젝트 셋업 비용 제거",
  },
  {
    label: "빌드 파이프라인 전환 주도",
    text: "CRA에서 Vite + Yarn Berry(PnP)로 전환하고 Jenkins/Docker CI/CD 도입, CI 빌드 10분 → 1~2분(약 80%↓)",
  },
  {
    label: "운영 가시성 확보",
    text: "Sentry를 사내 서버에 Self-Hosted로 구축해 분산 오류 로그를 중앙화하고 실시간 알림으로 장애 대응 시간 단축",
  },
  {
    label: "커밋 단계 품질 게이트",
    text: "husky와 lint-staged로 lint/format/type-check를 자동화하고 commitlint와 Conventional Commits로 PR 이전 일관성 확보",
  },
  {
    label: "AI 코딩 에이전트 개발 환경 구축",
    text: "커스텀 커맨드와 워크플로 15개, 역할별 서브에이전트와 스킬로 팀 컨벤션을 표준화하고, 검증과 컨벤션 가드레일로 에이전트 산출물의 일관성과 신뢰성 확보",
  },
];

const HYUNDAI_SDK_BULLETS = [
  "온톨로지 기반 지식 그래프(Knowledge Graph)를 탐색하고 편집하는 시각화 SDK로, 사내 GraphRAG 제품 전반이 공유하는 공통 기반으로 설계",
  {
    label: "재사용 아키텍처",
    text: "렌더링과 d3-force 시뮬레이션 코어를 UI 프레임워크와 분리해 단일 인터페이스로만 노출, React 외 환경에서도 데이터와 API만 연결하면 그대로 탑재",
  },
  {
    label: "렌더 타깃 선택",
    text: "수천 노드 규모에 맞춰 Canvas 2D를 채택하고, 매 프레임 바뀌는 좌표는 React 밖 엔진에서 갱신해 의미 있는 변화에서만 리렌더",
  },
  {
    label: "대규모 탐색",
    text: "수천 노드를 한 번에 펼치지 않고 핵심 노드에서 이웃으로 점진 확장하며, 화면 밖 노드 컬링과 라벨 캐싱, 부분 재배치로 부드러운 탐색 유지",
  },
];

const HYUNDAI_LLM_BULLETS = [
  {
    label: "스트리밍 수신",
    text: "WebSocket 이벤트를 텍스트, 추론 단계, 그래프 근거 타입별 핸들러로 처리하고, 몰려오는 청크는 한 프레임 단위로 모아 반영해 리렌더 최소화",
  },
  {
    label: "출력 제어",
    text: "수신과 표시를 분리해 토큰 큐를 타자기처럼 일정 속도로 드레인하되, 큐가 밀리면 자동 가속하고 중단이나 에러 시 현재까지의 답으로 즉시 스냅",
  },
  {
    label: "마크다운 안정화",
    text: "완성 구간(stable)과 진행 구간(tail)을 분리 파싱해 완성분만 마크다운(remark)으로 렌더, 닫히지 않은 코드 블록과 수식 깨짐 방지",
  },
  {
    label: "근거 추적",
    text: "GraphRAG로 그래프의 노드와 관계를 따라 답을 생성하고, 답변에 동봉된 그래프 쿼리로 '근거 보기' 시 해당 서브그래프를 옆 캔버스에 렌더해 출처를 추적",
  },
];

const HYUNDAI_MAPPING_BULLETS = [
  {
    label: "이종 양식 흡수",
    text: "양식이 제각각인 엑셀을 단일 매핑 모델로 받아 처음 보는 양식도 코드 변경 없이 온톨로지 엔티티로 구조화",
  },
  {
    label: "정확도를 구조로 보장",
    text: "단계별 검증과 미리보기, 중복 제거를 내장해 100% 정확도가 필요한 매핑에서 사용자 실수를 구조적으로 차단",
  },
  {
    label: "도입 비용 최소화",
    text: "기성 그리드 없이 직접 구현하되 조작감은 엑셀과 동일하게 맞추고, 정의한 양식은 템플릿으로 저장해 반복 비용 제거",
  },
];

const DIGITAL_TWIN_BULLETS = [
  {
    label: "렌더링 전략",
    text: "라우트 성격에 따라 SSG, ISR, SSR을 구분 적용하고, 인증이 필요한 페이지는 동적 렌더로 강제해 사용자별 응답이 정적 캐시에 섞이지 않게 격리",
  },
  {
    label: "데이터 흐름",
    text: "서버 컴포넌트(RSC)에서 prefetch한 데이터를 dehydrate해 클라이언트 TanStack Query 캐시로 hydration, 첫 화면을 로딩 상태 없이 렌더하고 이후 갱신은 클라이언트 쿼리가 이어받음",
  },
  {
    label: "BFF 보안 경계",
    text: "Next.js BFF가 토큰을 HttpOnly 쿠키로만 들고 백엔드에 Bearer로 중계하도록 설계해 XSS가 나도 토큰이 노출되지 않게 처리(OWASP 권고)",
  },
  {
    label: "토큰 도난 방어",
    text: "access(15분)와 refresh(7일)를 분리하고 그 위에 토큰 회전, 재사용 탐지, 동시 갱신 요청 병합, 비밀번호 변경 시 전 토큰 무효화 적용",
  },
  {
    label: "전역 가드와 무중단 인증",
    text: "JWT 검증과 RBAC를 APP_GUARD로 전역 등록해 신규 컨트롤러에서도 인증 누락 불가, 토큰 만료 시 서버는 로그인 이동, 클라이언트는 인터셉터 자동 갱신으로 흐름 유지",
  },
  {
    label: "단일 이미지 다중 환경",
    text: "보안 설정을 환경 변수로 게이트해 같은 배포 이미지 하나로 HTTPS 운영과 내부망 HTTP를 모두 대응",
  },
];

const NAXIS_BULLETS = [
  {
    label: "코드 없이 온톨로지를 직접 만드는 에디터를 React Flow 위에 0에서 구축",
    text: "viewport와 이벤트 같은 인프라만 라이브러리에 위임하고, 엔티티 타입과 관계, 직렬화 같은 도메인 로직은 직접 추상화해 라이브러리 업데이트와 도메인 변경의 영향 범위를 분리",
  },
  "한 노드에 엣지가 수백 개 몰리는 시각 복잡도를 관계 그룹 노드로 압축하고, 커스텀 SVG 엣지로 동일 관계를 자동 병합",
  {
    label: "레이아웃 통제",
    text: "Dagre를 차용하되 호출 시점과 입출력을 직접 통제하고, 펼침과 접힘 시 전체 대신 부분 재배치로 인터랙션 비용 일정 유지",
  },
  "사내 여러 제품이 공유하는 공통 컴포넌트 자산으로 정착",
];

const PMIS_BULLETS = [
  "수천 행 트리를 하위 노드 플래그 기반 lazy load와 가상 스크롤(react-window)로 재설계해 초기 로딩 12초 → 2초(약 80%↓)",
  "직렬로 처리되던 도면 업로드를 프론트에서 mutateAsync와 Promise.all로 병렬화해 19장 4분 → 20초, 주요 인터랙션은 Optimistic UI와 롤백으로 즉시 피드백",
];

const NDX_CLOUD_BULLETS = [
  {
    label: "역할 기반 접근 제어를 화면 레벨로 일관화",
    text: "4단 계층 권한(조직/프로젝트/사이트/데이터셋)을 단일 RBAC 매트릭스로 추상화",
  },
  {
    label: "4천 장 이미지 업로드 병목을 두 축으로 해결",
    text: "JPEG APP1 마커만 부분 파싱해 EXIF 추출 메모리 20GB → 800MB, Presigned URL로 브라우저-S3 직접 업로드해 처리 20분 → 10분, 서버 부하 70%↓",
  },
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
                프론트엔드 플랫폼 아키텍처 구축 및 전사 표준화
              </h3>
              <ResumeBullets items={E8IGHT_PLATFORM_BULLETS} />
            </section>

            <ResumeProjectItem
              title="현대차 R&D 데이터 통합 플랫폼"
              link="https://www.notion.so/jaeungkim/R-D-354c3276c40c805a88a9f4469e9189c3"
              description="현대차 R&D 데이터를 온톨로지 기반 지식 그래프로 통합하는 사내 플랫폼. FE 전체 아키텍처를 주도하며 지식 그래프 시각화 SDK, LLM 채팅, 매핑 에디터를 직접 설계하고 구현."
            >
              <section className="space-y-3">
                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    대규모 지식 그래프 시각화 SDK
                  </h4>
                  <ResumeBullets items={HYUNDAI_SDK_BULLETS} />
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    LLM 채팅과 지식 그래프 연동
                  </h4>
                  <ResumeBullets items={HYUNDAI_LLM_BULLETS} />
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    엑셀 매핑 에디터
                  </h4>
                  <ResumeBullets items={HYUNDAI_MAPPING_BULLETS} />
                </div>
              </section>
            </ResumeProjectItem>

            <ResumeProjectItem
              title="디지털 트윈 연합 통합 포털"
              link="https://www.notion.so/jaeungkim/354c3276c40c800eaf1df6aa708079cc"
              description="정부 R&D 사업 통합 포털을 1인 풀스택으로 단독 설계 및 구현. 단일 인증/권한/조직 모델 위에 운영 셸을 구축하고, Next.js 15 App Router FE부터 NestJS BE까지 전 영역을 일정 내 담당."
            >
              <ResumeBullets items={DIGITAL_TWIN_BULLETS} />
            </ResumeProjectItem>

            <ResumeProjectItem
              title="자사 제품군 (NAXiS, PMIS, NDX Cloud 등)"
              description="자사 제품 5개의 프론트엔드에 참여."
            >
              <section className="space-y-3">
                <div className="space-y-1.5">
                  <h4 className="flex flex-wrap items-baseline gap-x-1 gap-y-1 text-sm font-semibold text-foreground">
                    <ExternalLink
                      link="https://www.notion.so/jaeungkim/NAXiS-356c3276c40c80b6bd65c6fada81f741"
                      className="inline-flex items-baseline align-baseline text-sm leading-relaxed"
                    >
                      NAXiS
                    </ExternalLink>
                    <span className="font-normal text-muted-foreground">
                      (온톨로지 모델링 도구)
                    </span>
                  </h4>
                  <ResumeBullets items={NAXIS_BULLETS} />
                </div>

                <div className="space-y-1.5">
                  <h4 className="flex flex-wrap items-baseline gap-x-1 gap-y-1 text-sm font-semibold text-foreground">
                    <ExternalLink
                      link="https://www.notion.so/jaeungkim/NDXPRO-PMIS-1d4c3276c40c809ca6dad49c9ce5f1b4"
                      className="inline-flex items-baseline align-baseline text-sm leading-relaxed"
                    >
                      PMIS
                    </ExternalLink>
                    <span className="font-normal text-muted-foreground">
                      (프로젝트 일정과 자원 관리 솔루션)
                    </span>
                  </h4>
                  <ResumeBullets items={PMIS_BULLETS} />
                </div>

                <div className="space-y-1.5">
                  <h4 className="flex flex-wrap items-baseline gap-x-1 gap-y-1 text-sm font-semibold text-foreground">
                    <ExternalLink
                      link="https://www.notion.so/jaeungkim/NDX-CLOUD-24bc3276c40c80b4afcef5f74478cbb5"
                      className="inline-flex items-baseline align-baseline text-sm leading-relaxed"
                    >
                      NDX Cloud
                    </ExternalLink>
                    <span className="font-normal text-muted-foreground">
                      (대용량 이미지 클라우드 플랫폼)
                    </span>
                  </h4>
                  <ResumeBullets items={NDX_CLOUD_BULLETS} />
                </div>
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
