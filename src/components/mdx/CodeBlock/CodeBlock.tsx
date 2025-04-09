import CopyButton from "./CopyButton";

export default function CodeBlock({
  children,
  title,
}: React.ComponentProps<"pre">) {
  const rawCode = (children as any)?.props?.children ?? "";

  return (
    <div className="group relative my-2 -mx-2 overflow-hidden rounded-lg sm:mx-0 sm:my-5">
      {title && (
        <div className="flex bg-[var(--prism-background)]">
          <div className="flex-none border-b-4 border-[#bbbbbb] px-5 pt-2 pb-1.5 text-sm font-bold text-[#bbbbbb]">
            {title}
          </div>
          <div className="mt-2 w-full rounded-tl bg-[var(--prism-selection)] ring-1 ring-inset ring-white/5" />
        </div>
      )}

      <pre className="m-0 rounded-none p-5 leading-4">{children}</pre>

      <CopyButton text={rawCode} />
    </div>
  );
}
