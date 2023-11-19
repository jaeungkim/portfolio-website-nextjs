import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaGithub, FaLinkedin, FaRss } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

export default function About() {
  return (
    <div className="relative text-3xl mt-9 px-4 sm:px-8 lg:px-12 md:max-w-3xl lg:max-w-5xl xl:max-w-7xl mx-auto noto-font text-[#37352F]">
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
            스타트업 환경에서 웹 서비스의 설계, 개발, 배포 및 운영을 통해 2년
            간의 경험을 쌓은 프론트엔드 개발자로서, 웹 서비스에 생동감을
            불어넣는 모션 구현을 통해 사용자 경험을 풍부하게 만드는 것을
            좋아합니다.
          </p>
          <p className="text-base mb-4">
            웹 기술의 빠른 변화에 발맞추어, 지속적인 학습을 통해 최신 트렌드,
            보안 문제, 그리고 시스템 효율성에 관한 지식을 꾸준히 확장해왔습니다.
            이러한 노력은 프로젝트에 혁신적인 아이디어를 적용하고 비즈니스의
            성장을 도모하는 데 큰 도움이 되었습니다. 또한, 자동화와 프로세스
            최적화에 집중함으로써 작업 효율성을 상당히 높일 수 있었습니다.
          </p>
          <p className="text-base">
            성공적인 프로젝트는 원활한 커뮤니케이션에서 비롯된다는 것을 이해하고
            있습니다. 팀원들과의 페어 프로그래밍을 통해 지식과 아이디어를
            공유하는 것을 즐기며, 모든 이들과 긍정적이고 열린 마음으로
            소통합니다. 이러한 경험들은 저를 더 나은 개발자로 성장시키는
            원동력이 되었고, 계속해서 새로운 기술을 배우고 전문성을 키우는 데
            집중하고 있습니다.
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
            Front End Developer
          </p>
          <ul className="py-4 text-base font-normal pl-8 list-disc flex flex-col gap-2">
            <li>통합 의류 쇼핑 마켓플레이스(E-Commerce) 스타트업</li>
            <li>
              첫 번째 개발자로 입사하여 사내에 필요한 모든 프론트엔드 서비스
              기획/개발/배포/운영
            </li>
            <li>
              Shopify Marketplaces가 원활하게 통합된 정교한 E-Commerce 플랫폼
              개발
            </li>
            <li>
              Supabase 및 서드파티(Instagram, TikTok 등) 로그인 키트를 통해 플랫폼
              보안 및 사용자 접근성 향상
            </li>
            <li>
              Shopify Payments를 사용한 결제 게이트웨이 통합, 카트 포기 감소 및
              성공적인 거래 증가
            </li>
            <li>
              신속한 온보딩 과정을 촉진하여 소프트 런칭 당일 초기 수익 창출에
              기여
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
              병원 및 클리닉 네트워크를 대상으로 하는 EMR(Electronic Medical
              Records) SaaS 스타트업
            </li>
            <li>
              WebGL 기술을 적극 활용하여 사내 마케팅 프로젝트 전체를 독자적으로
              설계 및 구현, 현대적인 웹 경험 제공
            </li>
            <li>
              기술적 지식이 없는 경영진도 사용 가능한 사내 인력 및 근태 관리
              어드민 포털 개발 및 운영, 효과적인 직원 관리 지원
            </li>
            <li>AWS 인프라 및 NoSQL 데이터베이스 모델링, 서버 구축 및 관리</li>
            <li>
              전반적인 백엔드 구현, 인프라 구축, 이벤트 설계 및 RESTful API 개발
            </li>
            <li>클라이언트 사용 가능한 CRUD API 구현</li>
            <li>
              이벤트 구독 시 자동 이메일 발송 기능을 포함한 어드민 시스템 구축
              (AWS SES, Node.js, Angular)
            </li>
            <li>NGINX를 이용한 인프라 구축 및 무중단 배포로 운영</li>
            <li>
              Google Analytics을 적용하여 서비스 사용자 데이터 분석
            </li>
            <li>GitHub Action을 기반으로 CI/CD 구성</li>
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
            <li>캐나다에 위치한 암호화폐 거래소 스타트업</li>
            <li>
              React 기반의 컴포넌트 아키텍처 설계 및 프론트엔드 생태계 구축으로
              기업의 기술 기반 강화
            </li>
            <li>
              Redux를 활용하여 효율적인 상태 관리 및 데이터 흐름 최적화로
              애플리케이션의 반응 속도 및 성능 향상
            </li>
            <li>
              AWS Lambda@Edge와 Facebook Open Graph를 사용해 소셜 미디어용 URL
              미리보기 기능 구현
            </li>
            <li>Apollo로 REST API를 GraphQL로 마이그레이션, 앱 성능 개선</li>
            <li>
              프론트엔드 최적화로 웹사이트 성능, 접근성, SEO 등 기존에 부족했던
              부분들을 전반적으로 개선
            </li>
            <li>
              다양한 외부 시스템을 성공적으로 통합, 고객이 신용카드를 이용해
              암호화폐를 구입할수 있는 기능 구현
            </li>
          </ul>
        </div>
      </div>

      <hr className="my-11"></hr>

      {/* Projects  */}
      {/* <div className="mb-11 font-semibold text-cyan-500 text-3xl uppercase">
        Project.
      </div> */}

      {/* WebGL Playground */}
      {/* <div className="md:grid md:grid-cols-3 md:gap-4">
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
      <hr className="my-11"></hr> */}

      {/* Lost Ark Bot */}
      {/* <div className="md:grid md:grid-cols-3 md:gap-4">
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
      <hr className="my-11"></hr> */}

      {/* Lental */}
      {/* <div className="md:grid md:grid-cols-3 md:gap-4">
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
      <hr className="my-11"></hr> */}

      {/* Caffeine Holic */}
      {/* <div className="md:grid md:grid-cols-3 md:gap-4">
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
      <hr className="my-11"></hr> */}

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
