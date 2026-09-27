import type { Locale } from "@/i18n/config";

export const ERROR_MESSAGES: Record<
  Locale,
  { title: string; description: string; retry: string }
> = {
  en: {
    title: "Something went wrong",
    description: "An unexpected error occurred while loading this page.",
    retry: "Try again",
  },
  ko: {
    title: "문제가 발생했습니다",
    description: "페이지를 불러오는 중 예상치 못한 오류가 발생했습니다.",
    retry: "다시 시도",
  },
};
