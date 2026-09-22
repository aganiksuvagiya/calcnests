import type { CalculatorConfig } from "@/types/calculator";
import { percentOfValue, whatPercent, percentageChange } from "@/lib/calculators/percentage";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

function requireNumber(label: string) {
  return (value: string): string | null => {
    if (value.trim() === "" || Number.isNaN(toNumber(value))) return `Enter a valid ${label}.`;
    return null;
  };
}

/** Trims a number to at most 4 decimal places and drops trailing zeros, for readable formula strings. */
function fmt(n: number): string {
  return Number(n.toFixed(4)).toString();
}

export const percentageConfig: CalculatorConfig = {
  slug: "percentage",
  title: "Percentage Calculator",
  category: "money",
  icon: "percent",
  keywords: ["percentage", "percent", "percentage increase", "percentage decrease"],
  shortDescription:
    "Calculate percentages, percentage increases, decreases, and percentage differences instantly.",
  metaTitle: "Percentage Calculator - Calculate Percentages, Increase & Decrease",
  metaDescription:
    "Free percentage calculator to find percentages, percentage increase, decrease, and percentage change. Get instant results with clear formulas and examples.",
  explanation:
    "This calculator handles the most common percentage calculations. Choose the calculation type above, enter your numbers, and get an instant result.\n\nPercentage of a number finds a percentage of a given value. What percentage is one number of another? finds the percentage relationship between two numbers. Percentage increase or decrease compares an original value with a new value.",
  formula:
    "X% of Y = (X ÷ 100) × Y\nX is what % of Y = (X ÷ Y) × 100\nPercentage change = ((New − Old) ÷ |Old|) × 100",
  example:
    "20% of 150 is (20 ÷ 100) × 150 = 30. 45 out of 60 is (45 ÷ 60) × 100 = 75%. Going from 80 to 100 is a ((100 − 80) ÷ 80) × 100 = 25% increase.",
  faqs: [
    {
      question: "How do I calculate a percentage of a number?",
      answer:
        "Multiply the number by the percentage, then divide by 100. For example, 20% of 150 is (20 × 150) ÷ 100 = 30.",
    },
    {
      question: "How do I find what percentage one number is of another?",
      answer:
        "Divide the part by the whole and multiply by 100. For example, 45 out of 60 is (45 ÷ 60) × 100 = 75%.",
    },
    {
      question: "How do I calculate percentage increase?",
      answer:
        "Subtract the original value from the new value, divide by the original value, then multiply by 100. For example, going from 80 to 100 is ((100 − 80) ÷ 80) × 100 = 25%.",
    },
    {
      question: "How do I calculate percentage decrease?",
      answer:
        "Subtract the new value from the original value, divide by the original value, then multiply by 100. For example, going from 100 to 80 is ((100 − 80) ÷ 100) × 100 = 20% — a decrease.",
    },
    {
      question: "Can I use the percentage calculator with decimals?",
      answer:
        "Yes. All three calculation modes accept decimal numbers, so you can work with values like 19.99 or 4.5% just as easily as whole numbers.",
    },
    {
      question: "Is this percentage calculator free to use?",
      answer: "Yes. It's completely free, with no sign-up, account, or download required.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "percent-of",
      label: "X% of Y",
      inputs: [
        {
          name: "percent",
          label: "Percentage",
          type: "number",
          defaultValue: "20",
          unit: "%",
          unitPosition: "suffix",
          validate: requireNumber("percentage"),
        },
        {
          name: "value",
          label: "Of value",
          type: "number",
          defaultValue: "150",
          validate: requireNumber("value"),
        },
      ],
      compute: (values) => {
        const result = percentOfValue(toNumber(values.percent), toNumber(values.value));
        return { result: result.result };
      },
      resultFields: [{ key: "result", label: "Result", format: "number", primary: true }],
      resultLabel: (values) => `${values.percent || 0}% of ${values.value || 0} is`,
      resultFormula: (values, result) =>
        `${fmt(toNumber(values.percent))} ÷ 100 × ${fmt(toNumber(values.value))} = ${fmt(result.result)}`,
    },
    {
      id: "what-percent",
      label: "X is what % of Y",
      inputs: [
        {
          name: "part",
          label: "Value",
          type: "number",
          defaultValue: "45",
          validate: requireNumber("value"),
        },
        {
          name: "whole",
          label: "Total",
          type: "number",
          defaultValue: "60",
          validate: (value) => {
            const err = requireNumber("total")(value);
            if (err) return err;
            if (toNumber(value) === 0) return "Total can't be zero.";
            return null;
          },
        },
      ],
      compute: (values) => {
        const result = whatPercent(toNumber(values.part), toNumber(values.whole));
        return { result: result.result };
      },
      resultFields: [{ key: "result", label: "Result", format: "percent", primary: true }],
      resultLabel: (values) => `${values.part || 0} is what percent of ${values.whole || 0}`,
      resultFormula: (values, result) =>
        `${fmt(toNumber(values.part))} ÷ ${fmt(toNumber(values.whole))} × 100 = ${fmt(result.result)}%`,
    },
    {
      id: "change",
      label: "% increase/decrease",
      inputs: [
        {
          name: "from",
          label: "Original value",
          type: "number",
          defaultValue: "80",
          validate: (value) => {
            const err = requireNumber("original value")(value);
            if (err) return err;
            if (toNumber(value) === 0) return "Original value can't be zero.";
            return null;
          },
        },
        {
          name: "to",
          label: "New value",
          type: "number",
          defaultValue: "100",
          validate: requireNumber("new value"),
        },
      ],
      compute: (values) => {
        const result = percentageChange(toNumber(values.from), toNumber(values.to));
        return { result: result.result };
      },
      resultFields: [{ key: "result", label: "Change", format: "percent", primary: true, signed: true }],
      resultLabel: (_values, result) =>
        result.result > 0 ? "Percentage increase" : result.result < 0 ? "Percentage decrease" : "Percentage change",
      resultFormula: (values, result) => {
        const from = toNumber(values.from);
        const to = toNumber(values.to);
        const signed = result.result > 0 ? `+${fmt(result.result)}` : fmt(result.result);
        return `((${fmt(to)} − ${fmt(from)}) ÷ ${fmt(Math.abs(from))}) × 100 = ${signed}%`;
      },
    },
  ],
};
