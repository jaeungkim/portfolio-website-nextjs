import Image from "next/image";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  type LucideIcon,
} from "lucide-react";
import { resumePersonalInfo } from "./resume.data";

interface ContactLinkProps {
  href: string;
  label: string;
  icon: LucideIcon;
  external?: boolean;
}

function ContactLink({
  href,
  label,
  icon: Icon,
  external = false,
}: ContactLinkProps) {
  const externalProps = external
    ? { target: "_blank", rel: "noreferrer" }
    : undefined;

  return (
    <a
      className="inline-flex items-center gap-1.5 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
      href={href}
      {...externalProps}
    >
      <Icon className="size-3" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}

export default function ResumeHeader() {
  const { name, role, image, description, email, github, linkedin, notion } =
    resumePersonalInfo;

  const contactLinks = [
    {
      href: `mailto:${email}`,
      label: "Email",
      icon: Mail,
    },
    {
      href: github,
      label: "GitHub",
      icon: Github,
      external: true,
    },
    {
      href: linkedin,
      label: "LinkedIn",
      icon: Linkedin,
      external: true,
    },
    {
      href: notion,
      label: "Notion",
      icon: FileText,
      external: true,
    },
  ] satisfies ContactLinkProps[];

  return (
    <section className="flex flex-col items-center gap-6 sm:gap-7 md:flex-row md:items-start md:gap-8 md:text-left">
      {image && (
        <div className="w-full max-w-[140px] shrink-0 overflow-hidden rounded-xl border border-border bg-muted sm:max-w-[168px] md:w-[clamp(180px,24vw,220px)] md:max-w-none">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(min-width: 1024px) 220px, (min-width: 768px) 24vw, (min-width: 640px) 168px, 140px"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <div className="flex w-full flex-col items-start space-y-4 md:items-start">
        <div className="text-left md:text-left">
          <h1 className="text-3xl font-semibold tracking-tight text-foreground md:text-5xl">
            {name}
          </h1>
          <p className="mt-2 text-lg font-medium text-muted-foreground md:text-xl">
            {role}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-start gap-x-4 gap-y-2 md:justify-start">
          {contactLinks.map((link) => (
            <ContactLink key={link.label} {...link} />
          ))}
        </div>

        <div className="space-y-3 text-left text-[15.5px] leading-7 text-muted-foreground md:text-left">
          {description.map((paragraph, idx) => (
            <p key={idx}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
