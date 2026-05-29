<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { Icon } from '@iconify/vue'

const props = defineProps<{
  primary: string
  secondary: string
  accent: string
}>()

const now = ref(new Date())
let intervalId: ReturnType<typeof setInterval> | null = null

const hourDeg = computed(() => {
  const h = now.value.getHours() % 12
  return h * 30
})

const minuteDeg = computed(() => {
  return now.value.getMinutes() * 6
})

const secondDeg = computed(() => {
  return now.value.getSeconds() * 6
})

onMounted(() => {
  intervalId = setInterval(() => {
    now.value = new Date()
  }, 1000)
})

onUnmounted(() => {
  if (intervalId) clearInterval(intervalId)
})
</script>

<template>
  <div class="pendulum-clock" :style="{ '--primary': primary, '--secondary': secondary, '--accent': accent }">
    <div class="pendulum-body">
      <div class="pendulum-rod" />
      <svg viewBox="0 0 100 100" class="pendulum-face">
        <circle cx="50" cy="50" r="45" fill="var(--primary)" />
        <circle cx="50" cy="50" r="38" fill="var(--secondary)" />
        <circle
          v-for="i in 12"
          :key="i"
          :cx="50 + 32 * Math.sin((i * 30 * Math.PI) / 180)"
          :cy="50 - 32 * Math.cos((i * 30 * Math.PI) / 180)"
          :r="i % 3 === 0 ? 3 : 1.5"
          fill="var(--accent)"
        />
        <line
          x1="50" y1="50"
          x2="50 + 22 * Math.sin((hourDeg * Math.PI) / 180)"
          :y2="50 - 22 * Math.cos((hourDeg * Math.PI) / 180)"
          stroke="var(--accent)" stroke-width="4" stroke-linecap="round"
        />
        <line
          x1="50" y1="50"
          :x2="50 + 30 * Math.sin((minuteDeg * Math.PI) / 180)"
          :y2="50 - 30 * Math.cos((minuteDeg * Math.PI) / 180)"
          stroke="var(--accent)" stroke-width="2.5" stroke-linecap="round"
        />
        <line
          x1="50" y1="50"
          :x2="50 + 34 * Math.sin((secondDeg * Math.PI) / 180)"
          :y2="50 - 34 * Math.cos((secondDeg * Math.PI) / 180)"
          stroke="#fff" stroke-width="1.5" stroke-linecap="round"
        />
        <circle cx="50" cy="50" r="3" fill="var(--accent)" />
      </svg>
    </div>
    <Icon icon="ph:clock" class="clock-icon" :style="{ color: accent }" />
  </div>
</template>

<style scoped>
.pendulum-clock {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  position: relative;
}
.pendulum-body {
  background: var(--primary);
  border-radius: 20px;
  padding: 16px 24px 32px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.12);
  display: flex;
  flex-direction: column;
  align-items: center;
}
.pendulum-rod {
  width: 4px;
  height: 32px;
  background: linear-gradient(to bottom, var(--accent), transparent);
  border-radius: 2px;
  margin-bottom: -4px;
}
.pendulum-face {
  width: clamp(140px, 40vw, 200px);
  height: clamp(140px, 40vw, 200px);
  filter: drop-shadow(0 4px 8px rgba(0,0,0,0.1));
}
.clock-icon {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 20px;
  opacity: 0.6;
}
</style>