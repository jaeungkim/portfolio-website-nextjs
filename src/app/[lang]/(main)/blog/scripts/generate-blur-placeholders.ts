import fs from "fs/promises";
import path from "path";
import { extractImageUrls } from "@/src/app/[lang]/(main)/blog/scripts/extract-image-urls";
import {
  getRemotePlaiceholder,
  type Plaiceholder,
} from "@/src/lib/plaiceholder";

const BLOG_DIR = path.join(
  process.cwd(),
  "src",
  "app",
  "[lang]",
  "(main)",
  "blog",
);
const POSTS_DIR = path.join(BLOG_DIR, "posts");
const PLACEHOLDERS_CACHE_DIR = path.join(BLOG_DIR, "data");
const PLACEHOLDERS_CACHE_FILE = path.join(
  PLACEHOLDERS_CACHE_DIR,
  "placeholders.json",
);

type PlaceholderEntry = {
  blurDataURL: string;
  width: number;
  height: number;
};

function toEntry(placeholder: Plaiceholder): PlaceholderEntry {
  return {
    blurDataURL: placeholder.base64,
    width: placeholder.width,
    height: placeholder.height,
  };
}

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

async function loadCache(): Promise<Record<string, PlaceholderEntry>> {
  try {
    const cacheContent = await fs.readFile(PLACEHOLDERS_CACHE_FILE, "utf-8");
    return JSON.parse(cacheContent);
  } catch {
    return {};
  }
}

async function saveCache(
  cache: Record<string, PlaceholderEntry>,
): Promise<void> {
  await fs.mkdir(PLACEHOLDERS_CACHE_DIR, { recursive: true });
  await fs.writeFile(PLACEHOLDERS_CACHE_FILE, JSON.stringify(cache, null, 2));
  console.log(`캐시 저장 완료: ${PLACEHOLDERS_CACHE_FILE}`);
}

async function generatePlaceholders(): Promise<void> {
  console.log("=== 플레이스홀더 생성 시작 ===\n");

  const cache = await loadCache();
  console.log(`기존 캐시 항목 수: ${Object.keys(cache).length}\n`);

  const imageUrls = await collectImageUrls();
  console.log(`${imageUrls.size}개의 고유한 원격 이미지 URL 발견`);

  let newCount = 0;
  let cachedCount = 0;
  let failedCount = 0;

  for (const url of Array.from(imageUrls)) {
    if (cache[url]) {
      cachedCount++;
      continue;
    }

    console.log(`  생성 중: ${url}`);
    const placeholder = await getRemotePlaiceholder(url);

    if (placeholder) {
      cache[url] = toEntry(placeholder);
      newCount++;
    } else {
      failedCount++;
      console.warn(`  실패: ${url}`);
    }
  }

  console.log(
    `\n=== 완료 === 새로 생성: ${newCount}, 캐시: ${cachedCount}, 실패: ${failedCount}`,
  );

  await saveCache(cache);
}

generatePlaceholders().catch((error) => {
  console.error("플레이스홀더 생성 중 오류 발생:", error);
  process.exit(1);
});
