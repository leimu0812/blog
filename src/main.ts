import "./assets/main.css";
import '@/assets/styles/variables.css'
import 'bootstrap-icons/font/bootstrap-icons.css'

import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from 'pinia'
import router from "@/utils/route";
import ElementPlus from 'element-plus'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import 'element-plus/dist/index.css'
import request from '@/utils/axios'

const pinia = createPinia()
const app = createApp(App);
app.use(pinia)
app.use(router);
app.use(ElementPlus)
app.config.globalProperties.$http = request

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount("#app");
