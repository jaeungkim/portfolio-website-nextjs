export interface ResumeSubprojectSection {
  title: string;
  items: string[];
}

export interface ResumeSubproject {
  title: string;
  link: string;
  summary: string;
  sections: ResumeSubprojectSection[];
}

export interface ResumeExperience {
  period: string;
  startDate: string;
  endDate?: string;
  title: string;
  link?: string;
  location: string;
  role: string;
  bullets: string[];
  pills: string[];
  projects?: ResumeSubproject[];
}

export interface ResumeProjectSummary {
  title: string;
  link: string;
  pills: string[];
  bullets: string[];
}

export interface ResumePersonalInfo {
  name: string;
  role: string;
  image: string;
  description: string[];
  email: string;
  github: string;
  linkedin: string;
  notion: string;
}

export const resumePersonalInfo: ResumePersonalInfo = {
  name: "김재웅",
  role: "Frontend Developer",
  image: "/images/profile.jpeg",
  description: [
    "안녕하세요. 캐나다 밴쿠버에서 나고 자라 다양한 문화 속에서 성장한 프론트엔드 개발자입니다. 웹 서비스의 기획과 설계부터 개발, 배포 및 운영까지 전반적인 과정을 경험하며 꾸준히 성장해왔습니다.",
    "저는 단순히 화면을 구현하는 것에 그치지 않고, 코드의 구조와 흐름을 이해하며 서비스의 완성도를 높이는 데 집중하는 개발자입니다. 누구나 쉽게 이해하고 유지보수할 수 있는 명확한 코드를 작성하는 것을 중요하게 생각하며, 견고하고 효율적인 구조를 만들기 위해 항상 고민하고 있습니다.",
    "또한 완성도 높은 결과물을 만들기 위한 집요함을 제 강점이라고 생각합니다. 다만 빠르게 변화하는 개발 환경 속에서 완벽함만을 추구하기보다는, 우선순위를 명확히 설정해 핵심 기능을 안정적으로 구현하고 이후 구조적인 개선을 지속적으로 발전시키는 방식으로 균형을 맞추고 있습니다.",
    "개발은 혼자 완성하는 일이 아니라 함께 만들어가는 과정이라고 생각합니다. 프로젝트의 방향성과 문제 상황을 투명하게 공유하고, 동료들과의 기술적 논의와 협업을 통해 더 나은 해결책을 찾는 것을 중요하게 여기고 있습니다.",
    "앞으로도 꾸준한 학습과 경험을 통해 더 높은 수준의 기술적 완성도를 갖춘 프론트엔드 개발자로 성장해 나가겠습니다.",
  ],
  email: "jaewoongkim95@gmail.com",
  github: "https://github.com/jaeungkim",
  linkedin: "https://www.linkedin.com/in/jaeungkim0526",
  notion: "https://jaeungkim.notion.site",
};

