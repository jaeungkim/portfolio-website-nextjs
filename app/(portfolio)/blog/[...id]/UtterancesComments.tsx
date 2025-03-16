"use client";

import { useTheme } from "next-themes";
import React, { useEffect, useRef, useCallback } from "react";

interface UtterancesCommentsProps {
  repo: string;
}

export const UtterancesComments: React.FC<UtterancesCommentsProps> = ({
  repo,
}) => {
  const { theme } = useTheme();
  const elementRef = useRef<HTMLDivElement>(null);
  const themeName = theme === "dark" ? "github-dark" : "github-light";

  const updateIframeTheme = useCallback(() => {
    const utterancesFrame =
      document.querySelector<HTMLIFrameElement>(".utterances-frame");
    if (utterancesFrame) {
      utterancesFrame.contentWindow?.postMessage(
        { type: "set-theme", theme: themeName },
        "https://utteranc.es"
      );
    }
  }, [themeName]);

  useEffect(() => {
    if (!elementRef.current) return;

    // Ensure Utterances is only added once
    if (elementRef.current.hasChildNodes()) return;

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("repo", repo);
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("label", "comment");
    script.setAttribute("theme", themeName);

    elementRef.current.appendChild(script);
  }, [repo]);

  useEffect(() => {
    updateIframeTheme();
  }, [themeName, updateIframeTheme]);

  return <div ref={elementRef} />;
};
