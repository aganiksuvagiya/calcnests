const MS_PER_DAY = 86400000;

export interface AgeResult {
  years: number;
  months: number;
  days: number;
  totalDays: number;
}

/** Calendar-correct age (not just totalDays ÷ 365), like "24 years, 8 months, 23 days". */
export function calculateAge(birthDate: Date, asOf: Date): AgeResult {
  if (birthDate.getTime() > asOf.getTime()) {
    throw new Error("Birth date can't be in the future.");
  }

  let years = asOf.getFullYear() - birthDate.getFullYear();
  let months = asOf.getMonth() - birthDate.getMonth();
  let days = asOf.getDate() - birthDate.getDate();

  if (days < 0) {
    months -= 1;
    const daysInPrevMonth = new Date(asOf.getFullYear(), asOf.getMonth(), 0).getDate();
    days += daysInPrevMonth;
  }
  if (months < 0) {
    years -= 1;
    months += 12;
  }

  const totalDays = Math.floor((asOf.getTime() - birthDate.getTime()) / MS_PER_DAY);

  return { years, months, days, totalDays };
}
