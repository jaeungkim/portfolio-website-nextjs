import fs from "fs/promises";
import path from "path";
import { getRemotePlaiceholder } from "../src/utils/plaiceholder";

const POSTS_DIR = path.join(process.cwd(), "src", "posts");
const PLACEHOLDERS_CACHE_DIR = path.join(process.cwd(), ".next");
const PLACEHOLDERS_CACHE_FILE = path.join(
  PLACEHOLDERS_CACHE_DIR,
  "placeholders.json"
);

/**
 * MDX 파일에서 BlurImage 컴포넌트의 URL을 추출합니다.
 */
function extractImageUrls(content: string): string[] {
  const urls: string[] = [];
  const blurImageRegex = /<BlurImage\s+url=["']([^"']+)["']/g;
  let match;

  while ((match = blurImageRegex.exec(content)) !== null) {
    urls.push(match[1]);
  }

  return urls;
}

/**
 * 모든 MDX 파일에서 이미지 URL을 수집합니다.
 */
async function collectImageUrls(): Promise<Set<string>> {
  const files = await fs.readdir(POSTS_DIR);
  const mdxFiles = files.filter((file) => file.endsWith(".mdx"));
  const imageUrls = new Set<string>();

  for (const file of mdxFiles) {
    const filePath = path.join(POSTS_DIR, file);
    const content = await fs.readFile(filePath, "utf-8");
    const urls = extractImageUrls(content);

    urls.forEach((url) => imageUrls.add(url));
  }

  return imageUrls;
}

/**
 * 기존 캐시를 로드합니다.
 */
async function loadCache(): Promise<Record<string, string>> {
  try {
    const cacheContent = await fs.readFile(PLACEHOLDERS_CACHE_FILE, "utf-8");
    return JSON.parse(cacheContent);
  } catch {
    return {};
  }
}

/**
 * 캐시를 저장합니다.
 */
async function saveCache(cache: Record<string, string>): Promise<void> {
  await fs.mkdir(PLACEHOLDERS_CACHE_DIR, { recursive: true });
  await fs.writeFile(PLACEHOLDERS_CACHE_FILE, JSON.stringify(cache, null, 2));
}

/**
 * 플레이스홀더를 생성하고 캐시합니다.
 */
async function generatePlaceholders(): Promise<void> {
  console.log("이미지 URL 수집 중...");
  const imageUrls = await collectImageUrls();
  console.log(`${imageUrls.size}개의 고유한 이미지 URL 발견`);

  console.log("기존 캐시 로드 중...");
  const cache = await loadCache();

  let newCount = 0;
  let cachedCount = 0;
  let failedCount = 0;

  for (const url of Array.from(imageUrls)) {
    if (cache[url]) {
      cachedCount++;
      continue;
    }

    console.log(`플레이스홀더 생성 중: ${url}`);
    const placeholder = await getRemotePlaiceholder(url);

    if (placeholder) {
      cache[url] = placeholder;
      newCount++;
    } else {
      failedCount++;
      console.warn(`플레이스홀더 생성 실패: ${url}`);
    }
  }

  console.log("\n플레이스홀더 생성 완료:");
  console.log(`  - 새로 생성: ${newCount}`);
  console.log(`  - 캐시에서 로드: ${cachedCount}`);
  console.log(`  - 실패: ${failedCount}`);

  await saveCache(cache);
  console.log(`캐시 저장 완료: ${PLACEHOLDERS_CACHE_FILE}`);
}

generatePlaceholders().catch((error) => {
  console.error("플레이스홀더 생성 중 오류 발생:", error);
  process.exit(1);
});

