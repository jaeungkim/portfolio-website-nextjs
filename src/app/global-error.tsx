"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
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
          Something went wrong
        </h1>
        <button
          type="button"
          onClick={reset}
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
          다시 시도
        </button>
      </body>
    </html>
  );
}
