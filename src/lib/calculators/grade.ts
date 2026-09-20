export interface GradeCategory {
  score: number;
  weight: number;
}

export interface GradeResult {
  weightedAverage: number;
  totalWeight: number;
}

/** Weighted course grade = Σ(score × weight) ÷ Σ(weight), skipping any category with 0 weight. */
export function calculateWeightedGrade(categories: GradeCategory[]): GradeResult {
  const counted = categories.filter((c) => c.weight > 0);

  if (counted.length === 0) {
    throw new Error("Enter at least one category with a weight greater than 0.");
  }

  let weightedSum = 0;
  let totalWeight = 0;

  for (const category of counted) {
    if (category.score < 0 || category.score > 100) {
      throw new Error("Scores must be between 0 and 100.");
    }
    if (category.weight < 0) {
      throw new Error("Weights can't be negative.");
    }
    weightedSum += category.score * category.weight;
    totalWeight += category.weight;
  }

  return { weightedAverage: weightedSum / totalWeight, totalWeight };
}
