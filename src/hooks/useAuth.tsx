import { useMutation } from "@tanstack/react-query";
import { ILoginParams, login } from "../api/auth";
import React, { PropsWithChildren, useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import { setAxiosToken } from "../api";

export interface ILoginData {
  username: string;
  token: string;
}

const KEY = "current_user";

const AuthContext = React.createContext<{
  user: ILoginData | undefined;
  login: (data: ILoginParams) => void;
  logout: () => void;
  isLoggedIn: boolean;
}>({ isLoggedIn: false, login: () => {}, logout: () => {}, user: undefined });

const readLoginStatus = () => {
  const temp = localStorage.getItem(KEY);
  if (!!temp && temp !== "undefined") {
    const data = JSON.parse(temp) as ILoginData;
    setAxiosToken(data?.token);
    return data;
  }

  return undefined;
};

function AuthProvider({ children }: PropsWithChildren<any>) {
  const [user, setUser] = useState<ILoginData | undefined>(readLoginStatus());
  const [isLoggedIn, setIsLoggedIn] = useState(!!user);

  const loginMutate = useMutation(login);

  const loginFunc = (d: ILoginParams) => {
    loginMutate.mutate(
      {
        username: d.username,
        password: d.password,
      },
      {
        onSuccess: (data) => {
          setUser(
            data?.data
              ? {
                  username: data?.data?.username,
                  token: data?.data?.access_token,
                }
              : undefined
          );
          setAxiosToken(data?.data?.access_token);
          localStorage.setItem(
            KEY,
            JSON.stringify({
              username: data?.data?.username,
              token: data?.data?.access_token,
            })
          );
          setIsLoggedIn(true);
        },
      }
    );
  };

  const logoutFunc = () => {
    setUser(undefined);
    localStorage.removeItem(KEY);
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user: user,
        logout: logoutFunc,
        login: loginFunc,
        isLoggedIn: isLoggedIn,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  return useContext(AuthContext);
};

const WithAuth = ({ children }: PropsWithChildren<any>) => {
  const auth = useAuth();

  if (!auth.isLoggedIn) {
    return <Navigate to={"/login"} />;
  }

  return <>{children}</>;
};

export { useAuth, WithAuth, AuthProvider };
