<template>
    <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="8">
            <el-card class="box-card-info" shadow="hover">
                <div class="box-card-info-content">
                    <div class="avatar-wrapper">
                        <el-avatar :size="120" :src="userInfo.avatarUrl" class="user-avatar" />
                    </div>
                    <div class="user-info">
                        <h3 class="user-name">{{ userInfo.nickname }}</h3>
                        <p class="user-motto">{{ userInfo.motto }}</p>
                        <div class="social-links">
                            <a v-for="(social, index) in socials" :key="index" :href="social.url" target="_blank"
                                class="social-item" :title="social.title">
                                <Icon :name="social.icon" :size="16" />
                            </a>
                        </div>
                    </div>
                    <el-divider>
                        <Icon name="arrow-repeat" :size="16" />
                    </el-divider>
                    <div class="stats-container">
                        <div v-for="type in typeInfo" :key="type.name" class="stat-item">
                            <div class="stat-number">{{ type.value }}</div>
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
                        class="tag-item" 
                        effect="plain"
                        :style="getRandomTagStyle()"
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
            <el-input class="search-input" v-model="queryParams.title" placeholder="搜索文章..."
                @keyup.enter="handleSearch">
                <template #prefix>
                    <Icon name="search" :size="16" />
                </template>
            </el-input>
            <div class="article-list">
                <el-card v-for="article in articles" :key="article.id" class="article-card" shadow="hover"
                    @click="goToArticle(article.id)">
                    <div class="article-content">
                        <div class="article-cover">
                            <el-image :src="article.coverImgUrl" fit="cover" loading="lazy">
                                <template #error>
                                    <div class="image-slot">
                                        <Icon name="image" :size="20" />
                                    </div>
                                </template>
                            </el-image>
                        </div>
                        <div class="article-info">
                            <div class="article-header">
                                <h3 class="article-title">{{ article.title }}</h3>
                                <el-tag v-if="article.isTop === 1" size="small" effect="dark" type="danger"
                                    class="top-tag">
                                    <el-icon>
                                        <Top />
                                    </el-icon>
                                    置顶
                                </el-tag>
                            </div>
                            <p class="article-summary">{{ article.summary }}</p>
                            <div class="article-meta">
                                <el-tag size="small" effect="plain" class="category-tag">
                                    <Icon name="folder" :size="14" class="meta-icon" />
                                    {{ article.category }}
                                </el-tag>
                                <span class="meta-item">
                                    <Icon name="calendar3" :size="14" class="meta-icon" />
                                    {{ article.publishTime }}
                                </span>
                                <span class="meta-item">
                                    <Icon name="eye" :size="14" class="meta-icon" />
                                    {{ article.views }}
                                </span>
                            </div>
                        </div>
                    </div>
                </el-card>
            </div>
            <div class="custom-pagination">
                <el-pagination 
                    v-model:current-page="queryParams.pageNum" 
                    :total="total"
                    :page-size="queryParams.pageSize" 
                    layout="prev, pager, next" 
                    background
                    @current-change="handlePageChange" 
                    class="pagination-inner" 
                />
            </div>
        </el-col>
    </el-row>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '@/components/Icon.vue'
import { getInfo, getSocialLink, getTags, getSiteStats, getArticleList } from '@/api/HomeView'
import type {
    SocialLink,
    HotArticle,
    Articles,
    Tag,
    UserInfo,
    TypeInfo,
    ArticleQueryParams
} from '@/types/home'
import { getRandomTagStyle } from '@/utils/tagColors'

const router = useRouter()

