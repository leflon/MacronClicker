import type { PowerUp } from '../types/PowerUp';

export const local: PowerUp = {
  id: 'local',
  name: 'Élu local',
  description:
    "L'Élu local augmente la dette publique de {{rate}} par seconde.",
  basePrice: 1.5e1,
  baseRate: 1,
  unlockCondition: () => true,
};

export const senator: PowerUp = {
  id: 'senator',
  name: 'Sénateur',
  description: 'Le sénateur augmente la dette publique de {{rate}} par seconde',
  basePrice: 1e2,
  baseRate: 1,
  unlockCondition: (score: number) => score > 1e2,
};

export const deputy: PowerUp = {
  id: 'deputy',
  name: 'Député',
  description: 'Le député augmente la dette publique de {{rate}} par seconde.',
  basePrice: 1.1e3,
  baseRate: 8,
  unlockCondition: (score: number) => score > 5e2,
};

export const minister: PowerUp = {
  id: 'minister',
  name: 'Ministre',
  description:
    'Le ministre augmente la dette publique de {{rate}} par seconde.',
  basePrice: 1.2e4,
  baseRate: 4.7e1,
  unlockCondition: (score: number) => score > 2.5e3,
};

export const primeMinister: PowerUp = {
  id: 'primeMinister',
  name: 'Premier Ministre',
  description:
    'Le Premier Ministre augmente la dette publique de {{rate}} par seconde.',
  basePrice: 1.3e5,
  baseRate: 2.6e2,
  unlockCondition: (score: number) => score > 1.25e4,
};

export const secretaryGeneral: PowerUp = {
  id: 'secretaryGeneral',
  name: 'Secrétaire général',
  description:
    'Le secrétaire général augmente la dette publique de {{rate}} par seconde.',
  basePrice: 1.4e6,
  baseRate: 1.4e3,
  unlockCondition: (score: number) => score > 6.25e4,
};

export const president: PowerUp = {
  id: 'president',
  name: 'Ancien Président de la République',
  description:
    "Les privilèges d'ancien Président augmentent la dette publique de {{rate}} par seconde.",
  basePrice: 1.4e6,
  baseRate: 1.4e3,
  unlockCondition: (score: number) => score > 6.25e4,
};
