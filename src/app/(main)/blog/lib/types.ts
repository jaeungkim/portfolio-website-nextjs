export interface Frontmatter {
  title: string;
  date: string;
  summary: string;
}

export interface Post {
  id: string;
  title: string;
  date: string;
  summary: string;
}

export interface PostData {
  slug: string;
  id: string;
  date: string;
  title: string;
  summary: string;
}

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/;

export function parseFrontmatter(
  raw: unknown,
  filename: string,
): Frontmatter {
  if (typeof raw !== "object" || raw === null) {
    throw new Error(`[${filename}] frontmatter must be an object`);
  }
  const fields = raw as Record<string, unknown>;

  const title = fields.title;
  if (typeof title !== "string" || title.length === 0) {
    throw new Error(`[${filename}] frontmatter.title is required`);
  }

  const date = fields.date;
  if (typeof date !== "string" || !DATE_REGEX.test(date)) {
    throw new Error(`[${filename}] frontmatter.date must be YYYY-MM-DD`);
  }

  const summaryRaw = fields.summary;
  if (summaryRaw !== undefined && typeof summaryRaw !== "string") {
    throw new Error(`[${filename}] frontmatter.summary must be a string`);
  }

  return { title, date, summary: summaryRaw ?? "" };
}
