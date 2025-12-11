import Image from "next/image";
import ExternalLink from "@/src/components/shared/buttons/ExternalLink";
import {
  MailIcon,
  GithubIcon,
  LinkedInIcon,
} from "@/src/components/shared/icons/icons";
import IconWrapper from "@/src/components/shared/icons/IconWrapper";
import { getPlaceholderForImage } from "@/src/lib/placeholders";

export default async function ResumeHeader() {
  const profileImagePath = "/images/resume_img.JPG";
  const blurDataURL = await getPlaceholderForImage(profileImagePath);

  return (
    <div className="md:grid md:grid-cols-4 text-foreground">
      <div className="flex justify-center items-center">
        <Image
          className="max-w-[120px] h-[160px] object-cover rounded-sm"
          src={profileImagePath}
          alt="profileLogo"
          width={1080}
          height={1440}
          placeholder={blurDataURL ? "blur" : undefined}
          blurDataURL={blurDataURL}
        />
      </div>

      <div className="flex flex-col gap-4 justify-center md:col-span-3">
        <p className="text-4xl font-bold">김재웅</p>

        <div className="flex items-center gap-2">
          <IconWrapper icon={MailIcon} className="size-6" />
          <a
            className="border-b border-border leading-5 hover:border-muted-foreground transition-colors font-bold"
            href="mailto:jaewoongkim95@gmail.com"
          >
            jaewoongkim95@gmail.com
          </a>
        </div>

        <div className="flex items-center gap-2">
          <IconWrapper icon={GithubIcon} className="size-6" />
          <ExternalLink link="https://github.com/jaeungkim">
            GitHub
          </ExternalLink>
        </div>

        <div className="flex items-center gap-2">
          <IconWrapper icon={LinkedInIcon} className="size-6" />
          <ExternalLink link="https://www.linkedin.com/in/jaeungkim0526">
            LinkedIn
          </ExternalLink>
        </div>
      </div>
    </div>
  );
}
