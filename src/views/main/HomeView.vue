<template>
    <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-card class="box-card-info" shadow="hover">
                <div class="box-card-info-content">
                    <div class="avatar-wrapper">
                        <el-avatar :size="120" :src="info.user.circleUrl" class="user-avatar" />
                    </div>
                    <div class="user-info">
                        <h3 class="user-name">{{ info.user.name }}</h3>
                        <p class="user-motto">{{ info.user.motto }}</p>
                        <div class="social-links">
                            <a v-for="(social, index) in socials" :key="index" :href="social.link" target="_blank"
                                class="social-item" :title="social.title">
                                <Icon :name="social.icon" :size="16" />
                            </a>
                        </div>
                    </div>
                    <el-divider>
                        <Icon name="arrow-repeat" :size="16" />
                    </el-divider>
                    <div class="stats-container">
                        <div v-for="type in info.type" :key="type.name" class="stat-item">
                            <div class="stat-number">{{ type.number }}</div>
                            <div class="stat-name">{{ type.name }}</div>
                        </div>
                    </div>
                </div>
            </el-card>
            <el-card class="box-card-info-tags">
                <template #header>
                    <div class="tags-header">
                        <Icon name="tags" :size="16" />
                        <span>标签</span>
                    </div>
                </template>
                <div class="tags-content">
                    <el-tag
                        v-for="tag in tags"
                        :key="tag.name"
                        :type="tag.type"
                        class="tag-item"
                        effect="light"
                        @click="handleTagClick(tag.name)"
                    >
                        {{ tag.name }}({{ tag.count }})
                    </el-tag>
                </div>
            </el-card>
            <el-card class="box-card-info-tags hot-articles">
                <template #header>
                    <div class="tags-header">
                        <Icon name="star-fill" :size="16" />
                        <span>热门文章</span>
                    </div>
                </template>
                <div class="hot-articles-content">
                    <div v-for="(article, index) in hotArticles" :key="article.id" class="hot-article-item"
                        @click="goToArticle(article.id)">
                        <span class="article-index" :class="{ 'top-three': index < 3 }">{{ index + 1 }}</span>
                        <span class="article-title">{{ article.title }}</span>
                    </div>
                </div>
            </el-card>
        </el-col>

        <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="16">
            <el-input class="search-input" v-model="searchText" placeholder="搜索文章...">
                <template #prefix>
                    <Icon name="search" :size="16" />
                </template>
            </el-input>
            <div class="article-list">
                <el-card v-for="article in articles" :key="article.id" class="article-card" shadow="hover"
                    @click="goToArticle(article.id)">
                    <div class="article-content">
                        <div class="article-cover">
                            <el-image :src="article.coverImg" fit="cover" loading="lazy"
                                :preview-src-list="[article.coverImg]">
                                <template #error>
                                    <div class="image-slot">
                                        <Icon name="image" :size="14" />
                                    </div>
                                </template>
                            </el-image>
                        </div>
                        <div class="article-info">
                            <div class="article-header">
                                <h3 class="article-title">{{ article.title }}</h3>
                                <el-tag v-if="article.isTop" 
                                       size="small" 
                                       effect="dark" 
                                       type="danger"
                                       class="top-tag">
                                    <Icon name="top" :size="12" />
                                    置顶
                                </el-tag>
                            </div>
                            <p class="article-summary">{{ article.summary }}</p>
                            <div class="article-meta">
                                <el-tag size="small" effect="plain">{{ article.category }}</el-tag>
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
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '@/components/Icon.vue'

const router = useRouter()

// 用户信息
const info = ref({
    user: {
        name: '心如镜映月明',
        motto: 'The heart is like a mirror reflecting the moon.',
        circleUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
    },
    type: [
        { name: '文章', number: 25 },
        { name: '分类', number: 12 },
        { name: '标签', number: 36 }
    ]
})

// 社交链接
const socials = ref([
    { icon: 'github', link: 'https://github.com', title: 'Github' },
    { icon: 'envelope', link: 'mailto:example@example.com', title: '邮箱' },
    { icon: 'geo-alt', link: '#', title: '坐标：北京' },
    { icon: 'person', link: '', title: '关于我' }
])

// 搜索文本
const searchText = ref('')

// 热门文章
const hotArticles = ref([
    {
        id: 1,
        title: '热门测试文章',
        views: 1000
    }
])

// 文章列表
const articles = ref([
    {
        id: 1,
        title: '测试文章标题',
        category: '测试分类',
        date: '2024-03-21',
        views: 100,
        summary: '这是一篇测试文章的摘要内容...',
        coverImg: 'https://example.com/image.jpg',
        isTop: true
    },
    {
        id: 2,
        title: '测试文章标题',
        category: '测试分类',
        date: '2024-03-21',
        views: 100,
        summary: '这是一篇测试文章的摘要内容...',
        coverImg: 'https://example.com/image.jpg',
        isTop: false
    }
])

