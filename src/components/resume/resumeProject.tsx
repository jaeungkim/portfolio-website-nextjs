import { projectsResume } from "@/src/constants/resume";
import SkillPill from "../common/SkillPill";
import ResumeTitle from "./ResumeTitle";
import Pill from "@/src/components/common/Pill";
import ExternalLink from "@/src/components/common/buttons/ExternalLink";

// 한국어 프로젝트 데이터
const projectsData: Record<string, { title: string; description: string[] }> = {
  "react-gantt-chart": {
    title: "React Gantt Chart",
    description: [
      "기존 Gantt 차트 솔루션들은 커스터마이징이 제한적이거나 유료 서비스가 많아, 직접 개발하게 된 오픈 소스 프로젝트입니다.",
      "경량화와 확장성을 중심으로 설계하여, 개인 프로젝트부터 실무 환경까지 유연하게 활용할 수 있도록 구현했습니다.",
      "현재 오픈 소스로 배포하여 지속적으로 개선하고 있으며, 커뮤니티 피드백을 반영해 기능을 확장하고 있습니다."
    ]
  },
  "portfolio-website": {
    title: "Portfolio Website",
    description: [
      "제가 만든 프로젝트와 글을 한 곳에 정리한 개인 포트폴리오 웹사이트입니다.",
      "다양한 애니메이션과 3D 요소를 더해 보는 재미를 높였고, 반응형으로 최적화했습니다.",
      "직관적인 구조와 깔끔한 디자인에 신경 썼으며, 퍼포먼스 최적화도 함께 고려하여 개발했습니다."
    ]
  },
  "bc-government": {
    title: "BC Government",
    description: [
      "BC 주정부에서 주최한 IS24 Full Stack Competition 과제로 개발한 직원 관리 시스템입니다.",
      "조직 내 직원과 팀 정보를 효율적으로 관리할 수 있도록 사용자 친화적인 인터페이스와 기능을 구현했습니다.",
      "프론트엔드부터 백엔드, 데이터베이스까지 풀스택으로 개발하였으며, Docker를 이용해 배포 환경을 구성했습니다."
    ]
  },
  "lostark-bot": {
    title: "Lost Ark Discord Bot",
    description: [
      "Lost Ark를 플레이하면서 매번 파티원을 구하는 과정이 번거롭다고 느껴 직접 개발한 Discord 파티/레이드 모집 봇입니다.",
      "간단한 명령어만으로 파티를 생성하고 팀원을 모집할 수 있어 빠르고 편리한 매칭이 가능합니다.",
      "개발 이후 실제 커뮤니티에서 사용되며, 피드백을 반영해 기능을 개선하고 유지보수했습니다."
    ]
  },
  "webgl-playground": {
    title: "WebGL Playground",
    description: [
      "웹에서 3D 인터랙션을 실험하기 위해 만든 프로젝트입니다.",
      "사용자 상호작용에 반응하는 3D 씬을 구현하고 다양한 효과를 테스트했습니다."
    ]
  }
};

export default async function ResumeProject() {
  return (
    <div className="text-neutral-700 dark:text-neutral-300">
      <ResumeTitle title="Projects" />

      {/* Projects list */}
      {projectsResume.map((project, index) => {
        const { id, link, skills } = project;
        const i18nInfo = projectsData[id];

        if (!i18nInfo) {
          return null;
        }

        const { title, description } = i18nInfo;

        return (
          <div key={id}>
            <ProjectSection
              title={title}
              description={description}
              link={link}
              skills={skills}
            />
          </div>
        );
      })}
    </div>
  );
}

type ProjectSectionProps = {
  title: string;
  description: string[];
  link?: { label: string; url: string };
  skills: string[];
};

function ProjectSection({
  title,
  description,
  link,
  skills,
}: ProjectSectionProps) {
  return (
    <div className="mt-8 md:grid md:grid-cols-4 md:gap-4 text-neutral-700 dark:text-neutral-300">
      {/* Left side: Title */}
      <div className="flex items-start mb-2 md:mb-0">
        <ExternalLink
          additionalClassName="text-xl text-neutral-600 dark:text-neutral-400"
          link={link?.url || ""}
        >
          {title}
        </ExternalLink>
      </div>

      {/* Right side: Content */}
      <div className="space-y-2 col-span-3">
        <ul className="text-base font-normal pl-4 list-disc space-y-2">
          {description.map((desc, idx) => (
            <li key={idx}>{desc}</li>
          ))}
        </ul>

        {/* Skill Pills (from the constant array) */}
        <div className="flex flex-wrap gap-1 pl-4">
          {skills.map((skill, idx) => (
            <Pill key={idx} name={skill} />
          ))}
        </div>
      </div>
    </div>
  );
}
