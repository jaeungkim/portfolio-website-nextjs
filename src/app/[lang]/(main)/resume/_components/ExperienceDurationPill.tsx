import { cacheLife } from "next/cache";
import { Pill } from "@/app/[lang]/(main)/resume/_components/Pill";
import { getDictionary } from "@/i18n/dictionaries";

const EXPERIENCES = {
  e8ight: ["2024-01-08"],
  flashee: ["2023-06-16", "2023-10-13"],
  iclinic: ["2022-07-12", "2023-06-15"],
  catalx: ["2021-01-07", "2022-05-15"],
};

function monthsBetween(start: string, end?: string) {
  const from = new Date(start);
  const to = end ? new Date(end) : new Date();
  to.setUTCDate(to.getUTCDate() + 1);
  return (
    (to.getUTCFullYear() - from.getUTCFullYear()) * 12 +
    to.getUTCMonth() -
    from.getUTCMonth() +
    (to.getUTCDate() - from.getUTCDate()) / 31
  );
}

export async function ExperienceDurationPill() {
  "use cache";
  cacheLife("days");
  const units = (await getDictionary()).resume.experienceUnits;
  const total = Math.floor(
    Object.values(EXPERIENCES).reduce(
      (sum, [start, end]) => sum + monthsBetween(start, end),
      0,
    ),
  );
  const months = total % 12;
  return (
    <Pill
      name={`${Math.floor(total / 12)}${units.years}${months ? ` ${months}${units.months}` : ""}+`}
    />
  );
}