// 用户信息
const userInfo = ref<UserInfo>({
    nickname: '心如映月明',
    motto: 'The heart is like a mirror reflecting the moon.',
    avatarUrl: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
})
// 社交链接
const socials = ref<SocialLink[]>([])
// 标签数据
const tags = ref<Tag[]>([])
// 站点统计
const typeInfo = ref<TypeInfo[]>([])
// 数量
const total = ref(0);
// 分页相关参数
const queryParams = ref<ArticleQueryParams>({
    pageNum: 1,
    pageSize: 6,
    title: ''
});
// 文章列表
const articles = ref<Articles[]>([
    // {
    //     id: 1,
    //     title: '测试文章标题',
    //     summary: '这是一篇测试文章的摘要内容...',
    //     content: 'string',
    //     coverImg: 'string',
    //     coverImgUrl: 'string',
    //     category: '测试分类',
    //     views: 0,
    //     isTop: 1,
    //     status: 'string',
    //     publishTime: '2024-03-21',
    //     createdAt: 'string',
    //     updatedAt: 'string',
    //     tags: ['string']
    // }
])

// 热门文章
const hotArticles = ref<HotArticle[]>([
    {
        id: 1,
        title: '热门测试文章',
        views: 1000
    }
])



// 标签点击处理函数
const handleTagClick = (tagName: string) => {
    // 这可以添加标签点击的处理逻辑，比如跳转到标签相关文章列表页
    console.log('Tag clicked:', tagName)
}

// 跳转到文章详情
const goToArticle = (id: number | string) => {
    router.push(`/article/${id}`)
}

// 搜索文章
const handleSearch = async () => {
    queryParams.value.pageNum = 1; // 搜索时重置到第一页
    await getArticles();
};

// 修改页码
const handlePageChange = async (page: number) => {
    queryParams.value.pageNum = page;
    await getArticles();
};

// 获取文章列表
const getArticles = async () => {
    try {
        const res = await getArticleList(queryParams.value);
        console.log('接收响应:', res);
        if (res.code === 200) {
            articles.value = res.data.rows;
            total.value = res.data.total;
        }
    } catch (error) {
        console.error('获取文章列表失败:', error);
    }
};

// 获取站点统计信息
const getSiteStat = async () => {
    try {
        const res = await getSiteStats();
        if (res.code === 200 && res.data) {
            typeInfo.value = res.data;
        }
    } catch (error) {
        console.error('获取站点统计失败:', error);
    }
};

// 获取标签信息
const getTag = async () => {
    try {
        const res = await getTags();
        if (res.code === 200 && res.data) {
            tags.value = res.data;
        }
    } catch (error) {
        console.error('获取标签失败:', error);
    }
};

// 获取社交链接信息
const getSocialLinks = async () => {
    try {
        const res = await getSocialLink();
        if (res.code === 200 && res.data) {
            socials.value = res.data;
        }
    } catch (error) {
        console.error('获取社交链接失败:', error);
    }
};

// 获取个人信息
const getUserInfo = async () => {
    try {
        const res = await getInfo();
        if (res.code === 200 && res.data) {
            userInfo.value = res.data;
        }
    } catch (error) {
        console.error('获取用户信息失败:', error);
    }
};

onMounted(() => {
    getUserInfo()
    getSocialLinks()
    getTag()
    getSiteStat()
    getArticles()
})
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

.article-list {
    margin-bottom: 20px;
}

.article-card {
    margin-bottom: 16px;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.article-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
}

.article-content {
    display: flex;
    gap: 20px;
}

.article-cover {
    flex: 0 0 200px;
    height: 140px;
    border-radius: 6px;
    overflow: hidden;
}

.article-cover .el-image {
    width: 100%;
    height: 100%;
    transition: transform 0.3s;
}

.article-card:hover .article-cover .el-image {
    transform: scale(1.05);
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

.article-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 8px;
}

.article-title {
    flex: 1;
    font-size: 1.25rem;
    color: #303133;
    margin: 0;
    font-weight: 600;
    line-height: 1.4;
}

