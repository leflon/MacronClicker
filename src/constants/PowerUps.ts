import type { PowerUp } from '../types/PowerUp';

export const local: PowerUp = {
  id: 'local',
  name: 'Élu local',
  description:
    "L'Élu local augmente la dette publique de {{rate}} par seconde.",
  basePrice: 10,
  baseRate: 1,
  unlockCondition: () => true,
};

export const senator: PowerUp = {
  id: 'senator',
  name: 'Sénateur',
  description: 'Le sénateur augmente la dette publique de {{rate}} par seconde',
  basePrice: 60,
  baseRate: 5,
  unlockCondition: (score: number) => score > 50,
};

export const deputy: PowerUp = {
  id: 'deputy',
  name: 'Député',
  description: 'Le député augmente la dette publique de {{rate}} par seconde.',
  basePrice: 500,
  baseRate: 10,
  unlockCondition: (score: number) => score > 250,
};

export const minister: PowerUp = {
  id: 'minister',
  name: 'Ministre',
  description:
    'Le ministre augmente la dette publique de {{rate}} par seconde.',
  basePrice: 6000,
  baseRate: 50,
  unlockCondition: (score: number) => score > 1200,
};

export const primeMinister: PowerUp = {
  id: 'primeMinister',
  name: 'Premier Ministre',
  description:
    'Le Premier Ministre augmente la dette publique de {{rate}} par seconde.',
  basePrice: 35000,
  baseRate: 100,
  unlockCondition: (score: number) => score > 7000,
};

export const secretaryGeneral: PowerUp = {
  id: 'secretaryGeneral',
  name: 'Secrétaire général',
  description:
    'Le secrétaire général augmente la dette publique de {{rate}} par seconde.',
  basePrice: 120000,
  baseRate: 500,
  unlockCondition: (score: number) => score > 40000,
};

export const president: PowerUp = {
  id: 'president',
  name: 'Ancien Président de la République',
  description:
    "Les privilèges d'ancien Président augmentent la dette publique de {{rate}} par seconde.",
  basePrice: 120000,
  baseRate: 2500,
  unlockCondition: (score: number) => score > 40000,
};
