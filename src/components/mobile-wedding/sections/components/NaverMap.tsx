import { RefObject } from "react";

interface NaverMapProps {
  mapRef: RefObject<HTMLDivElement | null>;
  mapLoaded: boolean;
}

export default function NaverMap({ mapRef, mapLoaded }: NaverMapProps) {
  return (
    <div className="w-full max-w-sm">
      <div className="bg-white rounded-2xl border border-neutral-100 shadow-lg overflow-hidden">
        <div className="relative">
          <div
            ref={mapRef}
            className="w-full h-64 bg-neutral-100"
            style={{ minHeight: "256px" }}
          />
          {!mapLoaded && (
            <div className="absolute inset-0 flex items-center justify-center bg-neutral-100">
              <div className="text-neutral-500 text-sm">
                지도를 불러오는 중...
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
