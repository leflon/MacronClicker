<script lang="ts" setup>
import { useGameStore } from '@/stores';
import { formatNumber } from '@/lib/utils';

const store = useGameStore();
</script>

<template>
  <h1>
    <span>République Française Présidence</span>
  </h1>
  <div>
    <h2>Dette publique</h2>
    <h3>{{ formatNumber(store.currentScore) }}</h3>
    <h4>{{ formatNumber(store.debtPerSecond) }} / sec</h4>
  </div>
</template>

<style scoped>
* {
  text-align: center;
}
div {
  margin: 20px auto;
  background: #0008;
  backdrop-filter: blur(2px);
  color: white;
  width: max-content;
  padding: 5px 40px;
  border-radius: 8px;
}
h1,
h2,
h3,
h4 {
  font-weight: 500;
  margin: 5px auto;
}

h3 {
  font-size: 35px;
  font-weight: 800;
  color: #e63322;
}

h1 {
  background: linear-gradient(
    121deg,
    rgba(0, 33, 83, 1) 0%,
    rgba(255, 255, 255, 1) 33%,
    rgba(255, 255, 255, 1) 50%,
    rgba(255, 255, 255, 1) 66%,
    rgba(207, 8, 33, 1) 100%
  );
  font-weight: 800;
  width: max-content;
  margin: 0 auto;
  padding: 5px 50px;
  border-radius: 8px;
}
</style>
