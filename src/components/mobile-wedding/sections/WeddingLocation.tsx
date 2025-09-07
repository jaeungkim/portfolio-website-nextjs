"use client";

import { useEffect, useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Naver Maps API types
declare global {
  interface Window {
    naver: any;
  }
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function WeddingLocation() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Wedding date: October 25th, 2025 at 11:30 AM
  const weddingDate = new Date("2025-10-25T11:30:00");

  // Wedding venue coordinates (서울특별시 마포구 서교동 449-13)
  const weddingLat = 37.5555;
  const weddingLng = 126.9236;

  // Naver Dynamic Map API configuration
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  // Load Naver Dynamic Maps API
  useEffect(() => {
    const loadNaverMaps = () => {
      if (window.naver && window.naver.maps) {
        initializeMap();
        return;
      }

      const script = document.createElement("script");
      script.src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=qytpphp4at`;
      script.async = true;
      script.onload = () => {
        if (window.naver && window.naver.maps) {
          initializeMap();
        }
      };
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.naver?.maps) return;

      const mapOptions = {
        center: new window.naver.maps.LatLng(weddingLat, weddingLng),
        zoom: 15,
        mapTypeControl: true,
        mapTypeControlOptions: {
          style: window.naver.maps.MapTypeControlStyle.BUTTON,
          position: window.naver.maps.Position.TOP_RIGHT,
        },
        zoomControl: true,
        zoomControlOptions: {
          style: window.naver.maps.ZoomControlStyle.SMALL,
          position: window.naver.maps.Position.RIGHT_CENTER,
        },
      };

      const map = new window.naver.maps.Map(mapRef.current, mapOptions);

      // Add marker for wedding venue
      const marker = new window.naver.maps.Marker({
        position: new window.naver.maps.LatLng(weddingLat, weddingLng),
        map: map,
        title: "살롱드레터 웨딩홀",
      });

      // Add info window
      const infoWindow = new window.naver.maps.InfoWindow({
        content: `
          <div style="padding: 10px; text-align: center;">
            <div style="font-weight: bold; margin-bottom: 5px;">살롱드레터 웨딩홀</div>
            <div style="font-size: 12px; color: #666;">서울특별시 마포구 서교동 449-13</div>
          </div>
        `,
      });

      window.naver.maps.Event.addListener(marker, "click", () => {
        if (infoWindow.getMap()) {
          infoWindow.close();
        } else {
          infoWindow.open(map, marker);
        }
      });

      setMapLoaded(true);
    };

    loadNaverMaps();
  }, []);

  useGSAP(
    () => {
      const section = sectionRef.current;
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
    },
    { scope: sectionRef }
  );

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const difference = weddingDate.getTime() - now.getTime();

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        const minutes = Math.floor((difference / 1000 / 60) % 60);
        const seconds = Math.floor((difference / 1000) % 60);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number): string => {
    return num.toString().padStart(2, "0");
  };

  const getWeddingMonth = () => {
    return weddingDate.toLocaleDateString("ko-KR", { month: "long" });
  };

  const getWeddingDate = () => {
    return weddingDate.toLocaleDateString("ko-KR", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const openNavigation = (service: string) => {
    const address = "서울특별시 마포구 서교동 449-13";
    const encodedAddress = encodeURIComponent(address);

    let url = "";
    switch (service) {
      case "tmap":
        url = `https://tmapapi.sktelecom.com/main/mobile/webview/route?goalname=살롱드레터&goalx=${weddingLng}&goaly=${weddingLat}`;
        break;
      case "kakao":
        url = `https://map.kakao.com/link/to/살롱드레터,${weddingLat},${weddingLng}`;
        break;
      case "naver":
        url = `https://map.naver.com/v5/directions/-/-/${encodedAddress}/-/transit`;
        break;
    }

    if (url) {
      window.open(url, "_blank");
    }
  };

  return (
    <div ref={sectionRef} className="py-[84px] px-6">
      <div className="flex flex-col items-center space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-medium text-neutral-900">Wedding Day</h1>
          <div className="text-sm text-neutral-600 space-y-1">
            <p className="font-mono">2025.10.25. 토요일 오전 11시 30분</p>
          </div>
        </div>

        {/* Wedding Venue Information */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-lg p-6 w-full max-w-sm text-center">
          <h2 className="text-lg font-medium text-neutral-900 mb-2">
            살롱드레터 웨딩홀
          </h2>
          <p className="text-sm text-neutral-600">
            서울특별시 마포구 서교동 449-13
          </p>
        </div>

        {/* Naver Dynamic Map */}
        <div className="w-full max-w-sm">
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-lg overflow-hidden">
            <div className="p-4 border-b border-neutral-100">
              <h3 className="text-sm font-medium text-neutral-800">
                오시는 길
              </h3>
            </div>
            <div className="relative">
              <div
                ref={mapRef}
                className="w-full h-64 bg-neutral-100"
                style={{ minHeight: '256px' }}
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

        {/* Navigation Buttons */}
        <div className="w-full max-w-sm">
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => openNavigation("tmap")}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
            >
              <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center mb-2">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span className="text-xs text-neutral-700 font-medium">티맵</span>
            </button>

            <button
              onClick={() => openNavigation("kakao")}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
            >
              <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center mb-2">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </div>
              <span className="text-xs text-neutral-700 font-medium">
                카카오내비
              </span>
            </button>

            <button
              onClick={() => openNavigation("naver")}
              className="flex flex-col items-center justify-center p-4 bg-white rounded-xl border border-neutral-100 shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
            >
              <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center mb-2">
                <svg
                  className="w-4 h-4 text-white"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <span className="text-xs text-neutral-700 font-medium">
                네이버지도
              </span>
            </button>
          </div>
        </div>

        {/* Wedding Calendar */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-lg p-8 w-full max-w-sm">
          <div className="text-center mb-6">
            <div className="text-lg font-light text-neutral-800 tracking-wide">
              {getWeddingMonth()}
            </div>
            <div className="w-12 h-px bg-neutral-200 mx-auto mt-3"></div>
          </div>

          <div className="grid grid-cols-7 gap-0.5">
            {/* Day headers */}
            {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
              <div
                key={day}
                className="py-3 text-center text-xs font-medium text-neutral-500 tracking-wider"
              >
                {day}
              </div>
            ))}

            {/* October 2025 Calendar */}
            {Array.from({ length: 35 }, (_, index) => {
              const dayNumber = index - 4; // October 2025 starts on Wednesday
              const isWeddingDay = dayNumber === 25;
              const isSunday = (index + 1) % 7 === 1; // Sundays
              const isSaturday = (index + 1) % 7 === 0; // Saturdays

              return (
                <div
                  key={index}
                  className={`py-3 text-center text-sm transition-all duration-200 ${
                    isWeddingDay
                      ? "bg-neutral-900 text-white rounded-full font-medium shadow-md"
                      : isSunday || isSaturday
                      ? "text-neutral-400"
                      : dayNumber > 0 && dayNumber <= 31
                      ? "text-neutral-700 hover:text-neutral-900 hover:bg-neutral-50 rounded-full cursor-pointer"
                      : "text-transparent"
                  }`}
                >
                  {dayNumber > 0 && dayNumber <= 31 ? dayNumber : ""}
                </div>
              );
            })}
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="bg-white rounded-2xl border border-neutral-100 shadow-lg p-8 w-full max-w-sm">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2 font-light">
                DAYS
              </div>
              <div className="text-3xl font-light text-neutral-900 tracking-tight">
                {timeLeft.days}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2 font-light">
                HOUR
              </div>
              <div className="text-3xl font-light text-neutral-900 tracking-tight">
                {formatNumber(timeLeft.hours)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2 font-light">
                MIN
              </div>
              <div className="text-3xl font-light text-neutral-900 tracking-tight">
                {formatNumber(timeLeft.minutes)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2 font-light">
                SEC
              </div>
              <div className="text-3xl font-light text-neutral-900 tracking-tight">
                {formatNumber(timeLeft.seconds)}
              </div>
            </div>
          </div>
        </div>

        {/* Wedding Message */}
        <div className="text-center">
          <p className="text-sm text-neutral-600">
            {timeLeft.days > 0
              ? `김재웅 ❤️ 고아라의 결혼식이 ${timeLeft.days}일 남았습니다.`
              : "김재웅 ❤️ 고아라의 결혼식을 축하합니다!"}
          </p>
        </div>
      </div>
    </div>
  );
}
