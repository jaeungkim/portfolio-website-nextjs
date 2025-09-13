"use client";

import React, { useEffect, useRef } from "react";

import { useNaverMap } from "./hooks/useNaverMap";

import NaverMap from "./components/NaverMap";
import SectionContainer from "../components/SectionContainer";

const VENUE_COORDINATES = {
  lat: 37.5555,
  lng: 126.9236,
  address: "서울특별시 마포구 서교동 449-13",
  name: "경복궁 서교점",
};

export default function WeddingLocation() {
  const mapRef = useRef<HTMLDivElement>(null);
  const { mapLoaded, initializeMap } = useNaverMap(mapRef, VENUE_COORDINATES);

  useEffect(() => initializeMap(), [initializeMap]);

  return (
    <SectionContainer sectionKey="wedding-location">
      <div className="text-center space-y-6">
        <h1 className="text-2xl font-medium text-neutral-900 tracking-wide">
          오시는 길
        </h1>
        <div className="w-12 h-px bg-neutral-300 mx-auto"></div>
      </div>

      <div className="text-center space-y-3">
        <h2 className="text-xl font-light text-neutral-800 tracking-wide">
          경복궁 서교점
        </h2>
        <p className="text-sm text-neutral-600 leading-relaxed max-w-xs">
          서울특별시 마포구 서교동 449-13
        </p>
      </div>

      <div className="w-full flex justify-center">
        <NaverMap mapRef={mapRef} mapLoaded={mapLoaded} />
      </div>

      <div className="rounded-2xl p-4 w-full ">
        <div className="text-center space-y-4">
          <div className="space-y-2">
            <h3 className="text-lg font-medium text-neutral-800 tracking-wide">
              주차 안내
            </h3>
            <div className="w-8 h-px bg-neutral-300 mx-auto"></div>
          </div>

          <div className="space-y-3 text-sm text-neutral-700 leading-relaxed">
            <p>
              주차요원의 안내를 받아
              <br />
              <span className="font-medium">내부 주차장</span>을 이용해 주시기
              바랍니다.
            </p>

            <div className="pt-2">
              <p className="text-xs text-neutral-500 italic">
                발렛 서비스: ₩2,000
                <br />
                <span className="text-neutral-400">
                  (편리한 발렛 주차를 이용하실 수 있습니다)
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center space-y-2 max-w-xs">
        <p className="text-xs text-neutral-500 leading-relaxed">
          대중교통 이용 시 홍대입구역 1번 출구에서 도보 10분 거리
        </p>
        <p className="text-xs text-neutral-500 leading-relaxed">
          자가용 이용 시 주차장 입구에서 안내를 받아주세요
        </p>
      </div>
    </SectionContainer>
  );
}
