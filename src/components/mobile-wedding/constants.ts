// 애니메이션 설정 상수
export const ANIMATION_CONFIG = {
  y: 100,
  opacity: 0,
  duration: 1.2,
  ease: "power2.out",
  scrollTrigger: {
    start: "top 90%",
    end: "bottom 40%",
    toggleActions: "play none none reverse",
    scrub: false,
  },
} as const;

// SVG 경로 설정
export const SVG_PATHS = {
  welcome: "/images/mobile-wedding/loading/welcome.svg",
  wedding: "/images/mobile-wedding/loading/to-our-wedding.svg",
} as const;

// BGM 설정
export const BGM_CONFIG = {
  src: "/audio/wedding-bgm.mp3", // 웨딩 BGM 파일 경로
  autoPlay: true,
  loop: true,
  volume: 0.3,
} as const;

// 갤러리 이미지 목록
export const GALLERY_IMAGES = [
  "/images/mobile-wedding/gallery/main.jpeg",
  "/images/mobile-wedding/gallery/main22.jpeg",
  "/images/mobile-wedding/gallery/main23.jpeg",
  "/images/mobile-wedding/gallery/main24.jpeg",
  "/images/mobile-wedding/gallery/EB44B0AD-92D7-46BF-AC01-C0780C0C7A29_1_102_o.jpeg",
  "/images/mobile-wedding/gallery/main.jpeg",
  "/images/mobile-wedding/gallery/main22.jpeg",
  "/images/mobile-wedding/gallery/main23.jpeg",
  "/images/mobile-wedding/gallery/main24.jpeg",
] as const;

// 섹션 컴포넌트 설정
export const WEDDING_SECTIONS = [
  { componentName: "GettingMarried", key: "getting-married" },
  { componentName: "GettingMarried2", key: "getting-married2" },
  { componentName: "Introduction", key: "introduction" },
  { componentName: "WeddingCalendar", key: "wedding-calendar" },
  { componentName: "Gallery", key: "gallery" },
  { componentName: "WeddingLocation", key: "wedding-location" },
  { componentName: "BankInfo", key: "bank-info" },
  { componentName: "Epilogue", key: "epilogue" },
] as const;

export interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  accountHolder: string;
  kakaoPayUrl?: string;
}

export interface BankSection {
  id: string;
  title: string;
  color: string;
  accounts: BankAccount[];
}

export const BANK_SECTIONS: BankSection[] = [
  {
    id: "groom",
    title: "신랑측",
    color: "text-[#5F89B8]",
    accounts: [
      {
        id: "groom-1",
        name: "신랑",
        accountNumber: "390401-04-083015",
        bankName: "국민은행",
        accountHolder: "KIM JAEUNG",
        kakaoPayUrl: "https://qr.kakaopay.com/FekG1fWkE",
      },
      {
        id: "groom-2",
        name: "신랑 어머니",
        accountNumber: "285-21-0209-832",
        bankName: "국민은행",
        accountHolder: "김화영",
        // No KakaoPay URL - only copy button will be shown
      },
      {
        id: "groom-3",
        name: "신랑 아버지",
        accountNumber: "390401-04-083015",
        bankName: "국민은행",
        accountHolder: "김정호",
        // No KakaoPay URL - only copy button will be shown
      },
    ],
  },
  {
    id: "bride",
    title: "신부측",
    color: "text-[#BB7273]",
    accounts: [
      {
        id: "bride-1",
        name: "신부",
        accountNumber: "3333-3333-3333-3333",
        bankName: "카카오뱅크",
        accountHolder: "고아라",
        kakaoPayUrl: "https://qr.kakaopay.com/FekG1fWkE",
      },
      {
        id: "bride-2",
        name: "신부 어머니",
        accountNumber: "4444-4444-4444-4444",
        bankName: "카카오뱅크",
        accountHolder: "음현희",
        kakaoPayUrl: "https://qr.kakaopay.com/FekG1fWkE",
      },
    ],
  },
];

// 스타일 설정
export const MOBILE_CONTAINER_STYLES = {
  width: "100%",
  maxWidth: "28rem",
  margin: "0 auto",
  border: "1px solid #e5e5e5",
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
  backgroundImage: "url('/images/mobile-wedding/bg_img_white.jpg')",
  backgroundRepeat: "repeat",
  backgroundSize: "auto",
  backgroundAttachment: "local",
} as const;

// SVG 애니메이션 설정
export const SVG_ANIMATION_CONFIG = {
  stroke: "#000",
  strokeWidth: 8,
  duration: 0.3,
  ease: "power1.inOut",
  stagger: 0.1,
} as const;

// SVG 스타일 설정
export const SVG_STYLES = {
  width: "min(280px,92vw)",
  height: "auto",
  overflow: "visible",
  maxWidth: "280px",
} as const;
