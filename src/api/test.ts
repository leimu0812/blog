import request from '@/utils/axios'

interface TestData {
    id: number
    name: string
    value: number
}

export default {
    // 获取测试数据列表
    getList(params: { page: number; pageSize: number }) {
        return request.get<{
            list: TestData[]
            total: number
        }>('/test/list', params)
    },

    // 获取单个测试数据
    getDetail(id: number) {
        return request.get<TestData>(`/test/${id}`)
    },

    // 添加测试数据
    add(data: Omit<TestData, 'id'>) {
        return request.post<TestData>('/test', data)
    },

    // 更新测试数据
    update(id: number, data: Partial<TestData>) {
        return request.put<TestData>(`/test/${id}`, data)
    },

    // 删除测试数据
    delete(id: number) {
        return request.delete<void>(`/test/${id}`)
    }
} 