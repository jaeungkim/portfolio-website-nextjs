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
    } else {
      setTimeout(updateIframeTheme, 500);
    }
  }, [themeName]);

  useEffect(() => {
    if (!elementRef.current) return;

    // Remove existing script if any
    while (elementRef.current.firstChild) {
      elementRef.current.removeChild(elementRef.current.firstChild);
    }

    // Create Utterances script
    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("repo", repo);
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("label", "comment");
    script.setAttribute("theme", themeName);
    elementRef.current.appendChild(script);

    // Update theme dynamically
    updateIframeTheme();
  }, [repo, themeName, updateIframeTheme]);

  return <div ref={elementRef} />;
};
