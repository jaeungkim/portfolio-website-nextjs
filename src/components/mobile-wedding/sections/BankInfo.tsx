"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Copy } from "lucide-react";
import SectionContainer from "../components/SectionContainer";
import { BANK_SECTIONS } from "../constants";
import { useToast } from "../../../hooks/useToast";
import Toaster from "../../common/Toast";

export default function BankInfo() {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set()
  );
  const { toasts, toast } = useToast();

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(sectionId)) {
        newSet.delete(sectionId);
      } else {
        newSet.add(sectionId);
      }
      return newSet;
    });
  };

  const copyAccountNumber = async (accountNumber: string) => {
    try {
      await navigator.clipboard.writeText(accountNumber);
      toast("계좌번호가 복사되었습니다.");
    } catch (err) {
      console.error("계좌번호 복사 실패:", err);
      toast("복사에 실패했습니다.");
    }
  };

  return (
    <SectionContainer sectionKey="bank-info">

      <div className="text-center space-y-6">
        <h1 className="text-2xl font-medium text-neutral-900 tracking-wide">
          마음 전하실 곳
        </h1>
        <div className="w-12 h-px bg-neutral-300 mx-auto"></div>
      </div>

      <div className="text-center space-y-3">
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

      <div className="w-full space-y-4">
        {BANK_SECTIONS.map((section) => {
          const isExpanded = expandedSections.has(section.id);

          return (
            <div
              key={section.id}
              className="bg-white rounded-lg border border-neutral-200 shadow-sm"
            >
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
                            <h4
                              className={`text-sm font-medium ${section.color}`}
                            >
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
                              type="button"
                              onClick={() =>
                                copyAccountNumber(account.accountNumber)
                              }
                              className="cursor-pointer flex items-center justify-center gap-1 py-2 px-2 bg-white border border-neutral-200 rounded-md text-xs font-medium text-neutral-700"
                            >
                              <Copy size={12} />
                              복사
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

      {/* Toast Notifications */}
      <Toaster
        toasts={toasts}
      />
    </SectionContainer>
  );
}
