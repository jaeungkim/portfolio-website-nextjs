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
    <section className="grid gap-6 md:grid-cols-[220px_minmax(0,1fr)] md:items-start md:gap-8">
      {image && (
        <div className="overflow-hidden rounded-xl border border-border bg-muted">
          <div className="relative aspect-[4/5] w-full">
            <Image
              src={image}
              alt={name}
              fill
              sizes="(min-width: 768px) 220px, 100vw"
              className="object-cover"
              priority
            />
          </div>
        </div>
      )}

      <div className="space-y-4">
        <div>
          <h1 className="text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
            {name}
          </h1>
          <p className="mt-2 text-lg font-medium text-muted-foreground md:text-xl">
            {role}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
          {contactLinks.map((link) => (
            <ContactLink key={link.label} {...link} />
          ))}
        </div>

        <div className="space-y-3 text-[15.5px] leading-7 text-muted-foreground">
          {description.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </div>
    </section>
  );
}
