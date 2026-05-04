import { Suspense } from "react";
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
                  동일한 팀 컨벤션을 따르도록 진입점 3종(
                  <code className="rounded bg-muted px-1 py-0.5 text-sm">
                    CLAUDE.md
                  </code>
                  ,{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-sm">
                    AGENTS.md
                  </code>
                  ,{" "}
                  <code className="rounded bg-muted px-1 py-0.5 text-sm">
                    .cursor/rules
                  </code>
                  )을 단일 워크플로 디렉토리로 라우팅, 도메인 워크플로 15개로
                  분리해 환각, 과도한 추상화, 컨벤션 표류, 검증 누락 4가지 실패
                  패턴을 시스템 레벨에서 차단
                </li>
              </ul>
            </section>

            <ResumeProjectItem
              title="현대자동차 R&D 데이터 통합 플랫폼"
              description="현대자동차 R&D 데이터를 온톨로지 지식 그래프로 통합하는 사내 플랫폼. PoC 거쳐 본사업 진입, 차량 7대 성능 영역 전 부서 확장을 목표로 샤시해석팀부터 도입. FE 전체 아키텍처, BE/AI/FE 공유 데이터 스키마, 지식 그래프 시각화 SDK 담당"
            >
              <section className="space-y-3">
                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    지식 그래프 시각화 SDK{" "}
                    <span className="font-normal text-muted-foreground">
                      (점진적 탐색 전제)
                    </span>
                  </h4>
                  <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">
                        시각화 가치 재정의
                      </span>
                      {": "}검색과 필터로 그래프를 점진적으로 탐색하는 사용
                      패턴을 전제로 시각화의 핵심 가치를 노드 수가 아닌 인터랙션
                      정밀도와 UX로 재정의, 한 화면 노드 수를 25개로 한정
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        통합 라이브러리 차용 거부
                      </span>
                      {": "}sigma.js 등 WebGL 기반 통합 라이브러리 검토 후 한정
                      노드 환경의 인터랙션 정밀도와 맞지 않다고 판단, 자체 SDK
                      구축으로 방향 전환
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        물리 위임과 직접 설계 영역 분리
                      </span>
                      {": "}물리 시뮬레이션은 D3-Force에 위임, 차별화가 필요한
                      렌더링과 상호작용 레이어만 직접 설계해 구현 자원을
                      정밀도에 집중
                    </li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    단일 데이터 스키마{" "}
                    <span className="font-normal text-muted-foreground">
                      (BE/AI/FE 공유, 변환 레이어 제거)
                    </span>
                  </h4>
                  <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">
                        3단 추상화로 팀 작업 단위 분리
                      </span>
                      {": "}Cell(cid), Entity, ParameterSet 3개 레이어를 정의해
                      FE의 표 렌더링과 매핑, AI의 의미 추론, BE의 DB 저장이 같은
                      JSON 위에서 각자의 레이어만 다루도록 책임 분리, API 명세
                      합의 비용 제거
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        양식 비표준성 흡수
                      </span>
                      {": "}셀 위치 변형은 셀 고유 ID(cid)로, 비표준 컬럼명은
                      컬럼명 자체를 Entity 키로 받아들이는 구조로 흡수해 사내
                      표준 양식 강제 없이도 매핑 정합성 유지, 동일 추상화를 PDF
                      등 비정형 입력에도 그대로 적용
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        Entity와 그래프 노드 등치
                      </span>
                      {": "}Entity 모델을 지식 그래프 노드 그 자체로 등치시켜
                      매핑이 곧 그래프 빌딩이 되는 구조로 설계, 파일 업로드부터
                      GraphRAG 질의응답까지 별도 변환 레이어 없이 단일 경로로
                      통합
                    </li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    엑셀 매핑 에디터{" "}
                    <span className="font-normal text-muted-foreground">
                      (관리자 정의, 사용자 입력 분리)
                    </span>
                  </h4>
                  <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">
                        익숙한 인터랙션 유지와 새 언어 분리
                      </span>
                      {": "}엑셀 단축키와 마우스 인터랙션(Ctrl+C/V/X,
                      Shift+클릭, Drag 영역 선택)을 그대로 유지하고, 새로
                      추가되는 매핑 작업만 색상과 Brush 모드, 자유 배치 앵커라는
                      별도 시각 언어로 분리
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        역할별 화면 분리
                      </span>
                      {": "}매핑 정의는 관리자, 값 입력은 일반 사용자가
                      담당하도록 동일 시스템 안에서 화면 단위로 책임 경계 분리,
                      매핑 한 번에 값 입력 N번 워크플로우 정착
                    </li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    다중 패널 추적성 다이어그램{" "}
                    <span className="font-normal text-muted-foreground">
                      (설계, 해석, 성능 흐름)
                    </span>
                  </h4>
                  <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">
                        노드 ownership 알고리즘
                      </span>
                      {": "}부서별로 분산된 R&D 과정을 단일 화면에서 추적하도록
                      가로 6열 다중 패널 뷰 설계, 패널 간 노드 소유권을 사전
                      분배해 동일 노드는 한 번만 렌더링하고 패널 간 관계는
                      엣지로 표현, 패널 수가 늘어도 시각 복잡도 유지
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        위치 보간 애니메이션
                      </span>
                      {": "}행 추가 시 발생하는 노드 점프를 D3 timer 기반 위치
                      보간으로 흡수해 시선 흐름 유지, 사용자 드래그 중에는
                      애니메이션 일시 정지로 조작 충돌 방지
                    </li>
                  </ul>
                </div>
              </section>
            </ResumeProjectItem>

            <ResumeProjectItem
              title="디지털 트윈 연합 통합 포털"
              description="과기정통부 「디지털 트윈 연합 핵심 기술 개발 사업」 3세부 과제. 인증과 권한이 제각각이거나 부재한 외부 도구 11개와 연구기관 산출물을 단일 인증, 권한, 조직 레이어로 묶음. NestJS, Next.js 15, DB 스키마까지 1인 풀스택"
            >
              <section className="space-y-3">
                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    통합 인증, 권한, 조직 레이어{" "}
                    <span className="font-normal text-muted-foreground">
                      (NestJS 백엔드 + Next.js BFF, 1인 풀스택)
                    </span>
                  </h4>
                  <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">
                        외부 도구 11개 단일 레이어 통합
                      </span>
                      {": "}인증이 부재이거나 제각각이던 외부 도구 11개와
                      연구기관 산출물을 단일 인증, 권한, 조직 레이어 아래로
                      묶음. NestJS 백엔드, Next.js 15 BFF, DB 스키마 설계까지
                      1인 풀스택으로 진행
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        도메인 6개 분리 + RBAC 글로벌 가드
                      </span>
                      {": "}인증, 사용자, 권한, 조직, 게시판, 공지 모듈로 책임
                      분리, RBAC를 NestJS 글로벌 가드로 단일화해 컨트롤러 단위
                      인증 코드 일괄 제거
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        토큰 BFF 경계 봉인
                      </span>
                      {": "}토큰을{" "}
                      <code className="rounded bg-muted px-1 py-0.5 text-sm">
                        httpOnly
                      </code>
                      쿠키 + Route Handler 서버 사이드 프록시로 봉인,
                      middleware에서 무인증 진입을 사전 차단해 클라이언트 토큰
                      노출과 보호 페이지 인증 체크 깜빡임 제거
                    </li>
                  </ul>
                </div>

                <div className="space-y-1.5">
                  <h4 className="text-sm font-semibold text-foreground">
                    렌더링과 캐시 전략{" "}
                    <span className="font-normal text-muted-foreground">
                      (TanStack Query + Next.js 캐시)
                    </span>
                  </h4>
                  <ul className="list-[circle] space-y-1.5 pl-5 text-sm leading-relaxed text-muted-foreground">
                    <li>
                      <span className="font-medium text-foreground">
                        정적 진입점 SSG
                      </span>
                      {": "}사용자별 차이 없는 도구 진입점, 가이드 문서를{" "}
                      <code className="rounded bg-muted px-1 py-0.5 text-sm">
                        force-static
                      </code>
                      으로 빌드 시점 정적 생성, CDN에서 즉시 서빙
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        공통 변경 콘텐츠 ISR 60s
                      </span>
                      {": "}공지사항처럼 모든 사용자가 같은 콘텐츠를 보는
                      페이지를 page-level{" "}
                      <code className="rounded bg-muted px-1 py-0.5 text-sm">
                        {`revalidate = 60`}
                      </code>
                      로 캐싱, 쓰기 Route Handler{" "}
                      <code className="rounded bg-muted px-1 py-0.5 text-sm">
                        {`revalidateTag('notices')`}
                      </code>
                      로 즉시 무효화 + 60s 만료 안전망 이중화
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        인증 트리 동적 SSR + 데이터 캐시 60s
                      </span>
                      {": "}부모 layout이{" "}
                      <code className="rounded bg-muted px-1 py-0.5 text-sm">
                        {`cookies()`}
                      </code>
                      를 읽는 어드민 트리는 동적 SSR로 동작, fetch 호출은{" "}
                      <code className="rounded bg-muted px-1 py-0.5 text-sm">
                        {`tags: ['admin-users']`}
                      </code>
                      60s 캐시로 백엔드 부하 완화
                    </li>
                    <li>
                      <span className="font-medium text-foreground">
                        서버 prefetch와 클라이언트 캐시 hydration
                      </span>
                      {": "}도메인별 query key factory로 서버{" "}
                      <code className="rounded bg-muted px-1 py-0.5 text-sm">
                        prefetchQuery
                      </code>
                      와 클라이언트{" "}
                      <code className="rounded bg-muted px-1 py-0.5 text-sm">
                        useQuery
                      </code>
                      가 동일 키 공유, HydrationBoundary로 hydrate해 초기 렌더
                      깜빡임 제거
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
                  <h4 className="text-sm font-semibold text-foreground">
                    NAXiS{" "}
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
                  <h4 className="text-sm font-semibold text-foreground">
                    PMIS{" "}
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
                  <h4 className="text-sm font-semibold text-foreground">
                    NDX Cloud{" "}
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
