export type Days = "MON" | "TUE" | "WED" | "THU" | "FRI" | "SAT" | "SUN";

export function createCronExpression({
  daysOfWeek,
  frequency,
  hour,
  minute,
}: {
  minute: string;
  hour: string;
  daysOfWeek: Days[];
  frequency: "daily" | "weekly" | "days";
}): string {
  // iF frequency is daily, then dayOfWeek is ignored
  return `${minute} ${hour} ${frequency === "daily" ? "*" : "?"} * ${
    frequency === "days"
      ? daysOfWeek.join(",") || "Sun"
      : frequency === "weekly"
      ? "Mon"
      : "*"
  }`;
}