.article-summary {
    color: #606266;
    font-size: 0.95rem;
    line-height: 1.6;
    margin: 0 0 auto;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.article-meta {
    margin-top: 12px;
    display: flex;
    align-items: center;
    gap: 16px;
    color: #909399;
    font-size: 0.9rem;
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
}

.meta-icon {
    margin-right: 2px;
}

.category-tag {
    display: flex;
    align-items: center;
    padding: 0 8px;
    height: 24px;
}

.top-tag {
    display: flex;
    align-items: center;
    gap: 4px;
    padding: 0 8px;
    height: 22px;
    font-size: 12px;
}

@media (max-width: 768px) {
    .article-content {
        flex-direction: column;
        gap: 12px;
    }

    .article-cover {
        flex: none;
        width: 100%;
        height: 180px;
    }

    .article-title {
        font-size: 1.1rem;
    }

    .article-meta {
        flex-wrap: wrap;
        gap: 12px;
    }
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
    margin: 40px 0;
    display: flex;
    justify-content: center;
}

.pagination-inner {
    padding: 6px 12px;
    border-radius: 30px;
    background: rgba(255, 255, 255, 0.9);
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
    backdrop-filter: blur(8px);
}

:deep(.el-pagination.is-background) {
    --el-pagination-button-bg-color: transparent;
}

:deep(.el-pagination.is-background .el-pager li) {
    margin: 0 2px;
    min-width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    font-size: 14px;
    font-weight: 500;
    color: var(--el-text-color-regular);
    transition: all 0.3s ease;
    border: 1px solid transparent;
}

:deep(.el-pagination.is-background .el-pager li:not(.is-disabled):hover) {
    border-color: var(--el-color-primary);
    color: var(--el-color-primary);
    background-color: transparent;
}

:deep(.el-pagination.is-background .el-pager li.is-active) {
    background-color: var(--el-color-primary);
    color: white;
}

:deep(.el-pagination.is-background .btn-prev),
:deep(.el-pagination.is-background .btn-next) {
    min-width: 30px;
    height: 30px;
    line-height: 30px;
    border-radius: 15px;
    margin: 0 2px;
    color: var(--el-text-color-regular);
    background-color: transparent;
    border: 1px solid transparent;
}

:deep(.el-pagination.is-background .btn-prev:hover),
:deep(.el-pagination.is-background .btn-next:hover) {
    border-color: var(--el-color-primary);
    color: var(--el-color-primary);
}

@media (max-width: 768px) {
    .custom-pagination {
        margin: 30px 0;
    }
    
    .pagination-inner {
        padding: 4px 8px;
    }
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

/* 修改标签相关样式 */
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
    padding: 6px 12px;
    border-radius: 4px;
    font-size: 13px;
}

/* 修改标签类型的样式 */
.tag-item.el-tag--info {
    background-color: rgba(144, 147, 153, 0.1);
    border-color: rgba(144, 147, 153, 0.2);
    color: #909399;
}

.tag-item.el-tag--success {
    background-color: rgba(103, 194, 58, 0.1);
    border-color: rgba(103, 194, 58, 0.2);
    color: #67c23a;
}

.tag-item.el-tag--warning {
    background-color: rgba(230, 162, 60, 0.1);
    border-color: rgba(230, 162, 60, 0.2);
    color: #e6a23c;
}

.tag-item.el-tag--danger {
    background-color: rgba(245, 108, 108, 0.1);
    border-color: rgba(245, 108, 108, 0.2);
    color: #f56c6c;
}

.tag-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* 标签hover效果 */
.tag-item.el-tag--info:hover {
    background-color: #909399;
    color: white;
}

.tag-item.el-tag--success:hover {
    background-color: #67c23a;
    color: white;
}

.tag-item.el-tag--warning:hover {
    background-color: #e6a23c;
    color: white;
}

.tag-item.el-tag--danger:hover {
    background-color: #f56c6c;
    color: white;
}

/* 默认标签hover效果 */
.tag-item:not(.el-tag--info):not(.el-tag--success):not(.el-tag--warning):not(.el-tag--danger):hover {
    background-color: #409EFF;
    color: white;
    border-color: #409EFF;
}

@media (max-width: 768px) {
    .el-row {
        margin: 0 !important;
    }

    /* 调整卡距 */
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

/* 修复栅间距问题 */
:deep(.el-row--flex) {
    margin: 0 !important;
    width: 100%;
}

:deep(.el-col) {
    padding: 0 10px;
}
</style>
