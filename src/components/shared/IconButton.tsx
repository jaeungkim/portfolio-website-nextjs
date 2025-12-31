import Image from "next/image";

interface IconButtonProps {
  href: string;
  icon: string;
  label: string;
  iconClassName?: string;
}

export default function IconButton({
  href,
  icon,
  label,
  iconClassName,
}: IconButtonProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-border text-muted-foreground hover:text-foreground hover:border-foreground/50 transition-all text-sm"
    >
      <Image
        src={icon}
        alt=""
        width={16}
        height={16}
        className={`size-4 ${iconClassName || ""}`}
      />
      {label}
    </a>
  );
}
