import { z } from "zod";

export const frontmatterSchema = z.object({
  title: z.string().min(1, "제목은 필수입니다"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "날짜는 YYYY-MM-DD 형식이어야 합니다"),
  summary: z.string().optional().default(""),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

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
