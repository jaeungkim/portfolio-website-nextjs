import { cn } from "@/src/app/utils/cn";

export default function ExternalLink({
  link,
  children,
  additionalClassName,
}: {
  link: string;
  children: React.ReactNode;
  additionalClassName?: string;
}) {
  return (
    <a
      className={cn(
        `text-neutral-700 dark:text-neutral-300 font-bold cursor-pointer w-fit flex items-center gap-1 border-solid border-b border-neutral-700 leading-5 hover:border-neutral-200 transition-all duration-300 ease-in-out`,
        additionalClassName
      )}
      href={link}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M13.19 8.688a4.5 4.5 0 0 1 1.242 7.244l-4.5 4.5a4.5 4.5 0 0 1-6.364-6.364l1.757-1.757m13.35-.622 1.757-1.757a4.5 4.5 0 0 0-6.364-6.364l-4.5 4.5a4.5 4.5 0 0 0 1.242 7.244"
        />
      </svg>
    </a>
  );
}
