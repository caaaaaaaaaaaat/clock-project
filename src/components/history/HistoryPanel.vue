<script setup lang="ts">
import { useHistoryStore, type HistoryRecord } from '@/stores/history'
import { Icon } from '@iconify/vue'

const historyStore = useHistoryStore()

function formatTime(timestamp: number) {
  return new Date(timestamp).toLocaleString('zh-CN', {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

function formatDuration(seconds?: number) {
  if (!seconds) return ''
  const h = Math.floor(seconds / 3600)
  const m = Math.floor((seconds % 3600) / 60)
  const s = seconds % 60
  if (h > 0) return `${h}时${m}分`
  if (m > 0) return `${m}分${s}秒`
  return `${s}秒`
}

function getIcon(type: HistoryRecord['type']) {
  switch (type) {
    case 'todo': return 'ph:check-circle'
    case 'stopwatch': return 'ph:timer'
    case 'focus': return 'ph:target'
    default: return 'ph:clock'
  }
}

function getColor(type: HistoryRecord['type']) {
  switch (type) {
    case 'todo': return '#FF69B4'
    case 'stopwatch': return '#87CEEB'
    case 'focus': return '#98FB98'
    default: return '#DDA0DD'
  }
}
</script>

<template>
  <div class="history-panel">
    <div class="history-header">
      <Icon icon="ph:clock-counter-clockwise" class="header-icon" />
      <span>使用记录</span>
    </div>
    <div class="history-list">
      <div
        v-for="record in historyStore.recentRecords"
        :key="record.id"
        class="history-item"
      >
        <Icon :icon="getIcon(record.type)" :style="{ color: getColor(record.type) }" class="record-icon" />
        <div class="record-info">
          <span class="record-desc">{{ record.description }}</span>
          <span class="record-meta">
            {{ formatTime(record.completedAt) }}
            <span v-if="record.duration" class="record-duration">{{ formatDuration(record.duration) }}</span>
          </span>
        </div>
      </div>
      <div v-if="historyStore.recentRecords.length === 0" class="empty-hint">
        <Icon icon="ph:smiley-meh" />
        <span>暂无记录</span>
      </div>
    </div>
    <button
      v-if="historyStore.records.length > 0"
      class="clear-btn"
      @click="historyStore.clear()"
    >
      <Icon icon="ph:trash" />
      清空全部
    </button>
  </div>
</template>

<style scoped>
.history-panel {
  min-width: 240px;
  max-width: 320px;
}
.history-header {
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
.history-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
}
.history-item {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  padding: 8px;
  border-radius: 10px;
  background: #FFF5F8;
  transition: background 0.2s;
}
.history-item:hover {
  background: #FFE4EC;
}
.record-icon {
  font-size: 20px;
  margin-top: 2px;
}
.record-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.record-desc {
  font-size: 14px;
  color: #555;
  word-break: break-word;
}
.record-meta {
  font-size: 12px;
  color: #FFB6C1;
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}
.record-duration {
  background: #FFE4EC;
  padding: 1px 6px;
  border-radius: 6px;
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
.clear-btn {
  width: 100%;
  margin-top: 12px;
  padding: 8px;
  border: none;
  border-radius: 12px;
  background: #FFE4EC;
  color: #FF69B4;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 14px;
  transition: all 0.2s;
}
.clear-btn:hover {
  background: #FF69B4;
  color: white;
}
</style>