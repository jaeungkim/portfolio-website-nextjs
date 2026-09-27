import { getLocale } from "@/i18n/dictionaries";

export async function formatDate(date: string): Promise<string> {
  return new Date(date).toLocaleDateString(await getLocale(), {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
}
