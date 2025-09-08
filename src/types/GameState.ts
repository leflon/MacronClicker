export type GameState = {
  // Current debt amount, minus the price of bought power-ups
  currentScore: number;
  // Total cumulated debt amount, regardless of purchases
  cumulatedScore: number;
  // id: quantity
  ownedPowerUps: Map<string, number>;
  ownedMultipliers: string[];
};
