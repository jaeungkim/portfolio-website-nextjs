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
                프론트엔드 플랫폼 아키텍처 구축 및 표준화
              </h3>
              <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                <li>
                  <span className="font-medium text-foreground">
                    공용 인프라 통합
                  </span>
                  {": "}모노레포 아키텍처, 공용 UI 패키지, Storybook 기반 디자인
                  시스템, i18n과 Prettier/ESLint를 포함한 공통 템플릿, 앱별
                  브랜치 전략을 정립해 매 신규 프로젝트가 반복 작성하던 기반을
                  단일 표준으로 일원화
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    빌드 파이프라인 재구성
                  </span>
                  {": "}Jenkins와 Docker 기반 CI/CD 도입, 기존 Create React App
                  환경을 Vite와 Yarn Berry(PnP)로 전환해 Docker 기반 CI 빌드
                  시간 10분 → 1~2분 으로 약 80% 단축
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    운영 가시성 확보
                  </span>
                  {": "}Sentry를 사내 리눅스 서버에 Self-Hosted로 구축, 분산
                  운영되던 오류 로그를 중앙 집중화하고 실시간 알림으로 장애 대응
                  속도 향상
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    커밋 단계 품질 게이트
                  </span>
                  {": "}husky pre-commit hook과 lint-staged로 lint, format,
                  type-check를 커밋 진입점에서 자동 실행, commitlint와
                  Conventional Commits 규약을 적용해 PR 이전 단계에서 코드
                  품질과 커밋 메시지의 일관성을 결정적으로 보장
                </li>
                <li>
                  <span className="font-medium text-foreground">
                    AI 코딩 에이전트 협업 시스템 설계
                  </span>
                  {": "}Claude Code, Cursor, OpenAI Codex 어느 도구로 진입해도
                  동일한 팀 컨벤션을 따르도록 진입점 3종(CLAUDE.md, AGENTS.md,
                  .cursor/rules)을 단일 워크플로 디렉토리로 라우팅, 도메인
                  워크플로 15개로 분리해 환각, 과도한 추상화, 컨벤션 표류, 검증
                  누락 4가지 실패 패턴을 시스템 레벨에서 차단
                </li>
              </ul>
            </section>

            <ResumeProjectItem
              title="현대자동차 R&D 데이터 통합 플랫폼"
              link="https://www.notion.so/jaeungkim/R-D-354c3276c40c805a88a9f4469e9189c3"
              description="부서마다 엑셀과 PDF로 흩어져 있던 차량 개발 데이터를 단일 온톨로지 지식 그래프로 통합하는 사내 플랫폼. PoC를 거쳐 섀시 해석팀 본사업에 진입, 7개 차량 성능 영역 전 부서로 단계적 확장 중. FE 전체 아키텍처를 주도하고 BE, AI, FE 공유 데이터 스키마와 지식 그래프 시각화 SDK를 직접 설계하고 구현."
            >
              <section className="space-y-3">
                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    지식 그래프 시각화 SDK
                  </h4>
                  <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">
                        렌더링과 인터랙션 제어권 내재화
                      </span>
                      {": "}WebGL 통합 라이브러리가 25노드 점진 탐색에 필요한
                      인터랙션 정밀도를 못 맞춰, 렌더링과 상태, 인터랙션
                      제어권을 내부에 둔 자체 SDK로 전환. 커스터마이징 비용 누적
                      구조 제거
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        위임과 직접 구현 경계 분리
                      </span>
                      {": "}레이아웃 안정성은 검증된 물리 시뮬레이션
                      라이브러리에 위임, 도메인 차별화가 필요한 렌더링과
                      인터랙션만 Canvas로 직접 구현. SDK가 안는 복잡도를 통제
                      가능한 범위로 한정
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        고빈도 좌표를 React 트리에서 분리
                      </span>
                      {": "}시뮬레이션 좌표는 SDK 내부에서 관리하고 React에는
                      노드 선택 같은 의미 있는 변화만 콜백으로 노출. 노드 수가
                      늘어도 매 프레임 리렌더 없이 인터랙션 응답성 유지
                    </li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    BE/AI/FE 공유 데이터 스키마
                  </h4>
                  <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">
                        세 팀 공통 JSON 스키마 설계
                      </span>
                      {": "}부서별 엑셀 데이터를 BE, AI, FE가 같은 JSON 위에서
                      다루도록 공통 형식으로 정의. 팀 사이 데이터 명세를 별도로
                      합의하는 비용 제거
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        컬럼 구조와 타입 매핑을 같은 JSON에 통합
                      </span>
                      {": "}부서가 엑셀에 정의한 컬럼명을 그대로 키로 받고, 타입
                      매핑도 동일한 JSON 안에 포함. 표준 양식을 강제하지 않고
                      부서별 양식 차이를 흡수, PDF 같은 비정형 입력에도 같은
                      모델로 확장
                    </li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    엑셀 매핑 에디터
                  </h4>
                  <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">
                        기존 엑셀 인터랙션 유지
                      </span>
                      {": "}R&D 엔지니어 적응 비용을 없애도록 단축키와 마우스
                      인터랙션은 엑셀 그대로 유지. 매핑이라는 신규 작업만 색상과
                      브러시 같은 별도 시각 레이어로 분리해 기존 동작과 충돌
                      없이 흡수
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        관리자와 사용자 책임 분리
                      </span>
                      {": "}매핑 정의는 관리자가 1회로 끝내고 값 입력은 일반
                      사용자가 N회 반복하도록 화면 단위 책임 분리. 일반 사용자가
                      매핑 개념을 몰라도 동작해, 도입 비용이 사용자 모수에
                      비례하지 않음
                    </li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    다중 패널 추적성 다이어그램
                  </h4>
                  <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">
                        패널 간 노드 소유권 사전 분배
                      </span>
                      {": "}차량 단위로 설계, 해석, 성능까지 이어지는
                      워크플로우를 한 화면에서 따라가도록 가로 다중 패널 설계.
                      공유 노드는 한 번만 그리고 관계는 엣지로 풀어내 패널 수가
                      늘어도 시각 복잡도가 일정하게 유지
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        위치 보간으로 추적성 유지
                      </span>
                      {": "}노드 위치 점프가 추적성의 본질을 깬다고 판단해 위치
                      보간으로 부드럽게 처리. 사용자 드래그 중에는 자동 이동을
                      멈춰 수동 조작과 자동 보정 충돌 방지
                    </li>
                  </ul>
                </div>
              </section>
            </ResumeProjectItem>

            <ResumeProjectItem
              title="디지털 트윈 연합 통합 포털"
              link="https://www.notion.so/jaeungkim/354c3276c40c800eaf1df6aa708079cc"
              description="정부 R&D 「디지털 트윈 연합 핵심 기술 개발 사업」 3세부 통합 포털을 1인 풀스택으로 설계. 1세부(ETRI), 2세부(KETI), 3세부 산출물이 단일 인증, 권한, 조직 모델 위에서 동작하는 통합 운영 환경을 구축. Next.js 15 App Router 기반 프론트엔드부터 NestJS 백엔드, 인증/인가 시스템까지 아키텍처 설계와 구현을 단독 담당."
            >
              <section className="space-y-3">
                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    <ExternalLink
                      link="https://www.notion.so/35ec3276c40c814a8783c59bed9581f4"
                      className="inline-flex items-baseline align-baseline text-sm leading-relaxed"
                    >
                      Next.js 15 App Router 렌더링 정책 단일화
                    </ExternalLink>
                  </h4>
                  <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">
                        라우트별 렌더링 전략 분리
                      </span>
                      {": "}SSG, ISR, SSR을 라우트 단위로 명시. 데이터 변경 시
                      태그 기반 캐시 무효화로 페이지 최신성 보장
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        권한 페이지 캐시 격리
                      </span>
                      {": "}인증이 필요한 레이아웃에서 쿠키를 읽도록 강제해,
                      사용자별 응답이 정적 캐시에 섞이는 경로를 차단
                    </li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    Next.js BFF ↔ NestJS 통신 경계 설계
                  </h4>
                  <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">
                        BFF 통신 경로 이원화
                      </span>
                      {": "}서버 렌더링 경로와 클라이언트 요청 경로를 책임 분리.
                      토큰 만료 시 서버 경로는 자동 로그인 페이지 이동,
                      클라이언트 경로는 인터셉터에서 토큰을 자동 갱신해 사용자
                      흐름이 끊기지 않도록 설계
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        서버/클라이언트 캐시 동기화
                      </span>
                      {": "}서버 페이지 캐시와 클라이언트 화면 캐시를 BFF 한
                      곳에서 함께 무효화. 한 번의 데이터 변경으로 양쪽 레이어가
                      동시 갱신되도록 설계
                    </li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    <ExternalLink
                      link="https://www.notion.so/35ec3276c40c816e81c8ca38ab182675"
                      className="inline-flex items-baseline align-baseline text-sm leading-relaxed"
                    >
                      NestJS 인증/인가 보안 시스템 설계
                    </ExternalLink>
                  </h4>
                  <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">
                        전역 가드 체인 구성
                      </span>
                      {": "}요청 빈도 제한, JWT 검증, 역할 기반 권한
                      체크(RBAC)를 전역 가드로 일괄 적용. 로그인은 별도 빈도
                      제한, 동일 출처 검증으로 CSRF 차단
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        HttpOnly 쿠키 기반 토큰 격리
                      </span>
                      {": "}인증 토큰을 브라우저 자바스크립트가 접근할 수 없는
                      HttpOnly 쿠키에 보관, BFF 내부 경로에서만 백엔드 인증
                      헤더로 변환. Refresh Token Rotation으로 토큰 재사용 시도
                      무효화
                    </li>
                  </ul>
                </div>
              </section>
            </ResumeProjectItem>

            <ResumeProjectItem
              title="이에이트 자사 디지털 트윈 제품군 (NAXiS, PMIS, NDX Cloud 등)"
              description="디지털 트윈 데이터 모델링, 시각화, 운영 도메인 5개 제품에 참여"
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
                      (NGSI-LD 기반 온톨로지 비주얼 모델링 도구)
                    </span>
                  </h4>
                  <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">
                        관계 단위 시각 추상화
                      </span>
                      {": "}수백 개 자식 엔티티가 만드는 엣지 폭증을 동일 관계
                      그룹 노드로 압축, 사용자 인지 단위를 개별 노드에서 관계
                      그룹으로 전환
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        차용과 자체 설계의 경계 분리
                      </span>
                      {": "}React Flow는 viewport와 이벤트 인프라로만 위임,
                      도메인 시각 추상화는 customNode와 customEdge 위에 직접
                      구축
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        엣지 시각화 시스템 자체 구축
                      </span>
                      {": "}동일 타겟과 레이블의 엣지를 렌더 단계에서 자동
                      병합하고 카운트 표기, 조상 기준 색상과 점선 애니메이션으로
                      관계의 방향성과 위계 시각화
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        레이아웃 비용 제어
                      </span>
                      {": "}Dagre 직접 통합 후 호출 시점과 입출력 통제, 그룹
                      펼침과 접힘 시 전체 재배치 대신 부분 재배치로 한정해
                      인터랙션 비용 최소화
                    </li>
                  </ul>
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
                      (공정과 시공 통합 관리 솔루션)
                    </span>
                  </h4>
                  <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">
                        대규모 트리 진입 비용 재설계
                      </span>
                      {": "}수천 행 WBS 트리의 일괄 로드를 하위 노드 플래그 기반
                      lazy load와 가상 스크롤로 교체, 초기 로딩 12초 → 2초로
                      단축
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        선언형 데이터 흐름 도입
                      </span>
                      {": "}인터랙션 빈도와 지연 허용도에 따라 동기화 전략 분기,
                      빈번한 트리 조작은 Optimistic UI와 롤백으로, 페이지 진입은
                      Suspense 기반 병렬 로딩으로 책임 분리
                    </li>
                  </ul>
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
                      (드론과 지상 영상 기반 사진측량 클라우드 플랫폼)
                    </span>
                  </h4>
                  <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">
                        권한 모델 화면 단일화
                      </span>
                      {": "}조직, 프로젝트, 사이트, 데이터셋 4단 계층 권한을
                      단일 RBAC 매트릭스로 추상화, 역할 기반 노출과 접근 제어를
                      화면 레벨로 일관화
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        대용량 업로드 파이프라인 재구성
                      </span>
                      {": "}4천 장 업로드 병목을 메타데이터 파싱과 서버 경유 두
                      축으로 분리 진단, JPEG APP1 마커 부분 파싱으로 EXIF 추출
                      메모리 20GB → 800MB, Presigned URL 기반 브라우저-S3 직접
                      업로드로 전체 처리 20분 → 10분 단축
                    </li>
                  </ul>
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
