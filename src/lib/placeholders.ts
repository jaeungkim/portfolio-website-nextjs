import { cache } from "react";
import fs from "fs/promises";
import path from "path";

const PLACEHOLDERS_CACHE_FILE = path.join(
  process.cwd(),
  "src",
  "app",
  "(main)",
  "blog",
  "data",
  "placeholders.json"
);

/**
 * 플레이스홀더 캐시를 로드합니다.
 * React cache를 사용하여 동일한 요청에 대해 한 번만 로드됩니다.
 */
export const loadPlaceholders = cache(
  async (): Promise<Record<string, string>> => {
    try {
      const cacheContent = await fs.readFile(PLACEHOLDERS_CACHE_FILE, "utf-8");
      return JSON.parse(cacheContent);
    } catch {
      return {};
    }
  }
);

/**
 * 특정 이미지 경로에 대한 플레이스홀더를 가져옵니다.
 * @param imagePath - 이미지 경로 (예: `/images/resume_img.JPG`)
 * @returns base64 인코딩된 블러 데이터 URL 또는 undefined
 */
export async function getPlaceholderForImage(
  imagePath: string
): Promise<string | undefined> {
  const placeholders = await loadPlaceholders();
  return placeholders[imagePath];
}
