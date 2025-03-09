export const calculateExperience = (startDate, endDate = null) => {
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

  years += Math.floor(months / 12);
  months %= 12;

  if (years > 0 && months > 0) {
    return `${years}년 ${months}개월`;
  } else if (years > 0) {
    return `${years}년`;
  } else {
    return `${months}개월`;
  }
};

export const calculateTotalExperience = (experiences) => {
  let totalMonths = 0;

  experiences.forEach((exp) => {
    const start = new Date(exp.start);
    const end = exp.end ? new Date(exp.end) : new Date();

    let years = end.getFullYear() - start.getFullYear();
    let months = end.getMonth() - start.getMonth();

    // Include the end month in the total count
    if (end.getDate() >= start.getDate()) {
      months++;
    }

    // Adjust for negative months and convert years to months
    if (months < 0) {
      years--;
      months += 12;
    }
    totalMonths += years * 12 + months;
  });

  // Convert total months back into years and remaining months
  const totalYears = Math.floor(totalMonths / 12);
  const remainingMonths = totalMonths % 12;

  // Format the display for years and months
  const yearDisplay = totalYears > 0 ? `${totalYears}년 ` : "";
  return `${yearDisplay}${remainingMonths}개월`;
};
