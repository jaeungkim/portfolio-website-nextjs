import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaGithub, FaLinkedin, FaRss } from "react-icons/fa";
import { HiOutlineMail } from "react-icons/hi";

// Function to calculate experience duration
const calculateExperience = (startDate, endDate = null) => {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();
  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  // Include the end month in the total count
  if (end.getDate() >= start.getDate()) {
    months++;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  // Normalize the total months to the correct number of years and months
  years += Math.floor(months / 12);
  months %= 12;

  // If there are 0 years, don't display the years part
  const yearDisplay = years > 0 ? `${years}년 ` : "";
  return `${yearDisplay}${months}개월`;
};

const experiences = [
  { start: "2024-01-01", end: null }, // Ongoing job
  { start: "2023-07-01", end: "2023-10-01" },
  { start: "2022-07-01", end: "2023-06-01" },
  { start: "2021-01-01", end: "2022-05-01" },
  // Add other experiences as needed
];

const calculateTotalExperience = (experiences) => {
  let totalMonths = 0;

  experiences.forEach((exp) => {
    const start = new Date(exp.start);
    const end = exp.end ? new Date(exp.end) : new Date();

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    // Include the end month in the total count
    if (end.getDate() >= start.getDate()) {
      months++;
    }

    // Adjust for negative months and convert years to months
    if (months < 0) {
      years--;
      months += 12;
    }
    totalMonths += years * 12 + months;
  });

  // Convert total months back into years and remaining months
  const totalYears = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  // Format the display for years and months
  const yearDisplay = totalYears > 0 ? `${totalYears}년 ` : "";
  return `${yearDisplay}${remainingMonths}개월`;
};

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
            해외 스타트업 환경에서 웹 서비스의 설계, 개발, 배포 및 운영을 통해
            2년간의 경험을 쌓은 개발자로서, 웹 서비스에 생동감을 불어넣는 모션
            구현을 통해 사용자 경험을 풍부하게 만드는 것을 좋아합니다.
          </p>
          <p className="text-base mb-4">
            웹 기술의 빠른 변화에 발맞추어, 지속적인 학습을 통해 최신 트렌드,
            보안 문제, 그리고 시스템 효율성에 관한 지식을 꾸준히 확장해
            왔습니다. 이러한 노력은 프로젝트에 혁신적인 아이디어를 적용하고
            비즈니스의 성장을 도모하는 데 큰 도움이 되었습니다. 또한, 자동화와
            프로세스 최적화에 집중함으로써 작업 효율성을 상당히 높일 수
            있었습니다.
          </p>
          <p className="text-base mb-4">
            성공적인 프로젝트는 원활한 커뮤니케이션에서 비롯된다는 것을 이해하고
            있습니다. 팀원들과의 페어 프로그래밍을 통해 지식과 아이디어를
            공유하는 것을 즐기며, 모든 이들과 긍정적이고 열린 마음으로
            소통합니다. 이러한 경험들은 저를 더 나은 개발자로 성장시키는
            원동력이 되었고, 계속해서 새로운 기술을 배우고 전문성을 키우는 데
            집중하고 있습니다.
          </p>
          <p className="text-base">
            캐나다 시민권자 이며 한국에 현재 F-4 재외동포 비자로 거주 중 입니다.
          </p>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* Work Experience */}
      <div className="flex justify-between">
        <div className="mb-11 font-semibold text-cyan-500 text-3xl uppercase">
          Work Experience.
        </div>
        {/* pill of total */}
        <div className="mt-2">
          <p className="text-xs py-1 px-4 bg-cyan-200 rounded-full">
            총 {calculateTotalExperience(experiences)}
          </p>
        </div>
      </div>

      {/* e8ight */}
      <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="md:text-right md:px-4 w-full">
          <p className="text-2xl font-medium text-[#808080] ">
            2024.01 ~
          </p>
          <p className="font-medium text-xs mt-2 py-1 px-4 bg-cyan-200 rounded-full w-fit ml-auto">
            {calculateExperience("2024-01-01")}
          </p>
        </div>

        <div className="col-span-2">
          <Link
            className="text-2xl font-medium hover:text-cyan-500"
            href="https://e8ight.co.kr"
            target="_blank"
          >
            <p>이에이트</p>
          </Link>
          <p className="text-base font-normal text-[#808080] italic mt-4">
            플랫폼 개발팀 프론트엔드 개발자
          </p>
          <ul className="py-4 text-base font-normal pl-8 list-disc flex flex-col gap-2">
            <li>플랫폼 개발팀 프론트엔드 개발자</li>
          </ul>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* Flashee */}
      <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="md:text-right md:px-4 w-full">
          <p className="text-2xl font-medium text-[#808080] ">
            2023.07 ~ 2023.10
          </p>
          <p className="font-medium text-xs mt-2 py-1 px-4 bg-cyan-200 rounded-full w-fit ml-auto">
            {calculateExperience("2023-07-01", "2023-10-01")}
          </p>
        </div>

        <div className="col-span-2">
          <Link
            className="text-2xl font-medium hover:text-cyan-500"
            href="https://flashee.app"
            target="_blank"
          >
            <p>Flashee</p>
          </Link>
          <p className="text-base font-normal text-[#808080] italic mt-2 mb-4">
            밴쿠버, 캐나다
          </p>
          <p className="text-base font-normal text-[#808080] italic">
            프론트엔드 개발자
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
              Supabase 및 서드파티(Instagram, TikTok 등) 로그인 키트를 통해
              플랫폼 보안 및 사용자 접근성 향상
            </li>
            <li>
              Redux를 활용하여 효율적인 상태 관리 및 데이터 흐름 최적화로
              애플리케이션의 반응 속도 및 성능 향상
            </li>
            <li>
              Shopify Payments를 사용한 결제 게이트웨이 통합, 카트 포기 감소 및
              성공적인 거래 증가
            </li>
            <li>AWS 및 Fly.io 을 이용한 클라우드 환경 구축</li>
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
        <div className="md:text-right md:px-4 w-full">
          <p className="text-2xl font-medium text-[#808080] ">
            2022.07 ~ 2023.06
          </p>
          <p className="font-medium text-xs mt-2 py-1 px-4 bg-cyan-200 rounded-full w-fit ml-auto">
            {calculateExperience("2022-07-01", "2023-06-01")}
          </p>
        </div>
        <div className="col-span-2">
          <Link
            className="text-2xl font-medium hover:text-cyan-500"
            href="https://www.aiclinic.ca"
            target="_blank"
          >
            <p>iClinic Systems Inc.</p>
          </Link>
          <p className="text-base font-normal text-[#808080] italic mt-2 mb-4">
            밴쿠버, 캐나다
          </p>
          <p className="text-base font-normal text-[#808080] italic">
            풀스택 개발자
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
            <li>Google Analytics을 적용하여 서비스 사용자 데이터 분석</li>
            <li>GitHub Action을 기반으로 CI/CD 구성</li>
          </ul>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* Catalyx */}
      <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="md:text-right md:px-4 w-full">
          <p className="text-2xl font-medium text-[#808080] ">
            2021.01 ~ 2022.05
          </p>
          <p className="font-medium text-xs mt-2 py-1 px-4 bg-cyan-200 rounded-full w-fit ml-auto">
            {calculateExperience("2021-01-01", "2022-05-01")}
          </p>
        </div>
        <div className="col-span-2">
          <Link
            className="text-2xl font-medium hover:text-cyan-500"
            href="https://www.catalyx.io"
            target="_blank"
          >
            <p>Catalx Management Ltd.</p>
          </Link>
          <p className="text-base font-normal text-[#808080] italic mt-2 mb-4">
            밴쿠버, 캐나다
          </p>
          <p className="text-base font-normal text-[#808080] italic">
            프론트엔드 개발자
          </p>
          <ul className="py-4 text-base font-normal pl-8 list-disc flex flex-col gap-2">
            <li>캐나다에 위치한 암호화폐 거래소 스타트업</li>
            <li>
              React 기반의 컴포넌트 아키텍처 설계 및 프론트엔드 생태계 구축으로
              기업의 기술 기반 강화
            </li>
            <li>
              다양한 외부 시스템을 성공적으로 통합, 고객이 신용카드를 이용해
              암호화폐를 구입할수 있는 기능 구현
            </li>
            <li>Apollo로 REST API를 GraphQL로 마이그레이션, 앱 성능 개선</li>
            <li>
              프론트엔드 최적화로 웹사이트 성능, 접근성, SEO 등 기존에 부족했던
              부분들을 전반적으로 개선
            </li>
            <li>
              AWS Lambda@Edge와 Facebook Open Graph를 사용해 소셜 미디어용 URL
              미리보기 기능 구현
            </li>
            <li>디자이너 팀원들과 협력하여 전체적인 UI/UX 개선</li>
          </ul>
        </div>
      </div>

      <hr className="my-11"></hr>

      {/* Projects  */}
      <div className="mb-11 font-semibold text-cyan-500 text-3xl uppercase">
        Project.
      </div>

      {/* BC Public Service */}
      <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          BC Public Service
        </div>
        <div className="col-span-2">
          <ul className="text-base font-normal pl-8 list-disc gap-2">
            <li>
              <p className="">비씨주 직원 및 프로젝트 관리 어플리케이션</p>
            </li>
            <li>
              <a
                className="text-cyan-500 hover:underline hover:underline-offset-2"
                href="https://github.com/jaeungkim/jaeung-kim-IS24-full-stack-competition-req97073"
                target="_blank"
              >
                깃허브 소스 코드
              </a>
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
          <ul className="text-base font-normal pl-8 list-disc gap-2">
            <li>
              <p className="">
                학생들이 만든 학생들을 위한 교내 하우징 및 부동산 검색 웹
                어플리케이션
              </p>
            </li>
            <li>
              <a
                className="text-cyan-500 hover:underline hover:underline-offset-2"
                href="https://www.youtube.com/watch?v=sIZqCxLnLSY&ab_channel=LentalRents"
                target="_blank"
              >
                프로젝트 소개 영상
              </a>
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
          <ul className="text-base font-normal pl-8 list-disc gap-2">
            <li>
              <p className="">
                Discord.js 로 제작된 파티/레이드 서칭 툴, 1000명 이상의 사용자
              </p>
            </li>
            <li>
              <a
                className="text-cyan-500 hover:underline hover:underline-offset-2"
                href="https://github.com/jaeungkim/lostark_bot"
                target="_blank"
              >
                깃허브 소스 코드
              </a>
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* WebGL Playground */}
      {/* <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          WebGL Playground
        </div>
        <div className="col-span-2">
          <ul className="text-base font-normal pl-8 list-disc gap-2">
            <li>
              <a className="">
                WebGL, GSAP, Three.js 등을 사용하여 만든 3D 개발자 포트폴리오
                탬플릿
              </a>
            </li>
            <li>
              <a
                className="text-cyan-500 hover:underline hover:underline-offset-2"
                href="https://github.com/jaeungkim/webGL-playground"
                target="_blank"
              >
                깃허브 소스 코드
              </a>
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
            <li>Agile/Scrum</li>
            <li>Jira</li>
            <li>Confluence</li>
            <li>Git</li>
            <li>GitHub</li>
            <li>GitLab</li>
            <li>BitBucket</li>
            <li>Slack</li>
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
          <Link
            className="text-2xl font-medium hover:text-cyan-500"
            href="https://www.ubc.ca/"
            target="_blank"
          >
            <p className="mb-2">브리티시 컬럼비아 대학교 (4년제)</p>
          </Link>
          <p className="text-base font-normal text-[#808080] italic">
            컴퓨터 과학과 졸업
          </p>
        </div>
      </div>

      {/* Secondary School */}
      <div className="md:grid md:grid-cols-3 md:gap-4 mt-11">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          2008.09 ~ 2013.06
        </div>
        <div className="col-span-2">
          <Link
            className="text-2xl font-medium hover:text-cyan-500"
            href="https://www.surreyschools.ca/semiahmoo"
            target="_blank"
          >
            <p>세미아무 세컨더리 학교</p>
          </Link>
        </div>
      </div>
      <hr className="my-11"></hr>

      {/* ETC */}
      <div className="mb-11 font-semibold text-cyan-500 text-3xl uppercase">
        ETC.
      </div>

      <div className="md:grid md:grid-cols-3 md:gap-4">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          2008.08
        </div>
        <div className="col-span-2">
          <p className="text-2xl font-medium mb-2">
            캐나다 밴쿠버 이민 (캐나다 시민권자)
          </p>
          <p className="text-base font-normal text-[#808080] italic">
            영어 원어민 수준
          </p>
        </div>
      </div>

      <div className="md:grid md:grid-cols-3 md:gap-4 mt-11">
        <div className="text-2xl font-medium text-[#808080] md:text-right md:px-4">
          2023.12 ~
        </div>
        <div className="col-span-2">
          <p className="text-2xl font-medium mb-2">
            한국 F-4 재외동포 비자로 거주 중
          </p>
          {/* <p className="text-base font-normal text-[#808080] italic">영어 원어민 수준</p> */}
        </div>
      </div>

      <footer className="pt-[150px] flex flex-col items-center justify-center">
        <p className="text-base">감사합니다.</p>
        <div className="my-[50px] text-sm text-[#808080] text-center">
          <p>Last updated: 2024.01.05</p>
          <a className="hover:text-cyan-500" href="https://www.jaeungkim.com">
            @jaeungkim
          </a>
        </div>
      </footer>
    </div>
  );
}
