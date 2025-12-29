import ExternalLink from "@/src/components/shared/buttons/ExternalLink";
import {
  MailIcon,
  GithubIcon,
  LinkedInIcon,
} from "@/src/components/shared/icons/icons";
import IconWrapper from "@/src/components/shared/icons/IconWrapper";

export default function ResumeHeader() {
  return (
    <div className="md:grid md:grid-cols-4 md:gap-x-6 gap-y-4 text-foreground">
      {/* Left column - Name (like period in WorkSection) */}
      <div className="mb-4 md:mb-0">
        <h1 className="text-2xl font-medium text-muted-foreground">김재웅</h1>
        <p className="text-lg text-muted-foreground mt-1">Frontend Developer</p>
      </div>

      {/* Right 3 columns - Contact & Intro (like company details in WorkSection) */}
      <div className="col-span-3 space-y-4">
        {/* Contact links row */}

        {/* Introduction */}
        <div className="space-y-3 text-foreground leading-relaxed">
          <p>
            안녕하세요. 웹 서비스의 기획과 설계부터 개발, 배포 및 운영까지
            전반적인 과정을 두루 경험하며 꾸준히 성장해온 프론트엔드
            개발자입니다.
          </p>
          <p>
            누구나 쉽게 이해하고 유지보수할 수 있는 명확한 코드를 작성하는 것을
            중요하게 생각하며, 항상 견고하고 효율적인 코드 작성에 노력하고
            있습니다. 또한, 언젠가는 프론트엔드 개발 분야의 정점에 오르겠다는
            목표를 가지고 끊임없이 학습하고 있습니다.
          </p>
          <p>
            개발자로서 소통이 성장에 큰 역할을 한다고 생각해, 평소에도
            동료들과의 기술적 대화나 커뮤니티 활동을 통해 꾸준히 배우고 함께
            성장하기 위해 노력하고 있습니다.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          <a
            className="flex items-center gap-1.5 text-foreground hover:text-muted-foreground transition-colors"
            href="mailto:jaewoongkim95@gmail.com"
          >
            <IconWrapper icon={MailIcon} className="size-4" />
            <span>jaewoongkim95@gmail.com</span>
          </a>

          <div className="flex items-center gap-1.5 text-foreground hover:text-muted-foreground transition-colors">
            <IconWrapper icon={GithubIcon} className="size-4" />
            <ExternalLink link="https://github.com/jaeungkim">
              GitHub
            </ExternalLink>
          </div>

          <div className="flex items-center gap-1.5 text-foreground hover:text-muted-foreground transition-colors">
            <IconWrapper icon={LinkedInIcon} className="size-4" />
            <ExternalLink link="https://www.linkedin.com/in/jaeungkim0526">
              LinkedIn
            </ExternalLink>
          </div>
        </div>
      </div>
    </div>
  );
}
