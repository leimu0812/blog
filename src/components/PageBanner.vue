<template>
    <div class="page-banner" :style="bannerStyle">
        <div class="banner-mask"></div>
        <div class="banner-content">
            <h1 class="banner-title">{{ title }}</h1>
            <p class="banner-desc">{{ description }}</p>
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps, computed, } from 'vue'
const props = defineProps({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        default: ''
    },
    bgImage: {
        type: String,
        default: ''
    }
})

const bannerStyle = computed(() => ({
    backgroundImage: props.bgImage ? `url(${props.bgImage})` : 'linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)'
}))
</script>

<style scoped>
.page-banner {
    position: relative;
    height: 300px;
    background-size: cover;
    background-position: center;
    margin-bottom: 30px;
    border-radius: 15px;
    overflow: hidden;
}

.banner-mask {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.3);
}

.banner-content {
    position: relative;
    z-index: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: #fff;
    text-align: center;
    padding: 20px;
}

.banner-title {
    font-size: 2.5rem;
    margin-bottom: 15px;
    font-weight: 600;
}

.banner-desc {
    font-size: 1.1rem;
    max-width: 600px;
    line-height: 1.6;
    opacity: 0.9;
}

@media (max-width: 768px) {
    .page-banner {
        height: 200px;
        margin: -10px -10px 20px -10px;
        border-radius: 0;
    }

    .banner-title {
        font-size: 1.8rem;
    }

    .banner-desc {
        font-size: 1rem;
    }
}
</style>