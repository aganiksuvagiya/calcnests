export interface AverageResult {
  mean: number;
  sum: number;
  count: number;
  min: number;
  max: number;
}

/** Parses a comma/space/newline-separated list of numbers. Throws if none are valid. */
export function parseNumberList(input: string): number[] {
  const numbers = input
    .split(/[\s,]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0)
    .map(Number);

  if (numbers.length === 0 || numbers.some((n) => Number.isNaN(n))) {
    throw new Error("Enter a list of numbers separated by commas or spaces.");
  }

  return numbers;
}

export function calculateAverage(numbers: number[]): AverageResult {
  if (numbers.length === 0) {
    throw new Error("Enter at least one number.");
  }

  const sum = numbers.reduce((a, b) => a + b, 0);

  return {
    mean: sum / numbers.length,
    sum,
    count: numbers.length,
    min: Math.min(...numbers),
    max: Math.max(...numbers),
  };
}
