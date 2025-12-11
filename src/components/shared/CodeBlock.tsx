"use client";

import { useState, memo } from "react";
import { Copy, Check } from "lucide-react";
import { Highlight, themes } from "prism-react-renderer";
import { useTheme } from "next-themes";

interface CodeBlockProps {
  code: string;
  filename?: string;
  language?: string;
  showLineNumbers?: boolean;
}

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="p-1.5 rounded-md hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
      aria-label="Copy to clipboard"
    >
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
    </button>
  );
}

/**
 * 테마 호환 코드 블록 컴포넌트 with 구문 강조
 * prism-react-renderer 사용
 */
function CodeBlock({
  code,
  filename,
  language = "typescript",
  showLineNumbers = false,
}: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";

  // 테마에 따른 Prism 테마 선택
  const prismTheme = isDark ? themes.nightOwl : themes.nightOwlLight;

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-muted/30 not-prose">
      {/* 헤더 (파일명 또는 언어) */}
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
          <span className="text-xs text-muted-foreground font-mono">
            {filename || language}
          </span>
          <CopyButton text={code} />
        </div>
      )}

      {/* 코드 영역 with 구문 강조 */}
      <Highlight theme={prismTheme} code={code.trim()} language={language}>
        {({ className, style, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`p-4 overflow-x-auto text-sm ${className}`}
            style={{ ...style, background: "transparent" }}
          >
            <code className="font-mono leading-relaxed">
              {tokens.map((line, i) => (
                <div
                  key={i}
                  {...getLineProps({ line })}
                  className={showLineNumbers ? "table-row" : ""}
                >
                  {showLineNumbers && (
                    <span className="table-cell pr-4 text-muted-foreground/50 select-none text-right w-8">
                      {i + 1}
                    </span>
                  )}
                  <span className={showLineNumbers ? "table-cell" : ""}>
                    {line.map((token, key) => (
                      <span key={key} {...getTokenProps({ token })} />
                    ))}
                  </span>
                </div>
              ))}
            </code>
          </pre>
        )}
      </Highlight>

      {/* 헤더가 없는 경우 코드 영역에 복사 버튼 */}
      {!filename && !language && (
        <div className="absolute top-2 right-2">
          <CopyButton text={code} />
        </div>
      )}
    </div>
  );
}

export default memo(CodeBlock);

/**
 * prose 내부에서 사용할 인라인 코드 스타일
 */
export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-sm">
      {children}
    </code>
  );
}

/**
 * 탭 형식의 패키지 매니저 설치 블록
 */
type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

interface TabbedInstallProps {
  packageName: string;
}

export function TabbedInstall({ packageName }: TabbedInstallProps) {
  const [activeTab, setActiveTab] = useState<PackageManager>("npm");
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === "dark";
  const prismTheme = isDark ? themes.nightOwl : themes.nightOwlLight;

  const commands: Record<PackageManager, string> = {
    npm: `npm install ${packageName}`,
    yarn: `yarn add ${packageName}`,
    pnpm: `pnpm add ${packageName}`,
    bun: `bun add ${packageName}`,
  };

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-muted/30 not-prose">
      {/* 탭 헤더 */}
      <div className="flex border-b border-border">
        {(Object.keys(commands) as PackageManager[]).map((pm) => (
          <button
            key={pm}
            type="button"
            onClick={() => setActiveTab(pm)}
            className={`px-4 py-2 text-sm font-medium transition-colors ${
              activeTab === pm
                ? "text-foreground bg-muted"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {pm}
          </button>
        ))}
      </div>
      {/* 코드 영역 */}
      <div className="flex items-center justify-between px-4 py-3">
        <Highlight
          theme={prismTheme}
          code={commands[activeTab]}
          language="bash"
        >
          {({ className, style, tokens, getLineProps, getTokenProps }) => (
            <code
              className={`text-sm font-mono ${className}`}
              style={{ ...style, background: "transparent" }}
            >
              {tokens.map((line, i) => (
                <span key={i} {...getLineProps({ line })}>
                  {line.map((token, key) => (
                    <span key={key} {...getTokenProps({ token })} />
                  ))}
                </span>
              ))}
            </code>
          )}
        </Highlight>
        <CopyButton text={commands[activeTab]} />
      </div>
    </div>
  );
}
