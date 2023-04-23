import Sidebar from "../sidebar";
import React from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { WithAuth } from "../../../hooks/useAuth";
import { ProfileBold } from "../../icons";
import { Link } from "react-router-dom";

const Page: React.FC<{ title: string }> = ({ children, title }) => {
  return (
    <WithAuth>
      <div className={clsx(classes.page)}>
        <Sidebar />
        <div className={clsx(classes.page__inside)}>
          <div className={clsx(classes.page__title)}>
            <h1 className={clsx(classes.page__size)}>{title}</h1>
            <Link to={"/profile"} className={clsx(classes.page__icon)}>
              <ProfileBold />
            </Link>
          </div>
          <div className={clsx(classes.page__content)}>{children}</div>
        </div>
      </div>
    </WithAuth>
  );
};

export default Page;
