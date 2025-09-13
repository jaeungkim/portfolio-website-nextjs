"use client";

import { useState, useRef, useEffect } from "react";

export interface Toast {
  id: string;
  message: string;
}

export function useToast() {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timeoutsRef = useRef<Map<string, NodeJS.Timeout>>(new Map());

  useEffect(() => {
    return () => {
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      timeoutsRef.current.clear();
    };
  }, []);

  const toast = (message: string) => {
    const id = Date.now().toString(36) + Math.random().toString(36).substr(2);

    // Clear existing toast
    if (toasts.length > 0) {
      const existingId = toasts[0].id;
      const existingTimeout = timeoutsRef.current.get(existingId);
      if (existingTimeout) {
        clearTimeout(existingTimeout);
        timeoutsRef.current.delete(existingId);
      }
    }

    setToasts([{ id, message }]);

    // Auto dismiss after 3 seconds (typical toast duration)
    const timeoutId = setTimeout(() => {
      setToasts([]);
      timeoutsRef.current.delete(id);
    }, 3000);

    timeoutsRef.current.set(id, timeoutId);
  };

  const dismiss = (id: string) => {
    setToasts([]);
    const timeout = timeoutsRef.current.get(id);
    if (timeout) {
      clearTimeout(timeout);
      timeoutsRef.current.delete(id);
    }
  };

  return { toasts, toast, dismiss };
}
