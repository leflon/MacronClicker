<script lang="ts" setup>
import * as PowerUps from '@/constants/PowerUps';
import { useGameStore } from '@/stores';
import { onMounted, useTemplateRef } from 'vue';
import macronPNG from '../assets/macron.webp';

const store = useGameStore();

const container = useTemplateRef('container');
const canvas = useTemplateRef('canvas');
let ctx: CanvasRenderingContext2D;

const BASE_URL = import.meta.env.VITE_PUBLIC_BASE_URL || '';

const powerUpImages = Object.values(PowerUps).map((p) => {
  const image = new Image();
  image.src = `${BASE_URL}img/powerup/${p.id}.webp`;
  return { id: p.id, image };
});

onMounted(() => {
  ctx = canvas.value?.getContext('2d')!;
  draw();
});

const BASE_DISTANCE = 180;
const BASE_SIZE = 50;
const GAP = 0.1;
let currentAngle = 0;
let currentFrame = 0;

const scale = (i: number) => Math.abs(Math.sin(i / 20)) + 0.25;
function draw() {
  currentFrame++;
  if (!ctx) return;
  ctx.clearRect(0, 0, 500, 500);

  let i = 0;
  let k = 1;
  for (const [pu, count] of store.ownedPowerUps.entries()) {
    const img = powerUpImages.find((img) => img.id === pu);
    for (let j = 0; j < count; j++) {
      const distance = BASE_DISTANCE + Math.cos(i / 2) * 40;
      const s = BASE_SIZE * scale(currentFrame / 10 + i);
      const x = Math.cos(currentAngle - i * GAP) * distance + 250 - s / 2;
      const y = Math.sin(currentAngle - i * GAP) * distance + 250 - s / 2;
      try {
        if (img) ctx.drawImage(img.image, x, y, s, s);
      } catch (err) {}
      i++;
    }
    k++;
  }
  currentAngle += 0.002;
  requestAnimationFrame(draw);
}

function onClick(e: MouseEvent) {
  store.click();
  const particle = window.document.createElement('div');
  particle.className = 'particle';
  particle.textContent = '€';
  container.value?.appendChild(particle);
  const size = particle.getBoundingClientRect();
  const target = e.target as HTMLDivElement;
  particle.style.left = e.layerX - target.clientLeft - size.width / 2 + 'px';
  particle.style.top = e.layerY - target.clientTop - size.height / 2 + 'px';

  setTimeout(() => {
    particle.remove();
  }, 1000);
}
</script>
<template>
  <div ref="container">
    <canvas ref="canvas" width="500" height="500"></canvas>
    <img :src="macronPNG" draggable="false" @click="onClick" />
  </div>
</template>

<style scoped>
div {
  position: relative;
  width: max-content;
}
img {
  z-index: 10000;
  display: block;
  height: 400px;
  object-fit: contain;
  margin: auto;
  user-select: none;
  cursor: pointer;

  transition: 0.1s ease;
  &:hover {
    transform: scale(1.05);
  }
}
canvas {
  z-index: 0;
  pointer-events: none;
  width: 500px;
  height: 500px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
