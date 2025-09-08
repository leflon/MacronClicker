export type Multiplier = {
  id: string;
  name: string;
  description: string;
  impacts: string[];
  rate: number;
  price: number;
  unlockCondition: (...args: any[]) => boolean;
};
