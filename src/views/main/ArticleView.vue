<template>
    <div class="article-container">
        <!-- 文章标题区域 -->
        <div class="article-header fade-in">
            <h1 class="title">{{ article.title }}</h1>
            <div class="article-meta">
                <el-tag size="small" class="common-tag category-tag">
                    {{ article.category }}
                </el-tag>
                <span class="meta-item">
                    <Icon name="calendar3" :size="14" />
                    {{ article.date }}
                </span>
                <span class="meta-item">
                    <Icon name="eye" :size="14" />
                    {{ article.views }} 阅读
                </span>
                <span class="meta-item">
                    <Icon name="chat" :size="14" />
                    {{ article.comments }} 评论
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
                    <el-tag v-for="tag in article.tags" :key="tag" size="small" class="common-tag" effect="plain">
                        {{ tag }}
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
                    <span class="comment-count">{{ article.comments }} 条评论</span>
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
                <div v-for="comment in article.commentList" :key="comment.id" class="comment-item">
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
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import Icon from '@/components/Icon.vue'
import { ElMessage } from 'element-plus'
import MarkdownIt from 'markdown-it'
import { getArticleDetail } from '@/api/ArticleView'

// 获取文章详情
const getArticles = async () => {
    const res = await getArticleDetail(route.params.id as string)
    console.log(res);
}

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

const route = useRoute()
const commentContent = ref('')

// 测试数据
const article = ref({
    id: 1,
    title: '测试文章标题',
    content: `
# Markdown 测试文章

这是一篇用来测试 Markdown 渲染的文章。

## 基础语法

### 1. 文本样式

普通文本段落

**加粗文本** 和 *斜体文本*

~~删除线文本~~

### 2. 列表

无序列表：
- 项目一
- 项目二
- 项目三

有序列表：
1. 第一项
2. 第二项
3. 第三项

### 3. 引用

> 这是一段引用文本
> 可以有多行
>> 也可以嵌套引用

### 4. 代码

行内代码：\`console.log('Hello World')\`

代码块：
\`\`\`javascript
function greeting(name) {
    return \`Hello, \${name}!\`;
}

console.log(greeting('World'));
\`\`\`

### 5. 表格

| 表头1 | 表头2 | 表头3 |
|-------|-------|-------|
| 内容1 | 内容2 | 内容3 |
| 行2列1 | 行2列2 | 行2列3 |

### 6. 链接和图片

[链接文本](https://example.com)

![图片描述](https://example.com/image.jpg)

---

### 7. 任务列表

- [x] 已完成任务
- [ ] 未完成任务
- [ ] 待办事项
`,
    category: '测试分类',
    date: '2024-03-21',
    views: 100,
    comments: 1,
    tags: ['Markdown', '测试', '示例'],
    commentList: [
        {
            id: 1,
            username: '测试用户',
            avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
            content: '文章排版很清晰！',
            time: '2024-03-21 15:30',
            likes: 0
        }
    ]
})

// 渲染 Markdown 内容
const renderedContent = ref(md.render(article.value.content))

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

onMounted(() => {
    getArticles()
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