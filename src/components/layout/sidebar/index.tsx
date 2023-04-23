import clsx from "clsx";
import classes from "./styles.module.scss";
import SideIcon from "./components/sideIcon";
import { LogoutBold, MenuIcon } from "../../icons";
import { SidebarItems, UserSidebarItems } from "../../../constant/sidebarItems";
import { Link } from "react-router-dom";
import { useProfile } from "../../../hooks/useProfile";
import { useAuth } from "../../../hooks/useAuth";
import { useState } from "react";

const Sidebar = () => {
  const profile = useProfile();
  const { logout } = useAuth();
  const [sideOpen, setSideOpen] = useState(false);

  return (
    <div className={clsx(classes.sidebar, sideOpen && classes.sidebarOpen)}>
      <div>
        <div onClick={() => setSideOpen((prevState) => !prevState)}>
          <SideIcon icon={<MenuIcon />} title={""} open={sideOpen} />
        </div>
        <div>
          {profile?.data?.data?.type === "SUPER_ADMIN"
            ? SidebarItems.map((item, index) => {
                return (
                  <Link to={item.path} key={index}>
                    <SideIcon
                      icon={item.icon}
                      title={item.title}
                      open={sideOpen}
                    />
                  </Link>
                );
              })
            : UserSidebarItems.map((item, index) => {
                return (
                  <Link to={item.path} key={index}>
                    <SideIcon
                      icon={item.icon}
                      title={item.title}
                      open={sideOpen}
                    />
                  </Link>
                );
              })}
        </div>
      </div>
      <div className={clsx(classes.sidebar__logout)} onClick={() => logout()}>
        <SideIcon icon={<LogoutBold />} title={"Logout"} open={sideOpen} />
      </div>
    </div>
  );
};

export default Sidebar;
