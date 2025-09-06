import Modal from "@/src/components/common/Modal/Modal";
import { AnimatePresence, motion } from "motion/react";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ContactModal({ isOpen, onClose }: ContactModalProps) {
  const groomParents = [
    {
      name: "아버지 김종혁",
      phone: "010-1234-5678",
      email: "father@groom.com",
    },
    {
      name: "어머니 최은혜",
      phone: "010-2345-6789",
      email: "mother@groom.com",
    },
  ];

  const brideParents = [
    {
      name: "아버지 이주영",
      phone: "010-3456-7890",
      email: "father@bride.com",
    },
    {
      name: "어머니 강지은",
      phone: "010-4567-8901",
      email: "mother@bride.com",
    },
  ];

  const handlePhoneClick = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const handleEmailClick = (email: string) => {
    window.open(`mailto:${email}`);
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      closeOnOverlayClick={true}
      closeOnEscape={true}
    >
      {/* Header */}
      <motion.div
        className="flex items-center justify-between p-6 border-b border-gray-200"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.3 }}
      >
        <h2 className="text-lg font-semibold text-gray-900">
          혼주에게 연락하기
        </h2>
        <button
          onClick={onClose}
          className="p-1 hover:bg-gray-100 rounded-full transition-colors text-gray-500 text-xl font-bold"
        >
          ×
        </button>
      </motion.div>

      {/* Content */}
      <motion.div
        className="p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.3 }}
      >
              <div className="grid grid-cols-2 gap-6">
                {/* 신랑측 */}
                 <motion.div
                   initial={{ opacity: 0, x: -30 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.3, duration: 0.4 }}
                 >
                  <h3 className="text-sm font-medium text-[#5F89B8] mb-4">
                    신랑측
                  </h3>
                  <div className="space-y-4">
                    {groomParents.map((parent, index) => (
                      <motion.div
                        key={index}
                        className="space-y-2"
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                      >
                        <p className="text-sm font-medium text-gray-900">
                          {parent.name}
                        </p>
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => handlePhoneClick(parent.phone)}
                            className="flex items-center justify-center w-8 h-8 bg-[#5F89B8] bg-opacity-10 rounded-full hover:bg-opacity-20 transition-colors text-[#5F89B8] text-sm"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            📞
                          </motion.button>
                          <motion.button
                            onClick={() => handleEmailClick(parent.email)}
                            className="flex items-center justify-center w-8 h-8 bg-[#5F89B8] bg-opacity-10 rounded-full hover:bg-opacity-20 transition-colors text-[#5F89B8] text-sm"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            ✉️
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* 신부측 */}
                 <motion.div
                   initial={{ opacity: 0, x: 30 }}
                   animate={{ opacity: 1, x: 0 }}
                   transition={{ delay: 0.3, duration: 0.4 }}
                 >
                  <h3 className="text-sm font-medium text-[#BB7273] mb-4">
                    신부측
                  </h3>
                  <div className="space-y-4">
                    {brideParents.map((parent, index) => (
                      <motion.div
                        key={index}
                        className="space-y-2"
                         initial={{ opacity: 0, y: 20 }}
                         animate={{ opacity: 1, y: 0 }}
                         transition={{ delay: 0.4 + index * 0.1, duration: 0.3 }}
                      >
                        <p className="text-sm font-medium text-gray-900">
                          {parent.name}
                        </p>
                        <div className="flex gap-2">
                          <motion.button
                            onClick={() => handlePhoneClick(parent.phone)}
                            className="flex items-center justify-center w-8 h-8 bg-[#BB7273] bg-opacity-10 rounded-full hover:bg-opacity-20 transition-colors text-[#BB7273] text-sm"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            📞
                          </motion.button>
                          <motion.button
                            onClick={() => handleEmailClick(parent.email)}
                            className="flex items-center justify-center w-8 h-8 bg-[#BB7273] bg-opacity-10 rounded-full hover:bg-opacity-20 transition-colors text-[#BB7273] text-sm"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            ✉️
                          </motion.button>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
               </div>
             </motion.div>
    </Modal>
  );
}
