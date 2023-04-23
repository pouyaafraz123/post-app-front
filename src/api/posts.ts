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

export interface IUserPostsParams extends IPaginationParams {
  user_id: number;
}
export function getUserPosts({
  user_id,
  page,
  per_page,
}: IUserPostsParams): Promise<IResponse<IPaginationTableList<IPost>>> {
  return apiCaller.get(`/user/${user_id}/posts`, {
    params: { page, per_page },
  });
}

export function useUserPosts(id: number) {
  return useInfiniteQuery<IPaginationTableList<IPost>>(
    [getUserPosts.name, id],
    async ({ pageParam = 1 }) => {
      const params: IPaginationParams = { page: pageParam };
      const response = await getUserPosts({
        ...params,
        user_id: Number(id),
      });
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

export interface ISendPostParams {
  image_url: string;
  title: string;
}
export function sendPost(data: ISendPostParams): Promise<IResponse<any>> {
  return apiCaller.post("/post", data);
}

export function updatePost(
  id: number,
  data: ISendPostParams
): Promise<IResponse<any>> {
  return apiCaller.put(`/post/${id}`, data);
}

export function deletePost(id: number): Promise<IResponse<any>> {
  return apiCaller.delete(`/post/${id}`);
}
