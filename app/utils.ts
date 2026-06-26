const dateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

/** Formats a date as e.g. "Jan 1, 2023". */
export function formatDate(date: Date): string {
  return dateFormatter.format(date);
}
