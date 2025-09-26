import { defineStore } from 'pinia';
import { ref, computed, watch } from 'vue';
import type { GameState } from '@/types/GameState';
import * as PowerUps from '@/constants/PowerUps';
import * as Multipliers from '@/constants/Multipliers';
import type { PowerUp } from '@/types/PowerUp';
import { useAuthStore } from './authStore';

export const useGameStore = defineStore('game', () => {
  const BASE_SCORE = 0;
  const authStore = useAuthStore();

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

  const availableMultipliers = computed(() => {
    const multiplierList = Object.values(Multipliers);
    return multiplierList.filter(
      (multiplier) =>
        multiplier.unlockCondition(cumulatedScore.value) &&
        !ownedMultipliers.value.includes(multiplier.id),
    );
  });

  const totalPowerUps = computed(() => {
    return Array.from(ownedPowerUps.value.values()).reduce(
      (acc, curr) => acc + curr,
      0,
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
        .reduce((acc, curr) => curr + acc, 0);
      console.log(powerUpId, totalMult);
      total += baseRate * count * Math.max(1, totalMult);
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
      const increment = Number((debtPerSecond.value / 100).toFixed(3));
      if (increment > 0) {
        currentScore.value += increment;
        cumulatedScore.value += increment;
      }
    }, 10);
  }

  // Watch for user changes and reload game data
  watch(
    () => authStore.currentUser,
    (newUser) => {
      if (newUser) {
        loadGame();
      } else {
        resetToDefaults();
      }
    },
  );

  function saveGame() {
    if (!authStore.currentUser) {
      return;
    }

    authStore.updateUserData({
      currentScore: Math.floor(currentScore.value),
      cumulatedScore: Math.floor(cumulatedScore.value),
      ownedPowerUps: Array.from(ownedPowerUps.value.entries()),
      ownedMultipliers: ownedMultipliers.value,
    });
  }

  function loadGame() {
    if (!authStore.currentUser) {
      resetToDefaults();
      return;
    }

    const userData = authStore.getCurrentUserData();
    if (userData) {
      currentScore.value = userData.currentScore || 0;
      cumulatedScore.value = userData.cumulatedScore || 0;
      ownedPowerUps.value = new Map(userData.ownedPowerUps || []);
      ownedMultipliers.value = userData.ownedMultipliers || [];
    } else {
      resetToDefaults();
    }
  }

  function resetGame() {
    resetToDefaults();
    saveGame();
  }

  function resetToDefaults() {
    currentScore.value = BASE_SCORE;
    cumulatedScore.value = BASE_SCORE;
    ownedPowerUps.value.clear();
    ownedMultipliers.value = [];
  }

  return {
    // State
    currentScore,
    cumulatedScore,
    ownedPowerUps,
    ownedMultipliers,
    totalPowerUps,

    // Getters
    gameState,
    availablePowerUps,
    availableMultipliers,
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
