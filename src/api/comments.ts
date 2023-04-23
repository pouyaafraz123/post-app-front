import apiCaller, { IPaginationParams, IPaginationTableList, IResponse } from "./index";
import { useInfiniteQuery } from "@tanstack/react-query";
import { calculateMaxPage } from "../utils/pagination";

export interface IComment {
  id: number;
  uid: string;
  text: string;
  timestamp: string;
  user_id: number;
  post_id: number;
}

export interface IGetPostCommentsParams extends IPaginationParams {
  post_id: number;
}

export interface IGetUserCommentsParams extends IPaginationParams {
  user_id: number;
}

export function getPostComment({
  post_id,
  page,
  per_page,
}: IGetPostCommentsParams): Promise<IResponse<IPaginationTableList<IComment>>> {
  return apiCaller.get(`/post/${post_id}/comments`, {
    params: { page, per_page },
  });
}

export function getUserComment({
  user_id,
  page,
  per_page,
}: IGetUserCommentsParams): Promise<IResponse<IPaginationTableList<IComment>>> {
  return apiCaller.get(`/user/${user_id}/comments`, {
    params: { page, per_page },
  });
}

export function useComments(id: number) {
  return useInfiniteQuery<IPaginationTableList<IComment>>(
    [getPostComment.name, id],
    async ({ pageParam = 1 }) => {
      const params: IPaginationParams = { page: pageParam };
      const response = await getPostComment({
        ...params,
        post_id: Number(id),
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

export function useUserComments(id: number) {
  return useInfiniteQuery<IPaginationTableList<IComment>>(
    [getUserComment.name, id],
    async ({ pageParam = 1 }) => {
      const params: IPaginationParams = { page: pageParam };
      const response = await getUserComment({
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

export function addComment(id: number, text: string): Promise<IResponse<any>> {
  return apiCaller.post(`/comment/${id}`, { text });
}

export function deleteComment(id: number): Promise<IResponse<any>> {
  return apiCaller.delete(`/comment/${id}`);
}
