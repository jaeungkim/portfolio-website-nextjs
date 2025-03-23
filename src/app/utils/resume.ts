export const calculateExperience = (
  startDate: string,
  endDate: string | null = null
): string => {
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

  if (totalMonths <= 0) return `1개월`;

  const finalYears = Math.floor(totalMonths / 12);
  const finalMonths = totalMonths % 12;

  if (finalYears > 0 && finalMonths > 0) {
    return `${finalYears}년 ${finalMonths}개월`;
  } else if (finalYears > 0) {
    return `${finalYears}년`;
  } else {
    return `${finalMonths}개월`;
  }
};

export const calculateTotalExperience = (
  experiences: { start: string; end: string | null }[]
): string => {
  let totalMonths = 0;

  experiences.forEach(({ start, end }) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();

    if (endDate.getDate() >= startDate.getDate()) {
      months++;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const diffMonths = years * 12 + months;

    totalMonths += diffMonths <= 0 ? 1 : diffMonths;
  });

  const totalYears = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  if (totalYears > 0 && remainingMonths > 0) {
    return `${totalYears}년 ${remainingMonths}개월`;
  } else if (totalYears > 0) {
    return `${totalYears}년`;
  } else {
    return `${remainingMonths}개월`;
  }
};

export const calculateTotalExperienceInYears = (
  experiences: { start: string; end: string | null }[]
): string => {
  let totalMonths = 0;

  experiences.forEach(({ start, end }) => {
    const startDate = new Date(start);
    const endDate = end ? new Date(end) : new Date();

    let years = endDate.getFullYear() - startDate.getFullYear();
    let months = endDate.getMonth() - startDate.getMonth();

    if (endDate.getDate() >= startDate.getDate()) {
      months++;
    }

    if (months < 0) {
      years--;
      months += 12;
    }

    const diffMonths = years * 12 + months;

    totalMonths += diffMonths <= 0 ? 1 : diffMonths;
  });

  const totalYears = Math.floor(totalMonths / 12);

  // 최소 1년 보장하고 싶다면 아래 return 사용
  // return `${totalYears > 0 ? totalYears : 1}년`;

  return `${totalYears}년`;
};
