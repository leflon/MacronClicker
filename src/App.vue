<script setup lang="ts">
import { onMounted } from 'vue';
import Header from './components/Header.vue';
import Macron from './components/Macron.vue';
import PowerUpShop from './components/PowerUpShop.vue';
import MultiplierShop from './components/MultiplierShop.vue';
import AccountManager from './components/AccountManager.vue';
import { useGameStore } from './stores';

const gameStore = useGameStore();

onMounted(() => {
  gameStore.loadGame();
  gameStore.startAutoIncrement();
  setInterval(gameStore.saveGame, 10000);
});
</script>

<template>
  <div id="grid">
    <div class="left-side">
      <Header />
      <Macron />
    </div>
    <div class="right-side">
      <MultiplierShop />
      <PowerUpShop />
    </div>
  </div>
  <AccountManager />
</template>

<style>
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

#grid {
  margin-top: 10px;
  display: grid;
  overflow: hidden;
  height: 100%;
  grid-template-columns: repeat(6, 1fr);
  grid-template-rows: 1;
}
.left-side {
  grid-column-end: span 4;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.right-side {
  grid-column-end: span 2;
  overflow: hidden;
  overflow-y: auto;
  padding-right: 10px;
}
</style>
