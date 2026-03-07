import dayjs from "dayjs";
import { ResumeExperience } from "../app/(main)/resume/components/resume.data";

export function calculateTotalExperience(experiences: ResumeExperience[]) {
  const totalMonths = experiences.reduce((acc, work) => {
    const start = dayjs(work.startDate);
    const end = work.endDate ? dayjs(work.endDate) : dayjs();

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
