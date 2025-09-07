import { useState, useEffect } from "react";

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export default function WeddingCalendar() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // Wedding date: October 25th, 2024 at 11:30 AM
  const weddingDate = new Date("2025-10-25T11:30:00");

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
    <div className="py-[64px] px-6">
      <div className="flex flex-col items-center space-y-8">
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

            {/* October 2024 Calendar */}
            {Array.from({ length: 35 }, (_, index) => {
              const dayNumber = index - 0; // October 2024 starts on Tuesday
              const isWeddingDay = dayNumber === 25;
              const isSunday = (index + 1) % 7 === 1; // Sundays
              const isSaturday = (index + 1) % 7 === 0; // Saturdays

              return (
                <div
                  key={index}
                  className={`py-3 text-center text-sm transition-all duration-200 ${
                    isWeddingDay
                      ? "bg-[#bb7273] text-white rounded-full font-medium shadow-md"
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
              <div className="text-3xl font-light text-neutral-500 tracking-tight">
                {timeLeft.days}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2 font-light">
                HOUR
              </div>
              <div className="text-3xl font-light text-neutral-500 tracking-tight">
                {formatNumber(timeLeft.hours)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2 font-light">
                MIN
              </div>
              <div className="text-3xl font-light text-neutral-500 tracking-tight">
                {formatNumber(timeLeft.minutes)}
              </div>
            </div>
            <div className="text-center">
              <div className="text-xs text-neutral-500 uppercase tracking-widest mb-2 font-light">
                SEC
              </div>
              <div className="text-3xl font-light text-neutral-500 tracking-tight">
                {formatNumber(timeLeft.seconds)}
              </div>
            </div>
          </div>
        </div>

        {/* Wedding Message */}
        <div className="text-center">
          <p className="text-sm text-neutral-600">
            {timeLeft.days > 0
              ? `김재웅 🤍 고아라의 결혼식이 ${timeLeft.days}일 남았습니다.`
              : "김재웅 🤍 고아라의 결혼식을 축하합니다!"}
          </p>
        </div>
      </div>
    </div>
  );
}
