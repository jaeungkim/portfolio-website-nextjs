// lib/experience.ts
import { getTranslations } from "next-intl/server";

interface Experience {
  start: string;
  end: string | null;
}

function calculateExperienceParts(
  startDate: string,
  endDate: string | null = null
) {
  const start = new Date(startDate);
  const end = endDate ? new Date(endDate) : new Date();

  let years = end.getFullYear() - start.getFullYear();
  let months = end.getMonth() - start.getMonth();

  if (end.getDate() >= start.getDate()) {
    months++;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  const totalMonths = years * 12 + months;
  const finalYears = Math.floor(totalMonths / 12);
  const finalMonths = totalMonths % 12;

  return { totalMonths, years: finalYears, months: finalMonths };
}

export async function getExperienceUtils() {
  const t = await getTranslations("common.utils");

  const formatYear = (count: number) =>
    t(count > 1 ? "year_plural" : "year", { count });

  const formatMonth = (count: number) =>
    t(count > 1 ? "month_plural" : "month", { count });

  const formatYearAndMonth = (year: number, month: number) =>
    t("yearAndMonth", {
      year: formatYear(year),
      month: formatMonth(month),
    });

  const calculateExperience = (
    startDate: string,
    endDate: string | null = null
  ): string => {
    const { years, months, totalMonths } = calculateExperienceParts(
      startDate,
      endDate
    );

    if (totalMonths <= 0) return formatMonth(1);
    if (years > 0 && months > 0) return formatYearAndMonth(years, months);
    if (years > 0) return formatYear(years);
    return formatMonth(months);
  };

  const calculateTotalExperience = (experiences: Experience[]): string => {
    let totalMonths = 0;
    experiences.forEach(({ start, end }) => {
      const { totalMonths: diff } = calculateExperienceParts(start, end);
      totalMonths += diff <= 0 ? 1 : diff;
    });

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years > 0 && months > 0) return formatYearAndMonth(years, months);
    if (years > 0) return formatYear(years);
    return formatMonth(months);
  };

  const calculateTotalExperienceInYears = (
    experiences: Experience[]
  ): string => {
    let totalMonths = 0;
    experiences.forEach(({ start, end }) => {
      const { totalMonths: diff } = calculateExperienceParts(start, end);
      totalMonths += diff <= 0 ? 1 : diff;
    });

    const years = Math.floor(totalMonths / 12);
    return formatYear(years > 0 ? years : 1);
  };

  return {
    calculateExperience,
    calculateTotalExperience,
    calculateTotalExperienceInYears,
  };
}
