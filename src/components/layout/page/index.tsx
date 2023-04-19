import Sidebar from "../sidebar";
import React, { PropsWithChildren } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";
import { WithAuth } from "../../../hooks/useAuth";

const Page: React.FC<PropsWithChildren<any>> = ({ children }) => {
  return (
    <WithAuth>
      <div className={clsx(classes.page)}>
        <Sidebar />
        <div className={clsx(classes.page__inside)}>{children}</div>
      </div>
    </WithAuth>
  );
};

export default Page;
