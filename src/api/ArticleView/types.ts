import type {
    Articles,
  } from "@/types/home";

  export interface ArticleVO {
    code: number;
    msg: string;
    data: Articles
  }