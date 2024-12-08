<template>
    <div class="article-container">
        <!-- 文章标题区域 -->
        <div class="article-header fade-in">
            <h1 class="title">{{ articles.title }}</h1>
            <div class="article-meta">
                <el-tag size="small" class="common-tag category-tag">
                    {{ articles.category }}
                </el-tag>
                <span class="meta-item">
                    <Icon name="calendar3" :size="14" />
                    {{ articles.publishTime }}
                </span>
                <span class="meta-item">
                    <Icon name="eye" :size="14" />
                    {{ articles.views }} 阅读
                </span>
                <span class="meta-item">
                    <Icon name="chat" :size="14" />
                    {{ 0 }} 评论
                </span>
            </div>
        </div>

        <!-- 文章内容区域 -->
        <el-card class="common-card article-content-card fade-in" style="animation-delay: 0.2s">
            <div class="article-content">
                <!-- 使用 v-html 渲染 markdown 内容 -->
                <div class="markdown-body" v-html="renderedContent"></div>
            </div>

            <!-- 文章标签 -->
            <div class="article-tags">
                <Icon name="tags" :size="14" />
                <div class="tags-list">
                    <el-tag v-for="tag in articles.tags" :key="tag.id" size="small" class="common-tag" effect="plain">
                        {{ tag.name }}
                    </el-tag>
                </div>
            </div>
        </el-card>

        <!-- 评论区 -->
        <el-card class="common-card comment-section fade-in" style="animation-delay: 0.4s">
            <template #header>
                <div class="section-header">
                    <Icon name="chat-square-text" :size="16" />
                    <span>评论区</span>
                    <span class="comment-count">{{ 0 }} 条评论</span>
                </div>
            </template>

            <!-- 评论输入框 -->
            <div class="comment-input">
                <el-input v-model="commentContent" type="textarea" :rows="3" placeholder="说点什么吧..." />
                <div class="comment-submit">
                    <el-button type="primary" @click="submitComment">
                        <Icon name="pencil-square" :size="14" />
                        发表评论
                    </el-button>
                </div>
            </div>

            <!-- 评论列表 -->
            <div class="comment-list">
                <div v-for="comment in commentList" :key="comment.id" class="comment-item">
                    <div class="comment-user">
                        <el-avatar :size="40" :src="comment.avatar" />
                        <div class="user-info">
                            <span class="username">{{ comment.username }}</span>
                            <span class="time">{{ comment.time }}</span>
                        </div>
                    </div>
                    <div class="comment-content">
                        {{ comment.content }}
                    </div>
                    <div class="comment-actions">
                        <div class="action-item" @click="handleLike(comment)">
                            <Icon name="star" :size="14" />
                            <span>{{ comment.likes || 0 }}</span>
                        </div>
                        <div class="action-item" @click="handleReply(comment)">
                            <Icon name="reply" :size="14" />
                            <span>回复</span>
                        </div>
                    </div>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import Icon from '@/components/Icon.vue'
import { ElMessage } from 'element-plus'
import MarkdownIt from 'markdown-it'
import { getArticleDetail } from '@/api/ArticleView'
import type { Articles } from "@/types/home";

// 文章数据
const articles = ref<Articles>({
    id: '',
    title: '',
    summary: '',
    content: '',
    coverImg: '',
    coverImgUrl: '',
    category: '',
    views: 0,
    isTop: 0,
    status: '',
    publishTime: '',
    createdAt: '',
    updatedAt: '',
    tags: []
});

// 渲染的内容
const renderedContent = ref('');

// 获取文章详情
const getArticle = async (id: string | number) => {
    try {
        const res = await getArticleDetail(id);
        if (res.code === 200) {
            articles.value = res.data;
            // 确保 content 存在再渲染
            if (articles.value.content) {
                renderedContent.value = md.render(articles.value.content);
            }
        }
    } catch (error) {
        console.error('获取文章详情失败:', error);
    }
};

// 在路由参数变化时获取文章
const route = useRoute();
watch(() => route.params.id, (newId) => {
    if (newId) {
        // 确保 newId 是单个值而不是数组
        const id = Array.isArray(newId) ? newId[0] : newId;
        getArticle(id);
    }
}, { immediate: true });


// 评论内容
const commentContent = ref('')
// 评论列表
const commentList = ref([
    {
        id: 1,
        username: '测试用户',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        content: '文章排版很清晰！',
        time: '2024-03-21 15:30',
        likes: 0
    }
])

// 提交评论
const submitComment = () => {
    if (!commentContent.value.trim()) {
        ElMessage.warning('请输入评论内容')
        return
    }
    ElMessage.success('评论成功')
    commentContent.value = ''
}

// 点赞评论
const handleLike = (comment: any) => {
    comment.likes++
    ElMessage.success('点赞成功')
}

// 回复评论
const handleReply = (comment: any) => {
    ElMessage.info('回复功能开发中...')
}

