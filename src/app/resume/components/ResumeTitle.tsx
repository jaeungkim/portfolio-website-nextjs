import type { ResumeTitleProps } from "./types";

export default function ResumeTitle({ title }: ResumeTitleProps) {
  return (
    <div className="font-semibold text-foreground text-3xl uppercase">
      {title}
    </div>
  );
}
