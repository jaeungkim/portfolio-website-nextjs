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

export default function BankInfo() {
  return (
    <motion.div
      className="h-[90vh] flex flex-col items-center justify-center px-6 text-center bg-gray-50"
      variants={sectionVariants}
    >
      <h2 className="text-3xl font-serif text-gray-800 mb-8">
        마음 전하실 곳
      </h2>
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">신랑측</h3>
            <p className="text-gray-600">국민은행 123456-78-901234</p>
            <p className="text-gray-600">예금주: 김재웅</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">신부측</h3>
            <p className="text-gray-600">신한은행 987654-32-109876</p>
            <p className="text-gray-600">예금주: 고아라</p>
          </div>
        </div>
        <p className="text-sm text-gray-500 italic">
          참석이 어려우신 분들께서는 축복의 마음만으로도 충분합니다
        </p>
      </div>
    </motion.div>
  );
}
