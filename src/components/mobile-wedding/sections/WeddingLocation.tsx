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
      className="h-screen flex flex-col items-center justify-center px-6 text-center bg-white"
      variants={sectionVariants}
    >
      <h2 className="text-3xl font-serif text-gray-800 mb-8">
        Wedding Location
      </h2>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">결혼식 일시</h3>
          <p className="text-lg text-gray-600">
            2025년 5월 18일 일요일 오후 2시
          </p>
        </div>
        <div className="w-8 h-px bg-gray-300 mx-auto"></div>
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700">결혼식 장소</h3>
          <p className="text-lg text-gray-600">
            서울시 강남구 웨딩홀
          </p>
          <p className="text-sm text-gray-500">
            * 가족분들만 참석 가능합니다
          </p>
        </div>
      </div>
    </motion.div>
  );
}
