import request from "@/utils/axios";
import type {
  UserInfoVO,
  SocialLinkVO,
  TagsVO,
  TypeInfoVO,
  ArticleVO,
  ArticleQueryParams,
} from "@/api/HomeView/types";

export async function getInfo(): Promise<UserInfoVO> {
  return request.get("/info");
}

export const getSocialLink = (): Promise<SocialLinkVO> => {
  return request.get("/socialLink");
};

export const getTags = (): Promise<TagsVO> => {
  return request.get("/tags");
};

export const getSiteStats = (): Promise<TypeInfoVO> => {
  return request.get("/siteStats");
};

export const getArticleList = (params: ArticleQueryParams): Promise<ArticleVO> => {
  return request.get("/articleList", { params });
};
