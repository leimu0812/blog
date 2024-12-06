// 用户信息相关
export interface UserInfo {
  name: string;
  motto: string;
  circleUrl: string;
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

// 热门文章相关
export interface HotArticle {
  id: number;
  title: string;
  views: number;
}
// 文章相关
export interface Article {
  id: number;
  title: string;
  category: string;
  date: string;
  views: number;
  summary: string;
  coverImg: string;
  isTop: boolean;
}

// 标签相关
export interface Tag {
  name: string;
  count: number;
  type: string;
}
