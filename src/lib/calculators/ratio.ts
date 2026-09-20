function gcd(a: number, b: number): number {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b !== 0) {
    [a, b] = [b, a % b];
  }
  return a;
}

export interface SimplifiedRatio {
  a: number;
  b: number;
  decimal: number;
}

/** Reduces a:b to lowest terms, e.g. 8:12 → 2:3. */
export function simplifyRatio(a: number, b: number): SimplifiedRatio {
  if (a <= 0 || b <= 0) {
    throw new Error("Both values must be greater than 0.");
  }
  const divisor = gcd(a, b);
  return { a: a / divisor, b: b / divisor, decimal: a / b };
}

export interface ScaledRatio {
  scaledA: number;
  scaledB: number;
}

/** Scales a:b so that the "a" side becomes `targetA`, keeping the same proportion. */
export function scaleRatio(a: number, b: number, targetA: number): ScaledRatio {
  if (a <= 0 || b <= 0) {
    throw new Error("Both ratio values must be greater than 0.");
  }
  if (targetA < 0) {
    throw new Error("Target value can't be negative.");
  }
  const factor = targetA / a;
  return { scaledA: targetA, scaledB: b * factor };
}
