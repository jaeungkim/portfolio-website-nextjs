"use client";

import { usePathname } from "next/navigation";
import { errorMessagesFor } from "@/src/i18n/error-messages";

export default function GlobalError({
  retry,
}: {
  error: Error & { digest?: string };
  retry: () => void;
}) {
  const pathname = usePathname();
  const messages = errorMessagesFor(pathname);

  return (
    <html lang={pathname.split("/")[1] === "en" ? "en" : "ko"}>
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "1rem",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <h1 style={{ fontSize: "1.25rem", fontWeight: 600 }}>
          {messages.title}
        </h1>
        <button
          type="button"
          onClick={retry}
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            textDecoration: "underline",
            background: "none",
            border: "none",
            cursor: "pointer",
            color: "inherit",
          }}
        >
          {messages.retry}
        </button>
      </body>
    </html>
  );
}
