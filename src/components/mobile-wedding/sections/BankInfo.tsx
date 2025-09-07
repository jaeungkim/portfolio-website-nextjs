import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Copy } from "lucide-react";
import Image from "next/image";

interface BankAccount {
  id: string;
  name: string;
  accountNumber: string;
  bankName: string;
  accountHolder: string;
}

interface BankSection {
  id: string;
  title: string;
  color: string;
  accounts: BankAccount[];
}

const BANK_SECTIONS: BankSection[] = [
  {
    id: "groom",
    title: "신랑측",
    color: "text-[#5F89B8]",
    accounts: [
      {
        id: "groom-1",
        name: "신랑",
        accountNumber: "1111-1111-1111-1111",
        bankName: "국민은행",
        accountHolder: "KIM JAEUNG",
      },
      {
        id: "groom-3",
        name: "신랑 어머니",
        accountNumber: "1111-1111-1111-1111",
        bankName: "카카오뱅크",
        accountHolder: "김화영",
      },
    ],
  },
  {
    id: "bride",
    title: "신부측",
    color: "text-[#BB7273]",
    accounts: [
      {
        id: "bride-1",
        name: "신부",
        accountNumber: "1111-1111-1111-1111",
        bankName: "카카오뱅크",
        accountHolder: "고아라",
      },
      {
        id: "bride-3",
        name: "신부 어머니",
        accountNumber: "1111-1111-1111-1111",
        bankName: "카카오뱅크",
        accountHolder: "음현희",
      },
    ],
  },
];

export default function BankInfo() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["groom", "bride"])
  );

  const toggleSection = useCallback((sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  }, []);

  const copyAccountNumber = useCallback(async (accountNumber: string) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      // You could add a toast notification here
    } catch (err) {
      console.error("Failed to copy account number:", err);
    }
  }, []);

  const openKakaoPay = useCallback(
    async (accountNumber: string, accountHolder: string) => {
      // Note: For production, consider using KakaoPay's official APIs:
      // - 코드송금 받기 (Receive Code Transfer): https://developers.kakaopay.com/docs/moneytransfer/sendmoney.link/sendmoney-link-common
      // - 정산하기 (Settlement): For splitting costs among multiple recipients

      // Current implementation: Copy account details and open KakaoPay
      const accountDetails = `${accountHolder}\n${accountNumber}`;

      try {
        // Copy account details to clipboard
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(accountDetails);
        } else {
          // Fallback for older browsers - create temporary textarea
          const textArea = document.createElement("textarea");
          textArea.value = accountDetails;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }

        // Try to open KakaoPay app first
        const isMobile = /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

        if (isMobile) {
          // Mobile: Try app scheme first, then web fallback
          window.location.href = `kakaotalk://kakaopay/main`;

          // Fallback to web version after a short delay
          setTimeout(() => {
            window.open("https://web.kakaopay.com", "_blank");
          }, 1500);
        } else {
          // Desktop: Open web version directly
          window.open("https://web.kakaopay.com", "_blank");
        }

      } catch (error) {
        console.error("Failed to copy account details:", error);
        // Fallback: Just open KakaoPay
        window.open("https://web.kakaopay.com", "_blank");
      }
    },
    []
  );

  return (
    <div className="py-[84px] px-6">
      <div className="flex flex-col items-center space-y-12">
        {/* Header Section */}
        <div className="text-center space-y-6">
          <h1 className="text-2xl font-medium text-neutral-900 tracking-wide">
            마음 전하실 곳
          </h1>
          <div className="w-12 h-px bg-neutral-300 mx-auto"></div>
        </div>

        {/* Introduction Text */}
        <div className="text-center space-y-3 max-w-md">
          <p className="text-sm text-neutral-600 leading-relaxed">
            멀리서도 축하의 마음을 전하고 싶으신 분들을 위해
            <br />
            계좌번호를 안내드립니다.
          </p>
          <p className="text-sm text-neutral-600 leading-relaxed">
            소중한 축하를 보내주셔서 감사드리며,
            <br />
            따뜻한 마음에 깊이 감사드립니다.
          </p>
        </div>

        {/* Bank Account Sections */}
        <div className="w-full max-w-md space-y-4">
          {BANK_SECTIONS.map((section) => {
            const isExpanded = expandedSections.has(section.id);

            return (
              <div
                key={section.id}
                className="bg-white rounded-lg border border-neutral-200 shadow-sm"
              >
                {/* Section Header */}
                <button
                  onClick={() => toggleSection(section.id)}
                  className="w-full flex items-center justify-between px-4 py-2 text-left"
                >
                  <h3 className={`text-lg font-medium ${section.color}`}>
                    {section.title}
                  </h3>
                  <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ChevronDown size={20} className="text-neutral-400" />
                  </motion.div>
                </button>

                {/* Section Content */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-4 space-y-3">
                        {section.accounts.map((account) => (
                          <div
                            key={account.id}
                            className="bg-neutral-50 rounded-lg p-4 flex justify-between items-center"
                          >
                            {/* Account Info */}
                            <div className="space-y-2 flex-1">
                              <h4 className="text-sm font-medium text-neutral-800">
                                {account.name}
                              </h4>
                              <div className="space-y-1">
                                <p className="text-sm font-mono text-neutral-700">
                                  {account.accountNumber}
                                </p>
                                <p className="text-xs text-neutral-500">
                                  {account.bankName} {account.accountHolder}
                                </p>
                              </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col gap-2 w-20">
                              <button
                                onClick={() =>
                                  copyAccountNumber(account.accountNumber)
                                }
                                className="flex items-center justify-center gap-1 py-2 px-2 bg-white border border-neutral-200 rounded-md text-xs font-medium text-neutral-700"
                              >
                                <Copy size={12} />
                                복사
                              </button>
                              <button
                                onClick={() =>
                                  openKakaoPay(
                                    account.accountNumber,
                                    account.accountHolder
                                  )
                                }
                                className="flex items-center justify-center gap-1 py-2 px-2 bg-[#F9EB37] rounded-md text-xs font-medium"
                              >
                                <Image
                                  src="/assets/pay.png"
                                  alt="KakaoPay"
                                  width={43}
                                  height={43}
                                  className="object-contain"
                                />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
