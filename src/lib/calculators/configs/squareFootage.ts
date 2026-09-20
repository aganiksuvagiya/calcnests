import type { CalculatorConfig } from "@/types/calculator";
import { calculateSquareFootage } from "@/lib/calculators/squareFootage";

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

function validateNonNegative(label: string) {
  return (value: string): string | null => {
    const n = toNumber(value);
    if (value.trim() === "" || Number.isNaN(n)) return `Enter a valid ${label}.`;
    if (n < 0) return `${label.charAt(0).toUpperCase()}${label.slice(1)} can't be negative.`;
    return null;
  };
}

export const squareFootageConfig: CalculatorConfig = {
  slug: "square-footage",
  title: "Square Footage Calculator",
  category: "home",
  icon: "ruler",
  keywords: ["square footage calculator", "calculate square feet"],
  shortDescription: "Calculate the square footage of a room or space.",
  explanation:
    "Enter a room's length and width to get its area in square feet. For an L-shaped room or one with an alcove, add a second section's dimensions and the two areas are added together.",
  formula: "Area = Length × Width (plus a second section's Length × Width, if used)",
  example: "A 12×10 ft room is 120 sqft. Adding a 4×5 ft alcove brings the total to 140 sqft.",
  faqs: [
    {
      question: "How do I measure an irregularly shaped room?",
      answer:
        "Split it into rectangles, calculate each one's area separately, and add them together. This calculator handles two rectangular sections at once — for more complex shapes, add the additional sections' areas manually.",
    },
    {
      question: "Does this account for closets or alcoves?",
      answer: "Only if you include them using the second section fields — otherwise this calculates the main rectangle only.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "square-footage",
      label: "Square footage",
      inputs: [
        { name: "length", label: "Length (ft)", type: "number", defaultValue: "12", validate: validatePositive("length") },
        { name: "width", label: "Width (ft)", type: "number", defaultValue: "10", validate: validatePositive("width") },
        {
          name: "extraLength",
          label: "Additional section length (ft)",
          type: "number",
          defaultValue: "0",
          helpText: "For an L-shaped room or alcove — leave at 0 if not needed.",
          validate: validateNonNegative("additional length"),
        },
        {
          name: "extraWidth",
          label: "Additional section width (ft)",
          type: "number",
          defaultValue: "0",
          validate: validateNonNegative("additional width"),
        },
      ],
      compute: (values) => {
        const result = calculateSquareFootage(
          toNumber(values.length),
          toNumber(values.width),
          toNumber(values.extraLength),
          toNumber(values.extraWidth)
        );
        return { totalArea: result.totalArea };
      },
      resultFields: [{ key: "totalArea", label: "Total area (sqft)", format: "number", suffix: "sq ft", primary: true }],
      resultLabel: () => "Total square footage",
    },
  ],
};
