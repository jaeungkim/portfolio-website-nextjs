import dayjs from "dayjs";

type ExperienceDateRange = {
  startDate: string;
  endDate?: string;
};

export function calculateTotalExperience(
  experiences: ReadonlyArray<ExperienceDateRange>,
  referenceDate: string | Date,
) {
  const currentDate = dayjs(referenceDate);

  const totalMonths = experiences.reduce((acc, work) => {
    const start = dayjs(work.startDate);
    const end = work.endDate ? dayjs(work.endDate) : currentDate;

    const duration = end.add(1, "day").diff(start, "month", true);
    return acc + duration;
  }, 0);

  const years = Math.floor(totalMonths / 12);
  const months = Math.floor(totalMonths % 12);

  return { years, months, totalMonths };
}

export function formatExperienceText(years: number, months: number) {
  const parts = [];
  if (years > 0) parts.push(`${years}년`);
  if (months > 0) parts.push(`${months}개월`);

  return parts.length > 0 ? parts.join(" ") : "신입";
}
