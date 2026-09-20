export interface FlooringResult {
  roomArea: number;
  materialNeeded: number;
}

/** Adds a waste allowance on top of the raw room area — standard practice for cuts and offcuts. */
export function calculateFlooringNeeded(roomLength: number, roomWidth: number, wastePercent: number): FlooringResult {
  if (roomLength <= 0 || roomWidth <= 0) {
    throw new Error("Room dimensions must be greater than 0.");
  }
  if (wastePercent < 0) {
    throw new Error("Waste percentage can't be negative.");
  }

  const roomArea = roomLength * roomWidth;
  const materialNeeded = roomArea * (1 + wastePercent / 100);

  return { roomArea, materialNeeded };
}
