import { ReactNode } from "react";
import { AddCircleBold, HomeIcon, UsersBold } from "../components/icons";

export interface ISidebarItem {
  title: string;
  icon: ReactNode;
  path: string;
}

export const SidebarItems: ISidebarItem[] = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    title: "Users",
    icon: <UsersBold />,
    path: "/users",
  },
  {
    title: "Add Post",
    icon: <AddCircleBold />,
    path: "/add-post",
  },
];

export const UserSidebarItems: ISidebarItem[] = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    title: "Add Post",
    icon: <AddCircleBold />,
    path: "/add-post",
  },
];

