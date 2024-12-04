<template>
    <div class="about-container">
        <!-- 个人简介卡片 -->
        <el-card class="common-card profile-card fade-in">
            <div class="profile-header">
                <div class="avatar-wrapper">
                    <el-avatar :size="120" :src="profile.avatar" class="profile-avatar" />
                </div>
                <div class="profile-title">
                    <h1>{{ profile.name }}</h1>
                    <p class="profile-subtitle">{{ profile.title }}</p>
                    <div class="profile-tags">
                        <el-tag 
                            v-for="tag in profile.tags" 
                            :key="tag"
                            class="common-tag profile-tag">
                            {{ tag }}
                        </el-tag>
                    </div>
                </div>
            </div>
            <div class="profile-content">
                <p class="quote">{{ profile.quote }}</p>
                <div class="social-links">
                    <a v-for="social in profile.socials" 
                       :key="social.name"
                       :href="social.link"
                       target="_blank"
                       class="social-item"
                       :title="social.name">
                        <Icon :name="social.icon" :size="16" />
                        <span>{{ social.name }}</span>
                    </a>
                </div>
            </div>
        </el-card>

        <!-- 技能特长卡片 -->
        <el-row :gutter="20" class="fade-in" style="animation-delay: 0.2s">
            <el-col :xs="24" :sm="12">
                <el-card class="common-card skills-card">
                    <template #header>
                        <div class="card-header">
                            <Icon name="award" :size="18" />
                            <span>技能特长</span>
                        </div>
                    </template>
                    <div class="skills-content">
                        <div v-for="skill in skills" :key="skill.name" class="skill-item">
                            <div class="skill-info">
                                <span class="skill-name">{{ skill.name }}</span>
                                <span class="skill-level">{{ skill.level }}%</span>
                            </div>
                            <el-progress 
                                :percentage="skill.level"
                                :color="skill.color"
                                :stroke-width="15"
                                :show-text="false"
                            />
                        </div>
                    </div>
                </el-card>
            </el-col>

            <el-col :xs="24" :sm="12">
                <el-card class="common-card site-info-card">
                    <template #header>
                        <div class="card-header">
                            <Icon name="display" :size="18" />
                            <span>网站信息</span>
                        </div>
                    </template>
                    <div class="site-info-content">
                        <div v-for="info in siteInfo" :key="info.label" class="info-item">
                            <Icon :name="info.icon" :size="16" />
                            <span class="info-label">{{ info.label }}：</span>
                            <span class="info-value">{{ info.value }}</span>
                        </div>
                    </div>
                </el-card>
            </el-col>
        </el-row>

        <!-- 个人经历 -->
        <el-card class="common-card timeline-card fade-in" style="animation-delay: 0.4s">
            <template #header>
                <div class="card-header">
                    <Icon name="clock-history" :size="18" />
                    <span>个人经历</span>
                </div>
            </template>
            <el-timeline>
                <el-timeline-item
                    v-for="(experience, index) in experiences"
                    :key="index"
                    :timestamp="experience.time"
                    :type="experience.type"
                    :color="experience.color">
                    <h4>{{ experience.title }}</h4>
                    <p>{{ experience.content }}</p>
                </el-timeline-item>
            </el-timeline>
        </el-card>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Icon from '@/components/Icon.vue'

const profile = ref({
    name: '诗意生活',
    title: '热爱生活，追求美好',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    quote: '生活不止眼前的苟且，还有诗和远方的田野。',
    tags: ['00后', '程序员', '游戏玩家', '一个人'],
    socials: [
        { name: 'Github', icon: 'github', link: 'https://github.com' },
        { name: '博客', icon: 'globe', link: 'https://blog.example.com' },
        { name: '邮箱', icon: 'envelope', link: 'mailto:example@example.com' }
    ]
})

const skills = ref([
    { name: '文学创作', level: 90, color: '#409EFF' },
    { name: '摄影技术', level: 85, color: '#67C23A' },
    { name: '美食烹饪', level: 75, color: '#E6A23C' },
    { name: '生活美学', level: 95, color: '#F56C6C' }
])

const siteInfo = ref([
    { label: '建站时间', value: '2024年3月21日', icon: 'calendar3' },
    { label: '所在地区', value: '中国·北京', icon: 'geo-alt' },
    { label: '联系邮箱', value: 'example@example.com', icon: 'envelope' },
    { label: '备案信息', value: '京ICP备xxxxxxxx号', icon: 'shield-check' }
])

const experiences = ref([
    {
        time: '2018年6月',
        title: '接触编程',
        content: '开始学习编程',
        type: 'success',
        color: '#0bbd87'
    },
    {
        time: '2024年4月',
        title: '个人博客维护',
        content: '开始记录生活，分享感动',
        type: 'success',
        color: '#0bbd87'
    }
])
</script>

<style scoped>
.about-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
}

.profile-card {
    margin-bottom: 30px;
    text-align: center;
}

.profile-header {
    margin-bottom: 30px;
}

.avatar-wrapper {
    position: relative;
    display: inline-block;
    margin-bottom: 20px;
}

.avatar-wrapper::after {
    content: '';
    position: absolute;
    top: -3px;
    left: -3px;
    right: -3px;
    bottom: -3px;
    border: 2px solid var(--primary-color);
    border-radius: 50%;
    animation: borderRotate 8s linear infinite;
}

.profile-avatar {
    border: 4px solid rgba(255, 255, 255, 0.8);
    box-shadow: var(--card-shadow);
    transition: all 0.8s ease;
}

.profile-card:hover .profile-avatar {
    transform: rotate(360deg);
}

.profile-title h1 {
    font-size: 28px;
    color: var(--text-primary);
    margin: 0 0 10px;
}

.profile-subtitle {
    color: var(--text-regular);
    font-size: 16px;
    margin: 0 0 15px;
}

.profile-tags {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
}

.profile-tag {
    padding: 4px 12px;
}

.quote {
    font-style: italic;
    color: var(--text-regular);
    margin: 20px 0;
    font-size: 16px;
}

.social-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 20px;
}

.social-item {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 16px;
    border-radius: 20px;
    background: var(--primary-light);
    color: var(--primary-color);
    text-decoration: none;
    transition: all var(--transition-time) ease;
}

.social-item:hover {
    background: var(--primary-color);
    color: white;
    transform: translateY(-2px);
}

.card-header {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 18px;
    color: var(--text-primary);
}

.skills-content {
    display: grid;
    gap: 20px;
}

.skill-item {
    padding: 10px;
}

.skill-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 8px;
}

.skill-name {
    color: var(--text-primary);
    font-weight: 500;
}

.skill-level {
    color: var(--text-regular);
}

.site-info-content {
    display: grid;
    gap: 15px;
}

.info-item {
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px;
    border-radius: 8px;
    transition: background-color var(--transition-time) ease;
}

.info-item:hover {
    background: var(--primary-light);
}

.info-label {
    color: var(--text-regular);
    min-width: 80px;
}

.info-value {
    color: var(--text-primary);
}

.timeline-card {
    margin-top: 30px;
}

@keyframes borderRotate {
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
}

@media (max-width: 768px) {
    .about-container {
        padding: 10px;
    }

    .social-links {
        flex-wrap: wrap;
    }
}
</style>