<template>
    <div class="common-layout">
        <el-container>
            <el-header>
                <Header />
            </el-header>
            <el-main class="main-container">
                <template v-if="showBanner">
                    <div class="banner-section" :class="{ 'half-screen': !isFullScreen }" :style="backgroundStyle">
                        <div class="mask-layer"></div>
                        <div class="banner-content">
                            <h1 class="banner-title">{{ bannerTitle }}</h1>
                            <p class="banner-desc">{{ bannerDesc }}</p>
                        </div>
                    </div>
                    <div class="content-section" :class="{ 'half-screen-content': !isFullScreen }">
                        <RouterView />
                    </div>
                </template>
                <template v-else>
                    <div class="content-section normal-content">
                        <RouterView />
                    </div>
                </template>
            </el-main>
            <el-footer>
                <Footer />
            </el-footer>
        </el-container>

        <el-backtop :right="40" :bottom="40" :visibility-height="200" class="custom-backtop">
            <Icon name="chevron-up" :size="20" />
        </el-backtop>
    </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'
import Icon from '@/components/Icon.vue'
import img1 from '@/assets/bg/EVA1.jpg'
import img2 from '@/assets/bg/EVA2.jpg'
import img3 from '@/assets/bg/EVA3.jpg'
import img4 from '@/assets/bg/EVA4.png'

const route = useRoute()
const isHeaderHidden = ref(false)
const isScrolled = ref(false)
let lastScrollTop = 0

const bannerContent = computed(() => {
    switch (route.path) {
        case '/home':
            return {
                title: '心如镜映月明',
                desc: 'The heart is like a mirror reflecting the moon'
            }
        case '/show':
            return {
                title: '归档',
                desc: '时光的足迹，思考的印记'
            }
        case '/about':
            return {
                title: '关于我',
                desc: '了解一个爱好编程、热爱生活的我'
            }
        case '/message':
            return {
                title: '留言板',
                desc: '欢迎在这里留下你的足迹~'
            }
        case '/jotting':
            return {
                title: '生活随笔',
                desc: '记录生活中的点点滴滴'
            }
        case '/friend':
            return {
                title: '友情链接',
                desc: '链接可达，情谊可鉴'
            }
        case '/other':
            return {
                title: '其他功能',
                desc: '发现更多有趣的功能'
            }
        default:
            return {
                title: '',
                desc: ''
            }
    }
})

const bannerTitle = computed(() => bannerContent.value.title)
const bannerDesc = computed(() => bannerContent.value.desc)

const backgrounds = [img1, img2, img3, img4]
const currentBgIndex = ref(0)
const backgroundStyle = ref({
    backgroundImage: `url(${backgrounds[0]})`,
    transition: 'background-image 1s ease-in-out'
})

const changeBg = () => {
    currentBgIndex.value = (currentBgIndex.value + 1) % backgrounds.length
    backgroundStyle.value.backgroundImage = `url(${backgrounds[currentBgIndex.value]})`
}

let intervalId: number

const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop
    if (scrollTop > lastScrollTop) {
        isScrolled.value = true
        isHeaderHidden.value = true
    } else {
        isScrolled.value = false
        isHeaderHidden.value = false
    }
    lastScrollTop = scrollTop
}

onMounted(() => {
    intervalId = setInterval(changeBg, 8000)
    window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
    clearInterval(intervalId)
    window.removeEventListener('scroll', handleScroll)
})

const isFullScreen = computed(() => {
    return route.path === '/home' || route.path === '/message'
})

const showBanner = computed(() => {
    const path = route.path
    return path === '/home' || path === '/message' || path === '/show' || path === '/about' || path === '/jotting'
})
</script>

<style scoped>
.common-layout {
    min-height: 100vh;
}

.main-container {
    padding: 0 !important;
    margin: 0 !important;
    position: relative;
}

.banner-section {
    height: 100vh;
    background-size: cover;
    background-position: center;
    background-attachment: fixed;
    position: relative;
    transition: height 0.3s ease;
}

.banner-section.half-screen {
    height: 50vh;
    padding-top: 60px;
    background-attachment: scroll;
}

.mask-layer {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.3);
    pointer-events: none;
}

.content-section {
    position: relative;
    z-index: 1;
    padding: 20px;
    margin: 0 auto;
    max-width: 1200px;
}

.content-section.half-screen-content {
    margin-top: -50px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 15px;
    padding: 30px;
}

.el-header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 999;
    background: transparent;
}

.el-footer {
    position: relative;
    z-index: 2;
}

.custom-backtop {
    background-color: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s;
}

.custom-backtop:hover {
    background-color: rgba(255, 255, 255, 1);
    transform: translateY(-3px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}

:deep(.el-backtop) {
    background-color: transparent;
}

:deep(.el-backtop:hover) {
    background-color: transparent;
}

.custom-backtop .el-icon {
    color: #409EFF;
}

.banner-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #fff;
    z-index: 2;
    width: 100%;
    padding: 0 20px;
}

.banner-title {
    font-size: 3rem;
    margin-bottom: 20px;
    font-weight: 600;
    letter-spacing: 2px;
    animation: fadeInDown 1s ease-out;
}

.banner-desc {
    font-size: 1.2rem;
    opacity: 0.9;
    max-width: 600px;
    margin: 0 auto;
    line-height: 1.6;
    animation: fadeInUp 1s ease-out;
}

@keyframes fadeInDown {
    from {
        opacity: 0;
        transform: translateY(-30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(30px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .banner-title {
        font-size: 1.8rem;
        margin-bottom: 15px;
    }

    .banner-desc {
        font-size: 0.9rem;
        padding: 0 15px;
    }

    .banner-section.half-screen {
        height: 35vh;
    }

    .content-section.half-screen-content {
        margin-top: -25px;
        padding: 20px 15px;
    }

    .custom-backtop {
        width: 40px;
        height: 40px;
        right: 20px !important;
        bottom: 20px !important;
    }

    .normal-content {
        padding: 15px;
        margin-top: 50px !important;
    }
}

@media (max-width: 480px) {
    .banner-title {
        font-size: 1.5rem;
    }

    .banner-desc {
        font-size: 0.8rem;
    }

    .content-section {
        padding: 15px 10px;
    }
}

.normal-content {
    margin-top: 60px !important;
    background: #f5f7fa;
    min-height: calc(100vh - 60px);
    padding: 30px;
}

@media (max-width: 768px) {
    .normal-content {
        padding: 15px;
    }
}
</style>