import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { GameState } from '@/types/GameState';
import * as PowerUps from '@/constants/PowerUps';
import * as Multipliers from '@/constants/Multipliers';
import type { PowerUp } from '@/types/PowerUp';

export const useGameStore = defineStore('game', () => {
  const BASE_SCORE = 0;
  // State
  const currentScore = ref<number>(BASE_SCORE);
  const cumulatedScore = ref<number>(BASE_SCORE);
  const ownedPowerUps = ref<Map<string, number>>(new Map());
  const ownedMultipliers = ref<string[]>([]);

  // Getters
  const gameState = computed<GameState>(() => ({
    currentScore: currentScore.value,
    cumulatedScore: cumulatedScore.value,
    ownedPowerUps: ownedPowerUps.value,
    ownedMultipliers: ownedMultipliers.value,
  }));

  const availablePowerUps = computed(() => {
    const powerUpList = Object.values(PowerUps);
    return powerUpList.filter((powerUp) =>
      powerUp.unlockCondition(cumulatedScore.value),
    );
  });

  const debtPerSecond = computed(() => {
    let total = 0;
    for (const [powerUpId, count] of ownedPowerUps.value) {
      const { baseRate } = Object.values(PowerUps).find(
        (pu) => pu.id === powerUpId,
      )!;
      const totalMult = Object.values(Multipliers)
        .filter(
          (mult) =>
            ownedMultipliers.value.includes(mult.id) && // is owned
            mult.impacts.includes(powerUpId), // impacts the current power up
        )
        .map((mult) => mult.rate)
        .reduce((acc, curr) => curr + acc, 1);
      total += baseRate * count * totalMult;
    }
    return total;
  });

  // Actions
  function click(amount: number = 1) {
    currentScore.value += amount;
    cumulatedScore.value += amount;
  }

  function buyPowerUp(powerUpId: string) {
    const powerUp = Object.values(PowerUps).find((pu) => pu.id === powerUpId);
    if (!powerUp) return;

    const currentCount = ownedPowerUps.value.get(powerUpId) || 0;
    const price = calculatePowerUpPrice(powerUp, currentCount);

    if (currentScore.value >= price) {
      currentScore.value -= price;
      ownedPowerUps.value.set(powerUpId, currentCount + 1);
      saveGame();
    }
  }

  function calculatePowerUpPrice(
    powerUp: PowerUp,
    currentCount: number,
  ): number {
    // Standard incremental game pricing: basePrice * (1.15 ^ currentCount)
    return Math.ceil(powerUp.basePrice * Math.pow(1.15, currentCount));
  }

  function getPowerUpCount(powerUpId: string): number {
    return ownedPowerUps.value.get(powerUpId) || 0;
  }

  function buyMultiplier(multiplierId: string) {
    const mult = Object.values(Multipliers).find((m) => m.id === multiplierId);
    if (!mult) return;
    if (
      currentScore.value > mult.price &&
      !ownedMultipliers.value.includes(multiplierId)
    ) {
      ownedMultipliers.value = [...ownedMultipliers.value, multiplierId];
      saveGame();
    }
  }

  // Auto-increment debt from power-ups
  function startAutoIncrement() {
    setInterval(() => {
      const increment = Number((debtPerSecond.value / 10).toFixed(3));
      if (increment > 0) {
        currentScore.value += increment;
        cumulatedScore.value += increment;
      }
    }, 100); // Every second
  }

  // Save/Load functionality
  function saveGame() {
    const saveData = {
      currentScore: Math.floor(currentScore.value),
      cumulatedScore: Math.floor(cumulatedScore.value),
      ownedPowerUps: Array.from(ownedPowerUps.value.entries()),
      ownerMultipliers: ownedMultipliers.value,
    };
    localStorage.setItem('macronclicker:save', JSON.stringify(saveData));
  }

  function loadGame() {
    const saveData = localStorage.getItem('macronclicker:save');
    if (saveData) {
      try {
        const parsed = JSON.parse(saveData);
        currentScore.value = parsed.currentScore || 0;
        cumulatedScore.value = parsed.cumulatedScore || 0;
        ownedPowerUps.value = new Map(parsed.ownedPowerUps || []);
        ownedMultipliers.value = parsed.ownerMultipliers || [];
      } catch (error) {
        console.error('Failed to load game:', error);
      }
    }
  }

  function resetGame() {
    currentScore.value = 0;
    cumulatedScore.value = 0;
    ownedPowerUps.value.clear();
    ownedMultipliers.value = [];
    localStorage.removeItem('macronclicker:save');
  }

  return {
    // State
    currentScore,
    cumulatedScore,
    ownedPowerUps,
    ownedMultipliers,

    // Getters
    gameState,
    availablePowerUps,
    debtPerSecond,

    // Actions
    click,
    buyPowerUp,
    calculatePowerUpPrice,
    getPowerUpCount,
    buyMultiplier,
    startAutoIncrement,
    saveGame,
    loadGame,
    resetGame,
  };
});
