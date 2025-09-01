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

export default function HowWeMet() {
  return (
    <motion.div
      className="h-[90svh] flex flex-col items-center justify-center px-6 text-center bg-white"
      variants={sectionVariants}
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
    </motion.div>
  );
}
