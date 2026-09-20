import type { CalculatorConfig } from "@/types/calculator";
import { addToTime } from "@/lib/calculators/timeArithmetic";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

function validateRange(label: string, min: number, max: number) {
  return (value: string): string | null => {
    const n = toNumber(value);
    if (value.trim() === "" || Number.isNaN(n)) return `Enter a valid ${label}.`;
    if (n < min || n > max) return `${label.charAt(0).toUpperCase()}${label.slice(1)} must be between ${min} and ${max}.`;
    return null;
  };
}

export const timeCalculatorConfig: CalculatorConfig = {
  slug: "time",
  title: "Time Calculator",
  category: "date-time",
  icon: "clock-3",
  keywords: ["time calculator", "add time", "subtract time"],
  shortDescription: "Add or subtract hours and minutes from a time of day.",
  explanation:
    "Enter a starting time and a duration to add or subtract. The result wraps around midnight automatically — adding 3 hours to 11:00 PM correctly gives 2:00 AM the next day.",
  formula: "Resulting time = Start time ± Duration, wrapped to a 24-hour clock",
  example: "9:30 AM plus 2 hours 45 minutes is 12:15 PM.",
  faqs: [
    {
      question: "Does this tell me the date, not just the time?",
      answer:
        "No — this only tracks the time of day and wraps around midnight. If you also need to know which calendar date you land on, use the Date Calculator alongside this one.",
    },
    {
      question: "Can I subtract past midnight?",
      answer: "Yes — subtracting a duration that goes before midnight correctly wraps to the previous day's time.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "time",
      label: "Time math",
      inputs: [
        { name: "hour", label: "Start hour (0–23)", type: "number", defaultValue: "9", validate: validateRange("hour", 0, 23) },
        { name: "minute", label: "Start minute (0–59)", type: "number", defaultValue: "30", validate: validateRange("minute", 0, 59) },
        {
          name: "direction",
          label: "Operation",
          type: "radio",
          defaultValue: "add",
          options: [
            { value: "add", label: "Add" },
            { value: "subtract", label: "Subtract" },
          ],
        },
        {
          name: "addHours",
          label: "Hours to add/subtract",
          type: "number",
          defaultValue: "2",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid number of hours.";
            if (n < 0) return "Hours can't be negative.";
            return null;
          },
        },
        {
          name: "addMinutes",
          label: "Minutes to add/subtract",
          type: "number",
          defaultValue: "45",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid number of minutes.";
            if (n < 0) return "Minutes can't be negative.";
            return null;
          },
        },
      ],
      compute: (values) => {
        const result = addToTime(
          toNumber(values.hour),
          toNumber(values.minute),
          toNumber(values.addHours),
          toNumber(values.addMinutes),
          values.direction as "add" | "subtract"
        );
        return { resultMinutes: result.resultMinutes };
      },
      resultFields: [{ key: "resultMinutes", label: "Resulting time", format: "time", primary: true }],
      resultLabel: () => "Resulting time",
    },
  ],
};
