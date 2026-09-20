/** US industry-standard coverage estimate: one gallon of paint covers ~350 sq ft with one coat. */
const SQFT_PER_GALLON = 350;
const DOOR_SQFT = 20;
const WINDOW_SQFT = 15;

export interface PaintResult {
  wallArea: number;
  paintableArea: number;
  gallonsNeeded: number;
}

export function calculatePaintNeeded(
  roomLength: number,
  roomWidth: number,
  wallHeight: number,
  doors: number,
  windows: number,
  coats: number
): PaintResult {
  if (roomLength <= 0 || roomWidth <= 0 || wallHeight <= 0) {
    throw new Error("Room dimensions must be greater than 0.");
  }
  if (doors < 0 || windows < 0) {
    throw new Error("Number of doors/windows can't be negative.");
  }
  if (coats < 1) {
    throw new Error("Number of coats must be at least 1.");
  }

  const wallArea = 2 * (roomLength + roomWidth) * wallHeight;
  const paintableArea = Math.max(wallArea - doors * DOOR_SQFT - windows * WINDOW_SQFT, 0);
  const gallonsNeeded = (paintableArea * coats) / SQFT_PER_GALLON;

  return { wallArea, paintableArea, gallonsNeeded };
}
