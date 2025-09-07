"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { useNaverMap } from "./hooks/useNaverMap";

import NaverMap from "./components/NaverMap";
import NavigationButtons from "./components/NavigationButtons";

gsap.registerPlugin(ScrollTrigger);

const VENUE_COORDINATES = {
  lat: 37.5555,
  lng: 126.9236,
  address: "서울특별시 마포구 서교동 449-13",
  name: "경복궁 서교점",
};

export default function WeddingLocation() {
  const mapRef = useRef<HTMLDivElement>(null);

  const { mapLoaded, initializeMap } = useNaverMap(mapRef, VENUE_COORDINATES);

  // GSAP animation
  useEffect(() => {
    const section = document.querySelector('[data-section="wedding-location"]');
    if (section) {
      gsap.fromTo(
        section,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: section,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            scrub: false,
          },
        }
      );
    }
  }, []);

  // Initialize map when component mounts
  React.useEffect(() => {
    initializeMap();
  }, [initializeMap]);

  return (
    <div className="py-[84px] px-6">
      <div className="flex flex-col items-center gap-8">
        <NaverMap mapRef={mapRef} mapLoaded={mapLoaded} />

        <NavigationButtons venue={VENUE_COORDINATES} />
      </div>
    </div>
  );
}
