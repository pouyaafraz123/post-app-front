import apiCaller, { IPaginationParams, IPaginationTableList, IResponse } from "./index";
import { useInfiniteQuery } from "@tanstack/react-query";
import { calculateMaxPage } from "../utils/pagination";

export interface IPost {
  id: number;
  uid: string;
  title: string;
  image_url: string;
  timestamp: string;
  user_id: number;
}

export function getPosts(
  params: IPaginationParams
): Promise<IResponse<IPaginationTableList<IPost>>> {
  return apiCaller.get("/post", { params });
}

export function getPost(id: number): Promise<IResponse<IPost>> {
  return apiCaller.get(`/post/${id}`);
}

export function usePosts() {
  return useInfiniteQuery<IPaginationTableList<IPost>>(
    [getPosts.name],
    async ({ pageParam = 1 }) => {
      const params: IPaginationParams = { page: pageParam };
      const response = await getPosts(params);
      return response.data;
    },
    {
      getNextPageParam: (lastPage, allPages) => {
        let maxPage = calculateMaxPage(lastPage.total, lastPage.per_page);
        return allPages.length < maxPage ? allPages.length + 1 : undefined;
      },
    }
  );
}
