export interface FinalGradeResult {
  neededScore: number;
  achievable: boolean;
}

/**
 * DesiredGrade = CurrentGrade × (1 − FinalWeight) + NeededScore × FinalWeight
 * → NeededScore = (DesiredGrade − CurrentGrade × (1 − FinalWeight)) ÷ FinalWeight
 */
export function calculateFinalGradeNeeded(
  currentGrade: number,
  finalWeightPercent: number,
  desiredGrade: number
): FinalGradeResult {
  if (finalWeightPercent <= 0 || finalWeightPercent > 100) {
    throw new Error("Final exam weight must be between 0 and 100.");
  }
  if (currentGrade < 0 || currentGrade > 100 || desiredGrade < 0 || desiredGrade > 100) {
    throw new Error("Grades must be between 0 and 100.");
  }

  const w = finalWeightPercent / 100;
  const neededScore = (desiredGrade - currentGrade * (1 - w)) / w;

  return { neededScore, achievable: neededScore <= 100 };
}