export const resumeExperiences: ResumeExperience[] = [
  {
    period: "2024.01 ~ 현재",
    startDate: "2024-01-08",
    title: "이에이트",
    link: "https://e8ight.co.kr/ndxpro/",
    location: "잠실, 대한민국",
    role: "플랫폼 개발팀 프론트엔드 개발자 | 주임 연구원",
    bullets: [
      "모노레포 구조 설계 및 디자인 시스템 공용화 → 문서화 및 팀 공유, 앱별 브랜치 전략과 Jenkins+Docker 기반 CI/CD 구축으로 협업 및 배포 체계 정립",
      "CRA와 NPM 환경을 Vite와 Yarn Berry(PnP)로 전환하여 Docker 기반 CI 빌드 시간을 기존 10분에서 1~2분 수준으로 대폭 단축",
      "Sentry를 사내 리눅스 서버에 Self-Hosted 방식으로 구축하여 오류 추적 체계 중앙화 및 운영 안정성 강화",
      "사내 프론트엔드 공통 템플릿(i18n, Prettier/ESLint, 필수 라이브러리, Storybook 기반 디자인 시스템 포함) 제작 및 배포 → 신규 프로젝트 초기 세팅 시간 대폭 단축 및 개발 환경 표준화",
      "코드 리뷰 및 기술 세션 주도로 팀 내 코드 품질 개선 및 지식 공유 문화 확산",
      "NIPA(정보통신산업진흥원) 주관 GSMP 프로그램에 선정되어 워싱턴 D.C. 현지 행사 참가 → 팀 대표로서 글로벌 파트너 대상 기술 소개 및 협업 기회 발굴",
    ],
    pills: [
      "TypeScript",
      "React",
      "Next.js",
      "Nest.js",
      "TanStack-Query",
      "Zustand",
      "Recoil",
      "Tailwind CSS",
      "Shadcn",
      "Motion",
      "D3.js",
      "Canvas API",
      "Socket.io",
      "WebRTC",
      "Storybook",
      "Figma",
      "Docker",
      "Sentry",
      "AWS",
    ],
    projects: [
      {
        title: "NDXPRO AI",
        link: "https://jaeungkim.notion.site/NDXPRO-AI-24bc3276c40c80b7bfb4f7d392b2c823",
        summary: "현대자동차 R&D 기술 문서 분석 및 근거 기반 질의응답 플랫폼",
        sections: [
          {
            title: "그래프 시각화 SDK 설계 및 개발",
            items: [
              "대량 렌더링에 강한 Sigma.js를 검토했으나 LLM 응답에 따른 단계적 확장과 애니메이션 타이밍 제어에 한계가 있어 Canvas + D3 Force 기반으로 직접 설계",
              "렌더링/데이터/이벤트/뷰포트/드래그 등 역할별 Manager로 분리해 기능 간 의존성을 최소화하고, 이벤트 기반 API로 외부에서 그래프 상태 변화에 쉽게 대응할 수 있도록 설계",
              "화면 밖 노드 렌더링을 생략하고 물리 시뮬레이션 alpha 값을 상황별로 조정해 수천 개 노드에서도 60fps 유지",
              "노드 연결 생성 시 플로우 애니메이션으로 관계 방향을 시각화해 사용자가 데이터 흐름을 직관적으로 파악 가능",
              "팀 내 다른 프로젝트에서도 사용할 수 있도록 패키지로 분리하고 API/아키텍처 문서 정리",
            ],
          },
          {
            title: "LLM 스트리밍 기반 실시간 그래프 시각화",
            items: [
              "소켓 이벤트가 빠르게 연속으로 들어올 때 애니메이션이 겹쳐서 UX가 깨지는 문제를 이벤트 큐로 해결, 노드 추가 → 포커스 → 하이라이트 순서를 보장해 사용자가 그래프 변화를 따라갈 수 있도록 개선",
              "세션 생성, 연결 상태, 타임아웃 처리 등 소켓 라이프사이클 전체를 직접 설계하여 연결 실패 시에도 UI가 정상적으로 동작",
              "처음에는 핵심 노드만 보여주고 클릭 시 API로 연결 데이터를 조회해 확장하는 방식으로 초기 로딩 속도와 정보 과부하 문제를 동시에 해결",
              "새 세션 생성이나 대화 초기화 시 그래프도 함께 리셋되도록 Store 간 연동 처리",
            ],
          },
        ],
      },
      {
        title: "NDXPRO ADMIN WEB",
        link: "https://jaeungkim.notion.site/NDXPRO-ADMIN-WEB-V4-2d1c3276c40c80dca27ee963af65e2af",
        summary:
          "NGSI-LD 기반 디지털 트윈 데이터를 정제하고 모델링·운영하는 NDXPRO 핵심 플랫폼",
        sections: [
          {
            title: "Data Manager V4 & V3 아키텍처 설계 및 고도화",
            items: [
              "데이터 모델 간 관계를 시각화하는 다이어그램 SDK 설계, Dagre로 계층형 레이아웃을 자동 계산해 복잡한 관계도 깔끔하게 표현",
              "관계 클릭 시 연결된 모델을 API로 조회해 on-demand로 확장, 새로 추가된 노드에 자동 포커스",
              "같은 타입의 관계는 그룹 노드로 묶어 시각적 복잡도를 줄이고, 재귀적으로 하위 관계까지 탐색 가능하도록 설계",
              "줌/팬, 마우스 휠 줌, fitToScreen 등 뷰포트 제어를 직접 구현해 UX 개선",
              "데이터 모델 CRUD와 다이어그램 상태를 연동해 변경 사항이 즉시 반영되도록 구현",
            ],
          },
        ],
      },
      {
        title: "NDX CLOUD",
        link: "https://jaeungkim.notion.site/NDXPRO-KCLOUD-24bc3276c40c80b4afcef5f74478cbb5",
        summary:
          "드론·지상 촬영 이미지를 사진측량 기반으로 정사영상 지도, 3D 모델, 포인트클라우드를 생성·시각화하는 클라우드 플랫폼",
        sections: [
          {
            title: "대용량 이미지 메타데이터 처리 아키텍처 최적화",
            items: [
              "JPEG APP1 마커 분석을 통한 선택적 데이터 읽기 전략 설계로 메모리 96% 절약 (20GB → 800MB)",
              "병렬 처리 아키텍처 설계 및 구현으로 메타데이터 추출 시간 95% 단축 (6분 40초 → 20초)",
              "AWS S3 Presigned URL 기반 직접 업로드 아키텍처 설계로 백엔드 의존성 제거",
              "배치 요청 및 동시 스트림 업로드 전략을 통한 처리 효율성 극대화로 업로드 시간 50% 단축 (20분 → 10분) 및 서버 부하 70% 감소",
            ],
          },
        ],
      },
      {
        title: "NDXPRO PMIS",
        link: "https://jaeungkim.notion.site/NDXPRO-PMIS-1d4c3276c40c809ca6dad49c9ce5f1b4?pvs=74",
        summary: "프로젝트 전체적인 관리를 통합한 웹 솔루션",
        sections: [
          {
            title: "WBS 기반 Gantt Chart 아키텍처 설계 및 최적화",
            items: [
              "복잡한 프로젝트 데이터 시각화를 위한 확장 가능한 Gantt Chart 아키텍처 설계 및 구현",
              "Optimistic UI 패턴을 적용한 실시간 구조/일정 수정 시스템 구축",
              "Virtualization을 통한 대규모 데이터 렌더링 최적화로 DOM 렌더링 성능 40% 개선",
            ],
          },
        ],
      },
      {
        title: "NDXPRO EPC",
        link: "https://jaeungkim.notion.site/NDXPRO-EPC-1d4c3276c40c8056a15cd797331f9d02",
        summary:
          "설계, 조달, 시공 전 과정을 1D·2D·3D 데이터로 통합 시각화하는 웹 솔루션",
        sections: [
          {
            title: "2D 도면 뷰어 및 대시보드 아키텍처 설계",
            items: [
              "SVG 기반 2D 도면 뷰어 아키텍처 설계 및 좌표 변환 시스템을 통한 확대/축소 상태에서의 마크업 위치 정확도 보장",
              "사용자 맞춤형 대시보드 레이아웃 아키텍처 설계 및 Recoil Persist를 활용한 상태 지속성 구현",
              "iframe + postMessage API 기반 마이크로프론트엔드 아키텍처로 외부 3D Viewer와의 실시간 데이터 통신 시스템 구축",
            ],
          },
        ],
      },
      {
        title: "Samsung Thync",
        link: "https://jaeungkim.notion.site/Samsung-Thync-1d4c3276c40c805aaab4ebde962f5d00?pvs=4",
        summary:
          "상일동 삼성물산 BEMS 시스템의 Unreal 앱 내 사용자·자산 관리를 위한 웹뷰 기반의 관리 시스템",
        sections: [
          {
            title: "Unreal 연동 인증 시스템 아키텍처 설계",
            items: [
              "SSO 및 일반 로그인을 통합 지원하는 인증 아키텍처 설계 및 구현",
              "최초 로그인 시 자동 사용자 등록 및 권한 승인을 위한 워크플로우 설계 및 구현",
              "백엔드 리소스 제약 상황에서 NestJS 기반 인증/권한 관리 마이크로서비스 아키텍처 설계 및 구축",
            ],
          },
        ],
      },
    ],
  },
  {
    period: "2023.06 ~ 2023.10",
    startDate: "2023-06-16",
    endDate: "2023-10-13",
    title: "Flashee",
    location: "밴쿠버, 캐나다",
    role: "프론트엔드 개발자",
    bullets: [
      "통합 의류 쇼핑 마켓플레이스(E-Commerce) 스타트업의 첫 번째 개발자로 입사하여 프론트엔드 서비스 전반 기획/개발/배포/운영 담당",
      "Shopify Marketplaces 통합을 위한 E-Commerce 플랫폼 아키텍처 설계 및 구축",
      "Supabase 및 서드파티(Instagram, TikTok 등) 로그인 키트 통합 아키텍처 설계로 플랫폼 보안 및 사용자 접근성 향상",
      "Shopify Payments 결제 게이트웨이 통합 전략 수립 및 구현으로 카트 포기율 감소 및 거래 성공률 개선",
    ],
    pills: [
      "React",
      "Next.js",
      "Redux",
      "Tailwind CSS",
      "Supabase",
      "Shopify",
      "AWS",
    ],
  },
  {
    period: "2022.07 ~ 2023.06",
    startDate: "2022-07-12",
    endDate: "2023-06-15",
    title: "iClinic Systems Inc.",
    location: "밴쿠버, 캐나다",
    role: "풀스택 개발자",
    bullets: [
      "EMR(Electronic Medical Records) SaaS 스타트업에서 풀스택 개발자로 활동",
      "WebGL 기반 마케팅 프로젝트 아키텍처를 독자적으로 설계 및 구현하여 현대적인 웹 경험 제공",
      "Framer Motion과 GSAP을 활용한 인터랙션 및 애니메이션 전략 설계로 사용자 경험 개선",
      "기술적 지식이 없는 경영진도 사용 가능한 인력 및 근태 관리 어드민 포털 아키텍처 설계 및 운영",
      "백엔드 API 아키텍처, AWS 인프라 설계, MongoDB 데이터베이스 스키마 설계 및 CI/CD 파이프라인 구축",
    ],
    pills: [
      "Angular",
      "Node.js",
      "Express.js",
      "MongoDB",
      "SASS",
      "Framer Motion",
      "GSAP",
      "WebGL",
      "Three.js",
      "AWS",
    ],
  },
  {
    period: "2021.01 ~ 2022.05",
    startDate: "2021-01-07",
    endDate: "2022-05-15",
    title: "Catalx Management Ltd.",
    location: "밴쿠버, 캐나다",
    role: "프론트엔드 개발자",
    bullets: [
      "암호화폐 거래소 스타트업에서 React 기반 컴포넌트 아키텍처 설계 및 확장 가능한 시스템 구축",
      "신용카드 결제 시스템 통합 아키텍처 설계 및 암호화폐 구매 플로우 구현",
      "AWS Lambda@Edge와 Facebook Open Graph를 활용한 소셜 미디어 URL 미리보기 최적화 전략 수립 및 구현",
      "디자이너와 협업하여 UI/UX 아키텍처 개선 및 사용자 경험 향상",
    ],
    pills: ["React", "GraphQL", "AWS", "Figma"],
  },
];

