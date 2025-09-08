import type { Multiplier } from '@/types/Multplier';

export const test: Multiplier = {
  id: 'test',
  description: 'Ce multiplieur est un test',
  name: 'Test',
  impacts: ['local'],
  rate: 2,
  price: 100,
  unlockCondition: () => true,
};
