<template>
    <div class="other-container">
        <PageBanner 
            title="其他功能" 
            description="发现更多有趣的功能"
        />
        <el-row :gutter="20">
            <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
                <el-card class="timeline-card">
                    <template #header>
                        <div class="card-header">
                            <Icon name="clock-history" :size="18" />
                            <span>建站日志</span>
                        </div>
                    </template>
                    <el-timeline>
                        <el-timeline-item v-for="activity in activities" :key="activity.timestamp"
                            :timestamp="activity.timestamp" :type="activity.type" :color="activity.color">
                            <h4>{{ activity.title }}</h4>
                            <p>{{ activity.content }}</p>
                        </el-timeline-item>
                    </el-timeline>
                </el-card>

                <el-card class="chat-card">
                    <template #header>
                        <div class="card-header">
                            <Icon name="chat-dots" :size="18" />
                            <span>实时聊天室</span>
                            <el-tag size="small" type="success" effect="dark" class="status-tag">
                                开发中
                            </el-tag>
                        </div>
                    </template>
                    <div class="chat-preview">
                        <el-empty description="聊天室功能开发中..." />
                        <el-button type="primary" disabled>即将上线</el-button>
                    </div>
                </el-card>
            </el-col>

            <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
                <el-card class="stat-card">
                    <template #header>
                        <div class="card-header">
                            <Icon name="graph-up" :size="18" />
                            <span>网站统计</span>
                        </div>
                    </template>
                    <div class="stat-list">
                        <div class="stat-item">
                            <span class="label">文章数量</span>
                            <span class="value">{{ stats.articles }}</span>
                        </div>
                        <div class="stat-item">
                            <span class="label">总访问量</span>
                            <span class="value">{{ stats.visits }}</span>
                        </div>
                        <div class="stat-item">
                            <span class="label">运行天数</span>
                            <span class="value">{{ stats.days }}</span>
                        </div>
                    </div>
                </el-card>

                <el-card class="thoughts-card">
                    <template #header>
                        <div class="card-header">
                            <Icon name="lightbulb" :size="18" />
                            <span>我的想法</span>
                        </div>
                    </template>
                    <div class="thoughts-list">
                        <div v-for="thought in thoughts" :key="thought.id" class="thought-item">
                            <p class="thought-content">{{ thought.content }}</p>
                            <span class="thought-time">{{ thought.time }}</span>
                        </div>
                    </div>
                </el-card>

                <el-card class="tools-card">
                    <template #header>
                        <div class="card-header">
                            <Icon name="tools" :size="18" />
                            <span>实用工具</span>
                        </div>
                    </template>
                    <div class="tools-grid">
                        <div v-for="tool in tools" :key="tool.id" class="tool-item" @click="handleToolClick(tool)">
                            <Icon :name="tool.icon" :size="24" />
                            <span>{{ tool.name }}</span>
                            <el-tag v-if="tool.status" size="small" :type="tool.status.type" class="tool-status">
                                {{ tool.status.text }}
                            </el-tag>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from '@/components/Icon.vue'

// 建站日志数据
const activities = ref([
    {
        timestamp: '2024-03-21',
        title: '网站上线',
        content: '个人博客正式上线运行',
        type: 'success',
        color: '#0bbd87'
    }
])

// 网站统计数据
const stats = ref({
    articles: 1,
    visits: 100,
    days: 1
})

// 我的想法
const thoughts = ref([
    {
        id: 1,
        content: '准备开发一个实时聊天室功能...',
        time: '2024-03-21'
    }
])

// 工具列表
const tools = ref([
    {
        id: 1,
        name: '聊天室',
        icon: 'chat-dots',
        path: '/chat',
        status: { type: 'warning', text: '开发中' }
    },
    {
        id: 2,
        name: '小游戏',
        icon: 'controller',
        path: '/game',
        status: { type: 'info', text: '计划中' }
    },
    {
        id: 3,
        name: '系统',
        icon: 'kanban',
        path: '/system',
        status: { type: 'info', text: '开发中' }
    }
])

const handleToolClick = (tool: any) => {
    console.log('Tool clicked:', tool.name)
}
</script>

<style scoped>
.other-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.timeline-card,
.chat-card,
.stat-card,
.thoughts-card,
.tools-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    border: none;
    margin-bottom: 20px;
    transition: transform 0.3s ease;
}

