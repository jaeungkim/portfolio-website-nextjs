// 섹션 컴포넌트 인터페이스
export interface WeddingSection {
  componentName: string;
  key: string;
}

// 갤러리 컴포넌트 인터페이스
export interface GalleryProps {
  images: readonly string[];
  onToggleTimeline: () => void;
  showTimeline: boolean;
}

// 로딩 화면 컴포넌트 인터페이스
export interface LoadingScreenProps {
  onLoadingComplete: () => void;
}

// 라이트박스 컴포넌트 인터페이스
export interface LightboxProps {
  images: readonly string[];
  initialIndex: number;
  onClose: () => void;
}

// 메인 웨딩 화면 컴포넌트 인터페이스
export interface MainWeddingScreenProps {
  // 추가 속성이 필요한 경우 여기에 정의
}

// 모달 컴포넌트 인터페이스
export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  overlayClassName?: string;
  className?: string;
  closeOnOverlayClick?: boolean;
  closeOnEscape?: boolean;
  children: React.ReactNode;
}

// 애니메이션 설정 인터페이스
export interface AnimationConfig {
  y: number;
  opacity: number;
  duration: number;
  ease: string;
  scrollTrigger: {
    start: string;
    end: string;
    toggleActions: string;
    scrub: boolean;
  };
}

// SVG 애니메이션 설정 인터페이스
export interface SvgAnimationConfig {
  stroke: string;
  strokeWidth: number;
  duration: number;
  ease: string;
  stagger: number;
}

// 스타일 설정 인터페이스
export interface MobileContainerStyles {
  width: string;
  maxWidth: string;
  margin: string;
  border: string;
  boxShadow: string;
  backgroundImage: string;
  backgroundRepeat: string;
  backgroundSize: string;
  backgroundAttachment: string;
}

// 터치 이벤트 인터페이스
export interface TouchPosition {
  x: number;
  y: number;
}

// SVG 로더 훅 반환 타입
export interface SvgLoaderReturn {
  welcomeRef: React.RefObject<HTMLDivElement | null>;
  weddingRef: React.RefObject<HTMLDivElement | null>;
}

// 웨딩 애니메이션 훅 타입
export interface WeddingAnimationsHook {
  (dependencies?: any[]): void;
}

// 컴포넌트 상태 인터페이스
export interface ComponentState {
  isLoading?: boolean;
  showTimeline?: boolean;
  lightboxIndex?: number | null;
  isReady?: boolean;
}

// 에러 상태 인터페이스
export interface ErrorState {
  hasError: boolean;
  errorMessage?: string;
}

// 로딩 상태 인터페이스
export interface LoadingState {
  isLoading: boolean;
  progress?: number;
}

// 이벤트 핸들러 타입들
export type ClickHandler = (event: React.MouseEvent) => void;
export type TouchHandler = (event: React.TouchEvent) => void;
export type KeyboardHandler = (event: KeyboardEvent) => void;
export type ToggleHandler = () => void;
export type CloseHandler = () => void;
