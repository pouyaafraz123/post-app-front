import { ReactNode } from "react";
import { HomeIcon, UsersBold } from "../components/icons";

export interface ISidebarItem {
  title: string;
  icon: ReactNode;
  path: string;
}

const SidebarItems: ISidebarItem[] = [
  {
    title: "Home",
    icon: <HomeIcon />,
    path: "/",
  },
  {
    title:"Users",
    icon:<UsersBold/>,
    path:"/users"
  }
];

export default SidebarItems;
