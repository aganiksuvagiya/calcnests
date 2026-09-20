import type { CalculatorConfig } from "@/types/calculator";
import { calculateFraction, type FractionOperation } from "@/lib/calculators/fraction";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

function validateInteger(label: string) {
  return (value: string): string | null => {
    const n = toNumber(value);
    if (value.trim() === "" || Number.isNaN(n) || !Number.isInteger(n)) return `Enter a whole number for ${label}.`;
    return null;
  };
}

const OPERATION_SYMBOLS: Record<FractionOperation, string> = {
  add: "+",
  subtract: "−",
  multiply: "×",
  divide: "÷",
};

export const fractionConfig: CalculatorConfig = {
  slug: "fraction",
  title: "Fraction Calculator",
  category: "math",
  icon: "pi",
  keywords: ["fraction calculator", "add fractions", "simplify fractions"],
  shortDescription: "Add, subtract, multiply, or divide two fractions.",
  explanation:
    "Enter two fractions and pick an operation. The result is automatically simplified to lowest terms, along with its decimal equivalent.\n\nAdding and subtracting fractions works by finding a common denominator; multiplying just multiplies straight across; dividing multiplies by the second fraction flipped upside down (its reciprocal).",
  formula:
    "Add/Subtract: (n1×d2 ± n2×d1) / (d1×d2)\nMultiply: (n1×n2) / (d1×d2)\nDivide: (n1×d2) / (d1×n2)",
  example: "1/2 + 1/4 = (1×4 + 1×2) / (2×4) = 6/8, which simplifies to 3/4.",
  faqs: [
    {
      question: "Why is my result already simplified?",
      answer:
        "The calculator automatically reduces the result to lowest terms by dividing both the numerator and denominator by their greatest common divisor, the same way you'd simplify by hand.",
    },
    {
      question: "Can I use negative numbers?",
      answer: "Yes — a negative numerator or denominator both work; the sign is normalized in the result.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "fraction",
      label: "Fraction",
      inputs: [
        { name: "n1", label: "First numerator", type: "number", defaultValue: "1", validate: validateInteger("the first numerator") },
        { name: "d1", label: "First denominator", type: "number", defaultValue: "2", validate: validateInteger("the first denominator") },
        {
          name: "operation",
          label: "Operation",
          type: "radio",
          defaultValue: "add",
          options: [
            { value: "add", label: "+" },
            { value: "subtract", label: "−" },
            { value: "multiply", label: "×" },
            { value: "divide", label: "÷" },
          ],
        },
        { name: "n2", label: "Second numerator", type: "number", defaultValue: "1", validate: validateInteger("the second numerator") },
        { name: "d2", label: "Second denominator", type: "number", defaultValue: "4", validate: validateInteger("the second denominator") },
      ],
      compute: (values) => {
        const result = calculateFraction(
          toNumber(values.n1),
          toNumber(values.d1),
          values.operation as FractionOperation,
          toNumber(values.n2),
          toNumber(values.d2)
        );
        return { numerator: result.numerator, denominator: result.denominator, decimal: result.decimal };
      },
      resultFields: [
        { key: "numerator", label: "Result", format: "fraction", denominatorKey: "denominator", primary: true },
        { key: "decimal", label: "Decimal equivalent", format: "number", fractionDigits: 4 },
      ],
      resultLabel: (values) =>
        `${values.n1}/${values.d1} ${OPERATION_SYMBOLS[values.operation as FractionOperation]} ${values.n2}/${values.d2} =`,
    },
  ],
};
