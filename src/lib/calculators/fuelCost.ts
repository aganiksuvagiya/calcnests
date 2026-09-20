export interface FuelCostResult {
  gallonsUsed: number;
  totalCost: number;
}

export function calculateFuelCost(distanceMiles: number, mpg: number, pricePerGallon: number): FuelCostResult {
  if (distanceMiles < 0) throw new Error("Distance can't be negative.");
  if (mpg <= 0) throw new Error("Fuel efficiency must be greater than 0.");
  if (pricePerGallon < 0) throw new Error("Price per gallon can't be negative.");

  const gallonsUsed = distanceMiles / mpg;
  const totalCost = gallonsUsed * pricePerGallon;

  return { gallonsUsed, totalCost };
}
