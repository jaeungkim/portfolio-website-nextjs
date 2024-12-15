import { useTheme } from "next-themes";
import React, { useEffect, useRef } from "react";

interface UtterancesCommentsProps {
  repo: string;
}

export const UtterancesComments: React.FC<UtterancesCommentsProps> = ({
  repo,
}) => {
  const { theme } = useTheme();
  const elementRef = useRef<HTMLDivElement>(null);
  const themeName = theme === "dark" ? "github-dark" : "github-light";

  useEffect(() => {
    if (!elementRef.current) {
      return;
    }

    const script = document.createElement("script");
    script.src = "https://utteranc.es/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    script.setAttribute("repo", repo);
    script.setAttribute("issue-term", "pathname");
    script.setAttribute("label", "comment");
    script.setAttribute("theme", themeName);
    elementRef.current.appendChild(script);

    return () => {
      elementRef.current?.removeChild(script);
    };
  }, [repo]);

  useEffect(() => {
    const script = document.querySelector<HTMLScriptElement>(
      "script[src='https://utteranc.es/client.js']"
    );

    if (script) {
      script.setAttribute("theme", themeName);
    }

    const updateIframeTheme = () => {
      const utterancesFrame =
        document.querySelector<HTMLIFrameElement>(".utterances-frame");
      if (utterancesFrame) {
        utterancesFrame.contentWindow?.postMessage(
          {
            type: "set-theme",
            theme: themeName,
          },
          "https://utteranc.es"
        );
      } else {
        setTimeout(updateIframeTheme, 500);
      }
    };

    updateIframeTheme();
  }, [themeName]);

  return <div ref={elementRef} />;
};

// export default UtterancesComments;