// 添加标签数据
const tags = ref([
    { name: 'Vue', count: 12, type: '' },
    { name: 'JavaScript', count: 8, type: 'success' },
    { name: 'TypeScript', count: 6, type: 'info' },
    { name: 'CSS', count: 5, type: 'warning' },
    { name: 'HTML', count: 4, type: 'danger' },
    { name: 'Node.js', count: 3, type: '' },
    { name: '前端', count: 10, type: 'success' },
    { name: '后端', count: 7, type: 'info' }
])

// 标签点击处理函数
const handleTagClick = (tagName: string) => {
    // 这里可以添加标签点击后的处理逻辑，比如跳转到标签相关文章列表页
    console.log('Tag clicked:', tagName)
}

// 跳转到文章详情
const goToArticle = (id: number) => {
    router.push(`/article/${id}`)
}
</script>

<style scoped>
.box-card-info {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    border: none;
    overflow: hidden;
    transition: transform 0.3s ease;
}

.box-card-info:hover {
    transform: translateY(-5px);
}

.box-card-info-content {
    padding: 20px;
    text-align: center;
}

.avatar-wrapper {
    margin-bottom: 20px;
    position: relative;
    display: inline-block;
}

.avatar-wrapper::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border: 2px solid #409EFF;
    border-radius: 50%;
    animation: borderRotate 8s linear infinite;
}

.user-avatar {
    border: 4px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
    transition: all 0.8s ease;
}

.box-card-info:hover .user-avatar {
    transform: rotate(360deg);
}

.user-info {
    margin-bottom: 20px;
}

.user-name {
    font-size: 1.5rem;
    color: #333;
    margin: 0 0 10px;
    font-weight: 600;
}

.user-motto {
    color: #666;
    font-size: 0.9rem;
    margin: 0;
    font-style: italic;
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 15px;
    margin-top: 15px;
}

