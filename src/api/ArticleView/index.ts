import request from "@/utils/axios";
import type { ArticleVO } from "@/api/ArticleView/types";

export async function getArticleDetail(id: string | number){
    return request.get<ArticleVO>(`/article/${id}`);
};
