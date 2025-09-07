import Image from "next/image";
import { useCallback } from "react";

interface VenueCoordinates {
  lat: number;
  lng: number;
  address: string;
  name: string;
}

interface NavigationButtonsProps {
  venue: VenueCoordinates;
}

// Pre-defined navigation URLs for better performance
const NAVIGATION_URLS = {
  tmap: (venue: VenueCoordinates) =>
    `https://tmapapi.sktelecom.com/main/mobile/webview/route?goalname=${encodeURIComponent(
      venue.name
    )}&goalx=${venue.lng}&goaly=${venue.lat}`,

  kakao: (venue: VenueCoordinates) =>
    `https://map.kakao.com/link/to/${encodeURIComponent(
      venue.name
    )},${venue.lat},${venue.lng}`,

  naver: (venue: VenueCoordinates) =>
    `https://map.naver.com/v5/directions/-/-/${encodeURIComponent(venue.address)}/-/transit`,
};

export default function NavigationButtons({ venue }: NavigationButtonsProps) {
  // Optimized navigation handler
  const openNavigation = useCallback((service: string) => {
    const urlGenerator = NAVIGATION_URLS[service as keyof typeof NAVIGATION_URLS];
    if (urlGenerator) {
      const url = urlGenerator(venue);
      window.open(url, "_blank", "noopener,noreferrer");
    }
  }, [venue]);

  // Optimized NavigationButton component
  const NavigationButton = useCallback(({
    service,
    iconSrc,
    label,
  }: {
    service: string;
    iconSrc: string;
    label: string;
  }) => (
    <button
      onClick={() => openNavigation(service)}
      className="flex gap-2 items-center justify-center py-3 px-2 bg-white rounded-lg border border-neutral-200 shadow-sm hover:shadow-md hover:border-neutral-300 transition-all duration-200 active:scale-95"
      aria-label={`${label}로 길찾기`}
    >
      <Image
        src={iconSrc}
        alt=""
        width={20}
        height={20}
        className="size-4 object-contain"
      />
      <span className="text-xs text-neutral-700">{label}</span>
    </button>
  ), [openNavigation]);

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className="grid grid-cols-3 gap-3">
        <NavigationButton
          service="tmap"
          iconSrc="/assets/tmap_icon.png"
          label="티맵"
        />
        <NavigationButton
          service="kakao"
          iconSrc="/assets/kakao_icon.png"
          label="카카오내비"
        />
        <NavigationButton
          service="naver"
          iconSrc="/assets/navermap_icon_2.png"
          label="네이버지도"
        />
      </div>
    </div>
  );
}
