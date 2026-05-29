<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useSettingsStore } from '@/stores/settings'
import AnalogClock from '@/components/clock/AnalogClock.vue'
import DigitalClock from '@/components/clock/DigitalClock.vue'
import PendulumClock from '@/components/clock/PendulumClock.vue'
import CollapsiblePanel from '@/components/common/CollapsiblePanel.vue'
import TodoPanel from '@/components/todo/TodoPanel.vue'
import StopwatchPanel from '@/components/stopwatch/StopwatchPanel.vue'
import HistoryPanel from '@/components/history/HistoryPanel.vue'
import SettingsPanel from '@/components/settings/SettingsPanel.vue'

const settingsStore = useSettingsStore()

interface PanelConfig {
  stopwatch: boolean
  history: boolean
  settings: boolean
}

const panelConfig = ref<PanelConfig>({
  stopwatch: false,
  history: false,
  settings: false,
})

const todoVisible = ref(false)

function toggleTodo() {
  todoVisible.value = !todoVisible.value
}

function togglePanel(key: keyof PanelConfig) {
  const isOpening = !panelConfig.value[key]
  panelConfig.value = {
    stopwatch: false,
    history: false,
    settings: false,
  }
  if (isOpening) {
    panelConfig.value[key] = true
  }
}
</script>

<template>
  <div
    class="app-container"
    :style="{
      '--primary': settingsStore.currentColor.primary,
      '--secondary': settingsStore.currentColor.secondary,
      '--accent': settingsStore.currentColor.accent,
    }"
  >
    <!-- Decorative stickers -->
    <div class="sticker sticker-1"><Icon icon="ph:star-four" /></div>
    <div class="sticker sticker-2"><Icon icon="ph:heart" /></div>
    <div class="sticker sticker-3"><Icon icon="ph:flower" /></div>
    <div class="sticker sticker-4"><Icon icon="ph:sparkle" /></div>

    <!-- Todo fixed panel - left -->
    <div v-if="settingsStore.todoPosition === 'left' && todoVisible" class="todo-fixed left">
      <TodoPanel />
    </div>

    <!-- Todo fixed panel - right -->
    <div v-if="settingsStore.todoPosition === 'right' && todoVisible" class="todo-fixed right">
      <TodoPanel />
    </div>

    <!-- Clock area -->
    <div class="clock-area">
      <component
        :is="settingsStore.mode === 'analog' ? AnalogClock : settingsStore.mode === 'digital' ? DigitalClock : PendulumClock"
        :primary="settingsStore.currentColor.primary"
        :secondary="settingsStore.currentColor.secondary"
        :accent="settingsStore.currentColor.accent"
      />
    </div>

    <!-- Control panels -->
    <div class="control-area">
      <!-- Todo button (always in control-area) -->
      <div class="panel-wrapper">
        <CollapsiblePanel
          v-if="settingsStore.todoPosition === 'panel'"
          icon="ph:check-square"
          label="待办"
          :collapsed="!todoVisible"
          @toggle="toggleTodo"
        >
          <TodoPanel />
        </CollapsiblePanel>
        <button v-else class="icon-btn" @click="toggleTodo" title="待办">
          <Icon icon="ph:check-square" />
        </button>
      </div>

      <!-- Stopwatch -->
      <div class="panel-wrapper">
        <CollapsiblePanel
          icon="ph:timer"
          label="计时器"
          :collapsed="!panelConfig.stopwatch"
          @toggle="togglePanel('stopwatch')"
        >
          <StopwatchPanel />
        </CollapsiblePanel>
      </div>

      <!-- History -->
      <div class="panel-wrapper">
        <CollapsiblePanel
          icon="ph:clock-counter-clockwise"
          label="历史"
          :collapsed="!panelConfig.history"
          @toggle="togglePanel('history')"
        >
          <HistoryPanel />
        </CollapsiblePanel>
      </div>

      <!-- Settings -->
      <div class="panel-wrapper">
        <CollapsiblePanel
          icon="ph:gear-six"
          label="设置"
          :collapsed="!panelConfig.settings"
          @toggle="togglePanel('settings')"
        >
          <SettingsPanel />
        </CollapsiblePanel>
      </div>
    </div>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html, body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}

#app {
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
.app-container {
  width: 100%;
  height: 100vh;
  background: linear-gradient(135deg, #FFF5F8 0%, #FFF0F5 50%, #F5F0FF 100%);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  overflow: hidden;
  font-family: 'PingFang SC', 'Microsoft YaHei', sans-serif;
}

.sticker {
  position: absolute;
  font-size: 28px;
  color: var(--accent);
  opacity: 0.25;
  pointer-events: none;
  user-select: none;
}
.sticker-1 { top: 8%; left: 6%; transform: rotate(-15deg); }
.sticker-2 { top: 12%; right: 8%; transform: rotate(20deg); }
.sticker-3 { bottom: 15%; left: 5%; transform: rotate(10deg); }
.sticker-4 { bottom: 10%; right: 6%; transform: rotate(-20deg); }

.clock-area {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 20px;
}

.control-area {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  padding: 16px 24px 32px;
  max-width: 800px;
}

.panel-wrapper {
  position: relative;
}

.todo-fixed {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 50;
}
.todo-fixed.left { left: 16px; }
.todo-fixed.right { right: 16px; }

.todo-fixed :deep(.todo-panel) {
  background: white;
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.todo-fixed.left :deep(.todo-panel) {
  margin-left: 12px;
}

.todo-fixed.right :deep(.todo-panel) {
  margin-right: 12px;
}

.icon-btn {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  border: none;
  background: var(--panel-bg, #FFE4EC);
  color: var(--panel-color, #FF69B4);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
}
.icon-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}

@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>