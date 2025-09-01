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
      className="h-[90svh] flex flex-col items-center justify-center px-6 text-center bg-gray-50"
      variants={sectionVariants}
    >
      <div className="text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-2xl font-light text-gray-700 tracking-wide">
            마음 전하실 곳
          </h2>
          <div className="w-12 h-px bg-gray-300 mx-auto"></div>
        </div>
        
        <div className="max-w-lg mx-auto space-y-6">
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-base font-medium text-gray-700 mb-3">신랑측</h3>
              <div className="w-12 h-px bg-gray-200 mx-auto mb-3"></div>
              <p className="text-sm text-gray-600 font-mono">국민은행 123456-78-901234</p>
              <p className="text-xs text-gray-500 mt-1">예금주: 김재웅</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg border border-gray-100 shadow-sm">
              <h3 className="text-base font-medium text-gray-700 mb-3">신부측</h3>
              <div className="w-12 h-px bg-gray-200 mx-auto mb-3"></div>
              <p className="text-sm text-gray-600 font-mono">신한은행 987654-32-109876</p>
              <p className="text-xs text-gray-500 mt-1">예금주: 고아라</p>
            </div>
          </div>
          
          <div className="w-6 h-px bg-gray-200 mx-auto"></div>
          
          <p className="text-xs text-gray-400 italic leading-relaxed">
            참석이 어려우신 분들께서는<br />
            축복의 마음만으로도 충분합니다
          </p>
        </div>
      </div>
    </motion.div>
  );
}
