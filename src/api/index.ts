import axios, { AxiosResponse } from "axios";

const BASE_URL = "http://127.0.0.1:8000";

const apiCaller = axios.create({
  baseURL: BASE_URL,
});

export interface IServerResponse<T> {
  detail?: string;
  errors?: any;
  data?: T;
}

export interface IResponse<T> extends AxiosResponse {
  data: T;
  detail:string;
}

export interface IPagination {
  count: number;
  next: string;
  previous: string;
}

export interface IPaginationParams {
  page: number;
  per_page?: number;
}

export interface IPaginationTableList<T> extends IPagination {
  total:number;
  page:number;
  per_page:number;
  data: T[];
}

export const setAxiosToken = (token: string | null): void => {
  if (token === null) {
    delete apiCaller.defaults.headers.common["Authorization"];
    return;
  }

  apiCaller.defaults.headers.common["Authorization"] = `Bearer ${token}`;
};

export default apiCaller;
