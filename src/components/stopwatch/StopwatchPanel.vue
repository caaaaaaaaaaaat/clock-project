<script setup lang="ts">
import { useStopwatchStore } from '@/stores/stopwatch'
import { useHistoryStore } from '@/stores/history'
import { Icon } from '@iconify/vue'

const stopwatchStore = useStopwatchStore()
const historyStore = useHistoryStore()

function handleStop() {
  if (stopwatchStore.elapsed > 0) {
    historyStore.add('stopwatch', `专注计时 ${stopwatchStore.timeString}`, stopwatchStore.elapsed)
  }
  stopwatchStore.reset()
}
</script>

<template>
  <div class="stopwatch-panel">
    <div class="stopwatch-header">
      <Icon icon="ph:timer" class="header-icon" />
      <span>专注计时</span>
    </div>
    <div class="time-display">{{ stopwatchStore.timeString }}</div>
    <div class="controls">
      <button
        v-if="!stopwatchStore.isRunning"
        class="ctrl-btn start"
        @click="stopwatchStore.start()"
      >
        <Icon icon="ph:play-fill" />
      </button>
      <button
        v-else
        class="ctrl-btn pause"
        @click="stopwatchStore.pause()"
      >
        <Icon icon="ph:pause-fill" />
      </button>
      <button
        class="ctrl-btn reset"
        @click="handleStop"
        :disabled="stopwatchStore.elapsed === 0 && !stopwatchStore.isRunning"
      >
        <Icon icon="ph:stop-fill" />
      </button>
    </div>
  </div>
</template>

<style scoped>
.stopwatch-panel {
  min-width: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 16px;
}
.stopwatch-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #FF69B4;
}
.header-icon {
  font-size: 20px;
}
.time-display {
  font-size: 36px;
  font-weight: 700;
  color: #FF69B4;
  font-variant-numeric: tabular-nums;
  letter-spacing: 2px;
}
.controls {
  display: flex;
  gap: 12px;
}
.ctrl-btn {
  width: 44px;
  height: 44px;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.2s;
}
.ctrl-btn.start {
  background: #FF69B4;
  color: white;
}
.ctrl-btn.pause {
  background: #FFB6C1;
  color: white;
}
.ctrl-btn.reset {
  background: #FFE4EC;
  color: #FF69B4;
}
.ctrl-btn:hover:not(:disabled) {
  transform: scale(1.1);
  box-shadow: 0 4px 12px rgba(255,105,180,0.3);
}
.ctrl-btn:active:not(:disabled) {
  transform: scale(0.95);
}
.ctrl-btn:disabled {
  opacity: 0.4;
  cursor: default;
}
</style>