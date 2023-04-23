import React, { ReactNode } from "react";
import clsx from "clsx";
import classes from "../styles.module.scss";

export interface ISideIconProps {
  icon: ReactNode;
  title: string;
  open: boolean;
}

const SideIcon: React.FC<ISideIconProps> = ({ icon, title, open }) => {
  return (
    <div className={clsx(classes.sidebar__icon)}>
      <div>{icon}</div>
      <div
        className={clsx(
          classes.sidebar__text,
          open && classes.sidebarOpen__text
        )}
      >
        {title}
      </div>
    </div>
  );
};

export default SideIcon;
