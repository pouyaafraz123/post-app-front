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

export interface ICreateUserParams {
  username: string;
  email: string;
  password: string;
  type: TUserType;
}

export function createUser(data: ICreateUserParams): Promise<IResponse<any>> {
  return apiCaller.post("/user", data);
}

export function deleteUser(id: number): Promise<IResponse<any>> {
  return apiCaller.delete(`user/${id}`);
}

export interface IUpdateUserParams {
  username: string;
  email: string;
}

export function updateUser(
  id: number,
  data: IUpdateUserParams
): Promise<IResponse<any>> {
  return apiCaller.put(`/user/${id}`, data);
}

export function promoteUser(id: number): Promise<IResponse<any>> {
  return apiCaller.put(`/user/promote/${id}`);
}
