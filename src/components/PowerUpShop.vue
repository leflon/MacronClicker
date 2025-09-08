<script setup lang="ts">
import { useGameStore } from '@/stores';
import PowerUpShopItem from './PowerUpShopItem.vue';
import { computed } from 'vue';

const store = useGameStore();

const powerups = computed(() => {
  const clone = [...store.availablePowerUps];
  clone.sort((a, b) => a.basePrice - b.basePrice);
  return clone;
});
</script>

<template>
  <div class="shop">
    <h1>Boutique d'améliorations</h1>
    <div class="list">
      <PowerUpShopItem v-bind="powerup" v-for="powerup of powerups" />
    </div>
  </div>
</template>

<style scoped>
h1 {
  width: max-content;
  margin: 0 auto;
  color: white;
  background: #0009;
  padding: 5px 10px;
  font-size: 18pt;
  font-weight: 500;
  border-radius: 10em;
}
.shop {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.list {
  flex: 1;
  position: relative;
  overflow: auto;
}

.list::-webkit-scrollbar {
  width: 8px;
}

.list::-webkit-scrollbar-track {
  background: transparent;
}

.list::-webkit-scrollbar-thumb {
  background: rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  border: none;
}

.list::-webkit-scrollbar-thumb:hover {
  background: rgba(255, 255, 255, 0.3);
}

/* Firefox */
.list {
  scrollbar-width: thin;
  scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
}
</style>
