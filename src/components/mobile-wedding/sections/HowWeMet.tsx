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
      className="h-[90vh] flex flex-col items-center justify-center px-6 text-center bg-white"
      variants={sectionVariants}
    >
      <h2 className="text-3xl font-serif text-gray-800 mb-8">
        How We Met
      </h2>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          <p className="text-lg text-gray-600 leading-relaxed">
            운명처럼 만난 두 사람의 이야기
          </p>
          <div className="space-y-3 text-gray-600">
            <p>2023년 봄, 우연한 만남으로 시작된 우리의 이야기</p>
            <p>서로를 알아가며 발견한 공통점들</p>
            <p>함께한 시간들이 쌓여 만든 특별한 사랑</p>
            <p>이제 한 사람이 되어 새로운 여정을 시작합니다</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
