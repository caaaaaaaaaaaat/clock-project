import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export type ClockMode = 'analog' | 'digital' | 'pendulum'

export interface ClockColor {
  name: string
  primary: string
  secondary: string
  accent: string
}

export const CLOCK_COLORS: ClockColor[] = [
  { name: '粉色马卡龙', primary: '#FFB6C1', secondary: '#FFC0CB', accent: '#FF69B4' },
  { name: '蓝色马卡龙', primary: '#87CEEB', secondary: '#ADD8E6', accent: '#4682B4' },
  { name: '绿色马卡龙', primary: '#98FB98', secondary: '#90EE90', accent: '#3CB371' },
  { name: '黄色马卡龙', primary: '#FFFACD', secondary: '#FFEAA7', accent: '#F4D03F' },
  { name: '紫色马卡龙', primary: '#DDA0DD', secondary: '#E6E6FA', accent: '#9370DB' },
]

export const useSettingsStore = defineStore('settings', () => {
  const mode = ref<ClockMode>('analog')
  const colorIndex = ref(0)

  const currentColor = computed(() => CLOCK_COLORS[colorIndex.value] as ClockColor)

  function setMode(newMode: ClockMode) {
    mode.value = newMode
  }

  function setColor(index: number) {
    colorIndex.value = index
  }

  return { mode, colorIndex, currentColor, setMode, setColor }
}, {
  persist: true,
})