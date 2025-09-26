<script setup lang="ts">
import type { Multiplier } from '@/types/Multplier';
import { computed } from 'vue';
import { useGameStore } from '@/stores';

const store = useGameStore();

const emit = defineEmits(['focus', 'click']);

const props = defineProps<Multiplier>();

const canBuy = computed(() => store.currentScore > props.price);
</script>

<template>
  <div
    class="container"
    @mouseenter="emit('focus', props.id)"
    @click="emit('click', props.id)"
    ref="dom"
    :data-canBuy="canBuy"
  >
    <div class="faces">
      <img
        height="24"
        v-for="(powerup, i) in props.impacts"
        :src="`${import.meta.env.BASE_URL}img/powerup/${powerup}.webp`"
        :alt="powerup"
        :style="{ left: `${i * 5}px` }"
      />
    </div>
    <div>x{{ props.rate }}</div>
  </div>
</template>

<style scoped>
.container {
  box-sizing: border-box;
  display: flex;
  padding: 0 2px;
  width: 72px;
  height: 32px;
  flex-shrink: 0;
  justify-content: space-between;
  align-items: center;
  font-weight: 600;
  background: #fff;
  border-radius: 5px;
  cursor: pointer;
  &[data-canBuy='false'] {
    opacity: 0.5;
  }
}
.faces {
  position: relative;
  display: flex;
  align-items: center;
}
.faces img {
  position: absolute;
  top: 505;
}
</style>
