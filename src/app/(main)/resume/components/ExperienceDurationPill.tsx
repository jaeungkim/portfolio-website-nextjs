"use client";

import { Pill } from "@/src/components/shared/Pill";
import {
  calculateTotalExperience,
  formatExperienceText,
} from "@/src/utils/date";

const EXPERIENCES = [
  { startDate: "2024-01-08" }, // E8IGHT
  { startDate: "2023-06-16", endDate: "2023-10-13" }, // FLASHEE
  { startDate: "2022-07-12", endDate: "2023-06-15" }, // ICLINIC
  { startDate: "2021-01-07", endDate: "2022-05-15" }, // CATALX
] as const;

export function ExperienceDurationPill() {
  const experience = calculateTotalExperience(EXPERIENCES, new Date());

  return (
    <Pill
      name={`${formatExperienceText(experience.years, experience.months)}+`}
    />
  );
}
