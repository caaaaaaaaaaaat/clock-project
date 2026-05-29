import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useStopwatchStore = defineStore('stopwatch', () => {
  const elapsed = ref(0)
  const isRunning = ref(false)

  let intervalId: ReturnType<typeof setInterval> | null = null

  const timeString = computed(() => {
    const totalSeconds = elapsed.value
    const h = Math.floor(totalSeconds / 3600)
    const m = Math.floor((totalSeconds % 3600) / 60)
    const s = totalSeconds % 60
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
  })

  function tick() {
    elapsed.value++
  }

  function start() {
    if (isRunning.value) return
    isRunning.value = true
    intervalId = setInterval(tick, 1000)
  }

  function pause() {
    isRunning.value = false
    if (intervalId) {
      clearInterval(intervalId)
      intervalId = null
    }
  }

  function reset() {
    pause()
    elapsed.value = 0
  }

  return { elapsed, isRunning, timeString, start, pause, reset }
})