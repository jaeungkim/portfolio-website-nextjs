import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function GettingMarried() {
  const poemRef = useRef<HTMLQuoteElement>(null);
  const messageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const poem = poemRef.current;
    const message = messageRef.current;

    if (poem) {
      gsap.fromTo(
        poem,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: poem,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse",
            scrub: false,
          },
        }
      );
    }

    if (message) {
      gsap.fromTo(
        message,
        { y: 80, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: "power2.out",
          scrollTrigger: {
            trigger: message,
            start: "top 75%",
            end: "bottom 25%",
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

  return (
    <div className="py-[84px] flex flex-col items-center justify-center text-center">
      <blockquote ref={poemRef}>
        <p className="text-[#5F89B8] mb-[64px] font-bold">
          소중한 분들을 초대합니다.
        </p>
        <p className="leading-relaxed ">
          서로의 이름을 부르는 것만으로도
          <br />
          사랑의 깊이를 확인할 수 있는 두 사람이
          <br />
          꽃과 나무처럼 걸어와서
          <br />
          서로의 모든 것이 되기 위해
          <br />
          오랜 기다림 끝에 혼례식을 치르는 날<br />
          세상은 더욱 아름다워라
        </p>

        <footer className="pt-[12px]">
          <cite className="text-sm opacity-75">
            &lt;사랑의 사람들이여&gt;, 이해인
          </cite>
        </footer>
      </blockquote>

      <div ref={messageRef} className="pt-[120px]">
        <p className="leading-relaxed">
          <span className="font-bold">저희 결혼합니다 🤍</span>
          <br />
          <br />
          귀한 마음으로 결혼식에 찾아오셔서
          <br />
          축복의 말씀과 따뜻함을 나눠주세요. <br />더 없는 격려와 기쁨으로
          간직하겠습니다.
        </p>
        <Image
          alt="저희 결혼 사진"
          src="/images/mobile-wedding/gallery/image1.jpeg"
          width={448}
          height={1000}
          className="shadow-sm rounded pt-[48px]"
        />
      </div>
    </div>
  );
}
