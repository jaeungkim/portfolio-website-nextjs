import ExternalLink from "@/src/components/shared/ExternalLink";
import Pill from "@/src/components/shared/Pill";

export default function ResumeProject() {
  return (
    <>
      <div className="font-semibold text-foreground text-3xl uppercase">
        Projects
      </div>

      {/* React Gantt Chart */}
      <article className="mt-8 md:grid md:grid-cols-4 md:gap-4">
        <div className="flex items-start mb-2 md:mb-0">
          <ExternalLink
            additionalClassName="text-xl text-muted-foreground hover:text-foreground"
            link="https://jaeungkim.com/gantt-chart"
          >
            React Gantt Chart
          </ExternalLink>
        </div>
        <div className="space-y-2 col-span-3">
          <ul className="text-base pl-4 list-disc space-y-2 text-muted-foreground">
            <li>
              수천 개 Task 데이터를 Virtualization 및 Lazy Loading 아키텍처로
              렌더링 성능 40% 개선한 오픈소스 Gantt Chart 라이브러리
            </li>
            <li>
              WBS 기반 프로젝트 관리 아키텍처 설계 및 Optimistic UI 패턴을 통한
              실시간 구조/일정 수정 시스템 구축
            </li>
            <li>
              확장 가능한 플러그인 아키텍처와 경량화 설계로 실무 환경에서 활용
              중이며, 커뮤니티 피드백을 반영한 지속적 개선
            </li>
          </ul>
          <div className="flex flex-wrap gap-1 pl-4">
            <Pill name="React" />
            <Pill name="Vite" />
            <Pill name="Zustand" />
          </div>
        </div>
      </article>

      {/* Portfolio Website */}
      <article className="mt-8 md:grid md:grid-cols-4 md:gap-4">
        <div className="flex items-start mb-2 md:mb-0">
          <ExternalLink
            additionalClassName="text-xl text-muted-foreground hover:text-foreground"
            link="https://github.com/jaeungkim/portfolio-website-nextjs"
          >
            Portfolio Website
          </ExternalLink>
        </div>
        <div className="space-y-2 col-span-3">
          <ul className="text-base pl-4 list-disc space-y-2 text-muted-foreground">
            <li>
              Next.js App Router와 SSG를 활용한 정적 사이트 아키텍처 설계 및
              프로젝트/기술 블로그 통합 관리 시스템
            </li>
            <li>
              WebGL과 Three.js를 활용한 3D 인터랙션 아키텍처 설계 및 렌더링 성능
              최적화
            </li>
            <li>
              이미지 최적화 전략 및 반응형 디자인 아키텍처를 통한 성능 최적화 및
              사용자 경험 개선
            </li>
          </ul>
          <div className="flex flex-wrap gap-1 pl-4">
            <Pill name="Next 15 (App)" />
            <Pill name="Tailwind CSS" />
            <Pill name="GSAP" />
            <Pill name="Framer Motion" />
            <Pill name="Three.js" />
          </div>
        </div>
      </article>

      {/* BC Government */}
      <article className="mt-8 md:grid md:grid-cols-4 md:gap-4">
        <div className="flex items-start mb-2 md:mb-0">
          <ExternalLink
            additionalClassName="text-xl text-muted-foreground hover:text-foreground"
            link="https://github.com/jaeungkim/moti-is24-code-challenge"
          >
            BC Government
          </ExternalLink>
        </div>
        <div className="space-y-2 col-span-3">
          <ul className="text-base pl-4 list-disc space-y-2 text-muted-foreground">
            <li>
              BC 주정부 IS24 Full Stack Competition 과제로 개발한 직원 관리
              시스템 아키텍처 설계
            </li>
            <li>
              조직 계층 구조 관리를 위한 데이터 모델 설계 및 효율적인 UI/UX
              아키텍처 구현
            </li>
            <li>
              React 프론트엔드, Node.js 백엔드, PostgreSQL 데이터베이스 아키텍처
              설계 및 Docker 기반 컨테이너화 배포
            </li>
          </ul>
          <div className="flex flex-wrap gap-1 pl-4">
            <Pill name="React" />
            <Pill name="Tailwind CSS" />
            <Pill name="Node.js" />
            <Pill name="Express.js" />
            <Pill name="MongoDB" />
            <Pill name="Docker" />
          </div>
        </div>
      </article>

      {/* Lost Ark Discord Bot */}
      <article className="mt-8 md:grid md:grid-cols-4 md:gap-4">
        <div className="flex items-start mb-2 md:mb-0">
          <ExternalLink
            additionalClassName="text-xl text-muted-foreground hover:text-foreground"
            link="https://github.com/jaeungkim/lostark_bot"
          >
            Lost Ark Discord Bot
          </ExternalLink>
        </div>
        <div className="space-y-2 col-span-3">
          <ul className="text-base pl-4 list-disc space-y-2 text-muted-foreground">
            <li>
              Discord.js 기반의 Lost Ark 파티/레이드 모집 봇 아키텍처 설계로
              게임 커뮤니티의 매칭 효율성 개선
            </li>
            <li>
              명령어 기반 이벤트 핸들링 아키텍처 및 자동 알림 시스템 설계로
              사용자 편의성 향상
            </li>
            <li>
              실제 커뮤니티에서 운영되며 사용자 피드백을 반영한 지속적인
              아키텍처 개선 및 유지보수
            </li>
          </ul>
          <div className="flex flex-wrap gap-1 pl-4">
            <Pill name="Node.js" />
            <Pill name="Discord.js" />
            <Pill name="Heroku" />
            <Pill name="JavaScript" />
          </div>
        </div>
      </article>

      {/* WebGL Playground */}
      <article className="mt-8 md:grid md:grid-cols-4 md:gap-4">
        <div className="flex items-start mb-2 md:mb-0">
          <ExternalLink
            additionalClassName="text-xl text-muted-foreground hover:text-foreground"
            link="https://github.com/jaeungkim/webGL-playground"
          >
            WebGL Playground
          </ExternalLink>
        </div>
        <div className="space-y-2 col-span-3">
          <ul className="text-base pl-4 list-disc space-y-2 text-muted-foreground">
            <li>
              WebGL과 Three.js를 활용한 3D 인터랙션 아키텍처 실험 프로젝트
            </li>
            <li>
              사용자 입력에 반응하는 실시간 3D 렌더링 아키텍처 설계 및 다양한
              시각 효과 최적화
            </li>
            <li>
              렌더링 성능 최적화 전략 및 사용자 경험 개선을 위한 다양한 기법
              실험 및 검증
            </li>
          </ul>
          <div className="flex flex-wrap gap-1 pl-4">
            <Pill name="React" />
            <Pill name="Three.js" />
            <Pill name="WebGL" />
            <Pill name="GSAP" />
            <Pill name="Motion" />
          </div>
        </div>
      </article>
    </>
  );
}
