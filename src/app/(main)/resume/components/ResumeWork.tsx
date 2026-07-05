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
  "모노레포, 공용 UI 패키지, Storybook 디자인 시스템, 린트/i18n 템플릿, 브랜치 전략을 단일 표준으로 통합해 신규 프로젝트 셋업 비용 제거",
  "CRA에서 Vite + Yarn Berry(PnP)로 전환하고 Jenkins/Docker CI/CD를 도입해 CI 빌드 10분 → 1~2분(약 80%↓)",
  "Sentry를 사내 서버에 Self-Hosted로 구축해 분산 오류 로그를 중앙화하고 실시간 알림으로 장애를 즉시 감지",
  "커밋 단계 검증 기준이 없던 프론트엔드팀에 husky, lint-staged, commitlint로 lint/format/type-check와 커밋 규칙을 강제하는 품질 게이트를 직접 수립",
  "커스텀 커맨드와 워크플로 15개, 역할별 서브에이전트와 스킬, 검증 가드레일을 구축해 AI 활용이 예외가 아닌 기본값이 되는 AI-Native 개발 환경으로 확장 중",
];

const HYUNDAI_SDK_BULLETS = [
  "사내 GraphRAG 제품들이 공통으로 사용하는 지식 그래프 시각화 SDK 설계 및 개발. 렌더링과 d3-force 레이아웃 엔진을 React에 의존하지 않는 코어로 분리해 여러 제품에서 재사용",
  "구현 타입을 감춘 명령형 핸들 하나로 엔진을 노출해, 내부 구조를 바꿔도 사용처가 깨지지 않는 안정적 API와 코어 단독 테스트 환경 확보",
  "DOM 대신 Canvas 2D 직접 렌더링, 움직임이 있을 때만 다시 그리고 멈춰 있을 땐 렌더링을 멈추는 방식으로 불필요한 연산 제거",
  "라벨을 이미지로 캐싱해 재사용하고 크게 확대되면 직접 그리기로 전환하는 하이브리드 렌더링으로 텍스트 성능과 선명도 개선",
  "자주 바뀌는 상태를 React 밖에서 관리하고 데이터가 실제로 바뀔 때만 갱신을 전파하도록 구성해, 대형 목록의 불필요한 리렌더 차단",
  "노드를 한 번에 불러오지 않고 이웃 단위로 점진 확장, 요청이 겹치면 이전 요청은 취소하고 늦게 온 응답은 버려 항상 최신 결과만 반영",
];

const HYUNDAI_LLM_BULLETS = [
  "WebSocket 이벤트를 텍스트, 추론 단계, 그래프 근거 타입별 핸들러로 분리 처리하고, 몰려오는 청크는 한 프레임 단위로 모아 반영해 리렌더 최소화",
  "수신과 표시를 분리해 토큰 큐를 타자기처럼 일정 속도로 드레인하되, 큐가 밀리면 자동 가속하고 중단이나 에러 시 현재까지의 답으로 즉시 스냅",
  "완성 구간과 진행 구간을 분리 파싱해 완성분만 마크다운으로 렌더, 닫히지 않은 코드 블록과 수식 깨짐 방지",
  "GraphRAG로 그래프의 노드와 관계를 따라 답변을 생성하고, 답변에 동봉된 그래프 쿼리로 '근거 보기' 시 서브그래프를 옆 캔버스에 렌더해 출처 추적",
];

const HYUNDAI_MAPPING_BULLETS = [
  "양식이 제각각인 엑셀을 단일 매핑 모델로 받아 처음 보는 양식도 코드 변경 없이 온톨로지 엔티티로 구조화",
  "단계별 검증과 미리보기, 중복 제거를 내장해 100% 정확도가 필요한 매핑에서 사용자 실수를 구조적으로 차단",
  "기성 그리드 없이 직접 구현하되 조작감은 엑셀과 동일하게 맞추고, 정의한 양식은 템플릿으로 저장해 반복 비용 제거",
];

