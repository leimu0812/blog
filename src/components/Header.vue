<template>
    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :ellipsis="false" router :class="{ 'header-hidden': isHeaderHidden, 'header-scrolled': isScrolled }">
        <el-menu-item v-for="item in menuItems" :key="item.index" :index="item.path" :route="item.path">
            <Icon :name="item.icon" :size="18" />
            <span>{{ item.title }}</span>
        </el-menu-item>
    </el-menu>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Icon from '@/components/Icon.vue'

const route = useRoute()
const activeIndex = ref('')
const isHeaderHidden = ref(false)
const isScrolled = ref(false)
let lastScrollTop = 0

// 监听滚动事件
const handleScroll = () => {
    const currentScrollTop = window.scrollY
    
    // 设置滚动状态
    isScrolled.value = currentScrollTop > 0
    
    // 当滚动超过 100px 时才开始判断
    if (currentScrollTop > 100) {
        // 向下滚动时隐藏
        if (currentScrollTop > lastScrollTop) {
            isHeaderHidden.value = true
        } 
        // 向上滚动时显示
        else {
            isHeaderHidden.value = false
        }
    } else {
        // 回到顶部附近时始终显示
        isHeaderHidden.value = false
    }
    
    lastScrollTop = currentScrollTop
}

// 菜单项配置
const menuItems = ref([
    { index: '1', title: '首页', path: '/home', icon: 'house-fill' },
    { index: '2', title: '频道', path: '/show', icon: 'grid' },
    { index: '3', title: '随笔', path: '/jotting', icon: 'journal-text' },
    { index: '4', title: '留言板', path: '/message', icon: 'chat-dots' },
    { index: '5', title: '友链', path: '/friend', icon: 'link-45deg' },
    { index: '6', title: '关于', path: '/about', icon: 'info-circle-fill' },
    { index: '7', title: '其他', path: '/other', icon: 'three-dots' }
])

// 监听路由变化
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
})

onUnmounted(() => {
    window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.el-menu-demo {
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.2);
    backdrop-filter: blur(10px);
    border-bottom: none;
    transition: all 0.3s ease;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1000;
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

/* 选中状态的样式 */
:deep(.el-menu-item.is-active) {
    background-color: rgba(255, 255, 255, 0.2) !important;
    border-bottom: none !important;
    color: #fff !important;
}

/* 鼠标悬浮状态的样式 */
:deep(.el-menu-item:not(.is-disabled):hover) {
    background-color: rgba(255, 255, 255, 0.1) !important;
    color: #fff !important;
}

/* 图标样式 */
.el-icon {
    font-size: 18px;
    color: #fff;
}

/* 移除默认的边框 */
:deep(.el-menu--horizontal > .el-menu-item) {
    border-bottom: none !important;
}

:deep(.el-menu--horizontal > .el-menu-item.is-active) {
    border-bottom: none !important;
}

/* 响应式调整 */
@media (max-width: 768px) {
    .el-menu-item {
        padding: 0 15px;
        font-size: 14px;
    }
    
    .el-icon {
        font-size: 16px;
    }
}
</style>