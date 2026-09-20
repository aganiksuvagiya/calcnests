/**
 * Overtime pay under the standard US FLSA rule: hours over 40 in a
 * workweek are paid at a premium rate (1.5x is standard "time-and-a-half";
 * some employers or states use 2x for certain conditions).
 */
export interface OvertimeResult {
  regularHours: number;
  overtimeHours: number;
  regularPay: number;
  overtimePay: number;
  totalPay: number;
}

const REGULAR_HOURS_THRESHOLD = 40;

export function calculateOvertime(hourlyRate: number, hoursWorked: number, overtimeMultiplier: number): OvertimeResult {
  if (hourlyRate < 0) throw new Error("Hourly rate can't be negative.");
  if (hoursWorked < 0) throw new Error("Hours worked can't be negative.");
  if (overtimeMultiplier < 1) throw new Error("Overtime multiplier must be at least 1.");

  const regularHours = Math.min(hoursWorked, REGULAR_HOURS_THRESHOLD);
  const overtimeHours = Math.max(hoursWorked - REGULAR_HOURS_THRESHOLD, 0);
  const regularPay = hourlyRate * regularHours;
  const overtimePay = hourlyRate * overtimeMultiplier * overtimeHours;
  const totalPay = regularPay + overtimePay;

  return { regularHours, overtimeHours, regularPay, overtimePay, totalPay };
}