const DIGITAL_TWIN_BULLETS = [
  "라우트 성격에 따라 SSG, ISR, SSR을 구분 적용하고, 인증이 필요한 페이지는 동적 렌더로 강제해 정적 캐시 오염 차단",
  "서버 컴포넌트에서 prefetch한 데이터를 dehydrate해 클라이언트 TanStack Query 캐시로 hydration, 첫 화면은 로딩 없이 렌더하고 이후 갱신은 클라이언트 쿼리가 이어받음",
  "Next.js BFF가 토큰을 HttpOnly 쿠키로만 보관하고 백엔드에는 Bearer로 중계해 XSS가 나도 토큰이 노출되지 않게 처리",
  "토큰 도난을 방어하기 위해 access와 refresh를 분리하고, 토큰 회전과 재사용 탐지, 동시 갱신 요청 병합, 비밀번호 변경 시 전 토큰 무효화까지 적용",
  "JWT 검증과 RBAC를 APP_GUARD로 전역 등록해 신규 컨트롤러에서도 인증 누락 불가, 토큰 만료 시 서버는 로그인 이동, 클라이언트는 인터셉터 자동 갱신으로 흐름 유지",
  "보안 설정을 환경 변수로 게이트해 같은 배포 이미지 하나로 HTTPS 운영과 내부망 HTTP를 모두 대응",
];

const NAXIS_BULLETS = [
  "코드 없이 온톨로지를 만드는 에디터를 React Flow 위에서 구축하며, viewport와 이벤트 같은 인프라는 라이브러리에 위임하고 엔티티 타입, 관계, 직렬화 같은 도메인 로직은 직접 추상화해 라이브러리 업데이트와 도메인 변경의 영향 범위 분리",
  "한 노드에 엣지가 수백 개 몰리는 시각 복잡도를 관계 그룹 노드로 압축하고, 커스텀 SVG 엣지로 동일 관계 자동 병합",
  "Dagre를 차용하되 호출 시점과 입출력은 직접 통제하고, 펼침과 접힘 시 부분 재배치로 인터랙션 비용 유지",
  "도메인 로직을 라이브러리와 분리해 둔 덕분에 별도 수정 없이 사내 여러 제품에 채택되어 공통 컴포넌트 자산으로 정착",
];

const PMIS_BULLETS = [
  "수천 행 트리를 하위 노드 플래그 기반 lazy load와 가상 스크롤로 재설계해 초기 로딩 12초 → 2초(약 80%↓)",
  "직렬 처리되던 도면 업로드를 mutateAsync와 Promise.all로 병렬화해 19장 4분 → 20초, Optimistic UI와 롤백으로 즉시 피드백",
];

const NDX_CLOUD_BULLETS = [
  "4단 계층 권한(조직/프로젝트/사이트/데이터셋)을 단일 RBAC 매트릭스로 추상화해 화면 레벨까지 일관된 접근 제어",
  "4천 장 이미지 업로드 병목을 두 축으로 해결, EXIF 추출은 JPEG APP1 마커만 파싱해 메모리 20GB → 800MB, 업로드는 Presigned URL로 브라우저-S3 직접 연결해 20분 → 10분, 서버 부하 70%↓",
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
                    지식 그래프 시각화 SDK
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
              description="정부 R&D 사업 통합 포털을 1인 풀스택으로 단독 설계 및 구현. 단일 인증/권한/조직 모델 위에 운영 셸을 구축하고, Next.js 15 App Router FE부터 NestJS BE까지 전 영역을 일정 내 완결."
            >
              <ResumeBullets items={DIGITAL_TWIN_BULLETS} />
            </ResumeProjectItem>

            <ResumeProjectItem
              title="자사 제품군 (NAXiS, PMIS, NDX Cloud 등)"
              description="자사 제품 5개의 프론트엔드 개발을 주도."
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
