import request from "@/utils/axios";
import type {
  UserInfoVO,
  SocialLinkVO,
  TagsVO,
  TypeInfoVO,
  ArticleVO,
  ArticleQueryParams,
} from "@/api/HomeView/types";

export async function getInfo() {
  return request.get<UserInfoVO>("/info");
}

export async function getSocialLink() {
  return request.get<SocialLinkVO>("/socialLink");
}

export async function getTags() {
  return request.get<TagsVO>("/tags");
}

export async function getSiteStats() {
  return request.get<TypeInfoVO>("/siteStats");
}

export async function getArticleList(params: ArticleQueryParams) {
  const { pageNum, pageSize, title } = params;
  return request.get<ArticleVO>(
    `/articleList?pageNum=${pageNum}&pageSize=${pageSize}&title=${title}`
  );
}
