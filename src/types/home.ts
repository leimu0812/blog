// 用户信息相关
export interface UserInfo {
  nickname: string;
  motto: string;
  avatarUrl: string;
}

// 数量信息相关
export interface TypeInfo {
  name: string;
  value: number;
}

// 社交链接相关
export interface SocialLink {
  icon: string;
  url: string;
  title: string;
}

// 标签相关
export interface Tag {
  id: string | number;
  name: string;
  count: number;
  type: string;
}

// 热门文章相关
export interface HotArticle {
  id: number;
  title: string;
  views: number;
}

// 文章详情
export interface Articles {
  id: string | number;
  title: string;
  summary: string;
  content: string;
  coverImg: string;
  coverImgUrl: string;
  category: string;
  views: number;
  isTop: number;
  status: string;
  publishTime: string;
  createdAt: string;
  updatedAt: string;
  tags: Tag[];
}

// 文章查询参数
export interface ArticleQueryParams {
  title?: string;
  pageNum: number;
  pageSize: number;
}

