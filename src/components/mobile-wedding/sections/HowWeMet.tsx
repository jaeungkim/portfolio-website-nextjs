import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HowWeMet() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    gsap.fromTo(
      section,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
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
      className="h-[90svh] flex flex-col items-center justify-center px-6 text-center"
    >
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-light text-gray-700 tracking-wide">
            우리의 만남
          </h2>
          <div className="w-12 h-px bg-gray-300 mx-auto"></div>
        </div>
        
        <div className="max-w-lg mx-auto space-y-6">
          <p className="text-base text-gray-600 leading-relaxed italic">
            "운명처럼 만난 두 사람의 이야기"
          </p>
          
          <div className="space-y-4 text-sm text-gray-600">
            <div className="space-y-2">
              <p>2023년 봄, 우연한 만남으로</p>
              <p>시작된 우리의 이야기</p>
            </div>
            
            <div className="w-4 h-px bg-gray-200 mx-auto"></div>
            
            <div className="space-y-2">
              <p>서로를 알아가며 발견한</p>
              <p>공통점들과 특별한 사랑</p>
            </div>
            
            <div className="w-4 h-px bg-gray-200 mx-auto"></div>
            
            <p className="text-gray-500">
              이제 한 사람이 되어 새로운 여정을 시작합니다
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
