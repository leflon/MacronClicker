export const computePurchasePrice = (basePrice: number, amount: number) => {
  // +15% each time you buy an item.
  return Math.ceil(basePrice * Math.pow(1.15, amount));
};
