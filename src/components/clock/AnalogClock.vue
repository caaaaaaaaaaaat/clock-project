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
  const m = now.value.getMinutes()
  return h * 30 + m * 0.5
})

const minuteDeg = computed(() => {
  const m = now.value.getMinutes()
  const s = now.value.getSeconds()
  return m * 6 + s * 0.1
})

const secondDeg = computed(() => {
  const s = now.value.getSeconds()
  return s * 6
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
  <div class="analog-clock" :style="{ '--primary': primary, '--secondary': secondary, '--accent': accent }">
    <svg viewBox="0 0 200 200" class="clock-svg">
      <circle cx="100" cy="100" r="90" fill="var(--primary)" />
      <circle cx="100" cy="100" r="80" fill="var(--secondary)" />
      <circle
        v-for="i in 12"
        :key="i"
        :cx="100 + 70 * Math.sin((i * 30 * Math.PI) / 180)"
        :cy="100 - 70 * Math.cos((i * 30 * Math.PI) / 180)"
        :r="i % 3 === 0 ? 4 : 2"
        fill="var(--accent)"
      />
      <line
        x1="100" y1="100"
        :x2="100 + 45 * Math.sin((hourDeg * Math.PI) / 180)"
        :y2="100 - 45 * Math.cos((hourDeg * Math.PI) / 180)"
        stroke="var(--accent)" stroke-width="6" stroke-linecap="round"
      />
      <line
        x1="100" y1="100"
        :x2="100 + 60 * Math.sin((minuteDeg * Math.PI) / 180)"
        :y2="100 - 60 * Math.cos((minuteDeg * Math.PI) / 180)"
        stroke="var(--accent)" stroke-width="4" stroke-linecap="round"
      />
      <line
        x1="100" y1="100"
        :x2="100 + 65 * Math.sin((secondDeg * Math.PI) / 180)"
        :y2="100 - 65 * Math.cos((secondDeg * Math.PI) / 180)"
        stroke="#fff" stroke-width="2" stroke-linecap="round"
      />
      <circle cx="100" cy="100" r="5" fill="var(--accent)" />
    </svg>
    <Icon icon="ph:clock" class="clock-icon" :style="{ color: accent }" />
  </div>
</template>

<style scoped>
.analog-clock {
  position: relative;
  width: 100%;
  max-width: min(80vw, 80vh);
  aspect-ratio: 1;
}
.clock-svg {
  width: 100%;
  height: 100%;
  filter: drop-shadow(0 4px 12px rgba(0,0,0,0.1));
}
.clock-icon {
  position: absolute;
  bottom: 8px;
  right: 8px;
  font-size: 20px;
  opacity: 0.7;
}
</style>