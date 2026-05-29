import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export interface TodoItem {
  id: string
  text: string
  completed: boolean
  createdAt: number
}

export const useTodoStore = defineStore('todo', () => {
  const items = ref<TodoItem[]>([])

  const activeItems = computed(() => items.value.filter(i => !i.completed))
  const completedItems = computed(() => items.value.filter(i => i.completed))

  function add(text: string) {
    items.value.push({
      id: Date.now().toString(),
      text,
      completed: false,
      createdAt: Date.now(),
    })
  }

  function toggle(id: string) {
    const item = items.value.find(i => i.id === id)
    if (item) item.completed = !item.completed
  }

  function remove(id: string) {
    items.value = items.value.filter(i => i.id !== id)
  }

  function clearCompleted() {
    items.value = items.value.filter(i => !i.completed)
  }

  return { items, activeItems, completedItems, add, toggle, remove, clearCompleted }
}, {
  persist: true,
})