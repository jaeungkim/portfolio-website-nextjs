import { cache } from "react";

// Types
export interface Experience {
  start: string;
  end?: string | null;
}

// Constants
export const experiences = [
  {
    id: "e8ight",
    start: "2024-01-08",
    end: null,
    skills: [
      "Next.js",
      "React",
      "TypeScript",
      "Recoil",
      "Zustand",
      "Tanstack Query",
      "Tanstack Virtual",
      "Tailwind CSS",
      "Storybook",
      "Motion",
      "Sentry",
      "Docker",
      "Jenkins",
    ],
  }, // e8ight
  {
    id: "flashee",
    start: "2023-06-16",
    end: "2023-10-13",
    skills: [
      "React",
      "Redux",
      "Tailwind CSS",
      "Supabase",
      "Shopify Marketplaces",
      "Shopify Payments",
      "AWS",
      "Fly.io",
    ],
  }, // flashee
  {
    id: "iclinic",
    start: "2022-07-12",
    end: "2023-06-15",
    skills: [
      "Angular",
      "Three.js",
      "WebGL",
      "GSAP",
      "Motion",
      "Node.js",
      "Express.js",
      "MongoDB",
      "AWS",
      "GitHub Actions",
    ],
  }, // iclinic
  {
    id: "catalyx",
    start: "2021-01-07",
    end: "2022-05-15",
    skills: ["React", "GraphQL", "AWS"],
  }, // catalyx
];

export const projectsResume = [
  {
    id: "react-gantt-chart",
    link: {
      label: "Demo",
      url: "https://jaeungkim.com/gantt-chart",
    },
    skills: ["React", "Vite", "Zustand"],
  },
  {
    id: "portfolio-website",
    link: {
      label: "GitHub Repository",
      url: "https://github.com/jaeungkim/portfolio-website-nextjs",
    },
    skills: [
      "Next 15 (App)",
      "Tailwind CSS",
      "GSAP",
      "Framer Motion",
      "Three.js",
    ],
  },
  {
    id: "bc-government",
    link: {
      label: "GitHub Repository",
      url: "https://github.com/jaeungkim/moti-is24-code-challenge",
    },
    skills: [
      "React",
      "Tailwind CSS",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Docker",
    ],
  },
  {
    id: "lostark-bot",
    link: {
      label: "GitHub Repository",
      url: "https://github.com/jaeungkim/lostark_bot",
    },
    skills: ["Node.js", "Discord.js", "Heroku", "JavaScript"],
  },
  {
    id: "webgl-playground",
    link: {
      label: "GitHub Repository",
      url: "https://github.com/jaeungkim/webGL-playground",
    },
    skills: ["React", "Three.js", "WebGL", "GSAP", "Motion"],
  },
];

// Utils
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
  const yearTxt = (n: number) => (n === 1 ? "1년" : `${n}년`);
  const monthTxt = (n: number) => (n === 1 ? "1개월" : `${n}개월`);
  const yearMonthTxt = (y: number, m: number) => `${yearTxt(y)} ${monthTxt(m)}`;

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

