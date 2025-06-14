import Image from "next/image";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";
import ExternalLink from "@/src/components/common/ExternalLink";
import { getTranslations } from "next-intl/server";

export default async function ResumeHeader() {
  const t = await getTranslations("home");

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
          <p className="text-4xl font-bold w-full">{t("about.name")}</p>
          <div className="flex gap-4">
            <div className="">
              <HiOutlineMail className="size-6" />
            </div>
            <div className="flex justify-center items-center align-middle">
              <a
                className="border-solid border-b border-neutral-700 leading-5 hover:border-neutral-200 transition-all duration-300 ease-in-out font-bold"
                href="mailto:jaewoongkim95@gmail.com"
              >
                jaewoongkim95@gmail.com
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="">
              <FaGithub className="size-6" />
            </div>
            <div className="flex justify-center items-center align-middle">
              <ExternalLink link="https://github.com/jaeungkim">
                GitHub
              </ExternalLink>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="">
              <FaLinkedin className="size-6" />
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
