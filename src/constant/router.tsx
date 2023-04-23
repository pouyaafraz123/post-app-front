import { Navigate, RouteObject } from "react-router-dom";
import MainPage from "../pages/mainPage";
import LoginPage from "../pages/loginPage";
import PostPage from "../pages/postPage";
import UsersPage from "../pages/usersPage";
import React from "react";
import ProfilePage from "../pages/profilePage";
import RedirectToUserProfile from "../pages/redirectToUserProfile";
import AddPost from "../pages/addPost";

export const router: RouteObject[] = [
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
    element: <RedirectToUserProfile />,
    path: "/profile",
  },
  {
    element: <ProfilePage />,
    path: "/profile/:id",
  },
  {
    element: <AddPost />,
    path: "/add-post",
  },
  {
    element: <AddPost />,
    path: "/edit-post/:id",
  },
  {
    element: <Navigate to={"/"} />,
    path: "*",
  },
];

export const userRouter: RouteObject[] = [
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
    element: <RedirectToUserProfile />,
    path: "/profile",
  },
  {
    element: <ProfilePage />,
    path: "/profile/:id",
  },
  {
    element: <AddPost />,
    path: "/add-post",
  },
  {
    element: <AddPost />,
    path: "/edit-post/:id",
  },
  {
    element: <Navigate to={"/"} />,
    path: "*",
  },
];
