import React from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { Navigate, Route, RouteObject, Routes } from "react-router-dom";
import MainPage from "../pages/mainPage";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import LoginPage from "../pages/loginPage";
import { AuthProvider } from "../hooks/useAuth";
import { APIConfigurator } from "../components/other/APIConfigurator";
import { ToastContainer } from "react-toastify";
import { TOAST_PROPS } from "../constant/toast";
import "react-toastify/dist/ReactToastify.css";
import PostPage from "../pages/postPage";
import UsersPage from "../pages/usersPage";

function App() {
  const router: RouteObject[] = [
    {
      element: <MainPage />,
      path: "/",
    },
    {
      element: <LoginPage />,
      path: "/login",
    },
    {
      element: <LoginPage />,
      path: "/signup",
    },
    {
      element: <PostPage />,
      path: "/post/:id",
    },
    {
      element: <UsersPage />,
      path: "/users",
    },
    {
      element: <Navigate to={"/"} />,
      path: "*",
    },
  ];

  const client = new QueryClient({
    defaultOptions: { queries: { keepPreviousData: true } },
  });

  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <div className={clsx(classes.app)}>
          <Routes>
            {router.map((r) => (
              <Route {...r} />
            ))}
          </Routes>
        </div>
        <ToastContainer {...TOAST_PROPS} />
        <APIConfigurator />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
