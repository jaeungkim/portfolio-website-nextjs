interface ResumeTitleProps {
  title: string;
}

export default function ResumeTitle({ title }: ResumeTitleProps) {
  return (
    <div className="font-semibold text-foreground text-3xl uppercase">
      {title}
    </div>
  );
}
