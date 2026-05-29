<script setup lang="ts">
import { useSettingsStore, CLOCK_COLORS, type ClockMode } from '@/stores/settings'
import { Icon } from '@iconify/vue'

const settingsStore = useSettingsStore()

const modes: { value: ClockMode; icon: string }[] = [
  { value: 'analog', icon: 'ph:clock' },
  { value: 'digital', icon: 'ph:timer' },
  { value: 'pendulum', icon: 'ph:pendulum' },
]
</script>

<template>
  <div class="settings-panel">
    <div class="settings-section">
      <div class="section-label">
        <Icon icon="ph:swap" />
        <span>时钟模式</span>
      </div>
      <div class="mode-buttons">
        <button
          v-for="m in modes"
          :key="m.value"
          class="mode-btn"
          :class="{ active: settingsStore.mode === m.value }"
          @click="settingsStore.setMode(m.value)"
          :title="m.value"
        >
          <Icon :icon="m.icon" />
        </button>
      </div>
    </div>
    <div class="settings-section">
      <div class="section-label">
        <Icon icon="ph:paint-brush" />
        <span>配色方案</span>
      </div>
      <div class="color-swatches">
        <button
          v-for="(color, index) in CLOCK_COLORS"
          :key="index"
          class="swatch-btn"
          :class="{ active: settingsStore.colorIndex === index }"
          :style="{ background: color.primary }"
          @click="settingsStore.setColor(index)"
          :title="color.name"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
.settings-panel {
  min-width: 200px;
  display: flex;
  flex-direction: column;
  gap: 20px;
}
.settings-section {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.section-label {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 13px;
  font-weight: 600;
  color: #FF69B4;
}
.mode-buttons {
  display: flex;
  gap: 8px;
}
.mode-btn {
  width: 40px;
  height: 40px;
  border: 2px solid #FFE4EC;
  border-radius: 12px;
  background: white;
  color: #FFB6C1;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  transition: all 0.2s;
}
.mode-btn:hover {
  border-color: #FF69B4;
  color: #FF69B4;
}
.mode-btn.active {
  border-color: #FF69B4;
  background: #FF69B4;
  color: white;
}
.color-swatches {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.swatch-btn {
  width: 32px;
  height: 32px;
  border: 2px solid transparent;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.2s;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
}
.swatch-btn:hover {
  transform: scale(1.15);
}
.swatch-btn.active {
  border-color: #FF69B4;
  box-shadow: 0 0 0 3px rgba(255,105,180,0.3);
}
</style>