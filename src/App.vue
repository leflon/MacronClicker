<script setup lang="ts">
import { onMounted } from 'vue';
import Header from './components/Header.vue';
import Macron from './components/Macron.vue';
import PowerUpShop from './components/PowerUpShop.vue';
import { useGameStore } from './stores';
import { onUnmounted } from 'vue';

const store = useGameStore();
onMounted(() => {
  store.loadGame();
  store.startAutoIncrement();
  setInterval(store.saveGame, 10000);
});
</script>

<template>
  <div id="grid">
    <div class="left-side">
      <Header />
      <Macron />
    </div>
    <div class="right-side">
      <PowerUpShop />
    </div>
  </div>
</template>

<style scoped>
#grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1;
}
.left-side {
  grid-column-end: span 4;
}
.right-side {
  grid-column-end: span 2;
}
</style>
