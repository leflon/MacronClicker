<script lang="ts" setup>
import { computePurchasePrice, formatNumber } from '@/lib/utils';
import { useGameStore } from '@/stores';
import type { PowerUp } from '@/types/PowerUp';
import { computed } from 'vue';

const props = defineProps<PowerUp>();
const store = useGameStore();

const ownedCount = computed(() => store.ownedPowerUps.get(props.id) || 0);
const price = computed(() =>
  computePurchasePrice(props.basePrice, ownedCount.value),
);
const canBuy = computed(() => store.currentScore >= price.value);

const description = computed(() =>
  props.description.replace(
    '{{rate}}',
    `<b>${formatNumber(props.baseRate)}</b>`,
  ),
);

function buy() {
  store.buyPowerUp(props.id);
}
</script>

<template>
  <div class="item" :data-canBuy="canBuy" @click="buy">
    <div class="buy-overlay" v-if="canBuy">Acheter</div>
    <div class="image">
      <img :src="`/img/powerup/${props.id}.webp`" />
    </div>
    <div class="right-side">
      <div class="name">{{ props.name }}</div>
      <div class="desc" v-html="description"></div>
      <div class="price">{{ formatNumber(price) }}</div>
      <div class="owned">{{ ownedCount }}</div>
    </div>
  </div>
</template>

<style scoped>
* {
  user-select: none;
}
.item {
  position: relative;
  display: flex;
  box-sizing: border-box;
  width: 90%;
  height: 120px;
  margin: 10px auto;
  background: white;
  padding: 5px 10px;
  border-radius: 10px;
  box-shadow: 0px 10px 20px #0004;
  &:hover .buy-overlay {
    opacity: 1;
  }
  &[data-canBuy='true'] {
    cursor: pointer;
    opacity: 1;
  }
  cursor: not-allowed;
  opacity: 0.5;
  transition: opacity 0.5s ease;
}
.buy-overlay {
  z-index: 5;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    121deg,
    rgba(0, 33, 83, 0.5) 0%,
    rgba(255, 255, 255, 0.5) 33%,
    rgba(255, 255, 255, 0.5) 50%,
    rgba(255, 255, 255, 0.5) 66%,
    rgba(207, 8, 33, 0.5) 100%
  );
  backdrop-filter: blur(6px);
  opacity: 0;
  font: 800 30pt 'Marianne';
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  transition: opacity 0.1s;
}
.image {
  height: 100%;
  position: relative;
  width: 20%;
  min-width: 70px;
  & img {
    width: 100%;
    height: 100%;
    object-fit: contain;
    object-position: bottom center;
  }
}
.right-side {
  margin-left: 10px;
}
.desc {
  font-size: 12pt;
  width: 90%;
}
.name {
  font: 600 16pt 'Marianne';
}
.owned {
  position: absolute;
  font: 800 30pt 'Marianne';
  text-align: right;
  opacity: 0.8;
  bottom: 0;
  right: 2px;
  line-height: 25pt;
  overflow: hidden;
}
.price {
  font: 600 12pt 'Marianne';
}
</style>
