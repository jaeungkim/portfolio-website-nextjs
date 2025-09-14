import { motion, AnimatePresence } from "motion/react";
import { Phone, MessageSquare } from "lucide-react";
import Modal from "@/src/components/common/Modal/Modal";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeTab: "groom" | "bride";
  setActiveTab: (tab: "groom" | "bride") => void;
}

const CONTACTS = {
  groom: [
    { name: "김재웅", relationship: "", phone: "010-5750-5595" },
    { name: "김정호", relationship: "아버지", phone: "010-2450-5987" },
    { name: "김화영", relationship: "어머니", phone: "010-2450-5987" },
  ],
  bride: [
    { name: "고아라", relationship: "", phone: "010-7540-5595" },
    { name: "음현희", relationship: "어머니", phone: "010-9460-1406" },
  ],
};

export default function ContactModal({
  isOpen,
  onClose,
  activeTab,
  setActiveTab,
}: ContactModalProps) {
  const currentContacts = CONTACTS[activeTab];

  return (
    <Modal isOpen={isOpen} onClose={onClose} className="mx-0">
      <div className="pt-8 pb-6 border-b border-neutral-200">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-neutral-800">
            축하 연락하기
          </h2>
          <p className="text-sm text-neutral-500 mt-1">
            직접 축하의 마음을 전해보세요
          </p>
        </div>
      </div>

      <div className="flex border-b border-neutral-200">
        {(["groom", "bride"] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 text-center text-sm font-medium transition-colors ${
              activeTab === tab
                ? "text-neutral-800 border-b-2 border-neutral-800"
                : "text-neutral-500"
            }`}
          >
            {tab === "groom" ? "신랑에게" : "신부에게"}
          </button>
        ))}
      </div>

      <div className="p-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            className="flex flex-col h-full overflow-y-auto"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
          >
            <div className="flex-1 space-y-4">
              {currentContacts.map((contact, index) => (
                <motion.div
                  key={`${activeTab}-${contact.name}`}
                  className="bg-white rounded-lg p-4 shadow-sm border border-neutral-200"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.15,
                    delay: index * 0.03,
                    ease: "easeOut",
                  }}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <p className="text-sm font-medium text-neutral-800">
                        {contact.name}
                      </p>
                      {contact.relationship && (
                        <p className="text-xs text-neutral-500">
                          {contact.relationship}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={`sms:${contact.phone}`}
                      className="flex-1 flex items-center justify-center gap-2 p-2 bg-neutral-100 text-neutral-700 rounded-lg text-sm font-medium hover:bg-neutral-200 transition-colors no-underline"
                    >
                      <MessageSquare className="w-4 h-4" /> 문자 보내기
                    </a>
                    <a
                      href={`tel:${contact.phone}`}
                      className={`flex-1 flex items-center justify-center gap-2 p-2 rounded-lg text-sm font-medium transition-colors no-underline ${
                        activeTab === "groom"
                          ? "bg-[#5F89B8]/50 text-neutral-800"
                          : "bg-[#BB7273]/50 text-neutral-800"
                      }`}
                    >
                      <Phone className="w-4 h-4" /> 전화하기
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </Modal>
  );
}
