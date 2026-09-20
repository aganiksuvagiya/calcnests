const MS_PER_DAY = 86400000;
const AVG_DAYS_PER_MONTH = 30.44;

export interface DaysBetweenResult {
  days: number;
  weeks: number;
  months: number;
}

/** Absolute distance between two dates — order doesn't matter. */
export function calculateDaysBetween(dateA: Date, dateB: Date): DaysBetweenResult {
  const days = Math.round(Math.abs(dateB.getTime() - dateA.getTime()) / MS_PER_DAY);
  return {
    days,
    weeks: days / 7,
    months: days / AVG_DAYS_PER_MONTH,
  };
}
