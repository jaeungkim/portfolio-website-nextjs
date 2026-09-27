import fs from "fs/promises";
import path from "path";
import { getPlaiceholder } from "plaiceholder";
import {
  extractImageUrls,
  POSTS_DIR,
  listPostSlugs,
  readPostSource,
} from "@/app/[lang]/(main)/blog/_lib/post-files";

const PLACEHOLDERS_FILE = path.join(
  POSTS_DIR,
  "..",
  "_data",
  "placeholders.json",
);

type PlaceholderEntry = {
  blurDataURL: string;
  width: number;
  height: number;
};

async function createPlaceholder(url: string): Promise<PlaceholderEntry> {
  const res = await fetch(url, { signal: AbortSignal.timeout(10_000) });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText}`);
  const { base64, metadata } = await getPlaiceholder(
    Buffer.from(await res.arrayBuffer()),
    { size: 10 },
  );
  return {
    blurDataURL: base64,
    width: metadata.width,
    height: metadata.height,
  };
}

async function generatePlaceholders() {
  const cache: Record<string, PlaceholderEntry> = await fs
    .readFile(PLACEHOLDERS_FILE, "utf-8")
    .then(JSON.parse)
    .catch(() => ({}));

  const urls = new Set<string>();
  for (const slug of await listPostSlugs()) {
    extractImageUrls(await readPostSource(slug)).forEach((url) =>
      urls.add(url),
    );
  }

  for (const url of urls) {
    if (cache[url]) continue;
    try {
      cache[url] = await createPlaceholder(url);
      console.log(`생성: ${url}`);
    } catch (error) {
      console.error(`실패: ${url}`, error);
    }
  }

  await fs.writeFile(PLACEHOLDERS_FILE, JSON.stringify(cache, null, 2));
  console.log(`플레이스홀더 ${urls.size}개 확인 완료`);
}

generatePlaceholders();
