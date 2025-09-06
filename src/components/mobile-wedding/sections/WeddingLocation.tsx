import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

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

  // Wedding date: October 25th, 2024 at 11:30 AM
  const weddingDate = new Date("2025-10-25T11:30:00");

  useEffect(() => {
    const section = sectionRef.current;

    // Animation for the wedding calendar section
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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

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
        // Wedding has passed or is today
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

  return (
    <div ref={sectionRef} className="py-[84px] px-6">
      <div className="flex flex-col items-center space-y-8">
        {/* Title */}
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-medium text-neutral-900">Wedding Day</h1>
          <div className="text-sm text-neutral-600 space-y-1">
            <p className="font-mono">2024.10.25. 금요일 오전 11시 30분</p>
          </div>
        </div>

        {/* Wedding Calendar */}
        <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-6 w-full max-w-sm">
          <div className="text-center mb-4">
            <div className="text-sm font-medium text-neutral-900 mb-2">
              {getWeddingMonth()}
            </div>
          </div>
          <div className="grid grid-cols-7 gap-1 text-xs">
            {/* Day headers */}
            {["일", "월", "화", "수", "목", "금", "토"].map((day) => (
              <div key={day} className="p-2 text-center font-medium text-neutral-700">
                {day}
              </div>
            ))}

            {/* October 2024 Calendar */}
            {Array.from({ length: 35 }, (_, index) => {
              const dayNumber = index - 0; // October 2024 starts on Tuesday
              const isWeddingDay = dayNumber === 25;
              const isSunday = (index + 1) % 7 === 1; // Sundays
              const isSaturday = (index + 1) % 7 === 0; // Saturdays

              return (
                <div
                  key={index}
                  className={`p-2 text-center text-xs ${
                    isWeddingDay
                      ? "bg-green-200 text-neutral-900 rounded-full font-medium"
                      : isSunday || isSaturday
                      ? "text-red-500"
                      : dayNumber > 0 && dayNumber <= 31
                      ? "text-neutral-700"
                      : "text-neutral-200"
                  }`}
                >
                  {dayNumber > 0 && dayNumber <= 31 ? dayNumber : ""}
                </div>
              );
            })}
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="bg-white rounded-lg border border-neutral-200 shadow-sm p-6 w-full max-w-sm">
          <div className="grid grid-cols-4 gap-3">
            <div className="text-center">
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
                DAYS
              </div>
              <div className="text-2xl font-bold text-neutral-900">
                {timeLeft.days}
              </div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
                HOUR
              </div>
              <div className="text-2xl font-bold text-neutral-900">
                {formatNumber(timeLeft.hours)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
                MIN
              </div>
              <div className="text-2xl font-bold text-neutral-900">
                {formatNumber(timeLeft.minutes)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-[10px] text-neutral-500 uppercase tracking-wider mb-1">
                SEC
              </div>
              <div className="text-2xl font-bold text-neutral-900">
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
