import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaGithub, FaLinkedin, FaRss } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function About() {
  return (
    <div className="relative text-3xl mt-9 md:px-4 sm:px-8 lg:px-12 md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto noto-font text-[#37352F]">
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

        <div className="flex flex-col gap-4 justify-center md:col-span-2">
          <p className="text-5xl mb-4 text-cyan-500 font-bold w-full">
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
      <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="font-semibold text-cyan-500 text-3xl uppercase">
          Introduce.
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
            열정적이고 협업을 중시하는 소프트웨어 엔지니어로서 2년간의 경험을
            가지고 있습니다. 빠르고 다이나믹한 환경의 요구를 충족시킨
            소프트웨어를 설계, 구축 및 유지 관리하는 데에 전문성을 갖추고
            있습니다. 풀스택 웹 개발을 전문으로 하며, 신흥 기술을 활용하여
            혁신적인 솔루션을 창출하는 데에 열정을 가지고 있습니다. 창의성,
            협업, 그리고 지속적인 학습을 우선시하는 기술 지향적인 회사에서의
            기회를 찾고 있습니다.
          </p>
          <p className="text-base">
            열정적이고 협업을 중시하는 소프트웨어 엔지니어로서 2년간의 경험을
            가지고 있습니다. 빠르고 다이나믹한 환경의 요구를 충족시킨
            소프트웨어를 설계, 구축 및 유지 관리하는 데에 전문성을 갖추고
            있습니다. 풀스택 웹 개발을 전문으로 하며, 신흥 기술을 활용하여
            혁신적인 솔루션을 창출하는 데에 열정을 가지고 있습니다. 창의성,
            협업, 그리고 지속적인 학습을 우선시하는 기술 지향적인 회사에서의
            기회를 찾고 있습니다.
          </p>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* Work Experience */}
      <div className="mb-11 font-semibold text-cyan-500 text-3xl uppercase">
        Work Experience.
      </div>

      {/* Flashee */}
      <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          2023.07 ~ 2023.10
        </div>
        <div className="col-span-2">
          <Link
            className="text-2xl font-medium hover:text-cyan-500 underline underline-offset-2"
            href="https://flashee.shop"
            target="_blank"
          >
            <p>Flashee</p>
          </Link>
          <p className="text-base font-normal text-[#808080] italic mt-2 mb-4">
            Vancouver, BC, Canada
          </p>
          <p className="text-base font-normal text-[#808080] italic">
            Full Stack Developer
          </p>
          <ul className="py-4 text-base font-normal pl-8 list-disc flex flex-col gap-2">
            <li>
              MERN 스택과 Next.js를 사용하여 Shopify Marketplaces가 원활하게
              통합된 정교한 전자상거래 플랫폼 개발
            </li>
            <li>
              Supabase 및 제3자 로그인 키트를 통해 플랫폼 보안 및 사용자 접근성
              향상, 계정 보안 사고 40% 감소
            </li>
            <li>
              AWS와 Fly.io로 전체 애플리케이션 생명주기 관리, 인프라 비용 30%
              절감 및 시스템 신뢰성 향상
            </li>
            <li>
              신속한 온보딩 과정을 촉진하여 소프트 런칭 당일 1개 이상의 상인이
              참여, 초기 수익 창출에 기여
            </li>
            <li>
              Shopify Payments를 사용한 결제 게이트웨이 통합, 카트 포기 감소 및
              성공적인 거래 증가
            </li>
            <li>
              분석 및 보고 도구 구현, 데이터 주도 문화 및 의사결정 효율성 20%
              개선
            </li>
            <li>
              확장 가능하고 고성능 인프라 엔지니어링, 플랫폼 최적화로 트래픽 및
              수요 증가 효율적 처리
            </li>
            <li>
              UI/UX 개선 구현으로 사용자 참여 25% 증가 및 사용자 유지율 15% 상승
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* iClinic Systems */}
      <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          2022.07 ~ 2023.06
        </div>
        <div className="col-span-2">
          <Link
            className="text-2xl font-medium hover:text-cyan-500 underline underline-offset-2"
            href="https://www.aiclinic.ca"
            target="_blank"
          >
            <p>iClinic Systems Inc.</p>
          </Link>
          <p className="text-base font-normal text-[#808080] italic mt-2 mb-4">
            Vancouver, BC, Canada
          </p>
          <p className="text-base font-normal text-[#808080] italic">
            Full Stack Developer
          </p>
          <ul className="py-4 text-base font-normal pl-8 list-disc flex flex-col gap-2">
            <li>
              MERN 스택과 Next.js를 사용하여 Shopify Marketplaces가 원활하게
              통합된 정교한 전자상거래 플랫폼 개발
            </li>
            <li>
              Supabase 및 제3자 로그인 키트를 통해 플랫폼 보안 및 사용자 접근성
              향상, 계정 보안 사고 40% 감소
            </li>
            <li>
              AWS와 Fly.io로 전체 애플리케이션 생명주기 관리, 인프라 비용 30%
              절감 및 시스템 신뢰성 향상
            </li>
            <li>
              신속한 온보딩 과정을 촉진하여 소프트 런칭 당일 1개 이상의 상인이
              참여, 초기 수익 창출에 기여
            </li>
            <li>
              Shopify Payments를 사용한 결제 게이트웨이 통합, 카트 포기 감소 및
              성공적인 거래 증가
            </li>
            <li>
              분석 및 보고 도구 구현, 데이터 주도 문화 및 의사결정 효율성 20%
              개선
            </li>
            <li>
              확장 가능하고 고성능 인프라 엔지니어링, 플랫폼 최적화로 트래픽 및
              수요 증가 효율적 처리
            </li>
            <li>
              UI/UX 개선 구현으로 사용자 참여 25% 증가 및 사용자 유지율 15% 상승
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* Catalyx */}
      <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="text-2xl font-medium text-[#808080] md:px-4">
          <p className="md:text-right mb-1">2021.01 ~ 2022.06</p>
        </div>
        <div className="col-span-2">
          <Link
            className="text-2xl font-medium hover:text-cyan-500 underline underline-offset-2"
            href="https://www.catalyx.io"
            target="_blank"
          >
            <p>Catalx Management Ltd.</p>
          </Link>
          <p className="text-base font-normal text-[#808080] italic mt-2 mb-4">
            Vancouver, BC, Canada
          </p>
          <p className="text-base font-normal text-[#808080] italic">
            Front End Developer
          </p>
          <ul className="py-4 text-base font-normal pl-8 list-disc flex flex-col gap-2">
            <li>
              MERN 스택과 Next.js를 사용하여 Shopify Marketplaces가 원활하게
              통합된 정교한 전자상거래 플랫폼 개발
            </li>
            <li>
              Supabase 및 제3자 로그인 키트를 통해 플랫폼 보안 및 사용자 접근성
              향상, 계정 보안 사고 40% 감소
            </li>
            <li>
              AWS와 Fly.io로 전체 애플리케이션 생명주기 관리, 인프라 비용 30%
              절감 및 시스템 신뢰성 향상
            </li>
            <li>
              신속한 온보딩 과정을 촉진하여 소프트 런칭 당일 1개 이상의 상인이
              참여, 초기 수익 창출에 기여
            </li>
            <li>
              Shopify Payments를 사용한 결제 게이트웨이 통합, 카트 포기 감소 및
              성공적인 거래 증가
            </li>
            <li>
              분석 및 보고 도구 구현, 데이터 주도 문화 및 의사결정 효율성 20%
              개선
            </li>
            <li>
              확장 가능하고 고성능 인프라 엔지니어링, 플랫폼 최적화로 트래픽 및
              수요 증가 효율적 처리
            </li>
            <li>
              UI/UX 개선 구현으로 사용자 참여 25% 증가 및 사용자 유지율 15% 상승
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-11"></hr>

      {/* Projects  */}
      <div className="mb-11 font-semibold text-cyan-500 text-3xl uppercase">
        Project.
      </div>

      {/* WebGL Playground */}
      <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          WebGL Playground
        </div>
        <div className="col-span-2">
          <ul className="text-base font-normal pl-8 list-disc">
            <li>
              portfolio website created using latest 3D technologies including:
              WebGL, Three.js, GSAP, and Blender
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* Lost Ark Bot */}
      <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          Discord Bot
        </div>
        <div className="col-span-2">
          <ul className="text-base font-normal pl-8 list-disc">
            <li>
              discord bot that helps gamers organize parties, currently used by
              more than 500 active users. Built with Discord.js
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* Lental */}
      <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          Lental
        </div>
        <div className="col-span-2">
          <ul className="text-base font-normal pl-8 list-disc">
            <li>
              off-campus housing/rental property search web app designed for
              students by students
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* Caffeine Holic */}
      <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          Caffeine Holic
        </div>
        <div className="col-span-2">
          <ul className="text-base font-normal pl-8 list-disc">
            <li>
              e-Commerce café site created with HTML5, CSS, Vanilla JS, and PHP
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* Skills */}
      <div className="mb-11 font-semibold text-cyan-500 text-3xl uppercase">
        SKill.
      </div>

      <div className="md:grid md:grid-cols-3 md:gap-4 mb-8">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          Frontend
        </div>
        <div className="col-span-2">
          <ul className="text-base font-normal pl-8 list-disc grid grid-cols-3 gap-2">
            <li>React</li>
            <li>Next.js</li>
            <li>Angular</li>
            <li>Redux</li>
            <li>JavaScript</li>
            <li>TypeScript</li>
            <li>WebGL</li>
            <li>Three.js</li>
            <li>GSAP</li>
          </ul>
        </div>
      </div>

      <div className="md:grid md:grid-cols-3 md:gap-4 mb-8">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          Backend
        </div>
        <div className="col-span-2">
          <ul className="text-base font-normal pl-8 list-disc grid grid-cols-3 gap-2">
            <li>Node.js</li>
            <li>Express.js</li>
          </ul>
        </div>
      </div>

      <div className="md:grid md:grid-cols-3 md:gap-4 mb-8">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          DevOps
        </div>
        <div className="col-span-2">
          <ul className="text-base font-normal pl-8 list-disc grid grid-cols-3 gap-2">
            <li>AWS</li>
            <li>MySQL</li>
            <li>GraphQL</li>
            <li>PostgreSQL</li>
            <li>MongoDB</li>
            <li>NGINX</li>
            <li>Docker</li>
            <li>Webpack</li>
            <li>Google Analytics</li>
          </ul>
        </div>
      </div>

      <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          Misc.
        </div>
        <div className="col-span-2">
          <ul className="text-base font-normal pl-8 list-disc grid grid-cols-3 gap-2">
            <li>Java</li>
            <li>PHP</li>
            <li>Agile/Scrum</li>
            <li>Jira</li>
            <li>Confluence</li>
            <li>Git</li>
            <li>GitHub</li>
            <li>GitLab</li>
            <li>BitBucket</li>
            <li>Jenkins</li>
            <li>VS Code</li>
          </ul>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* Education */}
      <div className="mb-11 font-semibold text-cyan-500 text-3xl uppercase">
        Education.
      </div>

      {/* UBC */}
      <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
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

      {/* Secondary School */}
      <div className="md:grid md:grid-cols-3 md:gap-4 mt-11">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          2008.09 ~ 2013.06
        </div>
        <div className="col-span-2">
          <p className="text-2xl font-medium mb-2">
            Semiahmoo Secondary School
          </p>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* ETC */}
      <div className="mb-11 font-semibold text-cyan-500 text-3xl uppercase">
        ETC.
      </div>

      {/* UBC */}
      <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          2010.09
        </div>
        <div className="col-span-2">
          <p className="text-2xl font-medium mb-2">
            Mensa International (멘사)
          </p>
          <p className="text-base font-normal text-[#808080] italic">회원</p>
        </div>
      </div>

      <footer className="pt-[150px] flex flex-col items-center justify-center">
        <p className="text-base">감사합니다 😊</p>
        <div className="my-[50px] text-sm text-[#808080] text-center">
          <p>Last updated: 2023.11.14</p>
          <a className="hover:text-cyan-500" href="https://www.jaeungkim.com">
            @jaeungkim
          </a>
        </div>
      </footer>
    </div>
  );
}
