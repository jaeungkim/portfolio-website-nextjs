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
      className="h-screen flex flex-col items-center justify-center px-6 text-center bg-white"
      variants={sectionVariants}
    >
      <h2 className="text-3xl font-serif text-gray-800 mb-6">
        We Are Getting Married
      </h2>
      <div className="max-w-2xl mx-auto space-y-4">
        <p className="text-lg text-gray-600 leading-relaxed">
          두 사람이 하나가 되어 새로운 시작을 함께 하려 합니다.
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          귀한 걸음으로 저희의 앞날을 축복해 주시면
        </p>
        <p className="text-lg text-gray-600 leading-relaxed">
          더없는 기쁨으로 간직하겠습니다.
        </p>
      </div>
    </motion.div>
  );
}
