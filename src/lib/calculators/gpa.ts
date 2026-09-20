/** Standard US unweighted 4.0 scale. */
export const GRADE_POINTS: Record<string, number> = {
  "A+": 4.0,
  A: 4.0,
  "A-": 3.7,
  "B+": 3.3,
  B: 3.0,
  "B-": 2.7,
  "C+": 2.3,
  C: 2.0,
  "C-": 1.7,
  "D+": 1.3,
  D: 1.0,
  "D-": 0.7,
  F: 0.0,
};

export interface Course {
  grade: string;
  credits: number;
}

export interface GpaResult {
  gpa: number;
  totalCredits: number;
  courseCount: number;
}

/** Weighted GPA = Σ(grade points × credits) ÷ Σ(credits), skipping any course with 0 credits. */
export function calculateGpa(courses: Course[]): GpaResult {
  const counted = courses.filter((c) => c.credits > 0);

  if (counted.length === 0) {
    throw new Error("Enter at least one course with credit hours greater than 0.");
  }

  let totalPoints = 0;
  let totalCredits = 0;

  for (const course of counted) {
    const points = GRADE_POINTS[course.grade];
    if (points === undefined) {
      throw new Error(`Unrecognized grade: ${course.grade}`);
    }
    if (course.credits < 0) {
      throw new Error("Credit hours can't be negative.");
    }
    totalPoints += points * course.credits;
    totalCredits += course.credits;
  }

  return { gpa: totalPoints / totalCredits, totalCredits, courseCount: counted.length };
}
