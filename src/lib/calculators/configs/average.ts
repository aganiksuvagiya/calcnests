import type { CalculatorConfig } from "@/types/calculator";
import { parseNumberList, calculateAverage } from "@/lib/calculators/average";

export const averageConfig: CalculatorConfig = {
  slug: "average",
  title: "Average Calculator",
  category: "math",
  icon: "sigma",
  keywords: ["average calculator", "mean calculator"],
  shortDescription: "Calculate the mean, sum, and count for a list of numbers.",
  explanation:
    "Enter a list of numbers separated by commas or spaces. The calculator adds them up, counts how many there are, and divides to get the average (technically the \"arithmetic mean\") — the same average you'd get from a spreadsheet's AVERAGE function.\n\nThis calculates a simple average, where every number counts equally. A weighted average (like a course grade where a final exam counts more than a quiz) needs each number's weight — see the Grade Calculator for that case.",
  formula: "Average = Sum of all numbers ÷ Count of numbers",
  example: "For the list 4, 8, 15, 16, 23: sum = 66, count = 5, average = 66 ÷ 5 = 13.2.",
  faqs: [
    {
      question: "What's the difference between average and median?",
      answer:
        "The average (mean) adds every number and divides by the count. The median is the middle value when the numbers are sorted — it's less affected by one very large or very small outlier. This calculator computes the average, not the median.",
    },
    {
      question: "Can I enter negative numbers?",
      answer: "Yes — negative numbers and decimals both work normally.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "average",
      label: "Average",
      inputs: [
        {
          name: "numbers",
          label: "Numbers (comma or space separated)",
          type: "text",
          defaultValue: "4, 8, 15, 16, 23",
          placeholder: "e.g. 4, 8, 15, 16, 23",
          validate: (value) => {
            try {
              parseNumberList(value);
              return null;
            } catch (err) {
              return err instanceof Error ? err.message : "Enter a valid list of numbers.";
            }
          },
        },
      ],
      compute: (values) => {
        const numbers = parseNumberList(values.numbers);
        const result = calculateAverage(numbers);
        return { mean: result.mean, sum: result.sum, count: result.count, min: result.min, max: result.max };
      },
      resultFields: [
        { key: "mean", label: "Average", format: "number", primary: true },
        { key: "sum", label: "Sum", format: "number" },
        { key: "count", label: "Count", format: "number" },
        { key: "min", label: "Minimum", format: "number" },
        { key: "max", label: "Maximum", format: "number" },
      ],
      resultLabel: () => "Average",
    },
  ],
};
