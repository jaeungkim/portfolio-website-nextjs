import { DEFAULT_LOCALE, isLocale, type Locale } from "@/src/i18n/config";

interface ErrorMessages {
  title: string;
  description: string;
  retry: string;
}

/**
 * Error boundaries are Client Components, so they cannot read the locale from
 * `next/root-params`, and importing the full dictionaries would ship every
 * resume string to the browser. These few strings live here instead.
 */
export const ERROR_MESSAGES: Record<Locale, ErrorMessages> = {
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

/** Reads the locale out of the pathname, which is all a client boundary has. */
export function errorMessagesFor(pathname: string): ErrorMessages {
  const segment = pathname.split("/")[1];
  return ERROR_MESSAGES[isLocale(segment) ? segment : DEFAULT_LOCALE];
}
