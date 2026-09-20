import type { CalculatorConfig } from "@/types/calculator";
import { calculateGpa, GRADE_POINTS } from "@/lib/calculators/gpa";

const GRADE_OPTIONS = [
  { value: "", label: "— Not used —" },
  ...Object.keys(GRADE_POINTS).map((g) => ({ value: g, label: g })),
];

function toNumber(value: string): number {
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN;
}

function courseInputs(n: number, defaultGrade: string, defaultCredits: string) {
  return [
    { name: `grade${n}`, label: `Course ${n} grade`, type: "select" as const, defaultValue: defaultGrade, options: GRADE_OPTIONS },
    {
      name: `credits${n}`,
      label: `Course ${n} credit hours`,
      type: "number" as const,
      defaultValue: defaultCredits,
      validate: (value: string) => {
        const num = toNumber(value);
        if (value.trim() === "" || Number.isNaN(num)) return "Enter valid credit hours.";
        if (num < 0) return "Credit hours can't be negative.";
        return null;
      },
    },
  ];
}

export const gpaConfig: CalculatorConfig = {
  slug: "gpa",
  title: "GPA Calculator",
  category: "education",
  icon: "graduation-cap",
  keywords: ["gpa calculator", "grade point average"],
  shortDescription: "Calculate your GPA from course grades and credit hours.",
  explanation:
    "Enter a letter grade and credit hours for up to 5 courses — leave any you don't need set to \"Not used\" or 0 credits. This calculates an unweighted GPA on the standard US 4.0 scale, where each course's grade points are multiplied by its credit hours before averaging.\n\nThis doesn't account for honors/AP weighting (where some schools add extra points for harder courses) — it's the standard unweighted scale most colleges use for admissions GPA.",
  formula: "GPA = Σ(grade points × credit hours) ÷ Σ(credit hours)",
  example:
    "An A (4.0) in a 3-credit class, a B (3.0) in a 4-credit class, and an A- (3.7) in a 3-credit class: GPA = (4.0×3 + 3.0×4 + 3.7×3) ÷ 10 = 3.51.",
  faqs: [
    {
      question: "Is this a weighted or unweighted GPA?",
      answer:
        "Unweighted — it uses the standard 4.0 scale where an A is always 4.0, regardless of course difficulty. Some high schools add extra weight for AP/honors courses, which this calculator doesn't model.",
    },
    {
      question: "What if I have more than 5 courses?",
      answer:
        "Calculate this term's courses first, then combine with a prior GPA and total credit hours manually: multiply each GPA by its credit hours, add both totals together, and divide by the combined credit hours.",
    },
    {
      question: "Why does a course need credit hours to count?",
      answer:
        "GPA is a credit-weighted average — a course with more credit hours affects your GPA more than a 1-credit course. Setting credits to 0 (or leaving a grade unset) excludes that row entirely.",
    },
  ],
  mode: "instant",
  copyable: true,
  variants: [
    {
      id: "gpa",
      label: "GPA",
      inputs: [
        ...courseInputs(1, "A", "3"),
        ...courseInputs(2, "B", "4"),
        ...courseInputs(3, "A-", "3"),
        ...courseInputs(4, "", "0"),
        ...courseInputs(5, "", "0"),
      ],
      compute: (values) => {
        const courses = [1, 2, 3, 4, 5]
          .map((n) => ({ grade: values[`grade${n}`], credits: toNumber(values[`credits${n}`]) }))
          .filter((c) => c.grade !== "" && c.credits > 0);
        const result = calculateGpa(courses);
        return { gpa: result.gpa, totalCredits: result.totalCredits, courseCount: result.courseCount };
      },
      resultFields: [
        { key: "gpa", label: "GPA", format: "number", fractionDigits: 2, primary: true },
        { key: "totalCredits", label: "Total credit hours", format: "number" },
        { key: "courseCount", label: "Courses counted", format: "number" },
      ],
      resultLabel: () => "Your GPA",
    },
  ],
};
