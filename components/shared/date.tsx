import { parseISO, format } from "date-fns";

export default function Date({
  dateString,
  mobile,
}: {
  dateString: string;
  mobile: boolean;
}) {
  const date = parseISO(dateString);
  return mobile ? (
    <time
      className="md:hidden relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500 pl-3.5"
      dateTime={dateString}
    >
      <span className="absolute inset-y-0 left-0 flex items-center">
        <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500"></span>
      </span>
      {format(date, "LLLL d, yyyy")}
    </time>
  ) : (
    <time
      className="mt-1 hidden md:block relative z-10 order-first mb-3 flex items-center text-sm text-zinc-400 dark:text-zinc-500"
      dateTime={dateString}
    >
      <span className="absolute inset-y-0 left-0 flex items-center"></span>
      {format(date, "LLLL d, yyyy")}
    </time>
  );
}
