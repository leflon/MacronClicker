export interface PowerUp {
  id: string;
  name: string;
  description: string;
  basePrice: number;
  baseRate: number;
  unlockCondition: (...args: any[]) => boolean;
}