// 渲染 Markdown 内容
const md = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    breaks: true,
    highlight: function (str: string, lang: string): string {
        // 这里可以添加代码高亮功能
        return `<pre class="language-${lang}"><code>${str}</code></pre>`
    }
})
</script>

<style scoped>
.article-container {
    max-width: 900px;
    margin: 0 auto;
    padding: 20px;
}

.article-header {
    text-align: center;
    margin-bottom: 30px;
}

.title {
    font-size: 2rem;
    color: var(--text-primary);
    margin-bottom: 20px;
}

.article-meta {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    color: var(--text-regular);
}

.meta-item {
    display: flex;
    align-items: center;
    gap: 5px;
}

.category-tag {
    padding: 4px 12px;
}

.article-content-card {
    margin-bottom: 30px;
}

.article-content {
    color: var(--text-primary);
    line-height: 1.8;
}

.article-tags {
    margin-top: 30px;
    padding-top: 20px;
    border-top: 1px solid var(--primary-light);
    display: flex;
    align-items: center;
    gap: 15px;
}

.tags-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
}

.section-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    color: var(--text-primary);
}

.comment-count {
    margin-left: auto;
    font-size: 14px;
    color: var(--text-secondary);
}

.comment-input {
    margin-bottom: 30px;
}

.comment-submit {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
}

.comment-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
}

.comment-item {
    padding: 15px;
    border-radius: 8px;
    background: var(--primary-light);
    transition: all var(--transition-time) ease;
}

.comment-item:hover {
    transform: translateX(5px);
    background: var(--primary-hover);
}

.comment-user {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 10px;
}

.user-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.username {
    font-weight: 500;
    color: var(--text-primary);
}

.time {
    font-size: 12px;
    color: var(--text-secondary);
}

.comment-content {
    color: var(--text-regular);
    line-height: 1.6;
    margin-bottom: 10px;
    padding: 0 10px;
}

.comment-actions {
    display: flex;
    gap: 20px;
    padding: 0 10px;
}

.action-item {
    display: flex;
    align-items: center;
    gap: 5px;
    color: var(--text-secondary);
    cursor: pointer;
    transition: all var(--transition-time) ease;
}

.action-item:hover {
    color: var(--primary-color);
}

/* Markdown 样式 */
:deep(.markdown-body) {
    font-size: 16px;
    line-height: 1.8;
    color: var(--text-primary);
}

:deep(.markdown-body h1),
:deep(.markdown-body h2),
:deep(.markdown-body h3),
:deep(.markdown-body h4),
:deep(.markdown-body h5),
:deep(.markdown-body h6) {
    margin-top: 24px;
    margin-bottom: 16px;
    font-weight: 600;
    line-height: 1.25;
}

:deep(.markdown-body h1) {
    font-size: 2em;
    padding-bottom: 0.3em;
    border-bottom: 1px solid #eaecef;
}

:deep(.markdown-body h2) {
    font-size: 1.5em;
    padding-bottom: 0.3em;
    border-bottom: 1px solid #eaecef;
}

:deep(.markdown-body p) {
    margin-bottom: 16px;
}

:deep(.markdown-body code) {
    padding: 0.2em 0.4em;
    background-color: var(--primary-light);
    border-radius: 3px;
    font-family: monospace;
}

:deep(.markdown-body pre) {
    padding: 16px;
    overflow: auto;
    background-color: var(--primary-light);
    border-radius: 8px;
    margin-bottom: 16px;
}

:deep(.markdown-body pre code) {
    padding: 0;
    background-color: transparent;
}

:deep(.markdown-body blockquote) {
    padding: 0 1em;
    color: var(--text-regular);
    border-left: 0.25em solid var(--primary-color);
    margin: 0 0 16px 0;
}

:deep(.markdown-body img) {
    max-width: 100%;
    border-radius: 8px;
    margin: 16px 0;
}

:deep(.markdown-body table) {
    border-collapse: collapse;
    width: 100%;
    margin-bottom: 16px;
}

:deep(.markdown-body table th),
:deep(.markdown-body table td) {
    padding: 6px 13px;
    border: 1px solid #dfe2e5;
}

:deep(.markdown-body table tr:nth-child(2n)) {
    background-color: var(--primary-light);
}

:deep(.markdown-body hr) {
    height: 0.25em;
    padding: 0;
    margin: 24px 0;
    background-color: #e1e4e8;
    border: 0;
}

:deep(.markdown-body ul),
:deep(.markdown-body ol) {
    padding-left: 2em;
    margin-bottom: 16px;
}

:deep(.markdown-body li) {
    margin: 0.25em 0;
}

@media (max-width: 768px) {
    .article-container {
        padding: 15px;
    }

    .title {
        font-size: 1.5rem;
    }

    .article-meta {
        flex-wrap: wrap;
    }
}
</style>