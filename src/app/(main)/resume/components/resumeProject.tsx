import ResumeSectionItem from "./ResumeSectionItem";

const projects = [
  {
    title: "React Gantt Chart",
    link: "https://jaeungkim.com/gantt-chart",
    pills: ["React", "Vite", "Zustand"],
    bullets: [
      <li key="0">
        수천 개 Task 데이터를 Virtualization 및 Lazy Loading 아키텍처로 렌더링
        성능 40% 개선한 오픈소스 Gantt Chart 라이브러리
      </li>,
      <li key="1">
        WBS 기반 프로젝트 관리 아키텍처 설계 및 Optimistic UI 패턴을 통한 실시간
        구조/일정 수정 시스템 구축
      </li>,
      <li key="2">
        확장 가능한 플러그인 아키텍처와 경량화 설계로 실무 환경에서 활용 중이며,
        커뮤니티 피드백을 반영한 지속적 개선
      </li>,
    ],
  },
  {
    title: "Portfolio Website",
    link: "https://github.com/jaeungkim/portfolio-website-nextjs",
    pills: [
      "Next 15 (App)",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
      "Three.js",
    ],
    bullets: [
      <li key="0">
        Next.js App Router와 SSG를 활용한 정적 사이트 아키텍처 설계 및
        프로젝트/기술 블로그 통합 관리 시스템
      </li>,
      <li key="1">
        WebGL과 Three.js를 활용한 3D 인터랙션 아키텍처 설계 및 렌더링 성능
        최적화
      </li>,
      <li key="2">
        이미지 최적화 전략 및 반응형 디자인 아키텍처를 통한 성능 최적화 및
        사용자 경험 개선
      </li>,
    ],
  },
  {
    title: "BC Government",
    link: "https://github.com/jaeungkim/moti-is24-code-challenge",
    pills: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Docker",
    ],
    bullets: [
      <li key="0">
        BC 주정부 IS24 Full Stack Competition 과제로 개발한 직원 관리 시스템
        아키텍처 설계
      </li>,
      <li key="1">
        조직 계층 구조 관리를 위한 데이터 모델 설계 및 효율적인 UI/UX 아키텍처
        구현
      </li>,
      <li key="2">
        React 프론트엔드, Node.js 백엔드, PostgreSQL 데이터베이스 아키텍처 설계
        및 Docker 기반 컨테이너화 배포
      </li>,
    ],
  },
  {
    title: "Lost Ark Discord Bot",
    link: "https://github.com/jaeungkim/lostark_bot",
    pills: ["Node.js", "Discord.js", "Heroku", "JavaScript"],
    bullets: [
      <li key="0">
        Discord.js 기반의 Lost Ark 파티/레이드 모집 봇 아키텍처 설계로 게임
        커뮤니티의 매칭 효율성 개선
      </li>,
      <li key="1">
        명령어 기반 이벤트 핸들링 아키텍처 및 자동 알림 시스템 설계로 사용자
        편의성 향상
      </li>,
      <li key="2">
        실제 커뮤니티에서 운영되며 사용자 피드백을 반영한 지속적인 아키텍처 개선
        및 유지보수
      </li>,
    ],
  },
  {
    title: "WebGL Playground",
    link: "https://github.com/jaeungkim/webGL-playground",
    pills: ["React", "Three.js", "WebGL", "GSAP", "Motion"],
    bullets: [
      <li key="0">
        WebGL과 Three.js를 활용한 3D 인터랙션 아키텍처 실험 프로젝트
      </li>,
      <li key="1">
        사용자 입력에 반응하는 실시간 3D 렌더링 아키텍처 설계 및 다양한 시각
        효과 최적화
      </li>,
      <li key="2">
        렌더링 성능 최적화 전략 및 사용자 경험 개선을 위한 다양한 기법 실험 및
        검증
      </li>,
    ],
  },
];

export default function ResumeProject() {
  return (
    <>
      <div className="font-semibold text-foreground text-3xl uppercase">
        Projects
      </div>

      {projects.map((project, index) => (
        <ResumeSectionItem
          key={index}
          isProject={true}
          period=""
          title={project.title}
          link={project.link}
          bullets={project.bullets}
          pills={project.pills}
        />
      ))}
    </>
  );
}
