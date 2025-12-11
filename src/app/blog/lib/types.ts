import type React from "react";
import { z } from "zod";

/**
 * Frontmatter 스키마 - 빌드 시점에 유효성 검사
 * ISO 8601 날짜 형식(YYYY-MM-DD) 강제
 */
export const frontmatterSchema = z.object({
  title: z.string().min(1, "제목은 필수입니다"),
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "날짜는 YYYY-MM-DD 형식이어야 합니다"),
  summary: z.string().optional().default(""),
});

export type Frontmatter = z.infer<typeof frontmatterSchema>;

/**
 * 블로그 목록에서 사용되는 포스트 메타데이터
 */
export interface Post {
  id: string;
  title: string;
  date: string;
  summary: string;
}

/**
 * 개별 포스트 페이지에서 사용되는 전체 포스트 데이터
 */
export interface PostData {
  slug: string;
  id: string;
  content: React.ReactNode;
  date: string;
  title: string;
  summary: string;
}

