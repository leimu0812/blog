<template>
    <div class="header-container" :class="{ 'header-hidden': isHeaderHidden, 'header-scrolled': isScrolled }">
        <!-- 移动端汉堡菜单按钮 -->
        <div class="mobile-menu-btn" @click="toggleMobileMenu" v-show="isMobile">
            <Icon :name="mobileMenuVisible ? 'x-lg' : 'list'" :size="15" />
        </div>

        <!-- PC端菜单 -->
        <el-menu 
            :default-active="activeIndex" 
            class="el-menu-demo" 
            mode="horizontal" 
            :ellipsis="false" 
            router
            v-show="!isMobile">
            <el-menu-item v-for="item in menuItems" :key="item.index" :index="item.path" :route="item.path">
                <Icon :name="item.icon" :size="18" />
                <span>{{ item.title }}</span>
            </el-menu-item>
        </el-menu>

        <!-- 移动端菜单 -->
        <div class="mobile-menu" v-show="isMobile && mobileMenuVisible">
            <div v-for="item in menuItems" 
                :key="item.index" 
                class="mobile-menu-item"
                :class="{ 'active': activeIndex === item.path }"
                @click="handleMobileMenuClick(item)">
                <Icon :name="item.icon" :size="20" />
                <span>{{ item.title }}</span>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Icon from '@/components/Icon.vue'

const route = useRoute()
const router = useRouter()
const activeIndex = ref('')
const isHeaderHidden = ref(false)
const isScrolled = ref(false)
const isMobile = ref(false)
const mobileMenuVisible = ref(false)
let lastScrollTop = 0

// 检查是否为移动端
const checkMobile = () => {
    isMobile.value = window.innerWidth <= 768
}

// 处理移动端菜单点击
const handleMobileMenuClick = (item: any) => {
    router.push(item.path)
    mobileMenuVisible.value = false
}

// 切换移动端菜单
const toggleMobileMenu = () => {
    mobileMenuVisible.value = !mobileMenuVisible.value
}

// 监听滚动事件
const handleScroll = () => {
    const currentScrollTop = window.scrollY
    isScrolled.value = currentScrollTop > 0
    
    if (currentScrollTop > 100) {
        isHeaderHidden.value = currentScrollTop > lastScrollTop
    } else {
        isHeaderHidden.value = false
    }
    
    lastScrollTop = currentScrollTop
}

// 菜单项配置
const menuItems = ref([
    { index: '1', title: '首页', path: '/home', icon: 'house-fill' },
    { index: '2', title: '归档', path: '/show', icon: 'grid' },
    { index: '3', title: '随笔', path: '/jotting', icon: 'journal-text' },
    { index: '4', title: '留言板', path: '/message', icon: 'chat-dots' },
    { index: '5', title: '友链', path: '/friend', icon: 'link-45deg' },
    { index: '6', title: '关于', path: '/about', icon: 'info-circle-fill' },
    { index: '7', title: '其他', path: '/other', icon: 'three-dots' }
])

watch(
    () => route.path,
    (newPath) => {
        activeIndex.value = newPath
    },
    { immediate: true }
)

onMounted(() => {
    activeIndex.value = route.path
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('resize', checkMobile)
    checkMobile()
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', checkMobile)
})
</script>

<style scoped>
.header-container {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
    transition: all 0.3s ease;
}

.el-menu-demo {
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    border-bottom: none;
    padding: 0 20px;
}

/* 滚动时的样式 */
.header-scrolled {
    background-color: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(10px);
}

.header-hidden {
    transform: translateY(-100%);
}

.el-menu-item {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #fff !important;
}

:deep(.el-menu-item.is-active) {
    background-color: rgba(255, 255, 255, 0.2) !important;
    border-bottom: none !important;
    color: #fff !important;
}

:deep(.el-menu-item:not(.is-disabled):hover) {
    background-color: rgba(255, 255, 255, 0.1) !important;
    color: #fff !important;
}

:deep(.el-menu--horizontal > .el-menu-item) {
    border-bottom: none !important;
}

/* 移动端样式 */
.mobile-menu-btn {
    position: fixed;
    top: 10px;
    right: 15px;
    color: #fff;
    z-index: 1001;
    cursor: pointer;
    width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.4);
    border-radius: 50%;
}

.mobile-menu {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.95);
    backdrop-filter: blur(10px);
    padding: 60px 20px 20px;
    animation: slideDown 0.3s ease;
}

.mobile-menu-item {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 15px;
    color: #fff;
    cursor: pointer;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.mobile-menu-item:active {
    background-color: rgba(255, 255, 255, 0.1);
}

.mobile-menu-item.active {
    background-color: rgba(255, 255, 255, 0.2);
}

@keyframes slideDown {
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .header-container {
        height: 60px;
    }
}
</style>