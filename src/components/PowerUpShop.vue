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
  <div>
    <h1>Boutique d'améliorations</h1>
    <div>
      <PowerUpShopItem v-bind="powerup" v-for="powerup of powerups" />
      <div></div>
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
div > div {
  position: relative;
}
</style>
