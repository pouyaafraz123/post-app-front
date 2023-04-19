import React, { ReactNode } from "react";
import clsx from "clsx";
import classes from "../styles.module.scss";

export interface ISideIconProps {
  icon: ReactNode;
}

const SideIcon: React.FC<ISideIconProps> = ({ icon }) => {
  return <div className={clsx(classes.sidebar__icon)}>{icon}</div>;
};

export default SideIcon;
