import type { CalculatorConfig } from "@/types/calculator";
import { calculateBmi, BMI_CATEGORY_LABELS } from "@/lib/calculators/bmi";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

export const bmiConfig: CalculatorConfig = {
  slug: "bmi",
  title: "BMI Calculator",
  category: "everyday",
  icon: "activity",
  keywords: ["bmi calculator", "body mass index"],
  shortDescription: "Calculate Body Mass Index from height and weight.",
  explanation:
    "Enter your height and weight in US units to calculate Body Mass Index (BMI) and see which standard weight category it falls into — underweight, normal weight, overweight, or obese, using the CDC's published cutoffs.\n\nBMI is a simple screening measure, not a diagnosis. It doesn't distinguish muscle from fat, so it can misclassify very muscular people as \"overweight\" and doesn't account for age, sex, or body composition. Talk to a healthcare provider for a full picture of your health.",
  formula: "BMI = 703 × Weight (lb) ÷ Height (in)²",
  example: "At 5'10\" (70 inches) and 160 lb: BMI = 703 × 160 ÷ 70² ≈ 22.9, in the \"Normal weight\" range.",
  faqs: [
    {
      question: "What are the BMI category ranges?",
      answer:
        "Under 18.5 is underweight, 18.5–24.9 is normal weight, 25–29.9 is overweight, and 30 or above is obese, per the CDC's standard adult BMI categories.",
    },
    {
      question: "Is BMI accurate for everyone?",
      answer:
        "No — it's a general screening tool. It can overestimate body fat in muscular individuals and underestimate it in older adults who've lost muscle mass. It also doesn't apply the same way to children, who use age- and sex-specific percentiles instead.",
    },
    {
      question: "Is this medical advice?",
      answer: "No. This is an estimate for general awareness — discuss your health with a doctor or qualified provider.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "bmi",
      label: "BMI",
      inputs: [
        {
          name: "heightFeet",
          label: "Height — feet",
          type: "number",
          defaultValue: "5",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid number of feet.";
            if (n < 0) return "Feet can't be negative.";
            return null;
          },
        },
        {
          name: "heightInches",
          label: "Height — inches",
          type: "number",
          defaultValue: "10",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid number of inches.";
            if (n < 0 || n >= 12) return "Inches should be between 0 and 11.";
            return null;
          },
        },
        {
          name: "weightLbs",
          label: "Weight (lb)",
          type: "number",
          defaultValue: "160",
          validate: (value) => {
            const n = toNumber(value);
            if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid weight.";
            if (n <= 0) return "Weight must be greater than 0.";
            return null;
          },
        },
      ],
      compute: (values) => {
        const result = calculateBmi(toNumber(values.heightFeet), toNumber(values.heightInches), toNumber(values.weightLbs));
        return { bmi: result.bmi, categoryCode: result.categoryCode };
      },
      resultFields: [
        { key: "bmi", label: "BMI", format: "number", fractionDigits: 1, primary: true },
        { key: "categoryCode", label: "Category", format: "text", labels: BMI_CATEGORY_LABELS },
      ],
      resultLabel: () => "Your BMI",
    },
  ],
};