.social-item {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: rgba(64, 158, 255, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    color: #409EFF;
    text-decoration: none;
    transition: all 0.3s ease;
}

.social-item:hover {
    background: #409EFF;
    color: white;
    transform: translateY(-3px);
}

.el-divider {
    margin: 25px 0;
}

.stats-container {
    display: flex;
    justify-content: space-around;
    padding: 10px 0;
}

.stat-item {
    padding: 10px 15px;
    border-radius: 8px;
    transition: all 0.3s ease;
    cursor: pointer;
}

.stat-item:hover {
    background: rgba(64, 158, 255, 0.1);
    transform: translateY(-2px);
}

.stat-number {
    font-size: 1.5rem;
    font-weight: 600;
    color: #409EFF;
    margin-bottom: 5px;
}

.stat-name {
    font-size: 0.9rem;
    color: #666;
}

@keyframes borderRotate {
    from {
        transform: rotate(0deg);
    }

    to {
        transform: rotate(360deg);
    }
}

.box-card-info-tags {
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    border: none;
    transition: transform 0.3s ease;
}

.box-card-info-tags:hover {
    transform: translateY(-5px);
}

.tags-header {
    display: flex;
    align-items: center;
    gap: 8px;
}

.hover-scale {
    transition: transform 0.3s;
    cursor: pointer;
}

.hover-scale:hover {
    transform: scale(1.1);
}

.search-input {
    margin-bottom: 20px;
}

.article-card {
    margin-bottom: 20px;
    border-radius: 15px;
    overflow: hidden;
    transition: transform 0.3s;
    border: none;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
}

.article-card:hover {
    transform: translateY(-5px);
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

.article-card:hover .article-cover .el-image {
    transform: scale(1.1);
}

.image-slot {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: #f5f7fa;
    color: #909399;
}

.article-info {
    flex: 1;
    display: flex;
    flex-direction: column;
}

.article-title {
    font-size: 1.4rem;
    color: #303133;
    margin: 0 0 10px 0;
    font-weight: 600;
}

.article-summary {
    color: #606266;
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0 0 auto 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    overflow: hidden;
}

.article-meta {
    margin-top: 15px;
    display: flex;
    align-items: center;
    gap: 15px;
    color: #909399;
    font-size: 0.9rem;
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
}

.meta-item .el-icon {
    font-size: 0.9rem;
}

.el-tag {
    background-color: rgba(64, 158, 255, 0.1);
    border-color: rgba(64, 158, 255, 0.2);
    color: #409EFF;
}

.el-row {
    max-width: 1200px;
    margin: 0 auto;
}

.box-card-info,
.box-card-info-tags,
.article-card {
    background: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.custom-pagination {
    margin-top: 40px;
    margin-bottom: 20px;
    display: flex;
    justify-content: center;
}

:deep(.el-pagination.is-background) {
    padding: 10px 20px;
    border-radius: 50px;
    background: rgba(255, 255, 255, 0.8);
    backdrop-filter: blur(10px);
    transition: all 0.3s ease;
}

:deep(.el-pagination.is-background:hover) {
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    background: rgba(255, 255, 255, 0.9);
}

:deep(.el-pagination.is-background .el-pager li) {
    margin: 0 5px;
    min-width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    font-size: 16px;
    font-weight: 500;
    transition: all 0.3s ease;
    background-color: transparent;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled):hover) {
    transform: translateY(-2px);
    background-color: rgba(64, 158, 255, 0.1);
    color: #409EFF;
}

:deep(.el-pagination.is-background .el-pager li.is-active) {
    background-color: #409EFF;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

:deep(.el-pagination.is-background .btn-prev),
:deep(.el-pagination.is-background .btn-next) {
    min-width: 40px;
    height: 40px;
    line-height: 40px;
    border-radius: 50%;
    margin: 0 5px;
    transition: all 0.3s ease;
    background-color: transparent;
}

:deep(.el-pagination.is-background .btn-prev:hover),
:deep(.el-pagination.is-background .btn-next:hover) {
    transform: translateY(-2px);
    background-color: rgba(64, 158, 255, 0.1);
    color: #409EFF;
}

.hot-articles {
    margin-top: 20px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
}

.hot-articles-content {
    padding: 0 10px;
}

.hot-article-item {
    display: flex;
    align-items: center;
    padding: 12px 8px;
    border-radius: 8px;
    cursor: pointer;
    transition: all 0.3s ease;
    position: relative;
}

.hot-article-item:hover {
    background-color: rgba(64, 158, 255, 0.1);
    transform: translateX(5px);
}

.article-index {
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    margin-right: 12px;
    font-size: 14px;
    color: #909399;
    font-weight: 500;
}

.article-index.top-three {
    background: linear-gradient(45deg, #409EFF, #36cfc9);
    color: white;
}

.article-info-wrapper {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    overflow: hidden;
}

.article-title {
    flex: 1;
    font-size: 14px;
    color: #606266;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: color 0.3s ease;
}

.top-tag {
    flex-shrink: 0;
    font-size: 12px;
    padding: 0 6px;
    height: 20px;
    line-height: 20px;
    border-radius: 4px;
    animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(-5px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.hot-article-item:hover .article-title {
    color: #409EFF;
}

/* 添加分隔线 */
.hot-article-item:not(:last-child) {
    border-bottom: 1px dashed rgba(0, 0, 0, 0.1);
}

.article-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
}

.article-title {
    flex: 1;
    font-size: 1.4rem;
    color: #303133;
    margin: 0;
    font-weight: 600;
}

.top-tag {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0 8px;
    height: 24px;
    font-size: 12px;
    border-radius: 4px;
    background-color: #f56c6c;
    color: white;
    animation: fadeInDown 0.3s ease-in-out;
}

.top-tag .el-icon {
    font-size: 12px;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-10px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

/* 添加标签相关样式 */
.tags-content {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    padding: 10px;
}

.tag-item {
    cursor: pointer;
    transition: all 0.3s ease;
    margin: 0;
}

.tag-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
    .el-row {
        margin: 0 !important;
    }

    /* 调整卡片间距 */
    .box-card-info,
    .box-card-info-tags,
    .article-card {
        margin: 10px 0;
    }

    /* 调整文章列表样式 */
    .article-content {
        flex-direction: column;
        gap: 15px;
    }

    .article-cover {
        flex: none;
        width: 100%;
        height: 200px;
    }

    /* 调整文章标题大小 */
    .article-title {
        font-size: 1.2rem;
    }

    /* 调整文章摘要 */
    .article-summary {
        font-size: 0.9rem;
    }

    /* 调整元信息布局 */
    .article-meta {
        flex-wrap: wrap;
        gap: 10px;
    }

    /* 调整用户信息部分 */
    .user-name {
        font-size: 1.3rem;
    }

    .user-motto {
        font-size: 0.85rem;
    }

    /* 调整统计数据显示 */
    .stat-number {
        font-size: 1.3rem;
    }

    .stat-name {
        font-size: 0.8rem;
    }

    /* 调整社交链接样式 */
    .social-item {
        width: 32px;
        height: 32px;
    }

    /* 调整搜索框样式 */
    .search-input {
        margin: 10px 0;
    }

    /* 调整标签云样式 */
    .tags-content {
        gap: 8px;
    }

    .tag-item {
        font-size: 12px;
        padding: 4px 8px;
    }

    /* 调整热门文章样式 */
    .hot-article-item {
        padding: 10px 5px;
    }

    .article-index {
        width: 20px;
        height: 20px;
        font-size: 12px;
        margin-right: 8px;
    }
}

@media (max-width: 480px) {
    /* 更小屏幕的特殊调整 */
    .user-avatar {
        width: 100px !important;
        height: 100px !important;
    }

    .article-title {
        font-size: 1.1rem;
    }

    .article-cover {
        height: 180px;
    }

    .social-links {
        gap: 10px;
    }

    .stats-container {
        flex-wrap: wrap;
        gap: 10px;
    }

    .stat-item {
        flex: 1;
        min-width: calc(33.33% - 10px);
    }

    /* 调整内边距 */
    .box-card-info-content,
    .article-card {
        padding: 15px 10px;
    }
}

/* 修复栅格间距问题 */
:deep(.el-row--flex) {
    margin: 0 !important;
    width: 100%;
}

:deep(.el-col) {
    padding: 0 10px;
}
</style>