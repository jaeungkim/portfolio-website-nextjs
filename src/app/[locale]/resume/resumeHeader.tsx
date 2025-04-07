import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaFacebookF, FaGithub, FaLinkedin, FaRss } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import ExternalLink from "@/src/components/ExternalLink";

export default function ResumeHeader() {
  const t = useTranslations();

  return (
    <>
      <div className="md:grid md:grid-cols-4 gap-4">
        <div className="flex justify-center md:justify-normal mb-4 md:mb-0">
          {" "}
          <Image
            className="w-full max-w-[200px] h-[260px] object-cover rounded-sm"
            src="/images/resume_img.JPG"
            alt="profileLogo"
            width={1080}
            height={1440}
          />
        </div>

        <div className="flex flex-col gap-4 justify-center md:col-span-3">
          <p className="text-5xl mb-4 text-neutral-700 dark:text-neutral-100 font-bold w-full">
            {t("about.name")}
          </p>
          <div className="flex gap-4">
            <div className="">
              <HiOutlineMail className="w-6 h-6" />
            </div>
            <div className="flex justify-center items-center align-middle">
              <p className="text-base">jaewoongkim95@gmail.com</p>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="">
              <FaGithub className="w-6 h-6" />
            </div>
            <div className="flex justify-center items-center align-middle">
              <ExternalLink link="https://github.com/jaeungkim">
                GitHub
              </ExternalLink>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="">
              <FaLinkedin className="w-6 h-6" />
            </div>
            <div className="flex justify-center items-center align-middle">
              <ExternalLink link="https://www.linkedin.com/in/jaeungkim0526">
                LinkedIn
              </ExternalLink>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
