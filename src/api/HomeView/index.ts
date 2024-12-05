import request from "@/utils/axios";
import type { UserInfoVO } from "@/api/HomeView/types";

export async function getInfo(): Promise<UserInfoVO> {
  return request.get("/info");
}
