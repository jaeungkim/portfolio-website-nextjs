"use client";

import Pill from "@/src/components/shared/Pill";
import {
  calculateTotalExperience,
  formatExperienceText,
} from "@/src/utils/date";

const EXPERIENCES = [
  { startDate: "2024-01-08" },
  { startDate: "2023-06-16", endDate: "2023-10-13" },
  { startDate: "2022-07-12", endDate: "2023-06-15" },
  { startDate: "2021-01-07", endDate: "2022-05-15" },
] as const;

export default function ExperienceDurationPill() {
  const experience = calculateTotalExperience(EXPERIENCES, new Date());

  return (
    <Pill
      name={`${formatExperienceText(experience.years, experience.months)}+`}
    />
  );
}
