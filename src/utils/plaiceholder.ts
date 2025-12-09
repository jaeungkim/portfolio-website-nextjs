import { getPlaiceholder } from "plaiceholder";

/**
 * 원격 이미지의 블러 플레이스홀더를 생성합니다.
 * @param url - 원격 이미지 URL
 * @returns base64 인코딩된 블러 데이터 URL 또는 null (실패 시)
 */
export async function getRemotePlaiceholder(
  url: string
): Promise<string | null> {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      console.warn(`이미지 가져오기 실패: ${url} - ${response.statusText}`);
      return null;
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const { base64 } = await getPlaiceholder(buffer, { size: 10 });

    return base64;
  } catch (error) {
    console.error(`플레이스홀더 생성 실패 (${url}):`, error);
    return null;
  }
}
