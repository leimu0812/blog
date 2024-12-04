<template>
  <div class="show-container">
    <!-- 归档头部 -->
    <div class="show-header fade-in">
      <h2 class="section-title">归档</h2>
      <p class="section-subtitle">探索不同的内容分类</p>
    </div>

    <!-- 标签部分 -->
    <div class="tags-section fade-in" style="animation-delay: 0.1s">
      <h3 class="subsection-title">标签云</h3>
      <div class="tags-container">
        <el-tag
          v-for="tag in tags"
          :key="tag.id"
          class="tag-item"
          :style="getRandomTagStyle()"
          @click="handleTagClick(tag)">
          {{ tag.name }}
          <span class="tag-count">({{ tag.count }})</span>
        </el-tag>
      </div>
    </div>

    <!-- 频道网格 -->
    <div class="channels-section fade-in" style="animation-delay: 0.2s">
      <h3 class="subsection-title">频道分类</h3>
      <div class="channel-grid">
        <el-card 
          v-for="channel in channels" 
          :key="channel.id" 
          class="common-card channel-card"
          @click="handleChannelClick(channel)">
          <div class="channel-icon">
            <Icon :name="channel.icon" :size="30" color="white" />
          </div>
          <div class="channel-info">
            <h3 class="channel-name">{{ channel.name }}</h3>
            <p class="channel-desc">{{ channel.description }}</p>
            <div class="channel-meta">
              <el-tag size="small" class="common-tag">
                {{ channel.articleCount }} 篇文章
              </el-tag>
              <div class="meta-divider"></div>
              <div class="update-info">
                <Icon name="clock" :size="14" />
                <span>最近更新: {{ channel.lastUpdate }}</span>
              </div>
            </div>
            <div class="channel-tags">
              <el-tag 
                v-for="tag in channel.tags" 
                :key="tag"
                size="small"
                class="channel-tag"
                :style="getRandomTagStyle()">
                {{ tag }}
              </el-tag>
            </div>
          </div>
        </el-card>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Icon from '@/components/Icon.vue'

const router = useRouter()

// 标签数据
const tags = ref([
  { id: 1, name: '技术', count: 15 },
  { id: 2, name: '生活', count: 8 },
  { id: 3, name: '随笔', count: 12 },
  { id: 4, name: '编程', count: 20 },
  { id: 5, name: '旅行', count: 6 },
  { id: 6, name: '美食', count: 9 },
  { id: 7, name: '游戏', count: 11 },
])

// 频道数据
const channels = ref([
  {
    id: 1,
    name: '生活随笔',
    description: '记录生活中的点点滴滴，分享日常感悟',
    icon: 'journal-text',
    articleCount: 25,
    lastUpdate: '2024-03-21',
    tags: ['美食', '旅行', '生活']
  },
  {
    id: 2,
    name: '学习笔记',
    description: '技术积累与学习心得分享',
    icon: 'book',
    articleCount: 18,
    lastUpdate: '2024-03-20',
    tags: ['编程', '读书', '笔记']
  },
  {
    id: 3,
    name: '游戏时光',
    description: '游戏经历与攻略分享',
    icon: 'controller',
    articleCount: 12,
    lastUpdate: '2024-03-19',
    tags: ['游戏', '攻略', '娱乐']
  }
])

// 生成随机标签样式
const getRandomTagStyle = () => {
  const colors = [
    { bg: '#e5f7ff', color: '#409EFF' },
    { bg: '#f0f9eb', color: '#67C23A' },
    { bg: '#fdf6ec', color: '#E6A23C' },
    { bg: '#fef0f0', color: '#F56C6C' }
  ]
  const color = colors[Math.floor(Math.random() * colors.length)]
  return {
    backgroundColor: color.bg,
    color: color.color,
    border: 'none'
  }
}

// 处理标签点击
const handleTagClick = (tag: any) => {
  router.push(`/tag/${tag.id}`)
}

// 处理频道点击
const handleChannelClick = (channel: any) => {
  router.push(`/channel/${channel.id}`)
}
</script>

<style scoped>
.show-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.show-header {
  margin-bottom: 40px;
  text-align: center;
}

.section-title {
  font-size: 2.5em;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.section-subtitle {
  color: var(--text-regular);
  font-size: 1.1em;
}

.subsection-title {
  font-size: 1.8em;
  color: var(--text-primary);
  margin-bottom: 20px;
}

/* 标签部分样式 */
.tags-section {
  margin-bottom: 40px;
}

.tags-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.tag-item {
  cursor: pointer;
  padding: 8px 16px;
  font-size: 14px;
  transition: transform 0.3s;
}

.tag-item:hover {
  transform: translateY(-2px);
}

.tag-count {
  margin-left: 4px;
  opacity: 0.8;
}

/* 频道部分样式 */
.channel-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.channel-card {
  cursor: pointer;
  padding: 20px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.channel-icon {
  width: 60px;
  height: 60px;
  border-radius: 15px;
  background: linear-gradient(135deg, var(--primary-color), #36cfc9);
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  transition: all var(--transition-time) ease;
}

.channel-card:hover .channel-icon {
  transform: scale(1.1) rotate(5deg);
}

.channel-info {
  flex: 1;
}

.channel-name {
  font-size: 20px;
  color: var(--text-primary);
  margin: 0 0 10px 0;
}

.channel-desc {
  font-size: 14px;
  color: var(--text-regular);
  margin: 0 0 15px 0;
  line-height: 1.6;
}

.channel-meta {
  display: flex;
  align-items: center;
  gap: 15px;
  margin-bottom: 15px;
}

.meta-divider {
  width: 1px;
  height: 14px;
  background-color: var(--text-secondary);
  opacity: 0.2;
}

.update-info {
  display: flex;
  align-items: center;
  gap: 5px;
  color: var(--text-secondary);
  font-size: 13px;
}

.channel-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.channel-tag {
  border-radius: 4px;
  padding: 2px 8px;
  font-size: 12px;
}

@media (max-width: 768px) {
  .show-container {
    padding: 10px;
  }

  .section-title {
    font-size: 2em;
  }

  .section-subtitle {
    font-size: 1em;
  }

  .subsection-title {
    font-size: 1.5em;
    margin-bottom: 15px;
  }

  .tags-container {
    gap: 8px;
  }

  .tag-item {
    padding: 6px 12px;
    font-size: 12px;
  }

  .channel-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }

  .channel-card {
    padding: 15px;
  }

  .channel-icon {
    width: 50px;
    height: 50px;
  }

  .channel-name {
    font-size: 18px;
  }

  .channel-desc {
    font-size: 13px;
  }

  .channel-meta {
    flex-wrap: wrap;
    gap: 10px;
  }

  .update-info {
    font-size: 12px;
  }
}
</style>