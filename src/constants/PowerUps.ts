import type { PowerUp } from '../types/PowerUp';

export const local: PowerUp = {
  id: 'local',
  name: 'Élu local',
  description:
    "L'Élu local augmente la dette publique de {{rate}} par seconde.",
  basePrice: 15,
  baseRate: 0.5,
  unlockCondition: () => true,
};

export const senator: PowerUp = {
  id: 'senator',
  name: 'Sénateur',
  description: 'Le sénateur augmente la dette publique de {{rate}} par seconde',
  basePrice: 100,
  baseRate: 1,
  unlockCondition: (score: number) => score > 100,
};

export const deputy: PowerUp = {
  id: 'deputy',
  name: 'Député',
  description: 'Le député augmente la dette publique de {{rate}} par seconde.',
  basePrice: 500,
  baseRate: 10,
  unlockCondition: (score: number) => score > 500,
};

export const minister: PowerUp = {
  id: 'minister',
  name: 'Ministre',
  description:
    'Le ministre augmente la dette publique de {{rate}} par seconde.',
  basePrice: 2500,
  baseRate: 50,
  unlockCondition: (score: number) => score > 2500,
};

export const primeMinister: PowerUp = {
  id: 'primeMinister',
  name: 'Premier Ministre',
  description:
    'Le Premier Ministre augmente la dette publique de {{rate}} par seconde.',
  basePrice: 12500,
  baseRate: 250,
  unlockCondition: (score: number) => score > 12500,
};

export const president: PowerUp = {
  id: 'president',
  name: 'Président de la République',
  description:
    'Le Président augmente la dette publique de {{rate}} par seconde.',
  basePrice: 62500,
  baseRate: 1250,
  unlockCondition: (score: number) => score > 62500,
};

// Ridiculous power-ups with complex unlock conditions
export const jupiterAscension: PowerUp = {
  id: 'jupiterAscension',
  name: 'Ascension Jupitérienne',
  description:
    "Macron transcende vers Jupiter et augmente la dette de {{rate}} par seconde depuis l'espace.",
  basePrice: 500000,
  baseRate: 10000,
  unlockCondition: (score: number, powerUps?: any) => {
    const hasPresident = powerUps?.president?.count > 0;
    return score > 300000 && hasPresident;
  },
};

export const timeParadox: PowerUp = {
  id: 'timeParadox',
  name: 'Paradoxe Temporel Macronien',
  description:
    'Macron voyage dans le temps pour augmenter la dette rétroactivement de {{rate}} par seconde.',
  basePrice: 2000000,
  baseRate: 50000,
  unlockCondition: (score: number) => score > 1000000,
};

export const multiverse: PowerUp = {
  id: 'multiverse',
  name: 'Macron Multiversel',
  description:
    'Tous les Macrons de tous les univers parallèles augmentent la dette de {{rate}} par seconde.',
  basePrice: 10000000,
  baseRate: 250000,
  unlockCondition: (score: number) => score > 5000000,
};

export const economicSingularity: PowerUp = {
  id: 'economicSingularity',
  name: 'Singularité Économique',
  description:
    "Macron fusionne avec l'économie française et génère {{rate}} de dette par seconde via pure transcendance.",
  basePrice: 1e8,
  baseRate: 1e6,
  unlockCondition: (score: number) => score > 50000000,
};
