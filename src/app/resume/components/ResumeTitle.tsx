import type { ResumeTitleProps } from "./types";

export default function ResumeTitle({ title }: ResumeTitleProps) {
  return (
    <div className="font-semibold text-neutral-800 dark:text-neutral-200 text-3xl uppercase">
      {title}
    </div>
  );
}

