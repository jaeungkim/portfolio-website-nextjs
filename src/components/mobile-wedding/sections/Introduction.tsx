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
      className="h-screen flex flex-col items-center justify-center px-6 text-center bg-gray-50"
      variants={sectionVariants}
    >
      <h2 className="text-3xl font-serif text-gray-800 mb-8">
        Our Introduction
      </h2>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-700">신랑 김재웅</h3>
          <p className="text-gray-600 leading-relaxed">
            "함께 웃고, 함께 울고, 함께 성장하는 사람이 되겠습니다."
          </p>
        </div>
        <div className="w-8 h-px bg-gray-300 mx-auto"></div>
        <div className="space-y-3">
          <h3 className="text-xl font-semibold text-gray-700">신부 고아라</h3>
          <p className="text-gray-600 leading-relaxed">
            "서로를 이해하고 존중하며 사랑하는 부부가 되겠습니다."
          </p>
        </div>
      </div>
    </motion.div>
  );
}
