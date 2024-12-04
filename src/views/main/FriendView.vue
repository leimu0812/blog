<template>
    <div class="friend-container">
        <!-- 顶部说明 -->
        <PageBanner 
            title="友情链接" 
            description="链接可达，情谊可鉴"
        />

        <!-- 友链分类 -->
        <div class="friend-section" v-for="section in friendSections" :key="section.title">
            <div class="section-title">
                <el-icon>
                    <component :is="section.icon" />
                </el-icon>
                <span>{{ section.title }}</span>
                <small class="count">({{ section.links.length }})</small>
            </div>
            <el-row :gutter="20">
                <el-col v-for="friend in section.links" :key="friend.id" :xs="24" :sm="12" :md="8" :lg="6">
                    <div class="friend-card" @click="visitFriend(friend.link)">
                        <div class="card-content">
                            <el-avatar :size="60" :src="friend.avatar" class="friend-avatar" />
                            <div class="friend-info">
                                <h3 class="friend-name">{{ friend.name }}</h3>
                                <p class="friend-desc">{{ friend.description }}</p>
                            </div>
                            <div class="friend-tags">
                                <el-tag v-for="tag in friend.tags" :key="tag" size="small" :color="getRandomColor()"
                                    class="friend-tag">
                                    {{ tag }}
                                </el-tag>
                            </div>
                        </div>
                        <div class="card-footer">
                            <span class="update-time">{{ friend.updateTime }}</span>
                        </div>
                    </div>
                </el-col>
            </el-row>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

// 友链分类数据
const friendSections = ref([
    {
        title: '推荐博客',
        icon: 'Star',
        links: [
            {
                id: 1,
                name: '青山客',
                description: '山水之间，寄情于文',
                avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
                link: 'https://example1.com',
                tags: ['诗词', '摄影'],
                updateTime: '2024-03-21'
            }
        ]
    },
    {
        title: '技术大佬',
        icon: 'Monitor',
        links: [
            // {
            //     id: 2,
            //     name: '墨染空间',
            //     description: '记录技术，分享生活',
            //     avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            //     link: 'https://example2.com',
            //     tags: ['技术', '随笔'],
            //     updateTime: '2024-03-20'
            // }
        ]
    },
    {
        title: '生活博主',
        icon: 'Coffee',
        links: [
            // {
            //     id: 3,
            //     name: '光影随行',
            //     description: '捕捉美好，留住感动',
            //     avatar: 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png',
            //     link: 'https://example3.com',
            //     tags: ['摄影', '旅行'],
            //     updateTime: '2024-03-19'
            // }
        ]
    }
])

// 随机生成标签背景色
const getRandomColor = () => {
    const colors = [
        'rgba(64, 158, 255, 0.1)',
        'rgba(103, 194, 58, 0.1)',
        'rgba(230, 162, 60, 0.1)',
        'rgba(245, 108, 108, 0.1)',
        'rgba(144, 147, 153, 0.1)'
    ]
    return colors[Math.floor(Math.random() * colors.length)]
}

// 访问友链
const visitFriend = (link: string) => {
    window.open(link, '_blank')
}
</script>

<style scoped>
.friend-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.friend-header {
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
    margin-bottom: 20px;
}

.notice {
    max-width: 600px;
    margin: 0 auto;
}

.notice-alert {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
}

.notice-content {
    padding: 10px 0;
}

.notice-content p {
    margin: 5px 0;
    display: flex;
    align-items: center;
    gap: 8px;
}

.friend-section {
    margin-bottom: 40px;
}

.section-title {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 20px;
    color: #333;
    margin-bottom: 20px;
    padding-left: 10px;
    border-left: 4px solid #409EFF;
}

.count {
    font-size: 14px;
    color: #999;
}

.friend-card {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 12px;
    padding: 20px;
    margin-bottom: 20px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(0, 0, 0, 0.1);
}

.friend-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
    border-color: #409EFF;
}

.card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
}

.friend-avatar {
    margin-bottom: 15px;
    border: 2px solid rgba(64, 158, 255, 0.2);
    padding: 2px;
    transition: all 0.3s ease;
}

.friend-card:hover .friend-avatar {
    transform: rotate(360deg);
}

.friend-info {
    width: 100%;
    margin-bottom: 15px;
}

.friend-name {
    font-size: 18px;
    color: #333;
    margin: 0 0 8px 0;
}

.friend-desc {
    font-size: 14px;
    color: #666;
    margin: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    min-height: 40px;
}

.friend-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    justify-content: center;
    margin-bottom: 10px;
}

.friend-tag {
    border: none;
    padding: 2px 8px;
}

.card-footer {
    text-align: right;
    font-size: 12px;
    color: #999;
    border-top: 1px dashed rgba(0, 0, 0, 0.1);
    padding-top: 10px;
    margin-top: 10px;
}

@media (max-width: 768px) {
    .friend-container {
        padding: 10px;
    }

    .section-title {
        font-size: 18px;
    }
}
</style>