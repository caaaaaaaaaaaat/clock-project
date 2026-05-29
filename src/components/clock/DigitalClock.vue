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

const timeString = computed(() => {
  const h = now.value.getHours().toString().padStart(2, '0')
  const m = now.value.getMinutes().toString().padStart(2, '0')
  const s = now.value.getSeconds().toString().padStart(2, '0')
  return `${h}:${m}:${s}`
})

const dateString = computed(() => {
  return now.value.toLocaleDateString('zh-CN', { month: 'short', day: 'numeric', weekday: 'short' })
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
  <div class="digital-clock" :style="{ '--primary': primary, '--secondary': secondary, '--accent': accent }">
    <div class="time-display">{{ timeString }}</div>
    <div class="date-display">{{ dateString }}</div>
    <Icon icon="ph:clock" class="clock-icon" :style="{ color: accent }" />
  </div>
</template>

<style scoped>
.digital-clock {
  background: var(--primary);
  border-radius: 24px;
  padding: 32px 48px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  position: relative;
  min-width: 280px;
}
.time-display {
  font-size: clamp(36px, 8vw, 72px);
  font-weight: 700;
  color: var(--accent);
  font-variant-numeric: tabular-nums;
  letter-spacing: 2px;
}
.date-display {
  font-size: 16px;
  color: var(--accent);
  opacity: 0.8;
  margin-top: 8px;
}
.clock-icon {
  position: absolute;
  bottom: 12px;
  right: 16px;
  font-size: 20px;
  opacity: 0.6;
}
</style>