function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

export type FractionOperation = "add" | "subtract" | "multiply" | "divide";

export interface FractionResult {
  numerator: number;
  denominator: number;
  decimal: number;
}

function simplify(numerator: number, denominator: number): FractionResult {
  if (denominator === 0) {
    throw new Error("Denominator can't be zero.");
  }
  const sign = denominator < 0 ? -1 : 1;
  numerator *= sign;
  denominator *= sign;
  const divisor = gcd(numerator, denominator);
  return { numerator: numerator / divisor, denominator: denominator / divisor, decimal: numerator / denominator };
}

export function calculateFraction(
  n1: number,
  d1: number,
  operation: FractionOperation,
  n2: number,
  d2: number
): FractionResult {
  if (d1 === 0 || d2 === 0) {
    throw new Error("A denominator can't be zero.");
  }

  switch (operation) {
    case "add":
      return simplify(n1 * d2 + n2 * d1, d1 * d2);
    case "subtract":
      return simplify(n1 * d2 - n2 * d1, d1 * d2);
    case "multiply":
      return simplify(n1 * n2, d1 * d2);
    case "divide":
      if (n2 === 0) throw new Error("Can't divide by a fraction equal to zero.");
      return simplify(n1 * d2, d1 * n2);
  }
}