.timeline-card:hover,
.chat-card:hover,
.stat-card:hover,
.thoughts-card:hover,
.tools-card:hover {
    transform: translateY(-5px);
}

.card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 16px;
    color: #333;
}

.status-tag {
    margin-left: auto;
}

.chat-preview {
    text-align: center;
    padding: 20px;
}

.stat-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.stat-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px;
    background: rgba(64, 158, 255, 0.1);
    border-radius: 8px;
    transition: transform 0.3s ease;
}

.stat-item:hover {
    transform: translateX(5px);
    background: rgba(64, 158, 255, 0.2);
}

.stat-item .label {
    color: #666;
}

.stat-item .value {
    font-size: 18px;
    font-weight: 600;
    color: #409EFF;
}

.thoughts-list {
    display: flex;
    flex-direction: column;
    gap: 15px;
}

.thought-item {
    padding: 10px;
    border-radius: 8px;
    background: rgba(64, 158, 255, 0.1);
    transition: all 0.3s ease;
}

.thought-item:hover {
    transform: translateX(5px);
    background: rgba(64, 158, 255, 0.2);
}

.thought-content {
    color: #666;
    margin: 0 0 8px 0;
}

.thought-time {
    font-size: 12px;
    color: #999;
}

.tools-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 15px;
}

.tool-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 8px;
    padding: 15px;
    background: rgba(64, 158, 255, 0.1);
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.tool-item:hover {
    background: rgba(64, 158, 255, 0.2);
    transform: translateY(-2px);
}

.tool-item .el-icon {
    font-size: 24px;
    color: #409EFF;
}

.tool-item span {
    font-size: 14px;
    color: #666;
}

.tool-status {
    position: absolute;
    top: 5px;
    right: 5px;
}

@media (max-width: 768px) {
    .other-container {
        padding: 10px;
    }

    .el-row {
        margin: 0 !important;
    }

    :deep(.el-col) {
        padding: 0 !important;
    }

    .timeline-card,
    .chat-card,
    .stat-card,
    .thoughts-card,
    .tools-card {
        margin-bottom: 15px;
        border-radius: 10px;
    }

    :deep(.el-card__header) {
        padding: 15px;
    }

    :deep(.el-card__body) {
        padding: 15px;
    }

    :deep(.el-timeline) {
        padding-left: 15px;
    }

    :deep(.el-timeline-item__content) {
        padding-left: 15px;
    }

    :deep(.el-timeline-item__node) {
        left: -2px;
    }

    .stat-item {
        padding: 8px;
        font-size: 14px;
    }

    .stat-item .value {
        font-size: 16px;
    }

    .thought-item {
        padding: 8px;
    }

    .thought-content {
        font-size: 14px;
    }

    .thought-time {
        font-size: 11px;
    }

    .tools-grid {
        grid-template-columns: repeat(2, 1fr);
        gap: 10px;
    }

    .tool-item {
        padding: 12px;
    }

    .tool-item span {
        font-size: 13px;
    }

    .tool-status {
        font-size: 10px;
        padding: 2px 4px;
    }
}

@media (max-width: 480px) {
    .other-container {
        padding: 8px;
    }

    .tools-grid {
        grid-template-columns: 1fr;
    }

    .card-header {
        font-size: 14px;
    }

    :deep(.el-timeline-item__content h4) {
        font-size: 14px;
        margin-bottom: 4px;
    }

    :deep(.el-timeline-item__content p) {
        font-size: 12px;
    }

    :deep(.el-timeline-item__timestamp) {
        font-size: 12px;
    }

    .stat-list {
        gap: 10px;
    }

    .stat-item {
        padding: 6px;
    }

    .stat-item .label {
        font-size: 13px;
    }

    .stat-item .value {
        font-size: 15px;
    }

    :deep(.el-empty__description) {
        font-size: 13px;
    }

    :deep(.el-button) {
        padding: 8px 15px;
        font-size: 13px;
    }
}

:deep(.el-row--flex) {
    margin: 0 !important;
    width: 100%;
}

:deep(.el-col) {
    padding: 0 10px;
}

@media (hover: none) {
    .timeline-card:hover,
    .chat-card:hover,
    .stat-card:hover,
    .thoughts-card:hover,
    .tools-card:hover {
        transform: none;
    }

    .stat-item:hover,
    .thought-item:hover,
    .tool-item:hover {
        transform: none;
    }
}
</style>