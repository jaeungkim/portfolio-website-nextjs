interface ResumeMetaProps {
  location?: string;
  role?: string;
}

export function ResumeMeta({ location, role }: ResumeMetaProps) {
  if (!location && !role) return null;
  return (
    <div className="space-y-1 text-muted-foreground">
      {location && <p className="text-base italic">{location}</p>}
      {role && <p className="text-base italic">{role}</p>}
    </div>
  );
}
