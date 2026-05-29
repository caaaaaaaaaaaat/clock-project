import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useTimerStore = defineStore('timer', () => {
  const hours = ref(0)
  const minutes = ref(0)
  const seconds = ref(0)
  const isRunning = ref(false)

  let intervalId: ReturnType<typeof setInterval> | null = null

  const timeString = computed(() => {
    const h = hours.value.toString().padStart(2, '0')
    const m = minutes.value.toString().padStart(2, '0')
    const s = seconds.value.toString().padStart(2, '0')
    return `${h}:${m}:${s}`
  })

  function tick() {
    seconds.value++
    if (seconds.value >= 60) {
      seconds.value = 0
      minutes.value++
    }
    if (minutes.value >= 60) {
      minutes.value = 0
      hours.value++
    }
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
    hours.value = 0
    minutes.value = 0
    seconds.value = 0
  }

  return { hours, minutes, seconds, isRunning, timeString, start, pause, reset }
})