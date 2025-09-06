import { motion } from "motion/react";
import Image from "next/image";

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

export default function GettingMarried() {
  return (
    <motion.div
      className="flex flex-col items-center justify-center text-center"
      variants={sectionVariants}
    >
      <blockquote>
        <p className="leading-relaxed mt-[120px]">
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

      <div className="pt-[120px]">
        <p className="leading-relaxed">
          저희 결혼합니다💕
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
    </motion.div>
  );
}
