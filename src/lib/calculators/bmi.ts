export type BmiCategory = "Underweight" | "Normal weight" | "Overweight" | "Obese";

export interface BmiResult {
  bmi: number;
  categoryCode: number; // 0=under, 1=normal, 2=over, 3=obese — lets the UI map to a label
}

/** US-units BMI formula: 703 × weight(lb) ÷ height(in)². */
export function calculateBmi(heightFeet: number, heightInches: number, weightLbs: number): BmiResult {
  if (heightFeet < 0 || heightInches < 0 || heightInches >= 12) {
    throw new Error("Enter a valid height (inches should be 0–11).");
  }
  const totalInches = heightFeet * 12 + heightInches;
  if (totalInches <= 0) {
    throw new Error("Height must be greater than 0.");
  }
  if (weightLbs <= 0) {
    throw new Error("Weight must be greater than 0.");
  }

  const bmi = (703 * weightLbs) / (totalInches * totalInches);

  let categoryCode: number;
  if (bmi < 18.5) categoryCode = 0;
  else if (bmi < 25) categoryCode = 1;
  else if (bmi < 30) categoryCode = 2;
  else categoryCode = 3;

  return { bmi, categoryCode };
}

export const BMI_CATEGORY_LABELS: BmiCategory[] = ["Underweight", "Normal weight", "Overweight", "Obese"];
