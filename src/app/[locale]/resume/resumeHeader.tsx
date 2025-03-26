import { useTranslations } from "next-intl";
import Image from "next/image";
import { FaFacebookF, FaGithub, FaLinkedin, FaRss } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

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
          <p className="text-5xl mb-4 text-cyan-500 font-bold w-full">
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
              <a
                className="text-base hover:text-cyan-500 underline underline-offset-2"
                href="https://github.com/jaeungkim"
                target="_blank"
              >
                https://github.com/jaeungkim
              </a>
            </div>
          </div>

          <div className="flex gap-4">
            <div className="">
              <FaLinkedin className="w-6 h-6" />
            </div>
            <div className="flex justify-center items-center align-middle">
              <a
                className="text-base hover:text-cyan-500 underline underline-offset-2"
                href="https://www.linkedin.com/in/jaeungkim0526/"
                target="_blank"
              >
                https://linkedin.com/in/jaeungkim0526/
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
