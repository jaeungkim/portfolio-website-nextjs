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

export default function WeddingLocation() {
  return (
    <motion.div
      className="h-[90svh] flex flex-col items-center justify-center px-6 text-center"
      variants={sectionVariants}
    >
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-light text-gray-700 tracking-wide">
            예식 안내
          </h2>
          <div className="w-12 h-px bg-gray-300 mx-auto"></div>
        </div>
        
        <div className="max-w-lg mx-auto space-y-8">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">결혼식 일시</h3>
            <div className="w-16 h-px bg-gray-200 mx-auto mb-3"></div>
            <p className="text-base text-gray-600">
              2025년 5월 18일
            </p>
            <p className="text-base text-gray-600">
              일요일 오후 2시
            </p>
          </div>
          
          <div className="w-6 h-px bg-gray-200 mx-auto"></div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-gray-700">결혼식 장소</h3>
            <div className="w-16 h-px bg-gray-200 mx-auto mb-3"></div>
            <p className="text-base text-gray-600">
              서울시 강남구 웨딩홀
            </p>
            <div className="w-4 h-px bg-gray-200 mx-auto my-2"></div>
            <p className="text-xs text-gray-400">
              * 가족분들만 참석 가능합니다
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
