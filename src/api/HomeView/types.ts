import type { SocialLink, Tag, TypeInfo, Articles } from "@/types/home";

// 用户信息响应类型
export interface UserInfoVO {
  code: number;
  msg: string;
  data: {
    avatarUrl: string;
    nickname: string;
    motto: string;
  };
}

// 社交链接响应类型
export interface SocialLinkVO {
  code: number;
  msg: string;
  data: SocialLink[];
}

// 标签响应类型
export interface TagsVO {
  code: number;
  msg: string;
  data: Tag[];
}

export interface TypeInfoVO {
  code: number;
  msg: string;
  data: TypeInfo[];
}

export interface ArticleQueryParams {
  query?: string;
  pageNum: number;
  pageSize: number;
}

export interface ArticleVO {
  code: number;
  msg: string;
  data: {
    rows: Articles[];
    total: number;
  };
}
