<script setup lang="ts">
import { computed, ref } from 'vue';
import { useGameStore } from '@/stores';
import MultiplierShopItem from './MultiplierShopItem.vue';
import { onMounted } from 'vue';
import type { Multiplier } from '@/types/Multplier';
import { formatNumber } from '@/lib/utils';

const store = useGameStore();

const descX = ref(0);
const descY = ref(0);

const currentFocus = ref<Multiplier | null>(null);

const container = ref<HTMLDivElement | null>(null);

const multipliers = computed(() => {
  const clone = [...store.availableMultipliers];
  clone.sort((a, b) => a.price - b.price);
  return clone;
});
const handleWheel = (event: WheelEvent) => {
  event.preventDefault();
  console.log(event.deltaX, event.deltaY);
  // Take into account potential trackpads or multi-wheel mice.
  const delta =
    Math.abs(event.deltaX) > Math.abs(event.deltaY)
      ? event.deltaX
      : event.deltaY;
  if (event.deltaX !== 0) return;

  (container.value as HTMLDivElement).scrollLeft += delta;
};

const handleMouseMove = (event: MouseEvent) => {
  let x = event.pageX - container.value!.offsetLeft;
  if (x + 350 >= document.body.offsetWidth) x -= 350;
  descX.value = x;
  descY.value = event.pageY - container.value!.offsetTop + 20;
};

const handleChildFocus = (id: string) => {
  currentFocus.value = store.availableMultipliers.find((m) => m.id === id)!;
};

const handleChildClick = (id: string) => {
  store.buyMultiplier(id);
};

onMounted(() => {
  console.log(container.value);
  const rect = container.value!.getBoundingClientRect();
  descX.value = rect.left;
  descY.value = rect.top + rect.height + 20;
});
</script>

<template>
  <h1>Mutiplicateurs</h1>
  <div class="container">
    <div
      class="list"
      ref="container"
      @mousemove="handleMouseMove"
      @wheel="handleWheel"
    >
      <MultiplierShopItem
        v-for="m of multipliers"
        :key="m.id"
        v-bind="m"
        @focus="handleChildFocus"
        @click="handleChildClick"
      />
    </div>
    <div class="description" :style="{ top: `${descY}px`, left: `${descX}px` }">
      <div class="desc-title">{{ currentFocus?.name }}</div>
      <div class="desc-rate">x{{ currentFocus?.rate }}</div>
      <div>
        <img
          v-for="(p, i) in currentFocus?.impacts"
          :src="`/img/powerup/${p}.webp`"
          height="48"
          :alt="p"
        />
      </div>
      <span>
        {{ currentFocus?.description }}<br />
        <b>{{ formatNumber(currentFocus?.price || 0) }} - Acheter</b>
      </span>
    </div>
  </div>
</template>

<style scoped>
.container {
  position: relative;

  &:hover .description {
    opacity: 1;
  }
}
.list {
  box-sizing: border-box;
  display: flex;
  width: 100%;
  height: 32px;
  gap: 5px;
  margin: 10px auto;
  overflow-y: auto;
}

.list::-webkit-scrollbar {
  width: 0px;
}

/* Firefox */
.list {
  scrollbar-width: none;
}

.description {
  z-index: 1000;
  position: fixed;
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(12px);
  border: 1px solid rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  width: 350px;
  padding: 12px 16px;
  box-shadow:
    0 20px 25px -5px rgba(0, 0, 0, 0.1),
    0 10px 10px -5px rgba(0, 0, 0, 0.04),
    0 0 0 1px rgba(0, 0, 0, 0.05);
  font-size: 13px;
  line-height: 1.4;
  color: #334155;
  pointer-events: none;
  opacity: 0;
  transition: 0.1s ease;
}
.desc-rate {
  right: 2px;
  bottom: -16px;
  position: absolute;
  font-size: 40pt;
  font-weight: 800;
  opacity: 0.8;
}
.desc-title {
  font-size: 12pt;
  font-weight: 600;
  margin-bottom: 8px;
}
.description span {
  display: block;
}

.description img {
  margin-right: 5px;
}

.description b {
  color: #2563eb;
  font-weight: 600;
  margin-top: 8px;
  display: inline-block;
}
</style>
