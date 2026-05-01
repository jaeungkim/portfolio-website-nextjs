import { getPlaiceholder } from "plaiceholder";
import fs from "fs/promises";

export type Plaiceholder = {
  base64: string;
  width: number;
  height: number;
};

export async function getStaticPlaiceholder(
  filePath: string,
): Promise<Plaiceholder | null> {
  try {
    const buffer = await fs.readFile(filePath);
    const { base64, metadata } = await getPlaiceholder(buffer, { size: 10 });
    return { base64, width: metadata.width, height: metadata.height };
  } catch (error) {
    console.error(`정적 이미지 플레이스홀더 생성 실패 (${filePath}):`, error);
    return null;
  }
}

export async function getRemotePlaiceholder(
  url: string,
): Promise<Plaiceholder | null> {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000);

  try {
    const response = await fetch(url, { signal: controller.signal });

    if (!response.ok) {
      console.warn(`이미지 가져오기 실패: ${url} - ${response.statusText}`);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const { base64, metadata } = await getPlaiceholder(buffer, { size: 10 });

    return { base64, width: metadata.width, height: metadata.height };
  } catch (error) {
    if (error instanceof Error && error.name === "AbortError") {
      console.error(`이미지 가져오기 타임아웃: ${url}`);
    } else {
      console.error(`플레이스홀더 생성 실패 (${url}):`, error);
    }
    return null;
  } finally {
    clearTimeout(timeoutId);
  }
}
