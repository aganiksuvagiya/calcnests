export type DateUnit = "days" | "weeks" | "months" | "years";
export type DateDirection = "add" | "subtract";

/** Adds or subtracts a number of days/weeks/months/years from a date. */
export function addToDate(startDate: Date, amount: number, unit: DateUnit, direction: DateDirection): Date {
  if (amount < 0) {
    throw new Error("Amount can't be negative — use the Add/Subtract option instead.");
  }

  const sign = direction === "subtract" ? -1 : 1;
  const result = new Date(startDate);

  switch (unit) {
    case "days":
      result.setDate(result.getDate() + sign * amount);
      break;
    case "weeks":
      result.setDate(result.getDate() + sign * amount * 7);
      break;
    case "months":
      result.setMonth(result.getMonth() + sign * amount);
      break;
    case "years":
      result.setFullYear(result.getFullYear() + sign * amount);
      break;
  }

  return result;
}
