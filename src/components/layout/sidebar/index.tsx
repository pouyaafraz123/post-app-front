import clsx from "clsx";
import classes from "./styles.module.scss";
import SideIcon from "./components/sideIcon";
import { MenuIcon } from "../../icons";
import SidebarItems from "../../../constant/sidebarItems";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className={clsx(classes.sidebar)}>
      <SideIcon icon={<MenuIcon />} />
      <div>
        {SidebarItems.map((item, index) => {
          return (
            <Link to={item.path} key={index}>
              <SideIcon icon={item.icon} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Sidebar;
