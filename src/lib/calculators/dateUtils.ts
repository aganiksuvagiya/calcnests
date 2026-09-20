/**
 * Parses a "YYYY-MM-DD" string from an <input type="date"> as local
 * midnight, not UTC midnight — parsing the bare string with `new Date()`
 * treats it as UTC, which can shift the displayed date by a day in
 * negative-UTC-offset time zones (most of the US).
 */
export function parseDateInput(value: string): Date {
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    throw new Error("Enter a valid date.");
  }
  return date;
}
