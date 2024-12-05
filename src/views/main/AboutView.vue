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

        <!-- 群组信息卡片 -->
        <el-card class="common-card groups-card fade-in" style="animation-delay: 0.3s">
            <template #header>
                <div class="card-header">
                    <Icon name="people-fill" :size="18" />
                    <span>交流群组</span>
                </div>
            </template>
            <div class="groups-grid">
                <div v-for="(group, index) in groups" 
                     :key="index" 
                     class="group-item">
                    <div class="group-icon">
                        <Icon :name="group.icon" :size="24" />
                    </div>
                    <div class="group-info">
                        <div class="group-name">{{ group.name }}</div>
                        <div class="group-id">{{ group.id }}</div>
                        <div class="group-desc">{{ group.description }}</div>
                    </div>
                </div>
            </div>
        </el-card>

        <!-- 社交软件信息卡片 -->
        <el-card class="common-card social-card fade-in" style="animation-delay: 0.2s">
            <template #header>
                <div class="card-header">
                    <Icon name="people" :size="18" />
                    <span>社交联系</span>
                </div>
            </template>
            <div class="social-grid">
                <div v-for="(contact, index) in contacts" 
                     :key="index" 
                     class="contact-item">
                    <Icon :name="contact.icon" :size="24" />
                    <div class="contact-info">
                        <div class="contact-name">{{ contact.name }}</div>
                        <div class="contact-value">{{ contact.value }}</div>
                    </div>
                </div>
            </div>
        </el-card>

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
    name: '心如镜映月明',
    avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png',
    quote: 'The heart is like a mirror reflecting the moon .',
    socials: [
        { name: 'Gitee', icon: 'gitee', link: 'https://gitee.com/leimu0812' },
        { name: 'Github', icon: 'github', link: 'https://github.com/leimu0812' },
        { name: 'B站', icon: 'bilibili', link: 'https://space.bilibili.com/179362285' },
    ]
})

const experiences = ref([
    {
        time: '2018年6月',
        title: '111',
        content: '111',
        type: 'success',
        color: '#0bbd87'
    },
    {
        time: '2024年4月',
        title: '222',
        content: '222',
        type: 'success',
        color: '#0bbd87'
    }
])

const contacts = ref([
    { name: 'QQ', icon: 'tencent-qq', value: '123456789' },
    { name: '微信', icon: 'wechat', value: 'your_wechat_id' },
    { name: '邮箱', icon: 'envelope', value: 'example@email.com' },
    { name: 'B站', icon: 'bilibili', value: '心如镜映月明' },
])

const groups = ref([
    {
        name: 'QQ交流群',
        icon: 'tencent-qq',
        id: '123456789',
        description: '技术交流与分享'
    },
    {
        name: '微信交流群',
        icon: 'wechat',
        id: '请添加微信号 xxx',
        description: '日常交流与讨论'
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

.social-card {
    margin-bottom: 30px;
}

.social-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 20px;
    padding: 10px;
}

.contact-item {
    display: flex;
    align-items: center;
    gap: 15px;
    padding: 15px;
    border-radius: 8px;
    background: var(--primary-light);
    transition: all 0.3s ease;
}

.contact-item:hover {
    transform: translateY(-2px);
    box-shadow: var(--card-shadow);
}

.contact-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.contact-name {
    font-weight: 500;
    color: var(--text-primary);
}

.contact-value {
    color: var(--text-regular);
    font-size: 14px;
}

.groups-card {
    margin-bottom: 30px;
}

.groups-grid {
    display: grid;
    gap: 20px;
    padding: 10px;
}

.group-item {
    display: flex;
    gap: 20px;
    padding: 20px;
    border-radius: 8px;
    background: var(--primary-light);
    transition: all 0.3s ease;
}

.group-item:hover {
    transform: translateX(5px);
    box-shadow: var(--card-shadow);
}

.group-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 48px;
    height: 48px;
    border-radius: 12px;
    background: var(--primary-color);
    color: white;
}

.group-info {
    flex: 1;
}

.group-name {
    font-size: 16px;
    font-weight: 500;
    color: var(--text-primary);
    margin-bottom: 4px;
}

.group-id {
    font-size: 14px;
    color: var(--text-regular);
    margin-bottom: 8px;
}

.group-desc {
    font-size: 13px;
    color: var(--text-secondary);
}
</style>