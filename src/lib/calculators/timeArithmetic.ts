const MINUTES_PER_DAY = 1440;

export interface TimeResult {
  /** Minutes since midnight (0–1439) — the display format is derived from this. */
  resultMinutes: number;
}

/** Adds or subtracts a duration from a time of day, wrapping around midnight. */
export function addToTime(
  hour: number,
  minute: number,
  addHours: number,
  addMinutes: number,
  direction: "add" | "subtract"
): TimeResult {
  if (hour < 0 || hour > 23) throw new Error("Hour must be between 0 and 23.");
  if (minute < 0 || minute > 59) throw new Error("Minute must be between 0 and 59.");
  if (addHours < 0 || addMinutes < 0) throw new Error("Duration to add can't be negative.");

  const startMinutes = hour * 60 + minute;
  const deltaMinutes = addHours * 60 + addMinutes;
  const signedDelta = direction === "subtract" ? -deltaMinutes : deltaMinutes;

  const resultMinutes = ((startMinutes + signedDelta) % MINUTES_PER_DAY + MINUTES_PER_DAY) % MINUTES_PER_DAY;

  return { resultMinutes };
}
