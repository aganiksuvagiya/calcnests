import type { CalculatorConfig } from "@/types/calculator";
import { simplifyRatio, scaleRatio } from "@/lib/calculators/ratio";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

function validatePositive(label: string) {
  return (value: string): string | null => {
    const n = toNumber(value);
    if (value.trim() === "" || Number.isNaN(n)) return `Enter a valid ${label}.`;
    if (n <= 0) return `${label.charAt(0).toUpperCase()}${label.slice(1)} must be greater than 0.`;
    return null;
  };
}

export const ratioConfig: CalculatorConfig = {
  slug: "ratio",
  title: "Ratio Calculator",
  category: "math",
  icon: "divide",
  keywords: ["ratio calculator", "simplify ratio"],
  shortDescription: "Simplify a ratio to lowest terms or scale it to a target value.",
  explanation:
    "A ratio compares two quantities. \"Simplify\" reduces a ratio like 8:12 to its lowest terms (2:3), the same way you'd simplify a fraction. \"Scale\" keeps the same proportion while changing one side to a target number — useful for resizing a recipe or a scale drawing.",
  formula: "Simplify: divide both sides by their greatest common divisor\nScale: multiply both sides by (target ÷ original first value)",
  example: "Simplifying 8:12 gives 2:3 (both divided by 4). Scaling 2:3 so the first value becomes 10 gives 10:15.",
  faqs: [
    {
      question: "How is a ratio simplified?",
      answer:
        "Both numbers are divided by their greatest common divisor (GCD) — the largest number that divides evenly into both. 8:12 has a GCD of 4, so dividing both sides by 4 gives 2:3.",
    },
    {
      question: "What's a real example of scaling a ratio?",
      answer:
        "A recipe ratio of 2 cups flour to 3 cups water, scaled to make 10 cups of flour, needs 15 cups of water — same proportion, larger batch.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "simplify",
      label: "Simplify",
      inputs: [
        { name: "a", label: "First value", type: "number", defaultValue: "8", validate: validatePositive("first value") },
        { name: "b", label: "Second value", type: "number", defaultValue: "12", validate: validatePositive("second value") },
      ],
      compute: (values) => {
        const result = simplifyRatio(toNumber(values.a), toNumber(values.b));
        return { a: result.a, b: result.b, decimal: result.decimal };
      },
      resultFields: [
        { key: "a", label: "Simplified ratio", format: "ratio", denominatorKey: "b", primary: true },
        { key: "decimal", label: "Decimal equivalent", format: "number", fractionDigits: 4 },
      ],
      resultLabel: (values, result) => `${values.a}:${values.b} simplifies to ${result.a}:${result.b}`,
    },
    {
      id: "scale",
      label: "Scale",
      inputs: [
        { name: "a", label: "First value", type: "number", defaultValue: "2", validate: validatePositive("first value") },
        { name: "b", label: "Second value", type: "number", defaultValue: "3", validate: validatePositive("second value") },
        {
          name: "targetA",
          label: "New first value",
          type: "number",
          defaultValue: "10",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid target value.";
            if (n < 0) return "Target value can't be negative.";
            return null;
          },
        },
      ],
      compute: (values) => {
        const result = scaleRatio(toNumber(values.a), toNumber(values.b), toNumber(values.targetA));
        return { scaledA: result.scaledA, scaledB: result.scaledB };
      },
      resultFields: [
        { key: "scaledA", label: "New ratio", format: "ratio", denominatorKey: "scaledB", primary: true },
      ],
      resultLabel: () => "Scaled ratio",
    },
  ],
};
