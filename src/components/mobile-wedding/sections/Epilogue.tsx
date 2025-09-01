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

export default function Epilogue() {
  return (
    <motion.div
      className="h-screen flex flex-col items-center justify-center px-6 text-center bg-white"
      variants={sectionVariants}
    >
      <h2 className="text-3xl font-serif text-gray-800 mb-8">
        Epilogue
      </h2>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          <p className="text-lg text-gray-600 leading-relaxed italic">
            "사랑은 두 사람이 함께 걷는 길"
          </p>
          <p className="text-lg text-gray-600 leading-relaxed italic">
            "서로를 믿고 의지하며"
          </p>
          <p className="text-lg text-gray-600 leading-relaxed italic">
            "작은 행복들을 나누어 가는 것"
          </p>
        </div>
        <div className="w-8 h-px bg-gray-300 mx-auto"></div>
        <div className="space-y-3">
          <p className="text-gray-600">
            저희 두 사람이 사랑으로 하나가 되어
          </p>
          <p className="text-gray-600">
            새로운 인생을 시작하고자 합니다.
          </p>
          <p className="text-gray-600">
            앞으로도 변함없는 사랑과 관심으로
          </p>
          <p className="text-gray-600">
            지켜봐 주시면 감사하겠습니다.
          </p>
        </div>
        <div className="pt-4">
          <p className="text-sm text-gray-500">
            김재웅 · 고아라
          </p>
        </div>
      </div>
    </motion.div>
  );
}
