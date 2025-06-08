import { cache } from "react";
import { getTranslations } from "next-intl/server";

export interface Experience {
  start: string;
  end?: string | null;
}

function monthsBetween(startISO: string, endISO?: string | null): number {
  const start = new Date(startISO);
  const end = endISO ? new Date(endISO) : new Date();

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (end.getDate() >= start.getDate()) months++;
  if (months < 0) {
    years--;
    months += 12;
  }

  return Math.max(1, years * 12 + months);
}

const getFormatter = cache(async () => {
  const t = await getTranslations("common.utils");

  const yearTxt = (n: number) =>
    t(n === 1 ? "year" : "year_plural", { count: n });
  const monthTxt = (n: number) =>
    t(n === 1 ? "month" : "month_plural", { count: n });
  const yearMonthTxt = (y: number, m: number) =>
    t("yearAndMonth", { year: yearTxt(y), month: monthTxt(m) });

  const format = (total: number) => {
    const y = Math.floor(total / 12);
    const m = total % 12;
    if (y && m) return yearMonthTxt(y, m);
    return y ? yearTxt(y) : monthTxt(m);
  };

  return { format };
});

export async function getExperienceUtils() {
  const { format } = await getFormatter();

  const experienceForRange = (start: string, end?: string | null) =>
    format(monthsBetween(start, end));

  const sumMonths = (items: Experience[]) =>
    items.reduce((acc, cur) => acc + monthsBetween(cur.start, cur.end), 0);

  const totalExperience = (items: Experience[]) => format(sumMonths(items));

  const totalExperienceYearsOnly = (items: Experience[]) => {
    const months = sumMonths(items);
    const rounded = Math.floor(months / 12) * 12 || 12;
    return format(rounded);
  };

  return {
    calculateExperience: experienceForRange,
    calculateTotalExperience: totalExperience,
    calculateTotalExperienceInYears: totalExperienceYearsOnly,
  };
}
