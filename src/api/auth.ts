import apiCaller, { IResponse } from "./index";
import { IUser } from "./users";

export type TUserType = "REGULAR" | "SUPER_ADMIN";

export interface ILogin {
  access_token: string;
  user_id: number;
  username: string;
  type: TUserType;
}

export interface ILoginParams {
  username: string;
  password: string;
}

export function login(data: ILoginParams): Promise<IResponse<ILogin>> {
  return apiCaller.post("/login", data, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
}

export interface IRegisterParams {
  username: string;
  email: string;
  password: string;
}

export function register(data: IRegisterParams): Promise<IResponse<any>> {
  return apiCaller.post("/register", data);
}

export function getProfile(): Promise<IResponse<IUser>> {
  return apiCaller.get("/profile");
}
