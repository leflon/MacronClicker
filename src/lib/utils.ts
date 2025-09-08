export const computePurchasePrice = (basePrice: number, amount: number) => {
  // +15% each time you buy an item.
  return Math.ceil(basePrice * Math.pow(1.15, amount));
};

export const formatNumber = (n: number) => {
  const suffixes: Record<number, string> = {
    1e3: 'K',
    1e6: 'M',
    1e9: 'Md',
    1e12: 'Bn',
    1e15: 'T',
    1e18: 'Qa',
    1e21: 'Qi',
  };

  const keys = Object.keys(suffixes)
    .map((key) => parseFloat(key))
    .sort((a, b) => b - a);

  for (const key of keys) {
    if (n >= key) {
      return (n / key).toFixed(2) + suffixes[key] + '€';
    }
  }
  return Math.floor(n) + '€';
};
