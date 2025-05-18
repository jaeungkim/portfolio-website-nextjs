import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

const NAMESPACES = ["common", "home", "resume"];

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as never)) {
    locale = routing.defaultLocale;
  }

  const messages: Record<string, any> = {};

  await Promise.all(
    NAMESPACES.map(async (ns) => {
      const mod = await import(`../../messages/${locale}/${ns}.json`);
      messages[ns] = mod.default;
    })
  );

  return {
    locale,
    messages,
  };
});
