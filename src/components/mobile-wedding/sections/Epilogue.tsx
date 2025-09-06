import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Epilogue() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    // Custom animation for epilogue - slower and more elegant
    gsap.fromTo(
      section,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        scrollTrigger: {
          trigger: section,
          start: "top center",
          end: "bottom center",
          toggleActions: "play none none reverse",
          scrub: false,
        },
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className="h-[90svh] flex flex-col items-center justify-center px-6 text-center "
    >
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-light text-gray-700 tracking-wide">
            에필로그
          </h2>
          <div className="w-12 h-px bg-gray-300 mx-auto"></div>
        </div>

        <div className="max-w-lg mx-auto space-y-8">
          <div className="space-y-4">
            <p className="text-base text-gray-600 leading-relaxed italic">
              "사랑은 두 사람이 함께 걷는 길"
            </p>
            <p className="text-base text-gray-600 leading-relaxed italic">
              "서로를 믿고 의지하며"
            </p>
            <p className="text-base text-gray-600 leading-relaxed italic">
              "작은 행복들을 나누어 가는 것"
            </p>
          </div>

          <div className="w-8 h-px bg-gray-200 mx-auto"></div>

          <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
            <p>저희 두 사람이 사랑으로 하나가 되어</p>
            <p>새로운 인생을 시작하고자 합니다</p>
            <div className="w-4 h-px bg-gray-200 mx-auto my-2"></div>
            <p>앞으로도 변함없는 사랑과 관심으로</p>
            <p>지켜봐 주시면 감사하겠습니다</p>
          </div>

          <div className="w-6 h-px bg-gray-200 mx-auto"></div>

          <div className="pt-2">
            <p className="text-sm text-gray-500 tracking-wide">
              김재웅 · 고아라
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
