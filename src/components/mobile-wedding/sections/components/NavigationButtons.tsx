import Image from "next/image";

interface VenueCoordinates {
  lat: number;
  lng: number;
  address: string;
  name: string;
}

interface NavigationButtonsProps {
  venue: VenueCoordinates;
}

export default function NavigationButtons({ venue }: NavigationButtonsProps) {
  const openNavigation = (service: string) => {
    const encodedAddress = encodeURIComponent(venue.address);
    let url = "";

    switch (service) {
      case "tmap":
        url = `https://tmapapi.sktelecom.com/main/mobile/webview/route?goalname=${encodeURIComponent(
          venue.name
        )}&goalx=${venue.lng}&goaly=${venue.lat}`;
        break;
      case "kakao":
        url = `https://map.kakao.com/link/to/${encodeURIComponent(
          venue.name
        )},${venue.lat},${venue.lng}`;
        break;
      case "naver":
        url = `https://map.naver.com/v5/directions/-/-/${encodedAddress}/-/transit`;
        break;
    }

    if (url) {
      window.open(url, "_blank");
    }
  };

  const NavigationButton = ({
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
      className="flex gap-2 items-center justify-center py-2 px-2 bg-white rounded-sm border border-neutral-100 shadow-sm"
    >
      <Image
        src={iconSrc}
        alt={`${label} icon`}
        width={24}
        height={24}
        className="size-4 object-contain"
      />

      <span className="text-sm text-neutral-700">{label}</span>
    </button>
  );

  return (
    <div className="w-full max-w-sm">
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