export const resumeProjects: ResumeProjectSummary[] = [
  {
    title: "React Gantt Chart",
    link: "https://jaeungkim.com/gantt-chart",
    pills: ["React", "Vite", "Zustand"],
    bullets: [
      "수천 개 Task 데이터를 Virtualization 및 Lazy Loading 아키텍처로 렌더링 성능 40% 개선한 오픈소스 Gantt Chart 라이브러리",
      "WBS 기반 프로젝트 관리 아키텍처 설계 및 Optimistic UI 패턴을 통한 실시간 구조/일정 수정 시스템 구축",
      "확장 가능한 플러그인 아키텍처와 경량화 설계로 실무 환경에서 활용 중이며, 커뮤니티 피드백을 반영한 지속적 개선",
    ],
  },
  {
    title: "Portfolio Website",
    link: "https://github.com/jaeungkim/portfolio-website-nextjs",
    pills: [
      "Next 15 (App)",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Three.js",
    ],
    bullets: [
      "Next.js App Router와 SSG를 활용한 정적 사이트 아키텍처 설계 및 프로젝트/기술 블로그 통합 관리 시스템",
      "WebGL과 Three.js를 활용한 3D 인터랙션 아키텍처 설계 및 렌더링 성능 최적화",
      "이미지 최적화 전략 및 반응형 디자인 아키텍처를 통한 성능 최적화 및 사용자 경험 개선",
    ],
  },
  {
    title: "BC Government",
    link: "https://github.com/jaeungkim/moti-is24-code-challenge",
    pills: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Docker",
    ],
    bullets: [
      "BC 주정부 IS24 Full Stack Competition 과제로 개발한 직원 관리 시스템 아키텍처 설계",
      "조직 계층 구조 관리를 위한 데이터 모델 설계 및 효율적인 UI/UX 아키텍처 구현",
      "React 프론트엔드, Node.js 백엔드, PostgreSQL 데이터베이스 아키텍처 설계 및 Docker 기반 컨테이너화 배포",
    ],
  },
  {
    title: "Lost Ark Discord Bot",
    link: "https://github.com/jaeungkim/lostark_bot",
    pills: ["Node.js", "Discord.js", "Heroku", "JavaScript"],
    bullets: [
      "Discord.js 기반의 Lost Ark 파티/레이드 모집 봇 아키텍처 설계로 게임 커뮤니티의 매칭 효율성 개선",
      "명령어 기반 이벤트 핸들링 아키텍처 및 자동 알림 시스템 설계로 사용자 편의성 향상",
      "실제 커뮤니티에서 운영되며 사용자 피드백을 반영한 지속적인 아키텍처 개선 및 유지보수",
    ],
  },
];
