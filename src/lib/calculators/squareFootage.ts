export interface SquareFootageResult {
  totalArea: number;
}

/** Total area of a room, optionally adding a second rectangular section (e.g. an L-shaped room). */
export function calculateSquareFootage(
  length: number,
  width: number,
  extraLength: number,
  extraWidth: number
): SquareFootageResult {
  if (length <= 0 || width <= 0) {
    throw new Error("Length and width must be greater than 0.");
  }
  if (extraLength < 0 || extraWidth < 0) {
    throw new Error("Additional section dimensions can't be negative.");
  }

  const totalArea = length * width + extraLength * extraWidth;

  return { totalArea };
}
