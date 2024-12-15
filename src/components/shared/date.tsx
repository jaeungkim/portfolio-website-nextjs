import { parseISO, format } from "date-fns";

interface Props {
  dateString: string;
  mobile: boolean;
}

export default function Date({ dateString, mobile }: Props) {
  const date = parseISO(dateString);
  const commonClasses =
    "relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500";
  const mobileClasses = "md:hidden pl-3.5";
  const desktopClasses = "hidden md:block mt-1";
  const classes = mobile
    ? `${commonClasses} ${mobileClasses}`
    : `${commonClasses} ${desktopClasses}`;
  return (
    <time className={classes} dateTime={dateString}>
      {mobile && (
        <span className="absolute inset-y-0 left-0 flex items-center">
          <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
        </span>
      )}
      {format(date, "LLLL d, yyyy")}
    </time>
  );
}
