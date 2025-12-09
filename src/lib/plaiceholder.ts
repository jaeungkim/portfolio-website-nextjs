import { getPlaiceholder } from "plaiceholder";
import fs from "fs/promises";

/**
 * 정적 이미지 파일의 블러 플레이스홀더를 생성합니다.
 * @param filePath - 파일 시스템 경로
 * @returns base64 인코딩된 블러 데이터 URL 또는 null (실패 시)
 */
export async function getStaticPlaiceholder(
  filePath: string
): Promise<string | null> {
  try {
    const buffer = await fs.readFile(filePath);
    const { base64 } = await getPlaiceholder(buffer, { size: 10 });
    return base64;
  } catch (error) {
    console.error(`정적 이미지 플레이스홀더 생성 실패 (${filePath}):`, error);
    return null;
  }
}

/**
 * 원격 이미지의 블러 플레이스홀더를 생성합니다.
 * @param url - 원격 이미지 URL
 * @returns base64 인코딩된 블러 데이터 URL 또는 null (실패 시)
 */
export async function getRemotePlaiceholder(
  url: string
): Promise<string | null> {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10초 타임아웃

    const response = await fetch(url, {
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn(`이미지 가져오기 실패: ${url} - ${response.statusText}`);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { base64 } = await getPlaiceholder(buffer, { size: 10 });

    return base64;
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error(`이미지 가져오기 타임아웃: ${url}`);
    } else {
      console.error(`플레이스홀더 생성 실패 (${url}):`, error);
    }
    return null;
  }
}

/**
 * 이미지 경로나 URL에 따라 적절한 플레이스홀더를 가져옵니다.
 * @param imagePathOrUrl - 이미지 경로 (정적: `/images/...`) 또는 URL (원격: `https://...`)
 * @returns base64 인코딩된 블러 데이터 URL 또는 null (실패 시)
 */
export async function getImagePlaceholder(
  imagePathOrUrl: string
): Promise<string | null> {
  // 정적 이미지인지 확인 (공개 경로로 시작)
  if (imagePathOrUrl.startsWith("/")) {
    const filePath = imagePathOrUrl.startsWith("/images/")
      ? imagePathOrUrl.replace("/images/", "")
      : imagePathOrUrl.slice(1);
    const fullPath = `${process.cwd()}/public${imagePathOrUrl}`;
    return getStaticPlaiceholder(fullPath);
  }

  // 원격 이미지
  return getRemotePlaiceholder(imagePathOrUrl);
}
