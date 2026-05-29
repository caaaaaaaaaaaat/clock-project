import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface HistoryRecord {
  id: string
  type: 'todo' | 'stopwatch' | 'focus'
  description: string
  duration?: number
  completedAt: number
}

export const useHistoryStore = defineStore('history', () => {
  const records = ref<HistoryRecord[]>([])

  const recentRecords = computed(() =>
    [...records.value].sort((a, b) => b.completedAt - a.completedAt).slice(0, 20)
  )

  function add(type: HistoryRecord['type'], description: string, duration?: number) {
    records.value.push({
      id: Date.now().toString(),
      type,
      description,
      duration,
      completedAt: Date.now(),
    })
  }

  function clear() {
    records.value = []
  }

  return { records, recentRecords, add, clear }
}, {
  persist: true,
})