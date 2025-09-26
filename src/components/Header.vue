<script lang="ts" setup>
import { useGameStore } from '@/stores';
import { formatNumber } from '@/lib/utils';

const store = useGameStore();
</script>

<template>
  <div class="header-container">
    <h2>
      <span>République Française Présidence</span>
    </h2>
    <div class="debt-info">
      <h3>Dette publique</h3>
      <h4>{{ formatNumber(store.currentScore) }}</h4>
      <h5>{{ formatNumber(store.debtPerSecond) }} / sec</h5>
    </div>
  </div>
</template>

<style scoped>
.header-container {
  text-align: center;
  width: 100%;
}

h2 {
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
  margin: 10px auto;
  padding: 5px 50px;
  border-radius: 8px;
  color: #000;
}

.debt-info {
  margin: 20px auto;
  background: #0008;
  backdrop-filter: blur(2px);
  color: white;
  width: max-content;
  padding: 5px 40px;
  border-radius: 8px;
}

h3,
h4,
h5 {
  color: #000;
  font-weight: 500;
  margin: 5px auto;
}

h4 {
  font-size: 35px;
  font-weight: 800;
  color: #e63322;
}

h5 {
  font-size: 16px;
  color: #000;
}
</style>
