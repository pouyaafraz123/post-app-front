import React, { ReactNode } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";

const Section: React.FC<{
  title: string;
  customAction?: ReactNode;
  noPadding?: boolean;
}> = ({ title, children, customAction, noPadding }) => {
  return (
    <div
      className={clsx(classes.section, noPadding && classes.section__noPadding)}
    >
      <div className={clsx(classes.section__top)}>
        <h6 className={clsx(classes.section__title)}>{title}</h6>
        {customAction}
      </div>
      <div className={clsx(classes.section__sep)}></div>
      <div className={clsx(classes.section__inside)}>{children}</div>
    </div>
  );
};

export default Section;
