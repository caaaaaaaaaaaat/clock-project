<script setup lang="ts">
import { Icon } from '@iconify/vue'

const props = defineProps<{
  icon: string
  label: string
  collapsed: boolean
}>()

const emit = defineEmits<{
  toggle: []
}>()

function handleToggle() {
  emit('toggle')
}
</script>

<template>
  <div class="collapsible-panel" :class="{ collapsed: props.collapsed }">
    <button class="panel-toggle" @click="handleToggle" :title="label">
      <Icon :icon="icon" />
    </button>
    <div class="panel-content" v-show="!props.collapsed">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.collapsible-panel {
  position: relative;
}
.panel-toggle {
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
.panel-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 16px rgba(0,0,0,0.15);
}
.panel-toggle:active {
  transform: scale(0.95);
}
.panel-content {
  position: absolute;
  bottom: 52px;
  right: 0;
  background: white;
  border-radius: 20px;
  padding: 20px;
  min-width: 260px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.15);
  z-index: 100;
  animation: popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  transform-origin: bottom right;
  max-height: 70vh;
  overflow-y: auto;
}
@keyframes popIn {
  from {
    opacity: 0;
    transform: scale(0.8) translateY(8px);
  }
  to {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
.collapsed .panel-toggle {
  background: var(--panel-bg, #FFE4EC);
}
</style>