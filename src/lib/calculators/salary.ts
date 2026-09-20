/**
 * Pure salary-conversion math between hourly and annual pay.
 */

export interface HourlyToSalaryResult {
  hourlyRate: number;
  weeklyPay: number;
  biweeklyPay: number;
  monthlyPay: number;
  annualPay: number;
}

export function calculateAnnualFromHourly(
  hourlyRate: number,
  hoursPerWeek: number,
  weeksPerYear: number
): HourlyToSalaryResult {
  if (hourlyRate < 0) throw new Error("Hourly rate can't be negative.");
  if (hoursPerWeek <= 0) throw new Error("Hours per week must be greater than 0.");
  if (weeksPerYear <= 0) throw new Error("Weeks per year must be greater than 0.");

  const weeklyPay = hourlyRate * hoursPerWeek;
  const annualPay = weeklyPay * weeksPerYear;
  const biweeklyPay = weeklyPay * 2;
  const monthlyPay = annualPay / 12;

  return { hourlyRate, weeklyPay, biweeklyPay, monthlyPay, annualPay };
}

export interface SalaryToHourlyResult {
  annualPay: number;
  hourlyRate: number;
}

export function calculateHourlyFromAnnual(
  annualPay: number,
  hoursPerWeek: number,
  weeksPerYear: number
): SalaryToHourlyResult {
  if (annualPay < 0) throw new Error("Annual salary can't be negative.");
  if (hoursPerWeek <= 0) throw new Error("Hours per week must be greater than 0.");
  if (weeksPerYear <= 0) throw new Error("Weeks per year must be greater than 0.");

  const hourlyRate = annualPay / (hoursPerWeek * weeksPerYear);

  return { annualPay, hourlyRate };
}
