<template>
    <div class="icon-wrapper" :style="wrapperStyle">
        <i v-if="!isCustomIcon" :class="`bi bi-${props.name}`" :style="iconStyle"></i>

        <img v-else-if="name === 'bilibili'" src="@/assets/icons/bilibili.svg" :style="iconStyle" alt="bilibili" />

        <img v-else-if="name === 'gitee'" src="@/assets/icons/gitee.svg" :style="iconStyle" alt="gitee" />
        <img v-else-if="name === 'top'" src="@/assets/icons/top.svg" :style="iconStyle" alt="top" />
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
    name: {
        type: String,
        required: true
    },
    size: {
        type: [Number, String],
        default: 16
    },
    color: {
        type: String,
        default: 'currentColor'
    }
})

const isCustomIcon = computed(() => {
    return ['bilibili', 'gitee', 'top'].includes(props.name)
})

const iconStyle = computed(() => ({
    width: typeof props.size === 'number' ? `${props.size}px` : props.size,
    height: typeof props.size === 'number' ? `${props.size}px` : props.size,
    color: props.color,
}))

const wrapperStyle = computed(() => ({
    width: typeof props.size === 'number' ? `${props.size}px` : props.size,
    height: typeof props.size === 'number' ? `${props.size}px` : props.size,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
}))
</script>

<style scoped>
.icon-wrapper {
    line-height: 0;
}

.icon-wrapper img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}
</style>