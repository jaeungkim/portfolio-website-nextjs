import React from "react";
import { cn } from "@/src/utils/cn";

interface SectionContainerProps {
  sectionKey: string;
  children: React.ReactNode;
  className?: string;
  [key: string]: any;
}

export default function SectionContainer({
  sectionKey,
  children,
  className = "",
  ...props
}: SectionContainerProps) {
  return (
    <div
      data-section={sectionKey}
      className={`py-[112px] px-4 flex flex-col items-center space-y-12 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
