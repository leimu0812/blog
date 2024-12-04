<template>
    <div class="channel-container">
        <div class="channel-header">
            <h2 class="title">{{ channelInfo?.name || '频道' }}</h2>
            <p class="subtitle">{{ channelInfo?.description }}</p>
        </div>

        <!-- 文章列表 -->
        <div class="article-list">
            <el-card v-for="article in articles" :key="article.id" class="article-card" shadow="hover"
                @click="goToArticle(article.id)">
                <div class="article-content">
                    <div class="article-cover">
                        <el-image :src="article.coverImg" fit="cover" loading="lazy">
                            <template #error>
                                <div class="image-slot">
                                    <Icon name="image" :size="14" />
                                </div>
                            </template>
                        </el-image>
                    </div>
                    <div class="article-info">
                        <h3 class="article-title">{{ article.title }}</h3>
                        <p class="article-summary">{{ article.summary }}</p>
                        <div class="article-meta">
                            <span class="meta-item">
                                <Icon name="calendar3" :size="14" />
                                {{ article.date }}
                            </span>
                            <span class="meta-item">
                                <Icon name="eye" :size="14" />
                                {{ article.views }}
                            </span>
                        </div>
                    </div>
                </div>
            </el-card>

            <!-- 分页 -->
            <div class="pagination-section">
                <el-pagination background layout="prev, pager, next" :total="100" :page-size="10"
                    class="custom-pagination" />
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Icon from '@/components/Icon.vue'

const route = useRoute()
const router = useRouter()

// 频道信息
const channelInfo = ref({
    name: '生活随笔',
    description: '记录生活中的点点滴滴，分享生活的美好时刻'
})

// 文章列表
const articles = ref([
    {
        id: 1,
        title: '频道测试文章',
        summary: '这是一篇频道的测试文章...',
        coverImg: 'https://example.com/image.jpg',
        date: '2024-03-21',
        views: 100
    }
])

// 跳转到文章详情
const goToArticle = (id: number) => {
    router.push(`/article/${id}`)
}
</script>

<style scoped>
.channel-container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
}

.channel-header {
    text-align: center;
    margin-bottom: 40px;
}

.title {
    font-size: 28px;
    color: #333;
    margin-bottom: 10px;
}

.subtitle {
    color: #666;
    font-size: 16px;
}

.article-card {
    margin-bottom: 20px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    border: none;
    transition: transform 0.3s ease;
}

.article-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
}

.article-content {
    display: flex;
    gap: 20px;
}

.article-cover {
    flex: 0 0 200px;
    height: 150px;
    overflow: hidden;
    border-radius: 8px;
}

.article-cover .el-image {
    width: 100%;
    height: 100%;
    transition: transform 0.3s;
}

.article-info {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.article-title {
    font-size: 18px;
    color: #333;
    margin: 0 0 10px;
}

.article-summary {
    color: #666;
    font-size: 14px;
    line-height: 1.6;
    margin: 0 0 auto;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.article-meta {
    margin-top: 15px;
    display: flex;
    gap: 20px;
    color: #999;
    font-size: 13px;
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
}

.custom-pagination {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}

@media (max-width: 768px) {
    .article-content {
        flex-direction: column;
    }

    .article-cover {
        width: 100%;
        flex: none;
    }
}
</style>