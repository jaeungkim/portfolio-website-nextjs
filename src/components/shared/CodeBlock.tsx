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

function CodeBlock({
  code,
  filename,
  language = "typescript",
  showLineNumbers = false,
}: CodeBlockProps) {
  const { resolvedTheme } = useTheme();
  const prismTheme =
    resolvedTheme === "dark" ? themes.nightOwl : themes.nightOwlLight;

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-muted/30 not-prose">
      {(filename || language) && (
        <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-muted/50">
          <span className="text-xs text-muted-foreground font-mono">
            {filename || language}
          </span>
          <CopyButton text={code} />
        </div>
      )}

      <Highlight theme={prismTheme} code={code.trim()} language={language}>
        {({ className, tokens, getLineProps, getTokenProps }) => (
          <pre
            className={`p-4 overflow-x-auto text-sm !bg-transparent ${className}`}
          >
            <code className="font-mono leading-relaxed !bg-transparent">
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
    </div>
  );
}

export default memo(CodeBlock);

export function InlineCode({ children }: { children: React.ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-muted text-foreground font-mono text-sm">
      {children}
    </code>
  );
}

type PackageManager = "npm" | "yarn" | "pnpm" | "bun";

interface TabbedInstallProps {
  packageName: string;
}

export function TabbedInstall({ packageName }: TabbedInstallProps) {
  const [activeTab, setActiveTab] = useState<PackageManager>("npm");
  const { resolvedTheme } = useTheme();
  const prismTheme =
    resolvedTheme === "dark" ? themes.nightOwl : themes.nightOwlLight;

  const commands: Record<PackageManager, string> = {
    npm: `npm install ${packageName}`,
    yarn: `yarn add ${packageName}`,
    pnpm: `pnpm add ${packageName}`,
    bun: `bun add ${packageName}`,
  };

  return (
    <div className="rounded-lg overflow-hidden border border-border bg-muted/30 not-prose">
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
      <div className="flex items-center justify-between px-4 py-3">
        <Highlight
          theme={prismTheme}
          code={commands[activeTab]}
          language="bash"
        >
          {({ className, tokens, getLineProps, getTokenProps }) => (
            <code className={`text-sm font-mono !bg-transparent ${className}`}>
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
