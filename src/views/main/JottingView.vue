<template>
    <div class="jotting-container">
        <!-- 随笔列表 -->
        <div class="jotting-list">
            <div v-for="jotting in jottings" :key="jotting.id" class="jotting-item">
                <div class="jotting-header">
                    <div class="user-info">
                        <el-avatar :size="40" :src="jotting.avatar" />
                        <div class="info-detail">
                            <span class="nickname">{{ jotting.nickname }}</span>
                            <span class="time">{{ jotting.time }}</span>
                        </div>
                    </div>
                    <div class="weather-info" v-if="jotting.weather">
                        <Icon :name="getWeatherIcon(jotting.weather)" :size="16" />
                        <span>{{ jotting.weather }}</span>
                    </div>
                </div>
                <div class="jotting-content">
                    <p class="text-content">{{ jotting.content }}</p>
                    <div v-if="jotting.images?.length" class="image-grid">
                        <el-image 
                            v-for="(img, index) in jotting.images" 
                            :key="index"
                            :src="img"
                            :preview-src-list="jotting.images"
                            fit="cover"
                            class="grid-image"
                        />
                    </div>
                </div>
                <div class="jotting-footer">
                    <div class="action-item" @click="handleLike(jotting)">
                        <Icon name="heart" :size="16" :class="{ 'liked': jotting.isLiked }" />
                        <span>{{ jotting.likes || 0 }}</span>
                    </div>
                    <div class="action-item" @click="handleComment(jotting)">
                        <Icon name="chat" :size="16" />
                        <span>{{ jotting.comments || 0 }}</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- 加载更多 -->
        <div class="load-more" v-if="hasMore">
            <el-button :loading="loading" @click="loadMore">加载更多</el-button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'
import Icon from '@/components/Icon.vue'

// 测试数据
const jottings = ref([
    {
        id: 1,
        nickname: '诗意生活',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        time: '2024-03-21 15:30',
        weather: '晴朗',
        content: '今天天气真好，阳光明媚。写了一天代码，感觉很充实。',
        images: [
            'https://example.com/image1.jpg',
            'https://example.com/image2.jpg'
        ],
        likes: 0,
        comments: 0,
        isLiked: false
    }
])

const loading = ref(false)
const hasMore = ref(true)

// 获取天气图标
const getWeatherIcon = (weather: string) => {
    const icons: Record<string, string> = {
        '晴朗': 'sun',
        '多云': 'cloud',
        '雨天': 'cloud-rain',
        '雪天': 'cloud-snow'
    }
    return icons[weather] || 'sun'
}

// 点赞
const handleLike = (jotting: any) => {
    jotting.isLiked = !jotting.isLiked
    jotting.likes += jotting.isLiked ? 1 : -1
    ElMessage.success(jotting.isLiked ? '点赞成功' : '取消点赞')
}

// 评论
const handleComment = (jotting: any) => {
    ElMessage.info('评论功能开发中...')
}

// 加载更多
const loadMore = () => {
    loading.value = true
    setTimeout(() => {
        loading.value = false
        hasMore.value = false
        ElMessage.info('没有更多内容了')
    }, 1000)
}
</script>

<style scoped>
.jotting-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.jotting-item {
    background: rgba(255, 255, 255, 0.9);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    transition: all 0.3s;
}

.jotting-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.jotting-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
}

.user-info {
    display: flex;
    align-items: center;
    gap: 12px;
}

.info-detail {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.nickname {
    font-weight: 500;
    color: #333;
}

.time {
    font-size: 12px;
    color: #999;
}

.weather-info {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #666;
    font-size: 14px;
}

.text-content {
    color: #333;
    line-height: 1.8;
    margin-bottom: 15px;
    white-space: pre-wrap;
}

.image-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 8px;
    margin-bottom: 15px;
}

.grid-image {
    width: 100%;
    height: 150px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;
}

.jotting-footer {
    display: flex;
    gap: 20px;
    padding-top: 15px;
    border-top: 1px solid rgba(0, 0, 0, 0.05);
}

.action-item {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #666;
    cursor: pointer;
    transition: all 0.3s;
}

.action-item:hover {
    color: #409EFF;
}

.liked {
    color: #F56C6C;
}

.load-more {
    text-align: center;
    margin-top: 30px;
}

@media (max-width: 768px) {
    .jotting-container {
        padding: 10px;
    }

    .image-grid {
        grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    }

    .grid-image {
        height: 100px;
    }
}
</style> 