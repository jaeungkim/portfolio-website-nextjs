import { NextResponse, type NextRequest } from "next/server";
import {
  DEFAULT_LOCALE,
  LOCALE_COOKIE,
  isLocale,
  type Locale,
} from "@/src/i18n/config";
import { negotiateLocale } from "@/src/i18n/negotiate";

function resolveLocale(request: NextRequest): Locale {
  const preferred = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(preferred)) return preferred;

  return negotiateLocale(request.headers.get("accept-language"));
}

/**
 * Every route lives under `/[lang]`, so a request without a locale prefix is
 * redirected to the visitor's locale. Prefixed requests are excluded by the
 * matcher; the `isLocale` check is a fallback if a locale is added to one but not the other.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (isLocale(pathname.split("/")[1])) return;

  const url = request.nextUrl.clone();
  const locale = resolveLocale(request);
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;

  const response = NextResponse.redirect(url);
  if (locale !== DEFAULT_LOCALE || !request.cookies.has(LOCALE_COOKIE)) {
    response.cookies.set(LOCALE_COOKIE, locale, {
      path: "/",
      maxAge: 60 * 60 * 24 * 365,
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  // Skip Next internals, anything with a file extension (fonts, icons, images),
  // and the locale-prefixed pages, so prerendered `/en/*` and `/ko/*` are served
  // from cache without invoking the proxy. Must be a literal; keep in sync with LOCALES.
  matcher: ["/((?!_next|en(?:/|$)|ko(?:/|$)|.*\\..*).*)"],
};
