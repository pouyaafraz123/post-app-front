import { PropsWithChildren } from "react";
import clsx from "clsx";
import classes from "./styles.module.scss";

export type cardType = "basic" | "styled" | "colored";
export type cardThemeType =
  | "success"
  | "warning"
  | "danger"
  | "primary"
  | "secondary";

export type cardPadding = "none" | "verySmall" | "small" | "normal" | "large";

// CardContainer props type interface
export interface ICardContainerProps extends PropsWithChildren<any> {
  type?: cardType;
  theme?: cardThemeType;
  padding?: cardPadding;
  className?: string;
}

// CardContainer Component to wrap info in form of card
const CardContainer = ({
  type,
  theme,
  padding,
  children,
  className,
}: ICardContainerProps) => {
  //render component
  return (
    <div
      className={clsx(
        classes.card,
        type === "basic" && classes.basic,
        type === "styled" && classes.bCard,
        type === "colored" && classes.colored,
        theme === "success" && classes.success,
        theme === "warning" && classes.warning,
        theme === "danger" && classes.danger,
        theme === "primary" && classes.primary,
        theme === "secondary" && classes.secondary,
        padding === "none" && classes.pNone,
        padding === "verySmall" && classes.psx,
        padding === "small" && classes.ps,
        padding === "normal" && classes.pn,
        padding === "large" && classes.pl,
        className
      )}
    >
      {children}
    </div>
  );
};

CardContainer.defaultProps = {
  type: "basic",
  theme: "primary",
  padding: "normal",
};

export default CardContainer;
