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

export default function Introduction() {
  return (
    <motion.div
      className="h-[90svh] flex flex-col items-center justify-center px-6 text-center bg-gray-50"
      variants={sectionVariants}
    >
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-light text-gray-700 tracking-wide">
            신랑신부 소개
          </h2>
          <div className="w-12 h-px bg-gray-300 mx-auto"></div>
        </div>
        
        <div className="max-w-lg mx-auto space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">신랑 김재웅</h3>
            <div className="w-16 h-px bg-gray-200 mx-auto mb-3"></div>
            <p className="text-sm text-gray-600 leading-relaxed italic">
              "함께 웃고, 함께 울고, 함께 성장하는 사람이 되겠습니다"
            </p>
          </div>
          
          <div className="w-6 h-px bg-gray-200 mx-auto"></div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">신부 고아라</h3>
            <div className="w-16 h-px bg-gray-200 mx-auto mb-3"></div>
            <p className="text-sm text-gray-600 leading-relaxed italic">
              "서로를 이해하고 존중하며 사랑하는 부부가 되겠습니다"
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
