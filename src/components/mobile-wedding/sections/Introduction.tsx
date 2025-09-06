import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut" as const,
    },
  },
};

export default function Introduction() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;

    // Animation for the whole introduction section
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

  return (
    <motion.div variants={sectionVariants} className="py-[120px]">
      <div ref={sectionRef} className="flex gap-4 justify-center">
        <div className="flex flex-col gap-2">
          <Image
            src="/images/mobile-wedding/gallery/jae3.png"
            alt="jae1"
            width={200}
            height={1000}
            className="aspect-square"
          />
          <p className="text-sm text-center">
            <span className="text-[#5F89B8]">신랑</span>김재웅
          </p>
          <div className="flex flex-col gap-2 mt-4 items-center">
            <p>
              1995년생 <span className="text-[#5F89B8]">캐나다 사람</span>
            </p>
            {/* <p>IT 개발자</p> */}
            <p>사교적, 열성적, 적응력</p>
            <p>🌳</p>
            <p>나무 같은 남편이 되겠습니다</p>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <Image
            src="/images/mobile-wedding/gallery/jae3.png"
            alt="jae1"
            width={200}
            height={1000}
            className="aspect-square"
          />
          <p className="text-sm text-center">
            <span className="text-[#BB7273]">신부</span>고아라
          </p>
          <div className="flex flex-col gap-2 mt-4 items-center">
            <p>
              1994년생 <span className="text-[#BB7273]">한국 사람</span>
            </p>
            {/* <p>회계사</p> */}
            <p>책임감, 논리적, 헌신</p>
            <p>☀️</p>
            <p>햇살 같은 아내가 되겠습니다</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
