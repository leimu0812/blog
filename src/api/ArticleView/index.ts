import request from "@/utils/axios";
import type { Articles } from "@/types/home";

export async function getArticleDetail(id: string) {
  return request.get<Articles>("/articleDetail", { id });
}
