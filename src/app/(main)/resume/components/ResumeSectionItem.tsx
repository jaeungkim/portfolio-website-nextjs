import React from "react";
import ExternalLink from "@/src/components/shared/ExternalLink";
import Pill from "@/src/components/shared/Pill";

export interface ResumeSectionItemProps {
  period: string;
  title: string;
  link?: string;
  location?: string;
  role?: string;
  bullets: React.ReactNode[];
  pills?: string[];
  isProject?: boolean;
}

export default function ResumeSectionItem({
  period,
  title,
  link,
  location,
  role,
  bullets,
  pills,
  isProject = false,
}: ResumeSectionItemProps) {
  return (
    <article className="mt-8 md:grid md:grid-cols-4 md:gap-x-6 gap-y-6 md:gap-y-0">
      {/* Left Column: Period / Link for Projects */}
      <div className="mb-2 md:mb-0">
        {!isProject ? (
          <p className="text-2xl font-medium text-muted-foreground">{period}</p>
        ) : (
          <ExternalLink
            additionalClassName="text-xl text-muted-foreground hover:text-foreground inline-block"
            link={link || "#"}
          >
            {title}
          </ExternalLink>
        )}
      </div>

      {/* Right Column: Content */}
      <div className="col-span-3 space-y-4">
        {/* Work specific header */}
        {!isProject && (
          <>
            {link ? (
              <ExternalLink additionalClassName="text-2xl" link={link}>
                {title}
              </ExternalLink>
            ) : (
              <p className="text-2xl font-medium">{title}</p>
            )}

            {(location || role) && (
              <div className="space-y-1 text-muted-foreground">
                {location && <p className="text-base italic">{location}</p>}
                {role && <p className="text-base italic">{role}</p>}
              </div>
            )}
          </>
        )}

        {/* Bullets */}
        {bullets && bullets.length > 0 && (
          <ul className="list-disc space-y-2 pl-5 text-base text-muted-foreground">
            {bullets.map((bullet, idx) => (
              <React.Fragment key={idx}>{bullet}</React.Fragment>
            ))}
          </ul>
        )}

        {/* Pills */}
        {pills && pills.length > 0 && (
          <div className="flex flex-wrap gap-1 pl-4">
            {pills.map((pill) => (
              <Pill key={pill} name={pill} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
