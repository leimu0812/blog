import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '@/utils/route'

// 导入环境变量
const baseURL = import.meta.env.VITE_API_BASE_URL

// 创建 axios 实例
const instance = axios.create({
    baseURL,  // 使用环境变量中的基础路径
    timeout: 5000
})

// 扩展 request 方法
const request = {
    get<T>(url: string, params?: any) {
        return instance.get<any, T>(url, { params })
    },
    post<T>(url: string, data?: any) {
        return instance.post<any, T>(url, data)
    },
    put<T>(url: string, data?: any) {
        return instance.put<any, T>(url, data)
    },
    delete<T>(url: string, params?: any) {
        return instance.delete<any, T>(url, { params })
    }
}

// 响应拦截器
instance.interceptors.response.use(
    response => response.data,
    error => {
        const { response } = error
        if (response) {
            // 根据状态码跳转到对应错误页
            switch (response.status) {
                case 400:
                    ElMessage.error('请求参数错误')
                    router.push('/400')
                    break
                case 404:
                    ElMessage.error('请求资源不存在')
                    router.push('/404')
                    break
                case 500:
                    ElMessage.error('服务器错误')
                    router.push('/500')
                    break
                default:
                    ElMessage.error('未知错误')
            }
        } else {
            ElMessage.error('网络连接异常')
            router.push('/500')
        }
        return Promise.reject(error)
    }
)

export default request 