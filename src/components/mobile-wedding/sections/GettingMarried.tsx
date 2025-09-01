import { motion } from "motion/react";

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
      className="h-[90svh] flex flex-col items-center justify-center px-6 text-center bg-white"
      variants={sectionVariants}
    >
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-light text-gray-700 tracking-wide">
            우리는 결혼합니다
          </h2>
          <div className="w-12 h-px bg-gray-300 mx-auto"></div>
        </div>
        
        <div className="max-w-lg mx-auto space-y-6 text-gray-600">
          <p className="text-base leading-relaxed">
            두 사람이 하나가 되어
          </p>
          <p className="text-base leading-relaxed">
            새로운 시작을 함께 하려 합니다
          </p>
          <div className="w-8 h-px bg-gray-200 mx-auto my-4"></div>
          <p className="text-sm text-gray-500 leading-relaxed">
            귀한 걸음으로 저희의 앞날을 축복해 주시면
          </p>
          <p className="text-sm text-gray-500 leading-relaxed">
            더없는 기쁨으로 간직하겠습니다
          </p>
        </div>
      </div>
    </motion.div>
  );
}
