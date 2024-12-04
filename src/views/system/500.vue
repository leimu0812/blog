<template>
    <div class="error-page">
        <div class="error-content">
            <div class="error-image">
                <img src="@/assets/error/500.svg" alt="500 Error" />
            </div>
            <h1 class="error-code">500</h1>
            <h2 class="error-title">Internal Server Error</h2>
            <p class="error-desc">抱歉，服务器出现了一些问题...</p>
            <div class="error-actions">
                <el-button type="primary" @click="goHome">
                    <Icon name="house" :size="16" />
                    返回首页
                </el-button>
                <el-button @click="goBack">
                    <Icon name="arrow-left" :size="16" />
                    返回上页
                </el-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Icon from '@/components/Icon.vue'

const router = useRouter()

const goHome = () => {
    router.push('/')
}

const goBack = () => {
    router.back()
}
</script>

<style scoped>
.error-page {
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
}

.error-content {
    text-align: center;
    padding: 40px;
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    border-radius: 20px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.1);
    animation: fadeInUp 0.6s ease-out;
}

.error-image {
    width: 300px;
    height: 300px;
    margin: 0 auto 30px;
}

.error-image img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.error-code {
    font-size: 72px;
    font-weight: 700;
    color: #409EFF;
    margin: 0 0 20px;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.1);
}

.error-title {
    font-size: 28px;
    color: #303133;
    margin: 0 0 15px;
}

.error-desc {
    font-size: 16px;
    color: #606266;
    margin: 0 0 30px;
}

.error-actions {
    display: flex;
    gap: 15px;
    justify-content: center;
}

.error-actions .el-button {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 12px 24px;
    border-radius: 8px;
    transition: all 0.3s ease;
}

.error-actions .el-button:hover {
    transform: translateY(-2px);
}

@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

@media (max-width: 768px) {
    .error-content {
        padding: 20px;
        margin: 20px;
    }

    .error-image {
        width: 200px;
        height: 200px;
    }

    .error-code {
        font-size: 48px;
    }

    .error-title {
        font-size: 24px;
    }

    .error-desc {
        font-size: 14px;
    }
}
</style>