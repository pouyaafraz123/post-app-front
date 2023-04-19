import { TUserType } from "./auth";
import apiCaller, { IPaginationParams, IPaginationTableList, IResponse } from "./index";
import { useInfiniteQuery } from "@tanstack/react-query";
import { calculateMaxPage } from "../utils/pagination";

export interface IUser {
  id: number;
  uid: string;
  username: string;
  email: string;
  type: TUserType;
}

export function getUser(user_id: number): Promise<IResponse<IUser>> {
  return apiCaller.get(`/user/${user_id}`);
}

export function getUsers(
  params: IPaginationParams
): Promise<IResponse<IPaginationTableList<IUser>>> {
  return apiCaller.get("/user", { params });
}

export function useUsers() {
  return useInfiniteQuery<IPaginationTableList<IUser>>(
    [getUsers.name],
    async ({ pageParam = 1 }) => {
      const params: IPaginationParams = { page: pageParam };
      const response = await getUsers({
        ...params,
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
