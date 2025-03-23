export default function ResumeProject() {
  return (
    <div className="space-y-20">
      <h2 className="text-3xl font-semibold text-cyan-500 uppercase">
        Open Source & Project
      </h2>

      <ProjectSection
        title="React Gantt Chart"
        description={[
          "기존 Gantt 차트 솔루션들은 커스터마이징이 제한적이거나 유료 서비스가 많아, 직접 개발하게 된 오픈 소스 프로젝트입니다.",
          "경량화와 확장성을 중심으로 설계하여, 개인 프로젝트부터 실무 환경까지 유연하게 활용할 수 있도록 구현했습니다.",
          "현재 오픈 소스로 배포하여 지속적으로 개선하고 있으며, 커뮤니티 피드백을 반영해 기능을 확장하고 있습니다.",
        ]}
        link={{
          label: "GitHub Repository",
          url: "https://github.com/jaeungkim/react-gantt-chart",
        }}
        skills={["React", "Vite", "Zustand", "Tailwind CSS", "Shadcn/ui"]}
      />

      <Divider />

      <ProjectSection
        title="Portfolio Website"
        description={[
          "제가 만든 프로젝트와 글을 한 곳에 정리한 개인 포트폴리오 웹사이트입니다.",
          "다양한 애니메이션과 3D 요소를 더해 보는 재미를 높였고, 반응형으로 최적화했습니다.",
          "직관적인 구조와 깔끔한 디자인에 신경 썼으며, 퍼포먼스 최적화도 함께 고려하여 개발했습니다.",
        ]}
        link={{
          label: "GitHub Repository",
          url: "https://github.com/jaeungkim/portfolio-website-nextjs",
        }}
        skills={[
          "Next.js 15 (App)",
          "Tailwind CSS",
          "Shadcn/ui",
          "Recoil",
          "i18n",
          "GSAP",
          "Framer Motion",
          "Three.js",
        ]}
      />

      <Divider />

      <ProjectSection
        title="BC Government"
        description={[
          "BC 주정부에서 주최한 IS24 Full Stack Competition 과제로 개발한 직원 관리 시스템입니다.",
          "조직 내 직원과 팀 정보를 효율적으로 관리할 수 있도록 사용자 친화적인 인터페이스와 기능을 구현했습니다.",
          "프론트엔드부터 백엔드, 데이터베이스까지 풀스택으로 개발하였으며, Docker를 이용해 배포 환경을 구성했습니다.",
        ]}
        link={{
          label: "GitHub Repository",
          url: "https://github.com/jaeungkim/moti-is24-code-challenge",
        }}
        skills={[
          "React",
          "Tailwind CSS",
          "Node.js",
          "Express.js",
          "MongoDB",
          "Docker",
        ]}
      />

      <Divider />

      <ProjectSection
        title="Lost Ark Discord Bot"
        description={[
          "Lost Ark를 플레이하면서 매번 파티원을 구하는 과정이 번거롭다고 느껴 직접 개발한 Discord 파티/레이드 모집 봇입니다.",
          "간단한 명령어만으로 파티를 생성하고 팀원을 모집할 수 있어 빠르고 편리한 매칭이 가능합니다.",
          "개발 이후 실제 커뮤니티에서 사용되며, 피드백을 반영해 기능을 개선하고 유지보수했습니다.",
        ]}
        link={{
          label: "GitHub Repository",
          url: "https://github.com/jaeungkim/lostark_bot",
        }}
        skills={["Node.js", "Discord.js", "Heroku", "JavaScript"]}
      />

      <Divider />

      <ProjectSection
        title="WebGL Playground"
        description={[
          "웹에서 3D 인터랙션을 실험하기 위해 만든 프로젝트입니다.",
          "사용자 상호작용에 반응하는 3D 씬을 구현하고 다양한 효과를 테스트했습니다.",
        ]}
        link={{
          label: "GitHub Repository",
          url: "https://github.com/jaeungkim/webGL-playground",
        }}
        skills={["React", "Three.js", "Blender", "GSAP", "SCSS"]}
      />

      <Divider />

      <ProjectSection
        title="Lental"
        description={[
          "UBC 학생들을 위한 교내 하우징 및 부동산 검색 플랫폼입니다.",
          "학교 근처에서 집을 구하는 것이 어렵다는 문제를 해결하고자 캡스톤 프로젝트로 개발했습니다.",
          "학생들이 직접 매물을 등록하고 검색할 수 있으며, 간단한 UI와 필터 기능을 통해 쉽게 원하는 정보를 찾을 수 있습니다.",
        ]}
        link={{
          label: "YouTube Demo",
          url: "https://www.youtube.com/watch?v=sIZqCxLnLSY&ab_channel=LentalRents",
        }}
        skills={["PHP", "MySQL", "JavaScript", "HTML", "CSS", "Travis CI"]}
      />

      <Divider />
    </div>
  );
}

const ProjectSection = ({ title, description, link, skills }) => (
  <div className="md:grid md:grid-cols-4 md:gap-4">
    {/* Left side: Title */}
    <div className="flex items-start md:justify-end md:px-4">
      <h3 className="text-2xl font-medium text-[#808080]">{title}</h3>
    </div>

    {/* Right side: Content */}
    <div className="col-span-3 space-y-4">
      <ul className="text-base font-normal pl-4 md:pl-8 list-disc space-y-2">
        {description.map((text, index) => (
          <li key={index}>{text}</li>
        ))}

        {/* Link section */}
        {link && link.url && (
          <li>
            <a
              className="text-cyan-500 hover:underline hover:underline-offset-2"
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              {link.label || "프로젝트 링크"}
            </a>
          </li>
        )}
      </ul>

      {/* Skill Pills */}
      <div className="flex flex-wrap gap-2 pl-4 md:pl-8 pt-2">
        {skills.map((skill, idx) => (
          <SkillPill key={idx} name={skill} />
        ))}
      </div>
    </div>
  </div>
);

// Pill 컴포넌트
const SkillPill = ({ name }) => (
  <span className="border border-zinc-500 text-zinc-500 dark:border-zinc-800 dark:text-zinc-400 px-3 py-1 text-sm font-medium rounded-full bg-transparent">
    {name}
  </span>
);

// Divider 컴포넌트
const Divider = () => (
  <hr className="my-11 h-px bg-gray-200 border-0 dark:bg-gray-700" />
);
