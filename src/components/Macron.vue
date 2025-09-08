<script lang="ts" setup>
import { useGameStore } from '@/stores';
import macronPNG from '../assets/macron.webp';
import { useTemplateRef } from 'vue';

const store = useGameStore();
const container = useTemplateRef('container');

function onClick(e: MouseEvent) {
  store.click();
  const particle = window.document.createElement('div');
  particle.className = 'particle';
  particle.textContent = '€';
  container.value?.appendChild(particle);
  const size = particle.getBoundingClientRect();
  console.log(size);
  const target = e.target as HTMLDivElement;
  particle.style.left = e.clientX - target.clientLeft - size.width / 2 + 'px';
  particle.style.top = e.layerY - target.clientTop - size.height / 2 + 'px';

  setTimeout(() => {
    particle.remove();
  }, 1000);
}
</script>
<template>
  <div ref="container">
    <img :src="macronPNG" draggable="false" @click="onClick" />
  </div>
</template>

<style scoped>
div {
  position: relative;
}
img {
  display: block;
  width: 300px;
  margin: auto;
  user-select: none;
  cursor: pointer;

  transition: 0.1s ease;
  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }
}
</style>
<style>
.particle {
  pointer-events: none;
  position: absolute;
  color: red;
  animation: particle 1s linear forwards;
  font: 40pt sans-serif;
  user-select: none;
  transform: scaleY(0.9);
}

@keyframes particle {
  to {
    opacity: 0;
    transform: translateY(-200px) rotate(-78deg) scaleY(0.1);
  }
}
</style>
