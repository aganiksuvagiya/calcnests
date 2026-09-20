const MS_PER_MINUTE = 60000;

export interface CountdownResult {
  totalDays: number;
  days: number;
  hours: number;
  minutes: number;
}

/** Time remaining until a future date (measured to the start of that day). */
export function calculateCountdown(target: Date, now: Date): CountdownResult {
  const diffMs = target.getTime() - now.getTime();
  if (diffMs <= 0) {
    throw new Error("Pick a date in the future.");
  }

  const totalMinutes = Math.floor(diffMs / MS_PER_MINUTE);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes - days * 24 * 60) / 60);
  const minutes = totalMinutes - days * 24 * 60 - hours * 60;

  return { totalDays: diffMs / 86400000, days, hours, minutes };
}
