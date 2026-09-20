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

export const percentageConfig: CalculatorConfig = {
  slug: "percentage",
  title: "Percentage Calculator",
  category: "money",
  icon: "percent",
  keywords: ["percentage", "percent", "percentage increase", "percentage decrease"],
  shortDescription: "Find percentages, increases, and decreases instantly.",
  explanation:
    "This calculator covers the three most common percentage calculations: finding a percentage of a value, finding what percentage one number is of another, and finding the percentage change between two values.\n\nSwitch between the tabs above based on which calculation you need — each one updates its result instantly as you type.",
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
      question: "How is percentage increase or decrease calculated?",
      answer:
        "Subtract the original value from the new value, divide by the original value, then multiply by 100. A positive result is an increase; a negative result is a decrease.",
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
    },
    {
      id: "what-percent",
      label: "X is what % of Y",
      inputs: [
        {
          name: "part",
          label: "Part",
          type: "number",
          defaultValue: "45",
          validate: requireNumber("part"),
        },
        {
          name: "whole",
          label: "Whole",
          type: "number",
          defaultValue: "60",
          validate: (value) => {
            const err = requireNumber("whole")(value);
            if (err) return err;
            if (toNumber(value) === 0) return "Whole value can't be zero.";
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
    },
    {
      id: "change",
      label: "% increase/decrease",
      inputs: [
        {
          name: "from",
          label: "From",
          type: "number",
          defaultValue: "80",
          validate: (value) => {
            const err = requireNumber("starting value")(value);
            if (err) return err;
            if (toNumber(value) === 0) return "Starting value can't be zero.";
            return null;
          },
        },
        {
          name: "to",
          label: "To",
          type: "number",
          defaultValue: "100",
          validate: requireNumber("ending value"),
        },
      ],
      compute: (values) => {
        const result = percentageChange(toNumber(values.from), toNumber(values.to));
        return { result: result.result };
      },
      resultFields: [{ key: "result", label: "Change", format: "percent", primary: true, signed: true }],
      resultLabel: (_values, result) =>
        result.result > 0 ? "Percentage increase" : result.result < 0 ? "Percentage decrease" : "Percentage change",
    },
  ],
};
