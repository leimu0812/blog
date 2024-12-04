<template>
    <footer class="footer">
        <div class="footer-bottom">
            <div class="copyright">
                <p>
                    <Icon name="c-circle" :size="14" />
                    {{ footerData.copyright.text }}
                </p>
                <a href="https://beian.miit.gov.cn/" class="beian">
                    <Icon name="shield-check" :size="14" />
                    {{ footerData.copyright.beian }}
                </a>
            </div>
        </div>
    </footer>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import Icon from '@/components/Icon.vue'

// 模拟后台数据
const footerData = reactive({
    copyright: {
        text: '2024 心如镜映月明. The heart is like a mirror reflecting the moon .',
        beian: '京ICP备xxxxxxxx号'
    }
})
</script>

<style scoped>
.footer {
    background: rgba(255, 255, 255, 0.9);
    backdrop-filter: blur(10px);
    padding: 60px 0 20px;
    color: #333;
}

.footer-bottom {
    margin-top: 40px;
    padding-top: 20px;
    border-top: 1px solid rgba(0, 0, 0, 0.1);
}

.copyright {
    text-align: center;
    color: #666;
    font-size: 0.9rem;
}

.beian {
    margin-top: 5px;
    font-size: 0.8rem;
    color: #999;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .footer-content {
        grid-template-columns: 1fr;
        text-align: center;
    }

    .footer-section h3::after {
        left: 50%;
        transform: translateX(-50%);
    }

    .social-links {
        justify-content: center;
    }

    .quick-links li, .contact-info li {
        justify-content: center;
    }
}
</style>