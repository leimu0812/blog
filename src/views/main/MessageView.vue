<template>
    <div class="message-container">
        <!-- 留言输入区域 -->
        <div class="message-input-section fade-in">
            <el-card class="common-card message-card">
                <div class="message-tips">
                    <el-alert title="留言提示" type="info" :closable="false" class="tips-alert">
                        <template #default>
                            <div class="tips-content">
                                <p>📝 畅所欲言，留下你的想法</p>
                                <p>🤝 文明用语，友善交流</p>
                                <p>✨ 欢迎在这里分享你的故事</p>
                            </div>
                        </template>
                    </el-alert>
                </div>

                <el-form :model="messageForm" ref="messageFormRef" class="message-form">
                    <div class="form-header">
                        <el-input v-model="messageForm.nickname" placeholder="昵称（必填）" class="input-item">
                            <template #prefix>
                                <Icon name="person" />
                            </template>
                        </el-input>
                        <el-input v-model="messageForm.email" placeholder="邮箱（选填，用于回复通知）" class="input-item">
                            <template #prefix>
                                <Icon name="envelope" />
                            </template>
                        </el-input>
                    </div>
                    <el-input v-model="messageForm.content" type="textarea" :rows="4" placeholder="说点什么吧..."
                        class="input-item message-textarea" resize="none" />
                    <div class="form-footer">
                        <div class="emoji-picker-wrapper">
                            <div class="emoji-picker" @click="showEmojiPicker = !showEmojiPicker">
                                <Icon name="emoji-smile" :size="20" />
                            </div>
                            <div v-if="showEmojiPicker" class="emoji-container">
                                <EmojiPicker @select="onSelectEmoji" :show-preview="true" :show-skin-tones="true" :native="true"
                                    :show-categories="true" />
                            </div>
                        </div>
                        <el-button type="primary" @click="submitMessage" class="submit-btn">
                            <Icon name="send" :size="16" />
                            发表留言
                        </el-button>
                    </div>
                </el-form>
            </el-card>
        </div>

        <!-- 留言列表 -->
        <div class="message-list fade-in">
            <div v-for="message in messages" :key="message.id" class="message-item">
                <div class="message-user">
                    <el-avatar :size="40" :src="message.avatar" />
                    <div class="user-info">
                        <div class="user-meta">
                            <span class="nickname">{{ message.nickname }}</span>
                            <span class="ip-addr">{{ message.ipLocation }}</span>
                        </div>
                        <span class="time">{{ message.time }}</span>
                    </div>
                </div>
                <div class="message-content">{{ message.content }}</div>
                <div class="message-actions">
                    <div class="action-item" @click="handleLike(message)">
                        <Icon name="heart" :size="14" />
                        <span>{{ message.likes || 0 }}</span>
                    </div>
                    <div class="action-item" @click="handleReply(message)">
                        <Icon name="reply" :size="14" />
                        <span>回复</span>
                    </div>
                </div>
                <!-- 回复列表 -->
                <div v-if="message.replies?.length" class="reply-list">
                    <div v-for="reply in message.replies" :key="reply.id" class="reply-item">
                        <div class="reply-user">
                            <el-avatar :size="30" :src="reply.avatar" />
                            <div class="reply-info">
                                <div class="user-meta">
                                    <span class="nickname">{{ reply.nickname }}</span>
                                    <span class="ip-addr">{{ reply.ipLocation }}</span>
                                </div>
                                <span class="time">{{ reply.time }}</span>
                            </div>
                        </div>
                        <div class="reply-content">{{ reply.content }}</div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 分页 -->
        <div class="pagination-section">
            <el-pagination background layout="prev, pager, next" :total="100" :page-size="10"
                class="custom-pagination" />
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import Icon from '@/components/Icon.vue'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
// emoji 相关
const showEmojiPicker = ref(false)
const messageFormRef = ref()

// 选择表情回调
const onSelectEmoji = (emoji: any) => {
    messageForm.value.content += emoji.i
    showEmojiPicker.value = false
}

