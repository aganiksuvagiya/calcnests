import type { CalculatorConfig } from "@/types/calculator";
import { calculateWeightedGrade } from "@/lib/calculators/grade";

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

function validateScore(value: string): string | null {
  const n = toNumber(value);
  if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid score.";
  if (n < 0 || n > 100) return "Score must be between 0 and 100.";
  return null;
}

function validateWeight(value: string): string | null {
  const n = toNumber(value);
  if (value.trim() === "" || Number.isNaN(n)) return "Enter a valid weight.";
  if (n < 0) return "Weight can't be negative.";
  return null;
}

function categoryInputs(name: string, label: string, defaultScore: string, defaultWeight: string) {
  return [
    { name: `${name}Score`, label: `${label} score (%)`, type: "number" as const, defaultValue: defaultScore, validate: validateScore },
    { name: `${name}Weight`, label: `${label} weight (%)`, type: "number" as const, defaultValue: defaultWeight, validate: validateWeight },
  ];
}

export const gradeConfig: CalculatorConfig = {
  slug: "grade",
  title: "Grade Calculator",
  category: "education",
  icon: "award",
  keywords: ["grade calculator", "weighted grade calculator"],
  shortDescription: "Calculate your overall grade from weighted assignment categories.",
  explanation:
    "Enter your score and weight for each grading category — homework, quizzes, midterm, and final are common defaults, but adjust them (and set unused ones to 0% weight) to match your actual syllabus. The weights don't have to add up to exactly 100%; the calculator normalizes automatically based on the weights you actually use.",
  formula: "Overall grade = Σ(category score × category weight) ÷ Σ(category weight)",
  example:
    "Homework 90% (worth 20%), Quizzes 85% (worth 20%), Midterm 80% (worth 25%), Final 88% (worth 35%): overall grade = (90×20 + 85×20 + 80×25 + 88×35) ÷ 100 = 85.8%.",
  faqs: [
    {
      question: "Do the weights need to add up to 100%?",
      answer:
        "No — the calculator divides by the sum of the weights you actually enter, so it normalizes correctly even if your categories add up to something other than 100%.",
    },
    {
      question: "What if my class only has 2 or 3 categories?",
      answer: "Set any unused category's weight to 0% — it's excluded from the calculation entirely.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "grade",
      label: "Grade",
      inputs: [
        ...categoryInputs("homework", "Homework", "90", "20"),
        ...categoryInputs("quizzes", "Quizzes", "85", "20"),
        ...categoryInputs("midterm", "Midterm", "80", "25"),
        ...categoryInputs("final", "Final", "88", "35"),
      ],
      compute: (values) => {
        const categories = ["homework", "quizzes", "midterm", "final"].map((name) => ({
          score: toNumber(values[`${name}Score`]),
          weight: toNumber(values[`${name}Weight`]),
        }));
        const result = calculateWeightedGrade(categories);
        return { weightedAverage: result.weightedAverage, totalWeight: result.totalWeight };
      },
      resultFields: [
        { key: "weightedAverage", label: "Overall grade", format: "percent", primary: true },
        { key: "totalWeight", label: "Total weight used", format: "percent" },
      ],
      resultLabel: () => "Overall grade",
    },
  ],
};
