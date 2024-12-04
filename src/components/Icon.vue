<template>
    <i :class="['bi', `bi-${name}`]" :style="style"></i>
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
        default: ''
    }
})

const style = computed(() => ({
    fontSize: typeof props.size === 'number' ? `${props.size}px` : props.size,
    color: props.color
}))
</script>

<style scoped>
.bi {
    display: inline-flex;
    align-items: center;
    justify-content: center;
}
</style> 