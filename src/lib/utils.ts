import type { ResultFieldDef } from "@/types/calculator";

export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

export function formatNumber(value: number, maxFractionDigits = 2): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: maxFractionDigits,
  }).format(value);
}

export function formatCurrencyUSD(value: number, maxFractionDigits = 2, signed = false): string {
  if (!Number.isFinite(value)) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: maxFractionDigits,
    signDisplay: signed ? "exceptZero" : "auto",
  }).format(value);
}

export function formatPercent(value: number, maxFractionDigits = 2, signed = false): string {
  if (!Number.isFinite(value)) return "—";
  return (
    new Intl.NumberFormat("en-US", {
      maximumFractionDigits: maxFractionDigits,
      signDisplay: signed ? "exceptZero" : "auto",
    }).format(value) + "%"
  );
}

/** Formats a JS timestamp (ms) as a US-style long date, e.g. "March 15, 2025". */
export function formatDate(timestamp: number): string {
  if (!Number.isFinite(timestamp)) return "—";
  return new Intl.DateTimeFormat("en-US", { year: "numeric", month: "long", day: "numeric" }).format(
    new Date(timestamp)
  );
}

/** Formats minutes-since-midnight (0–1439) as a 12-hour clock time, e.g. "3:45 PM". */
export function formatTimeOfDay(totalMinutes: number): string {
  if (!Number.isFinite(totalMinutes)) return "—";
  const minutesOfDay = ((Math.round(totalMinutes) % 1440) + 1440) % 1440;
  const hour24 = Math.floor(minutesOfDay / 60);
  const minute = minutesOfDay % 60;
  const period = hour24 >= 12 ? "PM" : "AM";
  const hour12 = hour24 % 12 === 0 ? 12 : hour24 % 12;
  return `${hour12}:${String(minute).padStart(2, "0")} ${period}`;
}

export function formatResultValue(
  def: ResultFieldDef,
  value: number,
  result?: Record<string, number>,
  values?: Record<string, string>
): string {
  switch (def.format) {
    case "currency":
      return formatCurrencyUSD(value, def.fractionDigits ?? 2, def.signed);
    case "percent":
      return formatPercent(value, def.fractionDigits ?? 2, def.signed);
    case "date":
      return formatDate(value);
    case "time":
      return formatTimeOfDay(value);
    case "text":
      return def.labels?.[value] ?? String(value);
    case "fraction": {
      const denominator = def.denominatorKey && result ? result[def.denominatorKey] : undefined;
      return denominator !== undefined && denominator !== 1 ? `${value}/${denominator}` : String(value);
    }
    case "ratio": {
      const second = def.denominatorKey && result ? result[def.denominatorKey] : undefined;
      return second !== undefined ? `${value}:${second}` : String(value);
    }
    case "number":
    default: {
      const formatted = formatNumber(value, def.fractionDigits ?? 2);
      const suffix = def.suffix ?? (def.suffixFromValue && values ? values[def.suffixFromValue] : undefined);
      return suffix ? `${formatted} ${suffix}` : formatted;
    }
  }
}
