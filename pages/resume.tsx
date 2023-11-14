import Image from "next/image";
import { FaFacebookF, FaGithub, FaLinkedin, FaRss } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function About() {
  return (
    <div className="relative text-3xl mt-9 px-4 sm:px-8 lg:px-12 md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto noto-font text-[#212121]">
      {/* HEADER  */}
      <div className="md:grid md:grid-cols-3 gap-4">
        <div className="flex justify-center md:justify-normal">
          {" "}
          <img
            className="w-full aspect-[35/45] max-w-[240px] object-cover rounded-md"
            src="/images/profile_1.jpeg"
            alt="profileLogo"
          />
        </div>

        <div className="flex flex-col gap-4 justify-center">
          <p className="text-5xl mb-4 text-cyan-500 font-bold">
            Kim Jaeung <span className="text-base">(김재웅)</span>
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
              <FaRss className="w-6 h-6" />
            </div>
            <div className="flex justify-center items-center align-middle">
              <a
                className="text-base hover:text-cyan-500 underline underline-offset-2"
                href="https://www.jaeungkim.com/blog"
                target="_blank"
              >
                https://jaeungkim.com/blog
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
      <hr className="my-11"></hr>

      {/* Introduce */}
      <div className="grid grid-cols-3 gap-4">
        <div className="font-semibold text-cyan-500 text-3xl uppercase">
          Introduce
        </div>
        <div className="col-span-2">
          <p className="text-base mb-4 font-normal">
            열정적이고 협업을 중시하는 소프트웨어 엔지니어로서 2년간의 경험을
            가지고 있습니다. 빠르고 다이나믹한 환경의 요구를 충족시킨
            소프트웨어를 설계, 구축 및 유지 관리하는 데에 전문성을 갖추고
            있습니다. 풀스택 웹 개발을 전문으로 하며, 신흥 기술을 활용하여
            혁신적인 솔루션을 창출하는 데에 열정을 가지고 있습니다. 창의성,
            협업, 그리고 지속적인 학습을 우선시하는 기술 지향적인 회사에서의
            기회를 찾고 있습니다.
          </p>
          <p className="text-base mb-4">
            오픈소스 프로젝트에 관심이 많고, 다양한 방법으로 기여를 하려고
            노력하고 있습니다. 이외에도 개인 프로젝트나 개발 커뮤니티 활동 등을
            통해 다양한 개발 경험을 즐기고 있습니다. 평소 개발 경험을 공유하거나
            기록하는 것을 좋아하여 학부생 시절부터 시작한 개발 블로그에는 350여
            개의 기술 포스트를 작성했습니다. 언제나 백엔드 개발의 정점을 찍고
            싶다고 생각하고 있으며, 조금 더 나중에는 어딘가의 기술 조직 리더라는
            목표를 가지고 다양한 기술을 학습하거나 사용하고 경험을 쌓고
            있습니다.
          </p>
          <p className="text-base">
            서비스 개발이란 결국 개발과 비즈니스와의 커뮤니케이션이 가장
            중요하다고 생각하고 있습니다. 능동적이고 적극적인 커뮤니케이션으로
            문제 해결과 비즈니스 발전을 위해 뛰어듭니다. 이러한 점을 바탕으로 더
            좋은 개발자로서 성장하기 위해 더 치열하게 학습하고, 경험하고,
            노력하고 있습니다.
          </p>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* Work Experience */}
      <div className="mb-11 font-semibold text-cyan-500 text-3xl uppercase">
        Work Experience
      </div>

      {/* Flashee */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-2xl font-medium text-[#808080] flex justify-end px-4">
          2023.07 ~ 2023.10
        </div>
        <div className="col-span-2">
          <p className="text-2xl font-medium mb-2">Flashee</p>
          <p className="text-base font-normal text-[#808080] italic">
            Full Stack Developer
          </p>
          <ul className="py-4 text-base font-normal pl-8 list-disc">
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
          </ul>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* iClinic Systems */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-2xl font-medium text-[#808080] flex justify-end px-4">
          2022.07 ~ 2023.06
        </div>
        <div className="col-span-2">
          <p className="text-2xl font-medium mb-2">iClinic Systems Inc.</p>
          <p className="text-base font-normal text-[#808080] italic">
            Full Stack Developer
          </p>
          <ul className="py-4 text-base font-normal pl-8 list-disc">
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
          </ul>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* Catalyx */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-2xl font-medium text-[#808080] flex justify-end px-4">
          2021.01 ~ 2022.06
        </div>
        <div className="col-span-2">
          <p className="text-2xl font-medium mb-1">Catalx Management Ltd.</p>
          <p className="text-base font-normal text-[#808080] italic">
            Front End Developer
          </p>
          <ul className="py-4 text-base font-normal pl-8 list-disc">
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
          </ul>
        </div>
      </div>

      <hr className="my-11"></hr>

      {/* Projects  */}
      <div className="mb-11 font-semibold text-cyan-500 text-3xl uppercase">
        Project
      </div>

      {/* WebGL Playground */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-2xl font-medium text-[#808080] flex justify-end px-4">
          WebGL Playground
        </div>
        <div className="col-span-2">
          <ul className="text-base font-normal pl-8 list-disc">
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
          </ul>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* Lost Ark Bot */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-2xl font-medium text-[#808080] flex justify-end px-4">
          Discord Bot
        </div>
        <div className="col-span-2">
          <ul className="text-base font-normal pl-8 list-disc">
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
          </ul>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* Lental */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-2xl font-medium text-[#808080] flex justify-end px-4">
          Lental
        </div>
        <div className="col-span-2">
          <ul className="text-base font-normal pl-8 list-disc">
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
          </ul>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* Caffeine Holic */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-2xl font-medium text-[#808080] flex justify-end px-4">
          Caffeine Holic
        </div>
        <div className="col-span-2">
          <ul className="text-base font-normal pl-8 list-disc">
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
          </ul>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* Skills */}
      <div className="mb-11 font-semibold text-cyan-500 text-3xl uppercase">
        SKill
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-2xl font-medium text-[#808080]">Frontend</div>
        <div className="col-span-2">
          <ul className="text-base font-normal pl-8 list-disc">
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
          </ul>
        </div>
      </div>
      <hr className="my-11"></hr>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-2xl font-medium text-[#808080]">Backend</div>
        <div className="col-span-2">
          <ul className="text-base font-normal pl-8 list-disc">
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
          </ul>
        </div>
      </div>
      <hr className="my-11"></hr>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-2xl font-medium text-[#808080]">DevOps</div>
        <div className="col-span-2">
          <ul className="text-base font-normal pl-8 list-disc">
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
          </ul>
        </div>
      </div>
      <hr className="my-11"></hr>

      <div className="grid grid-cols-3 gap-4">
        <div className="text-2xl font-medium text-[#808080]">Misc</div>
        <div className="col-span-2">
          <ul className="text-base font-normal pl-8 list-disc">
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
            <li>hello</li>
          </ul>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* Education */}
      <div className="mb-11 font-semibold text-cyan-500 text-3xl uppercase">
        Education
      </div>

      {/* UBC */}
      <div className="grid grid-cols-3 gap-4">
        <div className="text-2xl font-medium text-[#808080]">
          2013.09 ~ 2020.04
        </div>
        <div className="col-span-2">
          <p className="text-2xl font-medium mb-2">
            University of British Columbia
          </p>
          <p className="text-base font-normal text-[#808080] italic">
            Bachelor of Science - Major in Computer Science
          </p>
        </div>
      </div>

      <footer className="pt-[100px] flex flex-col items-center justify-center">
        <p className="text-base">감사합니다.</p>
        <a
          className="text-sm text-[#808080] my-[50px] hover:text-cyan-500"
          href="https://www.jaeungkim.com"
        >
          @jaeungkim
        </a>
      </footer>
    </div>
  );
}
