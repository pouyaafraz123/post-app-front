import React from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";

const Section: React.FC<{ title: string }> = ({ title, children }) => {
  return (
    <div className={clsx(classes.section)}>
      <h6 className={clsx(classes.section__title)}>{title}</h6>
      <div className={clsx(classes.section__sep)}></div>
      <div className={clsx(classes.section__inside)}>{children}</div>
    </div>
  );
};

export default Section;
