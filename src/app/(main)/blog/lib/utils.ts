const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatDate(dateString: string): string {
  const [year, month, day] = dateString.split("-").map(Number);

  return dateFormatter.format(new Date(Date.UTC(year, month - 1, day)));
}
