import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, hasLocale } from "@/i18n/config";

function negotiateLocale(request: NextRequest) {
  return (
    request.headers
      .get("accept-language")
      ?.split(",")
      .map((range) => range.split(/[-;]/)[0].trim().toLowerCase())
      .find(hasLocale) ?? DEFAULT_LOCALE
  );
}

export function proxy(request: NextRequest) {
  request.nextUrl.pathname = `/${negotiateLocale(request)}${request.nextUrl.pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|en(?:/|$)|ko(?:/|$)|.*\\..*).*)"],
};
