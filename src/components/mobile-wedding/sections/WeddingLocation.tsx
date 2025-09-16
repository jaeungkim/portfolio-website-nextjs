"use client";

import React, { useEffect, useRef } from "react";

import { useNaverMap } from "./hooks/useNaverMap";

import NaverMap from "./components/NaverMap";
import SectionContainer from "../components/SectionContainer";

const VENUE_COORDINATES = {
  lat: 37.5292719570904,
  lng: 126.924892738645,
  address: "서울 영등포구 여의공원로 101 C.C.M.M빌딩 지하1층",
  name: "운산",
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
          운산
        </h2>
        <p className="text-sm text-neutral-600 leading-relaxed max-w-xs">
          서울 영등포구 여의공원로 101 C.C.M.M빌딩 지하1층
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
          </div>
        </div>
      </div>

      <div className="text-center space-y-2 max-w-xs">
        <p className="text-xs text-neutral-500 leading-relaxed">
          대중교통 이용 시 여의나루역 1번 출구에서 도보 10분 거리
        </p>
        <p className="text-xs text-neutral-500 leading-relaxed">
          자가용 이용 시 주차장 입구에서 안내를 받아주세요
        </p>
      </div>
    </SectionContainer>
  );
}