// 点击外部关闭表情选择器
const handleClickOutside = (event: MouseEvent) => {
    const target = event.target as HTMLElement
    if (!target.closest('.emoji-picker') && !target.closest('.emoji-container')) {
        showEmojiPicker.value = false
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onUnmounted(() => {
    document.removeEventListener('click', handleClickOutside)
})

// 表单数据
const messageForm = ref({
    nickname: '',
    email: '',
    content: ''
})

// 测试数据
const messages = ref([
    {
        id: 1,
        nickname: '测试用户',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        content: '这是一条测试留言',
        time: '2024-03-21 15:30',
        likes: 12,
        ipLocation: '北京',
        replies: [
            {
                id: 101,
                nickname: '博主',
                avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
                content: '感谢留言！',
                time: '2024-03-21 15:35',
                ipLocation: '上海'
            }
        ]
    },
    {
        id: 2,
        nickname: '路过的访客',
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        content: '博客做得很漂亮！',
        time: '2024-03-21 16:00',
        likes: 8,
        ipLocation: '广州',
        replies: []
    }
])

// 提交留言
const submitMessage = () => {
    if (!messageForm.value.nickname || !messageForm.value.content) {
        ElMessage.warning('请填写昵称和留言内容')
        return
    }

    // 模拟添加留言
    messages.value.unshift({
        id: Date.now(),
        nickname: messageForm.value.nickname,
        avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
        content: messageForm.value.content,
        time: new Date().toLocaleString(),
        likes: 0,
        ipLocation: '未知',
        replies: []
    })

    // 清空表单
    messageForm.value.nickname = ''
    messageForm.value.email = ''
    messageForm.value.content = ''

    ElMessage.success('留言成功')
}

// 点赞
const handleLike = (message: any) => {
    message.likes++
    ElMessage.success('点赞成功')
}

// 回复
const handleReply = (message: any) => {
    ElMessage.info('回复功能开发中...')
}
</script>

<style scoped>
.message-container {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
}

.message-tips {
    margin-bottom: 20px;
}

.tips-alert {
    background: rgba(64, 158, 255, 0.1);
    border: none;
}

.tips-content p {
    margin: 5px 0;
    color: #666;
}

.message-form {
    background: rgba(255, 255, 255, 0.8);
    padding: 20px;
    border-radius: 8px;
}

.form-header {
    display: flex;
    gap: 20px;
    margin-bottom: 20px;
}

.input-item {
    margin-bottom: 15px;
}

.message-textarea {
    background: rgba(255, 255, 255, 0.8);
}

.form-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.emoji-picker-wrapper {
    position: relative;
}

.emoji-picker {
    cursor: pointer;
    padding: 8px;
    border-radius: 4px;
    transition: all 0.3s;
}

.emoji-picker:hover {
    background: rgba(64, 158, 255, 0.1);
}

.submit-btn {
    display: flex;
    align-items: center;
    gap: 5px;
}

.message-item {
    background: rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    padding: 20px;
    margin-bottom: 20px;
    transition: all 0.3s;
}

.message-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.message-user {
    display: flex;
    gap: 12px;
    margin-bottom: 15px;
}

.user-info {
    flex: 1;
}

.user-meta {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
}

.nickname {
    font-weight: 500;
    color: #333;
}

.ip-addr {
    font-size: 12px;
    color: #999;
    background: rgba(0, 0, 0, 0.05);
    padding: 2px 6px;
    border-radius: 4px;
}

.time {
    font-size: 12px;
    color: #999;
}

.message-content {
    color: #666;
    line-height: 1.6;
    margin-bottom: 15px;
    padding: 0 10px;
}

/* ... 其他样式保持不变 ... */

/* 添加缺失的样式 */
.message-actions {
    display: flex;
    gap: 20px;
    padding: 0 10px;
    margin-bottom: 15px;
}

.action-item {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #999;
    cursor: pointer;
    transition: all 0.3s;
}

.action-item:hover {
    color: #409EFF;
}

.reply-list {
    background: rgba(64, 158, 255, 0.1);
    border-radius: 8px;
    padding: 15px;
    margin-top: 10px;
}

.reply-item {
    margin-bottom: 15px;
}

.reply-item:last-child {
    margin-bottom: 0;
}

.reply-user {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 8px;
}

.reply-content {
    color: #666;
    margin-left: 38px;
}

.custom-pagination {
    margin-top: 30px;
    display: flex;
    justify-content: center;
}

@media (max-width: 768px) {
    .message-container {
        padding: 10px;
    }

    .form-header {
        flex-direction: column;
        gap: 10px;
    }
}

.emoji-container {
    position: absolute;
    bottom: calc(100% + 10px);
    left: 0;
    z-index: 1000;
    background: white;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* 移动端适配 */
@media (max-width: 768px) {
    .emoji-container {
        position: fixed;
        left: 50%;
        bottom: 0;
        transform: translateX(-50%);
        width: 100%;
        border-radius: 8px 8px 0 0;
    }
}

/* 暗色主题适配 */
:deep(.dark) {
    .ep-emoji-picker {
        background: #1a1a1a;
        border-color: #333;
    }

    .ep-emojis::-webkit-scrollbar-track {
        background: #1a1a1a;
    }

    .ep-emojis::-webkit-scrollbar-thumb {
        background-color: #666;
    }
}
</style>