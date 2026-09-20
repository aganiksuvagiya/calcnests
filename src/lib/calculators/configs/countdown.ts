import type { CalculatorConfig } from "@/types/calculator";
import { calculateCountdown } from "@/lib/calculators/countdown";
import { parseDateInput } from "@/lib/calculators/dateUtils";

/**
 * Resolved fresh on every mount/reset (see `getDefaultValue` on the input
 * below) rather than baked in as a plain string — this page is statically
 * generated, so a plain default would freeze at build time and eventually
 * default to a date in the past.
 */
function defaultTargetDate(): string {
  const d = new Date();
  d.setDate(d.getDate() + 30);
  return d.toISOString().slice(0, 10);
}

export const countdownConfig: CalculatorConfig = {
  slug: "countdown",
  title: "Countdown Calculator",
  category: "date-time",
  icon: "hourglass",
  keywords: ["countdown calculator", "days until", "time until"],
  shortDescription: "See exactly how much time is left until a future date.",
  explanation:
    "Pick a future date to see how much time remains, broken down into days, hours, and minutes as of the moment you calculate. Reload or recalculate later to see the updated countdown — this is a snapshot, not a live-ticking clock.",
  formula: "Time remaining = Target date − Now, split into days, hours, and minutes",
  example: "If today is January 1 and the target is January 15 at midnight, the countdown shows 14 days, 0 hours, 0 minutes.",
  faqs: [
    {
      question: "Does the countdown update automatically?",
      answer:
        "It calculates the time remaining at the moment you enter a date or press recalculate — it's a snapshot, not a live-updating timer. Recalculate anytime to see the current countdown.",
    },
    {
      question: "What time of day does the target date count to?",
      answer: "Midnight (the very start) of the date you pick, in your local time zone.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "countdown",
      label: "Countdown",
      inputs: [
        {
          name: "targetDate",
          label: "Target date",
          type: "date",
          defaultValue: "",
          getDefaultValue: defaultTargetDate,
        },
      ],
      compute: (values) => {
        const result = calculateCountdown(parseDateInput(values.targetDate), new Date());
        return { days: result.days, hours: result.hours, minutes: result.minutes };
      },
      resultFields: [
        { key: "days", label: "Days", format: "number", suffix: "days", primary: true },
        { key: "hours", label: "Hours", format: "number" },
        { key: "minutes", label: "Minutes", format: "number" },
      ],
      resultLabel: () => "Time remaining",
    },
  ],
};
