# 番茄钟

基于 Vue 3 + TypeScript + Vite 的番茄钟项目，支持多种时钟模式、待办列表、专注计时器和使用记录。

## 技术栈

- Vue 3 + Composition API (`<script setup>`)
- TypeScript
- Vite
- Pinia + pinia-plugin-persistedstate（状态管理，数据持久化）
- Vue Router
- @iconify/vue（图标库）

## 功能特性

- **三种时钟模式**：标准时钟、电子钟、摆钟，可自由切换
- **5 种马卡龙配色**：粉色、蓝色、绿色、黄色、紫色
- **可折叠面板**：所有功能收缩为图标，点击展开/收起（互斥展开）
- **待办列表**：本地存储持久化，支持添加、完成、删除
- **专注计时器**：秒表功能，记录专注时长
- **使用记录**：本地存储持久化，记录所有操作历史
- **图标化 UI**：无文字菜单，采用可爱风格图标设计

## 开发命令

```sh
npm install          # 安装依赖
npm run dev         # 启动开发服务器
npm run build       # 类型检查并构建生产版本
npm run preview     # 预览生产构建
npm run type-check  # 运行 vue-tsc 类型检查
```

## 项目结构

```
src/
├── main.ts              # 应用入口
├── App.vue              # 根组件
├── stores/              # Pinia 状态管理
│   ├── settings.ts     # 时钟模式和配色
│   ├── timer.ts        # 基础计时器
│   ├── todo.ts         # 待办列表
│   ├── stopwatch.ts   # 专注计时器
│   └── history.ts      # 使用记录
├── components/
│   ├── clock/          # 三种时钟组件
│   ├── todo/          # 待办面板
│   ├── stopwatch/     # 计时器面板
│   ├── history/       # 历史记录面板
│   ├── settings/      # 设置面板
│   └── common/        # 通用组件
└── router/            # Vue Router 配置
```
