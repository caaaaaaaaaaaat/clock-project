<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useTodoStore } from '@/stores/todo'
import { useHistoryStore } from '@/stores/history'

const todoStore = useTodoStore()
const historyStore = useHistoryStore()
const newText = ref('')

function addTodo() {
  if (!newText.value.trim()) return
  todoStore.add(newText.value.trim())
  historyStore.add('todo', `新增待办: ${newText.value.trim()}`)
  newText.value = ''
}

function toggleTodo(id: string) {
  const item = todoStore.items.find(i => i.id === id)
  if (item) {
    if (item.completed) {
      historyStore.add('todo', `取消完成: ${item.text}`)
    } else {
      historyStore.add('todo', `完成待办: ${item.text}`)
    }
    todoStore.toggle(id)
  }
}

function removeTodo(id: string) {
  const item = todoStore.items.find(i => i.id === id)
  if (item) {
    historyStore.add('todo', `删除待办: ${item.text}`)
  }
  todoStore.remove(id)
}

function clearCompleted() {
  todoStore.clearCompleted()
}
</script>

<template>
  <div class="todo-panel">
    <div class="todo-header">
      <Icon icon="ph:check-square" class="header-icon" />
      <span>专注待办</span>
    </div>
    <div class="todo-input-row">
      <input
        v-model="newText"
        placeholder="添加新待办..."
        class="todo-input"
        @keyup.enter="addTodo"
      />
      <button class="add-btn" @click="addTodo" :disabled="!newText.trim()">
        <Icon icon="ph:plus" />
      </button>
    </div>
    <div class="todo-list">
      <div
        v-for="item in todoStore.activeItems"
        :key="item.id"
        class="todo-item"
      >
        <button class="check-btn" @click="toggleTodo(item.id)">
          <Icon icon="ph:circle" />
        </button>
        <span class="todo-text">{{ item.text }}</span>
        <button class="delete-btn" @click="removeTodo(item.id)">
          <Icon icon="ph:x" />
        </button>
      </div>
      <div v-if="todoStore.activeItems.length === 0" class="empty-hint">
        <Icon icon="ph:smiley-meh" />
        <span>暂无待办</span>
      </div>
    </div>
    <div v-if="todoStore.completedItems.length > 0" class="completed-section">
      <div class="section-title">
        <span>已完成</span>
        <button class="clear-btn" @click="clearCompleted">清空</button>
      </div>
      <div
        v-for="item in todoStore.completedItems"
        :key="item.id"
        class="todo-item completed"
      >
        <button class="check-btn done" @click="toggleTodo(item.id)">
          <Icon icon="ph:check-circle-fill" />
        </button>
        <span class="todo-text">{{ item.text }}</span>
        <button class="delete-btn" @click="removeTodo(item.id)">
          <Icon icon="ph:x" />
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.todo-panel {
  min-width: 240px;
  max-width: 320px;
}
.todo-header {
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 600;
  color: #FF69B4;
  margin-bottom: 12px;
  padding-bottom: 8px;
  border-bottom: 1px solid #FFE4EC;
}
.header-icon {
  font-size: 20px;
}
.todo-input-row {
  display: flex;
  gap: 8px;
  margin-bottom: 12px;
}
.todo-input {
  flex: 1;
  padding: 8px 12px;
  border: 2px solid #FFE4EC;
  border-radius: 12px;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s;
}
.todo-input:focus {
  border-color: #FF69B4;
}
.add-btn {
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 50%;
  background: #FF69B4;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  transition: all 0.2s;
}
.add-btn:hover:not(:disabled) {
  background: #ff5fa0;
  transform: scale(1.05);
}
.add-btn:disabled {
  opacity: 0.5;
  cursor: default;
}
.todo-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
  max-height: 240px;
  overflow-y: auto;
}
.todo-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 8px;
  border-radius: 10px;
  background: #FFF5F8;
  transition: all 0.2s;
}
.todo-item:hover {
  background: #FFE4EC;
}
.check-btn {
  border: none;
  background: none;
  color: #FFB6C1;
  cursor: pointer;
  font-size: 20px;
  display: flex;
  padding: 0;
  transition: color 0.2s;
}
.check-btn:hover {
  color: #FF69B4;
}
.check-btn.done {
  color: #FF69B4;
}
.todo-text {
  flex: 1;
  font-size: 14px;
  color: #555;
  word-break: break-word;
}
.delete-btn {
  border: none;
  background: none;
  color: #FFB6C1;
  cursor: pointer;
  font-size: 16px;
  display: flex;
  opacity: 0;
  transition: all 0.2s;
}
.todo-item:hover .delete-btn {
  opacity: 1;
}
.delete-btn:hover {
  color: #FF69B4;
}
.empty-hint {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 24px 0;
  color: #FFB6C1;
  font-size: 14px;
}
.empty-hint .ph {
  font-size: 32px;
}
.completed-section {
  margin-top: 12px;
  padding-top: 12px;
  border-top: 1px solid #FFE4EC;
}
.section-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-size: 12px;
  color: #FFB6C1;
}
.clear-btn {
  border: none;
  background: none;
  color: #FFB6C1;
  cursor: pointer;
  font-size: 12px;
  transition: color 0.2s;
}
.clear-btn:hover {
  color: #FF69B4;
}
.completed .todo-text {
  text-decoration: line-through;
  color: #FFB6C1;
}
</style>