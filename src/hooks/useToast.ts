"use client";

import { useState, useRef } from "react";

export interface Toast {
  id: string;
  message: string;
}

export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const showToast = (message: string) => {
    // Clear existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    // Show new toast
    setToast({ id: Date.now().toString(), message });
    setIsVisible(true);

    // Auto dismiss after 3 seconds
    timeoutRef.current = setTimeout(() => {
      setIsVisible(false);
      // Clear toast after animation
      setTimeout(() => setToast(null), 400);
    }, 3000);
  };

  return { toast, isVisible, showToast };
}
