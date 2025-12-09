import Image from "next/image";
import ExternalLink from "@/src/components/common/buttons/ExternalLink";
import MailIcon from "@/src/components/common/icons/iconComponents/MailIcon";
import GithubIcon from "@/src/components/common/icons/iconComponents/GithubIcon";
import Icon from "@/src/components/common/icons/Icon";
import LinkedInIcon from "@/src/components/common/icons/iconComponents/LinkedInIcon";

export default async function ResumeHeader() {
  return (
    <>
      <div className="md:grid md:grid-cols-4 text-neutral-700 dark:text-neutral-300">
        <div className="flex justify-center items-center">
          <Image
            className="w-full max-w-[120px] h-[160px] object-cover rounded-sm"
            src="/images/resume_img.JPG"
            alt="profileLogo"
            width={1080}
            height={1440}
          />
        </div>

        <div className="flex flex-col gap-4 justify-center md:col-span-3">
          <p className="text-4xl font-bold w-full">김재웅</p>
          <div className="w-fit group gap-2 flex items-center align-middle">
            <Icon icon={MailIcon} className="size-6" />
            <a
              className="border-solid border-b border-neutral-700 leading-5 hover:border-neutral-200 transition-all duration-300 ease-in-out font-bold"
              href="mailto:jaewoongkim95@gmail.com"
            >
              jaewoongkim95@gmail.com
            </a>
          </div>

          <div className="w-fit group gap-2 flex items-center align-middle">
            <Icon icon={GithubIcon} className="size-6" />
            <ExternalLink link="https://github.com/jaeungkim">
              GitHub
            </ExternalLink>
          </div>

          <div className="w-fit flex gap-2 items-center align-middle group">
            <Icon icon={LinkedInIcon} className="size-6" />
            <ExternalLink link="https://www.linkedin.com/in/jaeungkim0526">
              LinkedIn
            </ExternalLink>
          </div>
        </div>
      </div>
    </>
  );
}
